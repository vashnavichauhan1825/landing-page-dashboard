import Header from "@/components/LandingPage/Header";
import Footer from "@/components/LandingPage/Footer";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Header />
      <h1>Landing Page Details</h1>
      <p>Landing Page ID: {id}</p>
      <Footer />
    </div>
  );
}
