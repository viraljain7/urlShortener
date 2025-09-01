import React, { useState } from "react";
import { createShortUrl } from "../api/urlShortener";
import { toast } from "react-toastify";

function LongUrlInputBox() {
  const [longUrl, setLongUrl] = useState("");

  const createUrl = async () => {
    if (!longUrl) {
      toast.error("Please enter a URL.");
      return;
    }

    try {
      const res = await createShortUrl(longUrl);
      if (res.status === "true") {
        toast.success(res.message);
        // Add the new short URL to the list

        // setShortUrls((prevUrls) => [
        //   ...prevUrls,
        //   { shortUrl: res.shortUrl, longUrl: longUrl },
        // ]);

        setLongUrl(""); // Clear the input field
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred while shortening the URL.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="text"
        placeholder="Enter your URL here"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className="input input-bordered w-full mb-4"
      />
      <button className="btn btn-primary w-full mb-4" onClick={createUrl}>
        Shorten URL
      </button>
      {/* <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Shortened URLs</h2>
        <ul className="space-y-2">
          {shortUrls.map((url, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white p-4 rounded shadow"
            >
              <span>{url.shortUrl}</span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  navigator.clipboard.writeText(url.shortUrl);
                  toast.success("URL copied to clipboard!");
                }}
              >
                Copy
              </button>
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default LongUrlInputBox;