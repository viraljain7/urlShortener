import { LinkIcon } from 'lucide-react'
import React from 'react'

function ShortenerForm() {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 max-w-3xl mx-auto p-8 mb-12">
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Paste your long URL (https://example.com/very-long-url)"
        className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
      <div className="flex gap-2">
        <span className="px-4 py-3 rounded-md border border-gray-300 bg-gray-100 text-gray-500 text-sm">
          shorturl.com/
        </span>
        <input
          type="text"
          placeholder="custom-name (optional)"
          className="flex-1 rounded-md border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>
      <button className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-3 text-white font-medium hover:bg-indigo-700 transition cursor-pointer">
        <LinkIcon className="mr-2 h-4 w-4" /> Shorten URL
      </button>
    </div>
  </div>

  )
}

export default ShortenerForm
