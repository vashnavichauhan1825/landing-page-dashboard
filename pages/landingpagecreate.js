import { useState } from "react";
import { useDispatch } from "react-redux";
import { createLandingPage } from "@/store/slices/landingPageSlice";
import { getUserIdFromLocalStorage } from "/store/slices/authSlice";
import { useRouter } from "next/router";
const LandingPageCreate = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    textContent: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const userId = getUserIdFromLocalStorage();
      const landingPageData = {
        userId,
        title: formData.title,
        description: formData.description,
        components: [
          { type: "Header", content: ["Home", "About", "Career", "Contact"] },
          { type: "TextContent", content: formData.textContent },
          {
            type: "Image",
            src: formData.image,
          },
          {
            type: "Footer",
            content: ["Github", "LinkedIn", "Twitter", "Mail"],
          },
        ],
        status: "Draft",
      };
      dispatch(createLandingPage({ userId, landingPageData }));

      setFormData({
        title: "",
        description: "",
        textContent: "",
        image: "",
      });
      router.push("/");
    } catch (error) {
      console.error("Error creating landing page:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold mt-6">Create a New Landing Page</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto  w-[40%] px-6 bg-[var(--primary-color)] rounded-md py-8 grid grid-cols-1 gap-8"
      >
        <div className="flex flex-col">
          <label
            htmlFor="title"
            className="text-[var(--secondary-color)] opacity-90 text-lg"
          >
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border border-[var(--ter-color)] rounded-md p-2 w-full"
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            className="border border-[var(--ter-color)] rounded-md p-2 w-full"
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="image"
            className="text-[var(--secondary-color)] opacity-90 text-lg"
          >
            Image url :
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="border border-[var(--ter-color)] rounded-md p-2 w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="textContent">About Text:</label>
          <textarea
            id="textContent"
            name="textContent"
            rows="4"
            value={formData.textContent}
            className="border border-[var(--ter-color)] rounded-md p-2 w-full"
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="mx-auto w-full bg-[var(--cta-color)] rounded-md my-4 p-2 hover:opacity-90 font-semibold hover:text-[var(--primary-color)]"
        >
          Create Landing Page
        </button>
      </form>
    </div>
  );
};

export default LandingPageCreate;
