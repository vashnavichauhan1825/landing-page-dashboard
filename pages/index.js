import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLandingPages } from "@/store/slices/landingPageSlice";
import { getUserIdFromLocalStorage } from "/store/slices/authSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.landingPages);

  useEffect(() => {
    const userId = getUserIdFromLocalStorage();
    if (userId) {
      dispatch(fetchLandingPages(userId));
    }
  }, [dispatch]);
  const landingPages = useSelector((state) => state.landingPages.landingPages);
  console.log(landingPages);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mt-3">Landing Page Dashboard</h1>
      <ul className="grid grid-cols-4 mx-auto gap-2 mt-5">
        {landingPages.map((page) => (
          <li
            key={page.id}
            className="px-5 py-4 bg-[var(--primary-color)] text-lg"
          >
            <h2>{page.title}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
