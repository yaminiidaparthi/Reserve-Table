#!/bin/bash

echo "🔍 Checking for Node.js installation..."
echo ""

# Check for node in PATH
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    NPM_VERSION=$(npm --version)
    echo "✅ Node.js is installed!"
    echo "   Node.js version: $NODE_VERSION"
    echo "   npm version: $NPM_VERSION"
    echo ""
    
    # Check if version is 18 or higher
    MAJOR_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$MAJOR_VERSION" -ge 18 ]; then
        echo "✅ Node.js version is compatible (18+)"
        echo ""
        echo "🚀 Starting app setup..."
        echo ""
        
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
        
        # Seed database
        echo ""
        echo "🌱 Seeding sample data..."
        npm run db:seed 2>/dev/null || echo "⚠️  Seed script not available (this is okay)"
        
        # Start development server
        echo ""
        echo "🎉 Starting development server..."
        echo "📍 App will be available at: http://localhost:3000"
        echo ""
        echo "Press Ctrl+C to stop the server"
        echo ""
        
        npm run dev
    else
        echo "⚠️  Node.js version is too old (need 18+)"
        echo "   Please update Node.js from https://nodejs.org/"
        exit 1
    fi
else
    echo "❌ Node.js is not installed or not in PATH"
    echo ""
    echo "📥 Please install Node.js:"
    echo ""
    echo "   1. Visit: https://nodejs.org/"
    echo "   2. Download the LTS version (big green button)"
    echo "   3. Run the installer (.pkg file)"
    echo "   4. Close and reopen your terminal"
    echo "   5. Run this script again: ./check-and-run.sh"
    echo ""
    echo "   Or run: ./open-installer.sh to open the download page"
    exit 1
fi

