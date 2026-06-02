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

**Architected by [@lakshanmuruganandam](https://github.com/lakshanmuruganandam)**

---

## ⚡ Quick Start

You don't need to install anything. Run it instantly with `npx`:

```bash
npx node-reaper-cli
```

Or install it globally for instant access anywhere:

```bash
npm install -g node-reaper-cli
node-reaper
```

Navigate to your main projects directory and let the Reaper hunt.

---

## 🔥 Why Node Reaper?

Every developer has **gigabytes** of forgotten `node_modules` rotting across old projects. Existing tools are slow, single-threaded, and dumb.

Node Reaper is different:

| Feature | Node Reaper | Others |
|---|---|---|
| Multi-threaded size calculation | ✅ `Promise.all` parallel | ❌ Sequential |
| Git-aware staleness detection | ✅ Checks last commit date | ❌ OS timestamps only |
| Time Machine filter (`--older-than`) | ✅ | ❌ |
| Deep scan (`.next`, `dist`, `.cache`) | ✅ | ❌ `node_modules` only |
| Color-coded heatmap visualization | ✅ Red/Yellow/Cyan | ❌ Plain text |
| Trash-by-default (safe deletion) | ✅ | ❌ Permanent delete |
| Interactive multi-select TUI | ✅ | ❌ |

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

### Combine them for surgical precision
```bash
npx node-reaper-cli --deep-scan --older-than 30
```

### Nuclear Mode — Permanently delete (bypass Trash)
```bash
npx node-reaper-cli --nuke
```

### Dry Run — Simulate without deleting anything
```bash
npx node-reaper-cli --dry-run
```

---

## 🎨 The Interface

When you run Node Reaper, you get:

1. **A cyberpunk ASCII banner** — because first impressions matter.
2. **A color-coded heatmap** — Red (massive), Yellow (medium), Cyan (small) — so you instantly see what's eating your disk.
3. **Git-aware age display** — Shows how many days since the last commit, not just the OS file timestamp.
4. **Interactive multi-select** — Use arrow keys to navigate, `Space` to select targets, `Enter` to execute.
5. **Safe deletion** — Files go to your System Trash by default. Use `--nuke` only when you're sure.

---

## 📦 How It Works

1. **Fast-Glob Engine** scans your filesystem at blazing speed to locate all target folders.
2. **Parallel Size Calculator** uses `Promise.all` to calculate folder sizes across multiple processes simultaneously.
3. **Git-Aware Staleness Detector** checks the `.git` directory for the last actual code commit timestamp — immune to iCloud/antivirus false positives.
4. **Heatmap Renderer** color-codes results by relative size so the biggest offenders scream at you.
5. **Safe Executor** moves folders to System Trash (or permanently deletes with `--nuke`).

---

## 🗺️ Roadmap

See [ROADMAP.md](./ROADMAP.md) for the full feature plan, including:
- Worker thread pooling for 100k+ file projects
- Project type detection (React, Next.js, Vite, etc.)
- Scheduled automatic cleanup via cron
- Protected project allowlisting

---

## 📄 License

MIT — Use it, fork it, make it yours.

---

**If this tool saved you disk space, drop a ⭐ on the repo. It helps more than you think.**
