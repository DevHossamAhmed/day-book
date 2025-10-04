import LeftSide from "@/components/dashboard/LeftSide";
import OverView from "@/components/dashboard/OverView";
import RightSide from "@/components/dashboard/RightSide";
import React from "react";

const page = () => {
  return (
    <div className="bg-[#fcfcfc]">
      <OverView />
      
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mt-4 lg:mt-6">
        <div className="w-full lg:w-2/3 xl:w-[70%]">
          <LeftSide />
        </div>
        <div className="w-full lg:w-1/3 xl:w-[30%]">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default page;
