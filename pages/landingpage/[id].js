import Header from "@/components/LandingPage/Header";
import Footer from "@/components/LandingPage/Footer";
import { useRouter } from "next/router";
import TextBlock from "@/components/LandingPage/TextBlock";

export default function LandingPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Header />
      <div className="h-[80vh]">
        <h1>Landing Page Details</h1>
        <p>Landing Page ID: {id}</p>
      </div>

      <TextBlock />
      <Footer />
    </div>
  );
}
