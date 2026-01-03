# Setup and Run Instructions

## Step 1: Install Node.js

You need Node.js (version 18 or higher) to run this app.

### Option A: Install via Homebrew (Recommended for macOS)

```bash
# Install Homebrew if you don't have it
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js
brew install node
```

### Option B: Download from Official Website

1. Visit https://nodejs.org/
2. Download the LTS version for macOS
3. Run the installer
4. Restart your terminal

### Option C: Install via nvm (Node Version Manager)

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run:
source ~/.zshrc

# Install Node.js
nvm install --lts
nvm use --lts
```

## Step 2: Verify Installation

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version
npm --version
```

## Step 3: Run the App

Once Node.js is installed, run these commands:

```bash
# Navigate to the app directory
cd /Users/nxtwave/Downloads/table-assignment-app

# Install dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Create database and tables
npm run db:push

# (Optional) Seed sample data
npm run db:seed

# Start the development server
npm run dev
```

The app will be available at: **http://localhost:3000**

## Quick Run Script

After installing Node.js, you can use this one-liner:

```bash
cd /Users/nxtwave/Downloads/table-assignment-app && npm install && npm run db:generate && npm run db:push && npm run db:seed && npm run dev
```

## Troubleshooting

### "command not found: npm"
- Make sure Node.js is installed
- Restart your terminal after installation
- Check PATH: `echo $PATH`

### Port 3000 already in use
```bash
# Use a different port
PORT=3001 npm run dev
```

### Database errors
```bash
# Reset database
rm prisma/dev.db
npm run db:push
npm run db:seed
```

## What to Expect

After running `npm run dev`, you should see:

```
▲ Next.js 14.0.4
- Local:        http://localhost:3000
- Ready in X seconds
```

Open http://localhost:3000 in your browser to see the app!

