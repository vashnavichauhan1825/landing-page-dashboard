import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLandingPages } from "@/store/slices/landingPageSlice";
import { getUserIdFromLocalStorage } from "/store/slices/authSlice";
import Link from "next/link";
const LandingPageList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const userId = getUserIdFromLocalStorage();
    if (userId) {
      dispatch(fetchLandingPages(userId));
    }
  }, [dispatch]);

  const landingPages = useSelector((state) => state.landingPages.landingPages);
  const livePage = landingPages.filter((page) => page.status === "Live")[0];
  console.log("oddod", livePage);
  return (
    <ul className="grid grid-cols-4 mx-auto gap-2 mt-5">
      {livePage && (
        <li
          key={livePage.id}
          className="bg-[var(--secondary-color)] text-lg text-center cursor-pointer hover:opacity-75"
        >
          <Link
            href={`/landingpage/${livePage.id}`}
            className="flex flex-col gap-1 justify-center items-center px-5 py-10 "
          >
            <p className="text-[var(--cta-color)]">Live</p>
            <h2 className="text-[var(--primary-color)]">{livePage.title}</h2>
          </Link>
        </li>
      )}
      <li className=" bg-[var(--ter-color)] border-2 border-[var(--cta-color)] rounded-md text-[var(--secondary-color)] text-xl font-semibold text-center cursor-pointer hover:opacity-75">
        <Link
          href={`/landingpagecreate`}
          className="px-5 py-10 flex justify-center items-center"
        >
          Create New
        </Link>
      </li>
      {landingPages.map(
        (page, i) =>
          page.status !== "Live" && (
            <li
              key={i}
              className="bg-[var(--primary-color)] text-lg text-center cursor-pointer hover:opacity-75 rounded-md"
            >
              <Link
                href={`/landingpage/${page.id}`}
                className="px-5 py-10 flex justify-center items-center"
              >
                <h2>{page.title}</h2>
              </Link>
            </li>
          )
      )}
    </ul>
  );
};

export default LandingPageList;
