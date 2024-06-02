import Image from "./Image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const HeroSec = () => {
  const router = useRouter();
  const { id } = router.query;
  const landingPages = useSelector((state) => state.landingPages.landingPages);
  console.log(id);
  const landingPage = landingPages.find((page) => page.id === id.toString());
  console.log(landingPage);
  return (
    <>
      {landingPage && (
        <section
          id="Home"
          className="w-full flex justify-center gap-11 items-center h-[90vh] pt-10 px-8"
        >
          <div>
            <h1 className="text-5xl font-bold">{landingPage.title}</h1>
            <p className="text-3xl opacity-50 mt-6">
              {landingPage.description}
            </p>
          </div>
          <Image />
        </section>
      )}
    </>
  );
};

export default HeroSec;
