# Sirat Al-Mustaqim - Online Quran Learning Platform

A modern, responsive web application for online Quran education built with React, TypeScript, and Supabase.

## 🌟 Features

- **Authentication**: Secure user registration and login with Supabase Auth
- **Interactive Quiz System**: 25-question quizzes across multiple Islamic topics
- **Course Management**: Comprehensive course listings with detailed information
- **Contact Forms**: Multiple contact forms with backend integration
- **Admin Dashboard**: Real-time notifications and form submission management
- **Payment Integration**: Multiple payment methods including local Pakistani options
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **SEO Optimized**: Meta tags, structured data, and sitemap

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sirat-al-mustaqim
   ```

2. **Install dependencies**
   ```bash
   npm ci
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm run preview
   ```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_URL=https://your_project_id.supabase.co
RESEND_API_KEY=your_resend_api_key
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Route components
├── hooks/              # Custom React hooks
├── contexts/           # React context providers
├── integrations/       # External service integrations
├── lib/                # Utility functions
└── types/              # TypeScript type definitions

supabase/
├── functions/          # Edge functions
├── migrations/         # Database migrations
└── config.toml         # Supabase configuration
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run type checking
npm run lint
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm i -g vercel
   vercel --prod
   ```

2. **Set environment variables in Vercel dashboard**
   - Add all variables from `.env.example`
   - Configure custom domain if needed

### Manual Build

```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

## 📊 Analytics & Monitoring

- **Performance**: Lighthouse CI integration
- **Error Tracking**: Sentry integration (when configured)
- **Analytics**: Google Analytics (when configured)

## 🔒 Security Features

- **Authentication**: Supabase Auth with RLS policies
- **Form Validation**: Zod schema validation
- **CORS Protection**: Configured for production
- **Environment Security**: Secrets management via Supabase

## 🌐 SEO Features

- **Meta Tags**: Dynamic title and description for each page
- **Open Graph**: Social media preview optimization
- **Structured Data**: JSON-LD for courses and organization
- **Sitemap**: Auto-generated sitemap.xml
- **Robots.txt**: Search engine crawling instructions

## 📱 Features by Page

### Homepage (`/`)
- Hero video background
- Course preview
- Interactive quiz section
- Statistics carousel
- Contact forms

### Quiz System (`/quiz`)
- Multiple choice questions
- Timer functionality
- Score calculation
- Certificate generation
- Progress tracking

### Admin Dashboard (`/admin`)
- Form submission notifications
- User management
- Analytics overview

## 🛠 Development

### Adding New Features

1. **Create Component**
   ```bash
   # Create in src/components/
   touch src/components/NewComponent.tsx
   ```

2. **Database Changes**
   - Use Supabase migration tool in Lovable
   - Update types automatically generated

3. **Styling**
   - Use Tailwind CSS classes
   - Follow design system in `src/index.css`

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured for React and TypeScript
- **Prettier**: Code formatting (when configured)

## 🔧 Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm ci
   ```

2. **Supabase Connection**
   - Verify environment variables
   - Check Supabase project status
   - Ensure RLS policies are correct

3. **Authentication Issues**
   - Check Supabase auth settings
   - Verify redirect URLs in Supabase dashboard
   - Ensure email confirmation is configured

### Performance

- **Image Optimization**: Use WebP format when possible
- **Code Splitting**: Dynamic imports for large components
- **Caching**: Browser caching configured in `vercel.json`

## 📞 Support

For technical support or questions:
- Email: alsiratalmustaqim0@gmail.com
- Create an issue in the repository

## 📄 License

This project is proprietary software. All rights reserved.

---

Built with ❤️ for the Muslim community worldwide.
