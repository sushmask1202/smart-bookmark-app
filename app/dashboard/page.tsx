"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Bookmark } from "@/types/bookmark"
import BookmarkForm from "@/components/BookmarkForm"
import BookmarkList from "@/components/BookmarkList"

export default function Dashboard() {   // renamed from BookmarkList
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false })

    setBookmarks(data || [])
  }

  useEffect(() => {
    fetchBookmarks()

    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        fetchBookmarks
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Delete a bookmark
  const deleteBookmark = async (id: string) => {
    const { error } = await supabase.from("bookmarks").delete().eq("id", id)

    if (!error) {
      setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id))
    } else {
      console.log("Delete error:", error.message)
    }
  }

  return (
    <div className="min-h-screen p-9">
      <h1 className="text-3xl mb-4 font-semibold">My Bookmarks</h1>
      <BookmarkForm onAdded={fetchBookmarks} />
      <BookmarkList bookmarks={bookmarks} onDelete={deleteBookmark} />
    </div>
  )
}
