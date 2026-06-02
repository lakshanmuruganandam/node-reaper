# 💀 Node Reaper 

> Lightning-fast CLI tool to hunt down and obliterate forgotten `node_modules` folders. Free up Gigabytes of space in seconds.

![Node Reaper Banner](https://via.placeholder.com/800x200/000000/FFFFFF?text=NODE+REAPER)

## 🚀 Quick Start

You don't even need to install it. Run it instantly via `npx` in your main Projects directory:

```bash
npx node-reaper-cli
```

*(Note: Ensure you are in the directory you want to clean up before running!)*

## 🛠️ How it works
Node Reaper recursively scans the directory you run it in, identifies all `node_modules` folders hidden deep in your old projects, and aggressively deletes them. Perfect for cleaning up your SSD when you run out of space.

- **Zero Dependencies:** Written in pure Node.js.
- **Fast:** Skips hidden directories to optimize scan speed.
- **Aesthetic:** Gives you a beautiful terminal readout of exactly what is being deleted.

## ⚠️ Warning
This will permanently delete `node_modules` folders. You will need to run `npm install` again in those specific project folders if you wish to run them in the future.

---
*Published as part of the 7-Day Open Source Blitzkrieg.*
