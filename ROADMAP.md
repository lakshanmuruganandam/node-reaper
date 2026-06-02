# ☠️ Node Reaper — Roadmap

The master plan to become the undisputed king of CLI disk space reclaimers.

## ⚡ 1. The Core Engine (Raw Speed)
- [x] **Fast-Glob Traversal:** Integrated `fast-glob` to scan the filesystem in milliseconds.
- [x] **Parallel Size Calculation:** Uses `Promise.all` to calculate all folder sizes simultaneously across multiple system processes.
- [ ] **Worker Thread Pool:** Use `piscina` to chunk paths across dedicated CPU worker threads for projects with 100k+ files.
- [ ] **Delta Cache:** Background caching so running it twice in the same session is instant, only scanning for changes.

## 🧠 2. Smart Detection (The Brain)
- [x] **Git-Aware Staleness Detection:** Reads `.git` for the last actual commit date, bypassing unreliable OS timestamps.
- [x] **Omni-Scan / Deep Scan (`--deep-scan`):** Detects `.next`, `.cache`, `dist`, `build`, and `coverage` folders.
- [x] **Time Machine (`--older-than`):** Filters results by days of inactivity for surgical precision.
- [ ] **Dependency Deduplication Analyzer:** Identify identical `node_modules` that could be consolidated into a monorepo.
- [ ] **Safe-List Exclusions:** Auto-skip system-critical node apps (Discord, Slack internals) to prevent bricking.
- [ ] **Project Type Badges:** Detect and display project type (React ⚛️, Next.js ▲, Vite ⚡, Angular 🅰️).

## 🎨 3. Cyberpunk Terminal UI (The "Wow" Factor)
- [x] **Storage Heatmaps:** ASCII block characters (████░░) with color gradients (Red → Yellow → Cyan) representing folder weight.
- [x] **Interactive Multi-Select TUI:** Arrow keys + Space to select + Enter to execute.
- [x] **Custom Indicators:** Cyan `▶` pointer for hover, green `[X]` for selection.
- [ ] **Live Total Ticker:** Real-time counter at the bottom updating as folders are selected.
- [ ] **On-the-Fly Sorting:** Press `s` to re-sort by Size, Age, or Path without restarting.
- [ ] **Vim Bindings:** `j/k` navigation, `/` to search, `a` to select all.

## 🛡️ 4. Bulletproof Safety (User Trust)
- [x] **System Trash by Default:** Uses the `trash` package to send deleted folders to OS Trash.
- [x] **The `--nuke` Flag:** Power-user override to permanently destroy files for instant reclamation.
- [x] **Dry-Run Mode (`--dry-run`):** Simulate and calculate exact savings without touching a single file.
- [ ] **Selective Undo (`node-reaper undo`):** Restore the last batch of deleted modules from Trash to their original paths.

## 🛠️ 5. Power User & CI/CD Integrations
- [ ] **Headless CI Mode (`--ci`):** No TUI, auto-delete all targets. Perfect for GitHub Actions and Jenkins.
- [ ] **JSON Export (`--json`):** Output the entire scan as a structured JSON array for pipelines.
- [ ] **Custom Glob Rules (`--target="*.log"`):** Target any file pattern alongside `node_modules`.
- [ ] **Scheduled Daemon (`node-reaper daemon`):** Silent cron job that notifies when dead space exceeds a threshold.

---

**Legend:** ✅ = Shipped in v1.0 | ⬜ = Planned for future release
