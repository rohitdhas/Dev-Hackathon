import React from "react";
import Image from "next/image";
import not_found_img from "../public/not_found.svg";

const NotFound: React.FC = () => {
  return (
    <div className="not_found text-center">
      <h1 className="text-2xl font-bold text-green-500 mt-4">
        404 - Page Not Found!
      </h1>
      <div className="pointer-events-none">
        <Image
          src={not_found_img}
          alt="404_img"
          className="-z-10"
          width={500}
          height={450}
        />
      </div>
    </div>
  );
};

export default NotFound;
