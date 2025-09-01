import React from 'react';
import UrlShortenerPage from './pages/UrlShortenerPage';

const UrlShortener = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100" data-theme="light">
     <UrlShortenerPage/>
    </div>
  );
};

export default UrlShortener;