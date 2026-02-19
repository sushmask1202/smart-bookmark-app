"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function BookmarkForm({ onAdded }: { onAdded: () => void }) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  const addBookmark = async () => {
    const { data } = await supabase.auth.getUser()
    if (!data.user) return

    await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: data.user.id,
    })

    setTitle("")
    setUrl("")
    onAdded()
  }

  return (
    <div className="flex gap-2 mb-6">
      <input
        className="border p-2 flex-1"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border p-2 flex-1"
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={addBookmark}
        className="bg-blue-600 text-white px-4 rounded"
      >
        Add
      </button>
    </div>
  )
}
