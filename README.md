# ☠️ Node Reaper

> **A multi-threaded, Git-aware CLI engine that hunts down dead `node_modules`, `.next`, `dist`, and `.cache` folders — and obliterates them to reclaim your disk space.**

```
    ███╗   ██╗ ██████╗ ██████╗ ███████╗    ██████╗ ███████╗ █████╗ ██████╗ ███████╗██████╗ 
    ████╗  ██║██╔═══██╗██╔══██╗██╔════╝    ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝██╔══██╗
    ██╔██╗ ██║██║   ██║██║  ██║█████╗      ██████╔╝█████╗  ███████║██████╔╝█████╗  ██████╔╝
    ██║╚██╗██║██║   ██║██║  ██║██╔══╝      ██╔══██╗██╔══╝  ██╔══██║██╔═══╝ ██╔══╝  ██╔══██╗
    ██║ ╚████║╚██████╔╝██████╔╝███████╗    ██║  ██║███████╗██║  ██║██║     ███████╗██║  ██║
    ╚═╝  ╚═══╝ ╚═════╝ ╚═════╝ ╚══════╝    ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝
```

<p align="center">
  <strong>Architected by <a href="https://github.com/lakshanmuruganandam">@lakshanmuruganandam</a></strong>
  <br><br>
  <a href="https://www.npmjs.com/package/node-reaper-cli"><img src="https://img.shields.io/npm/v/node-reaper-cli?color=red&label=npm&style=flat-square" alt="npm version"></a>
  <a href="https://www.npmjs.com/package/node-reaper-cli"><img src="https://img.shields.io/npm/dt/node-reaper-cli?color=cyan&style=flat-square" alt="npm downloads"></a>
  <a href="https://github.com/lakshanmuruganandam/node-reaper/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green?style=flat-square" alt="license"></a>
  <a href="https://github.com/lakshanmuruganandam/node-reaper"><img src="https://img.shields.io/github/stars/lakshanmuruganandam/node-reaper?color=yellow&style=flat-square" alt="stars"></a>
</p>

---

## ⚡ Quick Start

Zero install. One command. Run it instantly with `npx`:

```bash
npx node-reaper-cli
```

Or install it globally:

```bash
npm install -g node-reaper-cli
node-reaper
```

> **Tip:** Navigate to your main projects directory (e.g. `~/Projects`) before running — the Reaper scans everything below the current directory.

---

## 🔥 Why Node Reaper?

Every developer has **gigabytes** of forgotten `node_modules` rotting across old projects. Existing tools like `npkill` are slow, single-threaded, and blind.

Node Reaper is engineered to be different:

| Feature | Node Reaper | npkill / Others |
|---|---|---|
| Parallel size calculation | ✅ `Promise.all` across all cores | ❌ Sequential, one at a time |
| Git-aware staleness detection | ✅ Reads last commit timestamp | ❌ Relies on OS file dates |
| Time Machine filter (`--older-than`) | ✅ Filter by days of inactivity | ❌ Not available |
| Deep scan (`.next`, `dist`, `.cache`, `build`) | ✅ Full framework cache hunting | ❌ `node_modules` only |
| Color-coded heatmap visualization | ✅ Red → Yellow → Cyan gradient | ❌ Plain text list |
| Safe deletion (System Trash) | ✅ Trash by default, `--nuke` to override | ❌ Permanent delete only |
| Interactive multi-select TUI | ✅ Select exactly what to kill | ❌ Delete one at a time |

---

## 🛠️ Usage

### Default Scan — Hunt `node_modules`
```bash
npx node-reaper-cli
```

### Deep Scan — Hunt everything (`.next`, `dist`, `build`, `.cache`)
```bash
npx node-reaper-cli --deep-scan
```

### Time Machine — Only show projects untouched for 90+ days
```bash
npx node-reaper-cli --older-than 90
```

### Combine flags for surgical precision
```bash
npx node-reaper-cli --deep-scan --older-than 30
```

### Nuclear Mode — Permanently delete (bypass System Trash)
```bash
npx node-reaper-cli --nuke
```

> ⚠️ **Warning:** `--nuke` permanently deletes folders. They cannot be recovered. Use with caution.

### Dry Run — See what would be deleted without touching anything
```bash
npx node-reaper-cli --dry-run
```

---

## 🎨 The Interface

When you run Node Reaper, you get a full interactive terminal experience:

```
  ▶ [ ] ██████████ [ 200 MB ]  (142d old)  old-api/node_modules
    [ ] ████████░░ [ 150 MB ]  (89d old)   react-app/node_modules
    [X] ████░░░░░░ [ 80 MB ]   (14d old)   nextjs-blog/node_modules
    [ ] ██░░░░░░░░ [ 25 MB ]   (203d old)  portfolio-site/build
```

- **`▶`** — Cyan arrow shows your current position
- **`[X]`** — Green checkbox marks selected targets
- **`██████████`** — Heatmap bar scaled by size (Red = massive, Yellow = medium, Cyan = small)
- **`(142d old)`** — Days since last Git commit (or file modification)
- **Arrow keys** to navigate, **Space** to select, **Enter** to execute

---

## 📦 How It Works

```
┌─────────────────────────────────────────────────────────┐
│  1. Fast-Glob Engine                                    │
│     Scans filesystem at blazing speed using fast-glob   │
│                         ↓                               │
│  2. Parallel Size Calculator                            │
│     Promise.all runs du across all folders at once      │
│                         ↓                               │
│  3. Git-Aware Staleness Detector                        │
│     Reads .git/log for real last-commit timestamp       │
│                         ↓                               │
│  4. Heatmap Renderer                                    │
│     Color-codes by relative size (Red → Cyan)           │
│                         ↓                               │
│  5. Safe Executor                                       │
│     Moves to Trash (default) or permanent delete        │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 All Flags

| Flag | Short | Description |
|------|-------|-------------|
| `--deep-scan` | `-d` | Include `.next`, `dist`, `build`, `.cache` folders |
| `--older-than <days>` | `-o` | Only show folders inactive for X+ days |
| `--nuke` | | Permanently delete instead of moving to Trash |
| `--dry-run` | | Simulate without deleting anything |
| `--help` | `-h` | Show help |

---

## 🗺️ Roadmap

See [ROADMAP.md](./ROADMAP.md) for the full feature plan, including:
- Worker thread pool for scanning projects with 100k+ files
- Project type badges (React, Next.js, Vite, Angular)
- Headless CI mode (`--ci`) for GitHub Actions
- JSON export (`--json`) for data pipelines
- Scheduled daemon for automatic cleanup notifications

---

## 🤝 Contributing

Contributions are welcome. Fork it, open a PR, or file an issue.

---

## 📄 License

[MIT](./LICENSE) — Use it, fork it, ship it.

---

<p align="center">
  <strong>If Node Reaper saved you disk space, drop a ⭐ on the repo.</strong>
  <br>
  <em>It helps more developers discover it.</em>
</p>
