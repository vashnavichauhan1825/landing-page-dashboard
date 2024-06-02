import Header from "@/components/LandingPage/Header";
import Footer from "@/components/LandingPage/Footer";
import TextBlock from "@/components/LandingPage/TextBlock";
import HeroSec from "@/components/LandingPage/HeroSec";
import Navbar from "@/components/Layout/Navbar";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export default function LandingPage() {
  const router = useRouter();
  const landingPages = useSelector((state) => state.landingPages.landingPages);
  const livePage = landingPages.filter((page) => page.status === "Live")[0];
  const { id } = router.query;

  const isComponentPresent = (componentType) => {
    return landingPages[0].components.some(
      (component) => component.type === componentType
    );
  };

  return (
    <>
      {landingPages && (
        <>
          {router.pathname !== `/landingpage/[id]/preview` &&
            (!livePage || livePage.id !== id) && <Navbar />}
          {isComponentPresent("Header") && <Header />}
          <HeroSec />
          {isComponentPresent("TextContent") && <TextBlock />}
          {isComponentPresent("Footer") && <Footer />}
        </>
      )}
    </>
  );
}
