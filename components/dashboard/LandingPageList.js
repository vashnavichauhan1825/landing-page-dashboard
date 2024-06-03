import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLandingPages,
  deleteLandingPage,
} from "@/store/slices/landingPageSlice";
import { getUserIdFromLocalStorage } from "@/store/slices/authSlice";
import Link from "next/link";
const LandingPageList = () => {
  const landingPages = useSelector((state) => state.landingPages.landingPages);
  const dispatch = useDispatch();
  useEffect(() => {
    const userId = getUserIdFromLocalStorage();
    if (userId) {
      dispatch(fetchLandingPages(userId));
    }
    console.log("fetching");
  }, []);

  const livePage = landingPages.filter((page) => page.status === "Live")[0];
  const deleteHandler = (id) => {
    dispatch(deleteLandingPage(id));
  };
  const filteredLandingPages = landingPages.filter(
    (page) => page.status !== "Live"
  );
  return (
    <ul className="grid grid-cols-4 mx-auto gap-2 mt-5">
      {livePage && (
        <li
          key={livePage.id}
          className="bg-[var(--secondary-color)] text-lg text-center cursor-pointer  flex flex-col rounded-xl overflow-hidden"
        >
          <Link
            href={`/landingpage/${livePage.id}`}
            className="flex flex-col gap-1 justify-center items-center px-5 py-10 hover:opacity-75"
          >
            <p className="text-[var(--cta-color)]">Live</p>
            <h2 className="text-[var(--primary-color)]">{livePage.title}</h2>
          </Link>
          <div className="bg-[var(--secondary-color)] text-[var(--ter-color)] h-full text-sm flex justify-center items-center gap-3 p-2 ">
            <Link href={`/landingpage/${livePage.id}/edit`}>
              <p>Edit</p>
            </Link>

            <p
              className=" text-red-400"
              onClick={() => deleteHandler(livePage.id)}
            >
              Delete
            </p>
          </div>
        </li>
      )}
      <li className=" bg-[var(--ter-color)] border-2 border-[var(--cta-color)] rounded-md text-[var(--secondary-color)] text-xl font-semibold text-center cursor-pointer hover:opacity-75 overflow-hidden">
        <Link
          href={`/landingpagecreate`}
          className="px-5 py-10 flex justify-center items-center"
        >
          Create New
        </Link>
      </li>
      {landingPages
        .filter((page) => page.status !== "Live")
        .map((page, i) => (
          <li
            key={i}
            className="bg-[var(--primary-color)] text-lg text-center cursor-pointer rounded-md flex flex-col overflow-hidden"
          >
            <Link
              href={`/landingpage/${page.id}`}
              className="px-5 py-10 flex justify-center items-center hover:opacity-75 "
            >
              <h2>{page.title}</h2>
            </Link>
            <div className="bg-[var(--secondary-color)] text-[var(--ter-color)] h-full text-sm flex justify-center items-center gap-3 p-2">
              <Link href={`/landingpage/${page.id}/edit`}>
                <p>Edit</p>
              </Link>

              <p
                className=" text-red-400"
                onClick={() => deleteHandler(page.id)}
              >
                Delete
              </p>
            </div>
          </li>
        ))}
    </ul>
  );
};

export default LandingPageList;
