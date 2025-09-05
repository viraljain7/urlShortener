import React from "react";
import UrlShortenerPage from "./pages/UrlShortenerPage";
import { LoginForm } from "./pages/Login";
import { RegisterForm } from "./pages/Register";
import Auth from "./pages/Auth";

const UrlShortener = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      data-theme="light"
    >
      {/* <UrlShortenerPage /> */}
      <Auth/>
    </div>
  );
};

export default UrlShortener;
