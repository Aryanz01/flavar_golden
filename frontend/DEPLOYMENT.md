# Deployment Guide

This guide provides instructions for deploying the application to production using Vercel, which is the recommended hosting platform for Next.js applications.

## Prerequisites

1. A [Vercel account](https://vercel.com/signup)
2. [Git](https://git-scm.com/downloads) installed on your computer
3. The application code in a GitHub, GitLab, or Bitbucket repository

## Deployment Steps

### Option 1: Deploy with Vercel CLI (Recommended)

1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Navigate to your project's root directory and deploy:
   ```bash
   cd frontend
   vercel
   ```

4. Follow the interactive prompts. When asked about environment variables, add:
   - `NEXT_PUBLIC_API_URL`: Set this to your backend API URL

5. For subsequent deployments, use:
   ```bash
   vercel --prod
   ```

### Option 2: Deploy with Vercel Dashboard

1. Push your code to a GitHub, GitLab, or Bitbucket repository.

2. Go to [Vercel Dashboard](https://vercel.com/dashboard) and click "New Project".

3. Import your repository from GitHub, GitLab, or Bitbucket.

4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./frontend
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: Set this to your backend API URL

6. Click "Deploy".

## Post-Deployment Configuration

### Custom Domain

1. In your Vercel project dashboard, go to "Settings" > "Domains".
2. Add your domain and follow the instructions to set up DNS.

### Environment Variables

If you need to modify environment variables after deployment:

1. Go to your project in the Vercel dashboard.
2. Navigate to "Settings" > "Environment Variables".
3. Add or edit variables as needed.
4. Redeploy your application for changes to take effect.

## Setting Up Backend

Your application routes users to `/menu/3` by default, which means:

1. If your frontend and backend are on the same domain, ensure your backend API is properly configured to handle requests.

2. If your backend is hosted separately:
   - Update the `NEXT_PUBLIC_API_URL` environment variable in Vercel to point to your backend URL.
   - Configure CORS on your backend to accept requests from your frontend domain.

## Troubleshooting

1. **Build Failures**: Check the build logs for errors. Common issues include:
   - Missing dependencies
   - Build script errors
   - Environment variable issues

2. **API Connection Issues**:
   - Verify your `NEXT_PUBLIC_API_URL` is correct
   - Check that your backend is properly configured for CORS
   - Ensure your backend is running and accessible

3. **404 Errors**:
   - Verify your routing configuration
   - Check if `/menu/3` endpoint exists and works correctly locally

## Performance Monitoring

Once deployed, monitor your application's performance:

1. Use Vercel Analytics to track performance metrics
2. Set up error monitoring with a service like Sentry 