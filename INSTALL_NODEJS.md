# Install Node.js - Step by Step Guide

## Method 1: Official Installer (Easiest - Recommended)

1. **Download Node.js:**
   - Open your web browser
   - Go to: https://nodejs.org/
   - Click the big green "LTS" button (recommended version)
   - This will download a `.pkg` file

2. **Install Node.js:**
   - Open the downloaded `.pkg` file
   - Follow the installation wizard
   - Click "Continue" through all steps
   - Enter your password when prompted
   - Wait for installation to complete

3. **Verify Installation:**
   - Open a new Terminal window
   - Run: `node --version`
   - Run: `npm --version`
   - You should see version numbers

4. **Run the App:**
   ```bash
   cd /Users/nxtwave/Downloads/table-assignment-app
   ./run.sh
   ```

---

## Method 2: Homebrew (For Advanced Users)

If you prefer using command line:

1. **Install Homebrew:**
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
   - Enter your password when prompted
   - Follow the on-screen instructions

2. **Install Node.js:**
   ```bash
   brew install node
   ```

3. **Verify:**
   ```bash
   node --version
   npm --version
   ```

---

## Method 3: Using nvm (Node Version Manager)

1. **Install nvm:**
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   ```

2. **Reload your shell:**
   ```bash
   source ~/.zshrc
   ```

3. **Install Node.js:**
   ```bash
   nvm install --lts
   nvm use --lts
   ```

4. **Verify:**
   ```bash
   node --version
   ```

---

## After Installing Node.js

Once Node.js is installed, run these commands to start the app:

```bash
cd /Users/nxtwave/Downloads/table-assignment-app
./run.sh
```

Or manually:

```bash
cd /Users/nxtwave/Downloads/table-assignment-app
npm install
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

The app will be available at: **http://localhost:3000**

---

## Troubleshooting

### "command not found: node"
- Make sure you installed Node.js
- Close and reopen your Terminal
- Try: `source ~/.zshrc` or `source ~/.bash_profile`

### "Permission denied"
- Make sure you have administrator access
- Try: `sudo npm install -g npm`

### Still having issues?
- Visit: https://nodejs.org/en/download/
- Download the macOS installer
- Run the installer and follow the prompts

