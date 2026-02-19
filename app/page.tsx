"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"

export default function Home() {
  const router = useRouter()

  // 🔹 Check session on load
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()

      if (session) {
        router.replace("/dashboard")
      }
    }

    checkSession()

    // 🔹 Listen for login event
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session) {
          router.replace("/dashboard")
        }
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [router])


  // Login button
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    })
  }

  // Sign Up button
  const signUp = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    })
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
