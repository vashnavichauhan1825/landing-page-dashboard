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
  console.log(landingPages);

  return (
    <ul className="grid grid-cols-4 mx-auto gap-2 mt-5">
      {landingPages.map((page) => (
        <li
          key={page.id}
          className="px-5 py-10 bg-[var(--primary-color)] text-lg text-center cursor-pointer hover:opacity-75"
        >
          <Link href={`/landingpage/${page.id}`}>
            <h2>{page.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default LandingPageList;
