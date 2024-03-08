import React from "react";

const Loader = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center m-auto gap-1 flex-col z-50">
      <div className="border-t-gray-700 border-4 w-10 h-10 flex items-center justify-center rounded-full animate-spin"></div>
      <span className="text-sm text-gray-700 font-medium">Loading</span>
    </div>
  );
};

export default Loader;
