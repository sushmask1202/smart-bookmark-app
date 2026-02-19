SMART BOOKMARK MANAGER APP

The smart bookmark app is a web application that allows users to save, organize, and manage website links securely in one place, as instead of saving bookmarks in a browser, this app helps to stores bookmarks
in the cloud so users can access them anytime.It is a Cloud-based bookmark saving system with secure Google login.The full stack Bookmark Management application which was built using Next.js (App Router) and
Supabase.This project demonstrates secure OAuth authentication, session management in production, and full-stack deployment using Vercel.

Tech Stack
Frontend - Next.js (App Router), React, Tailwind CSS
Backend / Database - Supabase, PostgreSQL, Supabase
Deployment- Vercel

Features
Google OAuth Authentication (Supabase)
Login & Sign Up with the Google
Adding bookmarks
View saved bookmarks
Delete bookmarks
Real-time database updates
Responsive UI using Tailwind CSS
Production deployment on the Vercel

Live Application : https://smart-bookmark-app-five-pearl.vercel.app
Runs on:http://localhost:3000

Installation (Local Setup) : 
git clone https://github.com/your-username/smart-bookmark-app.git
cd smart-bookmark-app
npm install
npm run dev

Environment Variables
Create .env.local:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key


Production Bug Faced and How It Was Resolved
Issue: Double Login Required in Production
> Problem Observed -In localhost the Login worked perfectly but in Vercel the first login redirected back to login page and second login redirected correctly to the next page.
  Root Cause was caused by session restoration timing in production.In Vercel the app loads faster and the login page renders before Supabase finishes restoring the user session.
  Session was not available during initial render.
> Result -  Early redirect logic failed and the debugging approach verified Supabase redirect URLs.Compared localhostand the production behavior.Identified session timing issue.
> Solution Implemented - Added supabase.auth.getSession() check on page load and implemented onAuthStateChange()listener.Used router.replace() instead of router.push().
  Prevented premature rendering before the session validation.
> Result - Authentication now works correctly in production, no double-login required and smooth redirect flow

Key Technical Takeaways : 
Handling the OAuth in production environments
Debugging environment specific issues
Managing async session restoration
Proper redirect handling using Next.js App Router
Production debugging mindset

Author
Sushma Kurandwad
