# Flavar Golden Theme Restaurant Menu

A modern restaurant menu application with a luxury gold theme. The app showcases menu items with beautiful images and interactive features.

## Getting Started Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Deployment Instructions

Follow these steps to deploy your application and make it live online:

### Quick Deployment with Vercel

1. **Create a GitHub Repository**
   - Push your code to a GitHub repository

2. **Deploy with Vercel**
   - Go to [Vercel](https://vercel.com) and sign up or log in
   - Click "New Project"
   - Import your GitHub repository
   - Set the "Root Directory" to `frontend`
   - Click "Deploy"

3. **Configure Environment Variables (if needed)**
   - Once deployed, go to Project Settings > Environment Variables
   - Add any required environment variables

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy Your Project**
   ```bash
   vercel
   ```

4. **Production Deployment**
   ```bash
   vercel --prod
   ```

## Features

- **Default Route to Restaurant Menu**: Automatically redirects to restaurant with ID 3
- **Responsive Design**: Optimized for mobile and desktop devices
- **Gold Gradient Theme**: Luxury appearance with gold gradient accents
- **Menu Filtering**: Filter by veg/non-veg and search for dishes
- **Cart Functionality**: Add items to cart with quantity control
- **AR Viewing**: View 3D models of selected food items (when available)

## Backend Configuration

If you're using a custom backend:

1. Update the API URL in the environment variables
2. Ensure your backend has proper CORS configuration to accept requests from your deployed frontend

See the complete [Deployment Guide](./DEPLOYMENT.md) for detailed instructions. 