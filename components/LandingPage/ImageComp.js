import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const ImageComp = () => {
  const router = useRouter();
  const { id } = router.query;
  const landingPages = useSelector((state) => state.landingPages.landingPages);
  const landingPage = landingPages.find((page) => page.id === id.toString());
  const [imgSrc, setImgSrc] = useState(
    landingPage?.components?.find((item) => item.type === "Image").src || ""
  );

  const handleImageError = () => {
    setImgSrc(
      "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
  };
  return (
    <div className=" w-96 h-96 rounded-[50%] overflow-hidden shadow-lg">
      <img
        className="object-cover w-full h-full"
        alt="landing page image"
        src={imgSrc}
        onError={handleImageError}
      />
    </div>
  );
};

export default ImageComp;
