"use client"

import { supabase } from "@/lib/supabaseClient"

export default function Home() {

  // Login button - existing users
  const login = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`, // existing users will be logged in
      },
    });

    if (error) console.log("Login error:", error.message);
  }

  // Sign Up button - new users
  const signUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`, // new users will create account
      },
    });

    if (error) console.log("Signup error:", error.message);
  }

  return (
    <div className="relative min-h-screen bg-[url('/background.jpg')] bg-cover bg-center">
      <div className="relative flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          Smart Bookmark Manager
        </h1>

        <button
          onClick={login}
          className="px-8 py-4 text-lg bg-amber-500 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300 mb-4"
        >
          Login with Google
        </button>

        <button
          onClick={signUp}
          className="px-8 py-4 text-lg bg-orange-300 text-white rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  )
}
