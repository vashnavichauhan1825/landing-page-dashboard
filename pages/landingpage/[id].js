import Header from "@/components/LandingPage/Header";
import { useRouter } from "next/router";

export default function LandingPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Header />
      <h1>Landing Page Details</h1>
      <p>Landing Page ID: {id}</p>
    </div>
  );
}
