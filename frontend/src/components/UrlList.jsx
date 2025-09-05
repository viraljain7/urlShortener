"use client";

import React, { useState } from "react";
import {
  Edit3,
  Trash2,
  Eye,
  QrCode,
  PlusCircle,
  Copy,
} from "lucide-react";

export default function UrlShortener() {
  const [urls] = useState([
    {
      short: "shorturl.com/travel-blog",
      long: "https://example.com/travel-blogs/2023/my-adventure-trip-to-mountains-and-valleys-experiences",
      status: "Active",
      views: 245,
    },
    {
      short: "shorturl.com/resume",
      long: "https://mydocuments.cloud/user/john-doe/resume-2023-updated-version.pdf",
      status: "Active",
      views: 132,
    },
    {
      short: "shorturl.com/webinar-signup",
      long: "https://events.company.org/webinars/2023/advanced-techniques-registration-form",
      status: "Expiring soon",
      views: 89,
    },
  ]);

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {urls.map((url, i) => (
        <div
          key={i}
          className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition"
        >
          {/* URL Details */}
          <div className="flex-1 font-medium text-gray-900">
            <a
              href={`https://${url.short}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-medium hover:underline"
            >
              {url.short}
            </a>

            <p className="text-sm text-gray-500 truncate mt-1">{url.long.length > 40 ? `${url.long.substring(0, 40)}...` : url.long}</p>

        
          </div>

        {/* Actions */}
<div className="flex items-center gap-2 mt-4 sm:mt-0 bg-gray-50 rounded-xl px-2 py-1 shadow-inner">
  <span
    className="cursor-pointer flex items-center gap-1 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition"
    aria-label={`Views: ${url.views}`}
  >
    <Eye className="h-4 w-4" aria-hidden="true" /> {url.views}
  </span>

  <button
    className="cursor-pointer p-2 rounded-full hover:bg-indigo-100 transition"
    aria-label="Copy short link"
    onClick={() => navigator.clipboard.writeText(url.short)}
  >
    <Copy className="h-4 w-4 text-indigo-600" aria-hidden="true" />
  </button>

  <button
    className="cursor-pointer p-2 rounded-full hover:bg-purple-100 transition"
    aria-label="Generate QR code"
  >
    <QrCode className="h-4 w-4 text-purple-600" aria-hidden="true" />
  </button>

  <button
    className="cursor-pointer p-2 rounded-full hover:bg-amber-100 transition"
    aria-label="Edit link"
  >
    <Edit3 className="h-4 w-4 text-amber-600" aria-hidden="true" />
  </button>

  <button
    className="cursor-pointer p-2 rounded-full hover:bg-red-100 transition"
    aria-label="Delete link"
  >
    <Trash2 className="h-4 w-4 text-red-600" aria-hidden="true" />
  </button>
</div>

        </div>
      ))}

      {/* Load More */}
      <button
        className="cursor-pointer w-full mt-6 inline-flex items-center justify-center rounded-md border border-gray-300 px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 transition"
        aria-label="Load more shortened URLs"
      >
        <PlusCircle className="mr-2 h-4 w-4" aria-hidden="true" /> Load More URLs
      </button>
    </div>
  );
}
