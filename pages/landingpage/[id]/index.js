import Header from "@/components/LandingPage/Header";
import Footer from "@/components/LandingPage/Footer";
import TextBlock from "@/components/LandingPage/TextBlock";
import HeroSec from "@/components/LandingPage/HeroSec";
import Navbar from "@/components/Layout/Navbar";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      {router.pathname !== `/landingpage/[id]/preview` && <Navbar />}
      <Header />
      <HeroSec />
      <TextBlock />
      <Footer />
    </>
  );
}
