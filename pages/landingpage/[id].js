import Header from "@/components/LandingPage/Header";
import Footer from "@/components/LandingPage/Footer";
import { useRouter } from "next/router";
import TextBlock from "@/components/LandingPage/TextBlock";
import Image from "@/components/LandingPage/Image";

export default function LandingPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Header />
      <div className="h-[80vh]">
        <h1>Landing Page Details</h1>
        <p>Landing Page ID: {id}</p>
        <Image />
      </div>

      <TextBlock />
      <Footer />
    </div>
  );
}
