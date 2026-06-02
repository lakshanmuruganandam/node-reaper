# 💀 Node Reaper - Ultimate Roadmap & Checklist

This is the master plan to dethrone `npkill` and become the undisputed king of CLI disk space reclaimers. 

## ⚡ 1. The Core Engine (Raw Speed)
- [ ] **Rust-Level Globbing:** Integrate `fast-glob` to traverse the disk in milliseconds.
- [ ] **Multi-Threaded Scanning (Worker Pool):** Use `worker_threads` (or `piscina`) to chunk paths and calculate deeply nested folder sizes across multiple CPU cores simultaneously.
- [ ] **Cache Memorization:** Background caching mechanism so running it twice in the same day is instant, only scanning for delta changes.
- [ ] **Slim Binary Structure:** Keep the core tightly optimized to minimize dependency bloat for fast `npx` execution.

## 🧠 2. Smart Detection (The Brain)
- [ ] **Git-Aware Staleness Detection:** Read the `.git` folder for the last actual commit date to prove a project is abandoned, bypassing unreliable OS timestamps.
- [ ] **Omni-Scan / Next-Gen Cache Killer (`--deep-scan`):** Automatically detect and flag bloated framework caches (`.next`, `.cache`, `dist`, `.parcel-cache`, `build`, `coverage`).
- [ ] **Dependency Deduplication Analyzer:** Identify identical `node_modules` folders that could be converted to a monorepo or pnpm workspace.
- [ ] **Safe-List Exclusions:** Automatically skip system-critical node applications (e.g., Discord or Spotify internals) to prevent bricking apps.

## 🎨 3. Cyberpunk Terminal UI (The "Wow" Factor)
- [ ] **Interactive Storage Heatmaps:** Inline ASCII block characters (████░░) with neon color gradients to visually represent folder weight.
- [ ] **Vim Bindings & Keyboard Fluent Navigation:** Support `j/k` for up/down navigation, `Space` to select, and `Enter` to execute.
- [ ] **Live Total Ticker:** A massive, colored counter at the bottom that updates in real-time as folders are selected (`Total Reclaimed: 4.2 GB 🚀`).
- [ ] **On-the-Fly Sorting Toggles:** Press `s` in the UI to instantly re-sort the list by Size, Age, or Path without exiting.

## 🛡️ 4. Bulletproof Safety (User Trust)
- [ ] **System Trash by Default:** Use the `trash` package to send deleted folders to the OS Recycle Bin/Trash instead of permanent deletion.
- [ ] **The `--nuke` Flag:** A power-user override to bypass the trash and permanently destroy files for instant space reclamation.
- [ ] **Dry-Run Mode (`--dry-run`):** Simulate the entire process and calculate exact space saved without touching a single file.
- [ ] **Selective Restoration (`node-reaper undo`):** Restore the last batch of deleted modules from the trash back to their exact original paths.

## 🛠️ 5. Power User & CI/CD Integrations
- [ ] **Headless CI Mode (`--ci`):** Run without the UI to automatically clear out build caches in GitHub Actions or Jenkins.
- [ ] **JSON Export (`--json`):** Output the entire scan as a JSON array for data pipelines.
- [ ] **Custom Glob Rules (`--target="*.log"`):** Allow users to target massive `.log` or `.tmp` files alongside `node_modules`.
- [ ] **Scheduled Pruning (`node-reaper daemon`):** Command to set up a silent cron job that notifies the user if dead space exceeds 10GB.
