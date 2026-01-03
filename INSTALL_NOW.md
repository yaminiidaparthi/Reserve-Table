# 🚀 Quick Start Guide - Install Node.js Now

## ⚡ Fast Track (5 minutes)

### Step 1: Download Node.js
The download page should be open in your browser. If not, visit: **https://nodejs.org/**

1. **Click the big green "LTS" button** (recommended version)
2. Wait for the download to complete (file: `node-vXX.X.X.pkg`)

### Step 2: Install Node.js
1. **Open the downloaded `.pkg` file** from your Downloads folder
2. Click **"Continue"** through the installation wizard
3. **Enter your password** when prompted
4. Wait for installation to complete (takes ~1 minute)
5. Click **"Close"** when done

### Step 3: Restart Terminal
**IMPORTANT:** Close this terminal window and open a new one, OR run:
```bash
source ~/.zshrc
```

### Step 4: Verify Installation
Run these commands to check:
```bash
node --version
npm --version
```
You should see version numbers (like `v20.x.x` and `10.x.x`)

### Step 5: Start the App! 🎉
```bash
cd /Users/nxtwave/Downloads/table-assignment-app
./check-and-run.sh
```

The app will automatically:
- ✅ Install all dependencies
- ✅ Set up the database
- ✅ Add sample data
- ✅ Start the server

Then open: **http://localhost:3000** in your browser!

---

## 🆘 Having Issues?

### "command not found: node"
- Make sure you installed Node.js
- **Close and reopen your terminal** (very important!)
- Try: `source ~/.zshrc`

### Installation stuck?
- Make sure you entered your password correctly
- Try restarting your Mac
- Download again from nodejs.org

### Still not working?
Run this to check:
```bash
which node
which npm
```

If both show paths, you're good! If not, reinstall Node.js.

---

## ✅ Success Checklist

- [ ] Downloaded Node.js installer
- [ ] Installed Node.js (.pkg file)
- [ ] Closed and reopened terminal
- [ ] Verified: `node --version` works
- [ ] Verified: `npm --version` works
- [ ] Ran: `./check-and-run.sh`
- [ ] App opened at http://localhost:3000

---

**Once Node.js is installed, come back and run:**
```bash
cd /Users/nxtwave/Downloads/table-assignment-app
./check-and-run.sh
```

That's it! 🎉

