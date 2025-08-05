#!/bin/bash

# Versailles Deployment Script for AshterDesigns SPA

echo "🚀 Starting Versailles deployment for AshterDesigns SPA..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the project for static export
echo "🔨 Building project for static export..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "📁 Static files are ready in the 'out' directory"
    echo ""
    echo "🎯 Next steps for Versailles deployment:"
    echo "1. Upload the contents of the 'out' directory to your Versailles hosting"
    echo "2. Configure your domain settings in Versailles dashboard"
    echo "3. Set up any environment variables if needed"
    echo ""
    echo "📋 Files ready for deployment:"
    ls -la out/
else
    echo "❌ Build failed! Please check the error messages above."
    exit 1
fi 