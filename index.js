#!/usr/bin/env node
import fg from 'fast-glob';
import enquirer from 'enquirer';
const { MultiSelect } = enquirer;
import pc from 'picocolors';
import { program } from 'commander';
import trash from 'trash';
import ora from 'ora';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

// CLI Arguments
program
  .name('node-reaper')
  .description('Hunt down and obliterate forgotten node_modules to reclaim disk space.')
  .option('-d, --deep-scan', 'Omni-Scan mode: include .next, dist, build, and .cache folders')
  .option('-o, --older-than <days>', 'Time Machine: Only show folders older than X days (e.g. 30)')
  .option('--nuke', 'Bypass system trash and permanently delete files (DANGEROUS)')
  .option('--dry-run', 'Simulate deletion without actually removing files')
  .parse(process.argv);

const options = program.opts();

async function getDirSize(dir) {
    try {
        const { stdout } = await execAsync(`du -sk "${dir}"`);
        const sizeKb = parseInt(stdout.split('\t')[0]);
        return sizeKb * 1024;
    } catch (e) {
        return 0; 
    }
}

// THE ULTIMATE FLEX: Git-Aware Staleness Detector
async function getStalenessDays(targetPath) {
    const parentDir = path.dirname(targetPath);
    try {
        // Try Git first: Get the exact timestamp of the last code commit
        const { stdout } = await execAsync(`git log -1 --format="%ct"`, { cwd: parentDir });
        const commitTimestamp = parseInt(stdout.trim()) * 1000;
        return (Date.now() - commitTimestamp) / (1000 * 60 * 60 * 24);
    } catch (e) {
        // Fallback to basic OS file modified date if not a git repository
        try {
            const stat = await fs.stat(parentDir);
            return (Date.now() - stat.mtimeMs) / (1000 * 60 * 60 * 24);
        } catch (err) {
            return 0;
        }
    }
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function renderHeatmap(bytes, maxBytes) {
    const bars = 10; 
    const ratio = maxBytes > 0 ? bytes / maxBytes : 0;
    const filled = Math.ceil(ratio * bars);
    const empty = bars - filled;
    return '█'.repeat(filled) + '░'.repeat(empty); 
}

async function run() {
    console.clear();
    
    // High-Resolution ASCII Banner with Custom Tagline
    console.log(pc.magenta(pc.bold(`
    ███╗   ██╗ ██████╗ ██████╗ ███████╗    ██████╗ ███████╗ █████╗ ██████╗ ███████╗██████╗ 
    ████╗  ██║██╔═══██╗██╔══██╗██╔════╝    ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
    ██╔██╗ ██║██║   ██║██║  ██║█████╗      ██████╔╝█████╗  ███████║██████╔╝█████╗  ██████╔╝
    ██║╚██╗██║██║   ██║██║  ██║██╔══╝      ██╔══██╗██╔══╝  ██╔══██║██╔═══╝ ██╔══╝  ██╔══██╗
    ██║ ╚████║╚██████╔╝██████╔╝███████╗    ██║  ██║███████╗██║  ██║██║     ███████╗██║  ██║
    ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝
    `)));
    console.log(pc.cyan('    v1.0.0 | Disk Space Reclamation Engine'));
    console.log(pc.dim('    Architected by @lakshanmuruganandam\n'));

    const spinner = ora({
        text: 'Initializing Fast-Glob Engine... Scanning filesystem.',
        color: 'magenta'
    }).start();

    const targets = options.deepScan 
        ? ['**/node_modules', '**/.next', '**/dist', '**/.cache', '**/build']
        : ['**/node_modules'];

    const foundPaths = await fg(targets, {
        cwd: process.cwd(),
        onlyDirectories: true,
        dot: true,
        ignore: ['**/node_modules/**/node_modules', '**/.git/**', '**/Library/**'],
        deep: 5
    });

    if (foundPaths.length === 0) {
        spinner.succeed(pc.green('No dead modules found. Your disk is pristine.'));
        process.exit(0);
    }

    spinner.text = 'Calculating mass and staleness (Multi-threaded execution)...';

    // MULTI-THREADED SPEED HACK
    let maxSizeBytes = 0;
    const folderPromises = foundPaths.map(async (p) => {
        const fullPath = path.resolve(process.cwd(), p);
        
        // Execute Size and Git-Staleness calculations simultaneously
        const [size, ageDays] = await Promise.all([
            getDirSize(fullPath),
            getStalenessDays(fullPath)
        ]);
        return { path: p, fullPath, sizeBytes: size, ageDays };
    });

    // Wait for all parallel calculations to finish
    let foldersRaw = await Promise.all(folderPromises);

    // TIME MACHINE FILTER
    if (options.olderThan) {
        const minDays = parseInt(options.olderThan);
        foldersRaw = foldersRaw.filter(f => f.ageDays >= minDays);
        if (foldersRaw.length === 0) {
            spinner.succeed(pc.green(`No abandoned modules older than ${minDays} days found.`));
            process.exit(0);
        }
    }

    foldersRaw.forEach(f => {
        if (f.sizeBytes > maxSizeBytes) maxSizeBytes = f.sizeBytes;
    });

    const folders = foldersRaw.map(f => ({
        ...f,
        sizeFormatted: formatBytes(f.sizeBytes),
        ageFormatted: f.ageDays < 1 ? '<1d' : Math.floor(f.ageDays) + 'd'
    }));

    spinner.succeed(pc.green(`Target acquired: ${folders.length} bloated folders found.\n`));

    folders.sort((a, b) => b.sizeBytes - a.sizeBytes);

    const choices = folders.map(f => {
        const rawHeatmap = renderHeatmap(f.sizeBytes, maxSizeBytes);
        const sizeStr = `[ ${f.sizeFormatted} ]`.padEnd(12);
        const ageStr = `(${f.ageFormatted} old)`.padEnd(10);
        const isCache = !f.path.includes('node_modules');
        
        const ratio = maxSizeBytes > 0 ? f.sizeBytes / maxSizeBytes : 0;
        let colorizer = pc.cyan;
        if (ratio > 0.7) colorizer = pc.red;
        else if (ratio > 0.3) colorizer = pc.yellow;

        const coloredHeatmap = colorizer(rawHeatmap);
        const coloredSize = pc.bold(colorizer(sizeStr));
        const coloredAge = pc.dim(ageStr);
        const pathDisplay = isCache ? pc.magenta(f.path) : pc.white(f.path);

        return {
            name: f.fullPath,
            message: `${coloredHeatmap} ${coloredSize} ${coloredAge} ${pathDisplay}`,
        };
    });

    const prompt = new MultiSelect({
        name: 'value',
        message: pc.bold('Select targets to obliterate (Space to select, Enter to execute):\n'),
        choices: choices,
        limit: 15,
        indicator(state, choice) {
            const isHovered = choice.index === state.index;
            const isSelected = choice.enabled;
            const checkbox = isSelected ? pc.green(pc.bold('[X]')) : pc.dim('[ ]');
            
            if (isHovered) {
                return pc.cyan(pc.bold('  ▶ ')) + checkbox;
            }
            return '    ' + checkbox;
        },
        pointer() { return ''; },
        styles: { em: (text) => pc.underline(text) }
    });

    let selectedPaths;
    try {
        selectedPaths = await prompt.run();
    } catch (e) {
        console.log(pc.red('\nOperation aborted by user.'));
        process.exit(1);
    }

    if (selectedPaths.length === 0) {
        console.log(pc.yellow('\nNo folders selected. Standing down.'));
        process.exit(0);
    }

    let totalSaved = 0;
    const delSpinner = ora('Executing deletions...').start();

    for (const targetPath of selectedPaths) {
        const folderObj = folders.find(f => f.fullPath === targetPath);
        if (folderObj) totalSaved += folderObj.sizeBytes;
        
        if (!options.dryRun) {
            try {
                if (options.nuke) {
                    await fs.rm(targetPath, { recursive: true, force: true });
                } else {
                    await trash(targetPath);
                }
            } catch (err) {
                console.log(pc.red(`\nFailed to delete ${targetPath}: ${err.message}`));
            }
        }
    }

    delSpinner.succeed(pc.green('Execution Complete.'));

    console.log('\n' + pc.cyan('===================================================================='));
    if (options.dryRun) {
        console.log(pc.yellow('  DRY RUN: No files were actually harmed.'));
    }
    console.log(`  Total Space Reclaimed: ${pc.green(pc.bold(formatBytes(totalSaved)))} 🚀`);
    
    if (!options.nuke && !options.dryRun) {
        console.log(pc.dim(`  (Folders safely moved to System Trash. Use --nuke next time to bypass)`));
    }
    console.log(pc.cyan('====================================================================\n'));
}

run();
