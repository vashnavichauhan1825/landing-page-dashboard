import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/slices/authSlice";
import { useRouter } from "next/router";
const AuthForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto  w-[40%]  pt-5 pb-8 px-6 bg-[var(--primary-color)] rounded-md"
    >
      <h1 className="text-[var(--secondary-color)] text-3xl font-bold">
        Login Now !
      </h1>
      <div className="mb-4 mt-8 flex flex-col gap-2">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          className="border border-[var(--ter-color)] rounded-md p-2 "
        />
      </div>
      <div className="mb-4 flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="border border-[var(--ter-color)] rounded-md p-2"
        />
      </div>
      <div>
        <button
          type="submit"
          className="mx-auto w-full bg-[var(--cta-color)] rounded-md my-4 p-2 hover:opacity-90 font-semibold hover:text-[var(--primary-color)]"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
