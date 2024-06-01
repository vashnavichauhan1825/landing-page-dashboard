import { useState } from "react";

const LandingPageCreate = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    headerContent: "",
    textContent: "",
    footerContent: "",
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
    <div>
      <h1>Create a New Landing Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="headerContent">Header Content:</label>
          <input
            type="text"
            id="headerContent"
            name="headerContent"
            value={formData.headerContent}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="textContent">Text Content:</label>
          <input
            type="text"
            id="textContent"
            name="textContent"
            value={formData.textContent}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="footerContent">Footer Content:</label>
          <input
            type="text"
            id="footerContent"
            name="footerContent"
            value={formData.footerContent}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Landing Page</button>
      </form>
    </div>
  );
};

export default LandingPageCreate;
