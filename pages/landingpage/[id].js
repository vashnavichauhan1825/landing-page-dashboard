import Header from "@/components/LandingPage/Header";
import Footer from "@/components/LandingPage/Footer";
import TextBlock from "@/components/LandingPage/TextBlock";
import Image from "@/components/LandingPage/Image";
import HeroSec from "@/components/LandingPage/HeroSec";

export default function LandingPage() {
  return (
    <div>
      <Header />
      <HeroSec />
      <TextBlock />
      <Footer />
    </div>
  );
}
