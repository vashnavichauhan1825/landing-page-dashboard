import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const TextBlock = () => {
  const router = useRouter();
  const { id } = router.query;
  const landingPages = useSelector((state) => state.landingPages.landingPages);
  const landingPage = landingPages.find((page) => page.id === id.toString());
  return (
    landingPage && (
      <section
        id="About"
        className="bg-[var(--primary-color)] py-10 px-20 flex flex-col justify-center items-center gap-3 min-h-[60vh]"
      >
        <h1 className="text-[var(--secondary-color)] text-4xl">About</h1>
        <p className="text-[var(--cta-color)] mx-56 text-xl">
          {
            landingPages[0].components?.find(
              (item) => item.type === "TextContent"
            ).content
          }
        </p>
      </section>
    )
  );
};

export default TextBlock;
