import ImageComp from "./ImageComp";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const HeroSec = () => {
  const router = useRouter();
  const { id } = router.query;
  const landingPages = useSelector((state) => state.landingPages.landingPages);
  const landingPage = landingPages.find((page) => page.id === id.toString());
  const currentLandingPage = landingPages.filter((page) => page.id === id);
  const isComponentPresent = (componentType) => {
    return currentLandingPage[0]?.components.some(
      (component) => component.type === componentType
    );
  };
  return (
    <>
      {landingPage && (
        <section
          id="Home"
          className="w-full flex flex-wrap-reverse justify-center gap-11 items-center h-[90vh] pt-10 px-8"
        >
          <div>
            <h1 className="text-5xl font-bold">{landingPage.title}</h1>
            <p className="text-3xl opacity-50 mt-6 ">
              {landingPage.description}
            </p>
          </div>
          {isComponentPresent("Image") && <ImageComp />}
        </section>
      )}
    </>
  );
};

export default HeroSec;
