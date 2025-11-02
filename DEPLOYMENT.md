# WellAhead Deployment Guide

## ? Build Status
- **Status**: Successfully built
- **Framework**: Next.js 16.0.1 with Turbopack
- **Routes**: 9 total routes (7 static, 2 dynamic)

## ?? Quick Start

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## ?? Pre-Deployment Checklist

### 1. Firebase Setup
- [ ] Create a Firebase project at [firebase.google.com](https://firebase.google.com)
- [ ] Enable Authentication > Sign-in methods > Email/Password
- [ ] Enable Authentication > Sign-in methods > Google
- [ ] Copy configuration to `.env.local`

### 2. MongoDB Setup
- [ ] Set up MongoDB Atlas account or local MongoDB
- [ ] Create database named `wellahead`
- [ ] Update `MONGODB_URI` in `.env.local`

### 3. Environment Variables
Create `.env.local` in root directory:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id

# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wellahead
```

## ?? Deploy to Vercel

### Option 1: GitHub Integration (Recommended)
1. Push code to GitHub repository
2. Visit [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables in project settings
6. Deploy!

### Option 2: Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables in Vercel
1. Go to Project Settings > Environment Variables
2. Add all variables from `.env.local`
3. Set for Production, Preview, and Development environments
4. Redeploy if needed

## ?? Production Configuration

### next.config.js
Current configuration is production-ready. Optional additions:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Image optimization
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
  
  // Custom headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
```

## ?? Testing Before Deployment

### 1. Build Test
```bash
npm run build
```
Should complete without errors ?

### 2. Production Server Test
```bash
npm run build && npm start
```
Test all pages:
- Landing page: http://localhost:3000
- Dashboard: http://localhost:3000/dashboard
- Translator: http://localhost:3000/translator
- Guides: http://localhost:3000/guides
- Progress: http://localhost:3000/progress
- Community: http://localhost:3000/community

### 3. Authentication Test
- [ ] Email sign-up works
- [ ] Email login works
- [ ] Google sign-in works
- [ ] Logout redirects to landing page
- [ ] Protected routes redirect when not authenticated

## ?? Performance Optimization

### Already Implemented
- ? Static page generation where possible
- ? Dynamic imports for components
- ? Optimized images with Next.js Image component
- ? Tailwind CSS purging in production
- ? TypeScript for type safety
- ? Code splitting with App Router

### Additional Optimizations (Optional)
- Enable Redis caching for API routes
- Add CDN for static assets
- Implement service workers for offline support
- Add analytics (Google Analytics, Vercel Analytics)

## ?? Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Firebase Auth Errors
- Verify all Firebase config variables are set
- Check Firebase Console > Authentication is enabled
- Ensure authorized domains include your deployment URL

### MongoDB Connection Errors
- Verify MongoDB URI is correct
- Check MongoDB Atlas IP whitelist (use 0.0.0.0/0 for all IPs)
- Ensure database user has read/write permissions

### Missing Environment Variables
```bash
# Verify environment variables
vercel env ls
```

## ?? Monitoring

### Vercel Analytics (Free)
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

## ?? Security Checklist
- [x] Environment variables in `.env.local` (not committed)
- [x] `.gitignore` includes `.env*.local`
- [x] Firebase security rules configured
- [x] MongoDB credentials secured
- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Rate limiting on API routes (optional)

## ?? Post-Deployment

1. **Test Live Site**
   - Sign up with test account
   - Try all features
   - Test on mobile devices

2. **Set Up Domain (Optional)**
   - Add custom domain in Vercel
   - Update Firebase authorized domains
   - Configure DNS records

3. **Monitor Performance**
   - Check Vercel Analytics
   - Monitor Firebase usage
   - Track MongoDB queries

## ?? Success!

Your WellAhead application is now live! Share the URL with users and gather feedback for improvements.

---

**Support**: For issues, check the README.md or open an issue on GitHub.
