import LeftSidebar from "@/components/shared/LeftSidebar";
import Navbar from "@/components/shared/Navbar";
import RightSidebar from "@/components/shared/RightSidebar";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="bg-black/90">
      <Navbar />
      <div className=" flex">
        <LeftSidebar />
        <section className=" flex  min-h-screen flex-1 flex-col px-6 pb-6 pt-10 max-md:pb-14 sm:px-14">
          <div className=" mx-auto w-full max-w-5xl">{children}</div>
        </section>
        <RightSidebar />
      </div>
      Toaster
    </main>
  );
};

export default layout;
