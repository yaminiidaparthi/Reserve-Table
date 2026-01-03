#!/bin/bash

# Script to use Cursor's bundled Node.js temporarily

echo "🔧 Using Cursor's bundled Node.js..."
echo ""

# Add Cursor's node to PATH
export PATH="/Applications/Cursor.app/Contents/Resources/app/resources/helpers:$PATH"

# Check if node is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found even in Cursor directory"
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node --version)
echo "✅ Found Node.js: $NODE_VERSION"
echo ""

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "⚠️  npm is not available"
    echo ""
    echo "📥 You need to install Node.js properly to get npm:"
    echo ""
    echo "   1. Visit: https://nodejs.org/"
    echo "   2. Download the LTS version"
    echo "   3. Install it (this includes npm)"
    echo "   4. Close and reopen terminal"
    echo "   5. Then run: ./check-and-run.sh"
    echo ""
    echo "   Or run: ./open-installer.sh"
    echo ""
    exit 1
fi

NPM_VERSION=$(npm --version)
echo "✅ Found npm: $NPM_VERSION"
echo ""

# Navigate to app directory
cd "$(dirname "$0")"

echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🔧 Generating Prisma Client..."
npm run db:generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo ""
echo "💾 Setting up database..."
npm run db:push

if [ $? -ne 0 ]; then
    echo "❌ Failed to setup database"
    exit 1
fi

echo ""
echo "🌱 Seeding sample data..."
npm run db:seed 2>/dev/null || echo "⚠️  Seed script not available (this is okay)"

echo ""
echo "🎉 Starting development server..."
echo "📍 App will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev

