# Versailles Deployment Guide for AshterDesigns SPA

## Overview
This guide explains how to deploy the AshterDesigns Single Page Application (SPA) on Versailles hosting platform.

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Versailles hosting account

## Configuration Changes Made

### 1. Next.js Configuration (`next.config.ts`)
- Added `output: 'export'` for static site generation
- Added `trailingSlash: true` for better URL handling
- Set `images.unoptimized: true` for static export compatibility

### 2. Package.json Scripts
- Added `build:static` script for static export
- Maintained existing development scripts

### 3. Client-Side Actions (`actions-client.ts`)
- Created client-side alternatives for server actions
- Replaced AI-powered design inspiration with static data
- Updated email functionality to use external services (Formspree)

## Deployment Steps

### 1. Build the Project
```bash
# Install dependencies
npm install

# Build for static export
npm run build
```

### 2. Prepare for Deployment
The build process creates an `out` directory containing all static files needed for deployment.

### 3. Deploy to Versailles
1. Log into your Versailles hosting dashboard
2. Create a new site/project
3. Upload the contents of the `out` directory
4. Configure your domain settings
5. Set up any required environment variables

## Important Notes

### Server-Side Features Removed
- AI-powered design inspiration (replaced with static data)
- Server-side email sending (replaced with Formspree integration)
- Server actions (converted to client-side functions)

### Email Integration
To enable contact form functionality:
1. Sign up for [Formspree](https://formspree.io/) or similar service
2. Replace `YOUR_FORM_ID` in `actions-client.ts` with your actual form ID
3. Test the contact form functionality

### Image Assets
- Ensure all referenced images exist in the `public/images/` directory
- Update image paths in `actions-client.ts` if needed

## Customization

### Adding More Design Inspirations
Edit the `designInspirationData` object in `actions-client.ts` to add more room types and design preferences.

### Styling Changes
- Modify `src/app/globals.css` for global styles
- Update component styles in the `src/components/` directory
- Tailwind CSS classes can be modified in `tailwind.config.ts`

## Troubleshooting

### Build Errors
- Ensure all dependencies are installed: `npm install`
- Check for TypeScript errors: `npm run typecheck`
- Verify all imports are correct

### Deployment Issues
- Ensure the `out` directory contains all necessary files
- Check that all image paths are correct
- Verify domain configuration in Versailles dashboard

## Support
For issues specific to Versailles deployment, refer to the Versailles documentation or contact their support team.

## File Structure After Build
```
out/
├── _next/
├── images/
├── index.html
└── [other static assets]
```

All files in the `out` directory should be uploaded to your Versailles hosting platform. 