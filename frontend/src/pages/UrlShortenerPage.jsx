import React from "react";
import LongUrlInputBox from "../components/LongUrlInputBox";
import ShortUrlList from "../components/ShortUrlList";

function UrlShortenerPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">URL Shortener</h1>
      <LongUrlInputBox />
      <ShortUrlList />
    </div>
  );
}

export default UrlShortenerPage;
