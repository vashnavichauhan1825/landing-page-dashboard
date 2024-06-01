import React from "react";

const DefaultLayout = ({ children }) => {
  return (
    <div className="border-[30px] border-[var(--secondary-color)] h-[100vh]">
      {children}
    </div>
  );
};

export default DefaultLayout;
