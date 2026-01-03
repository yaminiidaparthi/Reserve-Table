#!/bin/bash

# This script will set up and run the app
# Run this AFTER restarting your terminal

echo "🚀 Starting Table Assignment App Setup..."
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed or not in PATH"
    echo "   Please install Node.js from https://nodejs.org/"
    echo "   Then restart your terminal and run this script again"
    exit 1
fi

# Check for npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not found"
    echo "   Node.js installation may be incomplete"
    echo "   Please reinstall Node.js from https://nodejs.org/"
    echo "   Make sure to restart your terminal after installation"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to app directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies (this may take a minute)..."
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
npm run db:seed 2>/dev/null || echo "⚠️  Seed data already exists or seed script unavailable (this is okay)"

echo ""
echo "═══════════════════════════════════════════════════════"
echo "🎉 Setup Complete!"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "🚀 Starting development server..."
echo ""
echo "📍 Your app will be available at:"
echo "   👉 http://localhost:3000"
echo ""
echo "📝 Sample data included:"
echo "   - 5 Employees (EMP001-EMP005)"
echo "   - 5 Tables (1-5)"
echo ""
echo "Press Ctrl+C to stop the server"
echo "═══════════════════════════════════════════════════════"
echo ""

npm run dev

