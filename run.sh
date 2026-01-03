#!/bin/bash

# Setup and Run Script for Table Assignment App

echo "🚀 Setting up Table Assignment App..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo ""
    echo "Please install Node.js first:"
    echo "  - Visit https://nodejs.org/ and download the LTS version"
    echo "  - Or use Homebrew: brew install node"
    echo ""
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to app directory
cd "$(dirname "$0")"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Generate Prisma Client
echo ""
echo "🔧 Generating Prisma Client..."
npm run db:generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

# Create database
echo ""
echo "💾 Setting up database..."
npm run db:push

if [ $? -ne 0 ]; then
    echo "❌ Failed to setup database"
    exit 1
fi

# Seed database (optional, won't fail if it errors)
echo ""
echo "🌱 Seeding sample data..."
npm run db:seed 2>/dev/null || echo "⚠️  Seed script not available or already seeded (this is okay)"

# Start development server
echo ""
echo "🎉 Starting development server..."
echo "📍 App will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev

