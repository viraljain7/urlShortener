import React from "react";
import { Outlet } from "@tanstack/react-router";

const UrlShortener = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      data-theme="lofi"
    >
      {/* <UrlShortenerPage /> */}
      <Outlet/>
    </div>
  );
};

export default UrlShortener;
