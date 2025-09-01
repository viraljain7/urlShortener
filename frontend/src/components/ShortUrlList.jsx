import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ShortUrlList() {
  const [shortUrls, setShortUrls] = useState([]);

  // function to generate random string for short URLs
  const generateRandomShortUrl = () => {
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let str = "";
    for (let i = 0; i < 6; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `https://sho.rt/${str}`;
  };

  useEffect(() => {
    // Generate 5 random short URLs on mount
    const randomUrls = Array.from({ length: 5 }, () => ({
      shortUrl: generateRandomShortUrl(),
    }));
    setShortUrls(randomUrls);
  }, []);
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("URL copied to clipboard!");
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-2">Shortened URLs</h2>
      {shortUrls &&
        shortUrls.length > 0 &&
        shortUrls.map((url, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white p-4 rounded shadow"
          >
            <span>{url.shortUrl}</span>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => copyToClipboard(url.shortUrl)}
            >
              Copy
            </button>
          </li>
        ))}
    </div>
  );
}

export default ShortUrlList;
