import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editLandingPage } from "@/store/slices/landingPageSlice";
import { getUserIdFromLocalStorage } from "/store/slices/authSlice";
import { useRouter } from "next/router";

const LandingPageEdit = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const landingPages = useSelector((state) => state.landingPages.landingPages);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    textContent: "",
    image: "",
    github: "",
    twitter: "",
    linkedin: "",
  });

  useEffect(() => {
    const { id } = router.query;
    const landingPage = landingPages.find((page) => page.id === id);
    if (landingPage) {
      const textContentComponent = landingPage.components.find(
        (c) => c.type === "TextContent"
      );
      const imageComponent = landingPage.components.find(
        (c) => c.type === "Image"
      );
      const footerComponent = landingPage.components.find(
        (c) => c.type === "Footer"
      );

      let github = "";
      let twitter = "";
      let linkedin = "";

      if (footerComponent && Array.isArray(footerComponent.content)) {
        const githubObj = footerComponent.content.find(
          (item) => item.tab === "Github"
        );
        const twitterObj = footerComponent.content.find(
          (item) => item.tab === "Twitter"
        );
        const linkedinObj = footerComponent.content.find(
          (item) => item.tab === "LinkedIn"
        );

        github = githubObj ? githubObj.link : "";
        twitter = twitterObj ? twitterObj.link : "";
        linkedin = linkedinObj ? linkedinObj.link : "";
      }
      setFormData({
        title: landingPage.title || "",
        description: landingPage.description || "",
        textContent: textContentComponent ? textContentComponent.content : "",
        image: imageComponent ? imageComponent.src : "",
        github: github,
        twitter: twitter,
        linkedin: linkedin,
      });
    }
  }, [landingPages, router.query]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const { id } = router.query;
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const userId = getUserIdFromLocalStorage();

      const components = [
        { type: "Header", content: ["Home", "About", "Contact"] },
        { type: "TextContent", content: formData.textContent },
        { type: "Image", src: formData.image },
        {
          type: "Footer",
          content: [
            { tab: "Github", link: formData.github },
            { tab: "LinkedIn", link: formData.linkedin },
            { tab: "Twitter", link: formData.twitter },
          ],
        },
      ];

      const landingPageData = {
        userId,
        title: formData.title,
        description: formData.description,
        components,
        status: "Draft",
      };

      dispatch(editLandingPage({ landingPageId: id, landingPageData }));
      router.push(`/landingpage/${id}`);
    } catch (error) {
      console.error("Error editing landing page:", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-3xl font-bold mt-6">
        Coffee Break Over ? Lets Edit Landing Page !
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto  w-[40%] px-6 bg-[var(--primary-color)] rounded-md py-8 grid grid-cols-2 gap-8 "
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
          />
        </div>

        <div>
          <label htmlFor="github">Github URL:</label>
          <input
            type="text"
            id="github"
            name="github"
            value={formData.github}
            className="border border-[var(--ter-color)] rounded-md p-2 w-full"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="linkedin">LinkedIn URL:</label>
          <input
            type="text"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            className="border border-[var(--ter-color)] rounded-md p-2 w-full"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="twitter">Twitter URL:</label>
          <input
            type="text"
            id="twitter"
            name="twitter"
            value={formData.twitter}
            className="border border-[var(--ter-color)] rounded-md p-2 w-full"
            onChange={handleChange}
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
          ></textarea>
        </div>
        <button
          type="submit"
          className="mx-auto w-full bg-[var(--cta-color)] rounded-md my-4 p-2 hover:opacity-90 font-semibold hover:text-[var(--primary-color)] h-fit"
        >
          Edit Landing Page
        </button>
      </form>
    </div>
  );
};

export default LandingPageEdit;
