import { useState } from "react";

const LandingPageCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    textContent: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
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
