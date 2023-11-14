/* eslint-disable tailwindcss/classnames-order */
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" min-h-screen w-full flex justify-center items-center">
      {children}
    </div>
  );
};

export default Layout;
