"use client"

import { Bookmark } from "@/types/bookmark"

interface BookmarkListProps {
  bookmarks: Bookmark[]
  onDelete: (id: string) => void
}

export default function BookmarkList({ bookmarks, onDelete }: BookmarkListProps) {
  return (
    <>
      {bookmarks.map((b) => (
        <div
          key={b.id}
          className="flex justify-between border p-2 mb-2 bg-white rounded"
        >
          <a href={b.url} target="_blank" className="text-blue-600">
            {b.title}
          </a>
          <button
            onClick={() => onDelete(b.id)}
            className="text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </>
  )
}
