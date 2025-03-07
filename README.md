# FreelanceHub

A modern freelancing platform built with React, TypeScript, and Supabase, designed to connect talented freelancers with clients seeking professional services.

## 🚀 Features

- **User Authentication**: Secure email and password authentication system
- **Dual Role System**: Support for both freelancers and clients
- **Dark Mode**: Elegant dark mode support with smooth transitions
- **Responsive Design**: Mobile-first approach ensuring great experience across all devices
- **Job Management**: Post, browse, and manage job listings
- **Profile System**: Comprehensive profile management for users

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Backend & Auth**: Supabase
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/       # React contexts (Auth)
├── hooks/          # Custom React hooks
├── lib/           # Library configurations
├── pages/         # Application pages/routes
└── main.tsx       # Application entry point
```

## 🚦 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Lint code with ESLint

## 🔒 Authentication

The platform supports two types of users:
- **Clients**: Can post jobs and hire freelancers
- **Freelancers**: Can browse and apply for jobs

## 🎨 Styling

- Fully customizable theme using Tailwind CSS
- Dark mode support
- Responsive design patterns
- Consistent UI components

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
