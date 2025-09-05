import HeroSection from "../components/HeroSection";
import ShortenerForm from "../components/ShortenerForm";
import UrlList from "../components/UrlList";

export default function UrlShortenerPage() {
 

  return (
    <div className="min-h-screen  py-12 px-6">
      {/* Hero Section */}
     
<HeroSection/>
      {/* Shortener Form */}
     <ShortenerForm/>
      {/* URLs List */}
     <UrlList/>
    </div>
  );
}
