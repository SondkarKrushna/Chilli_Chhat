import React from "react";
import { RingLoader } from "react-spinners";
import logo from "../../public/logo.png";

const Loader = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white gap-6">
      <RingLoader color="#ef4444" size={120} />
    </div>
  );
};

export default Loader;
