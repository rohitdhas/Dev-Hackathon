import React from "react";
import Link from "next/link";

interface CardData {
  category: string;
}

const CategoryCard: React.FC<CardData> = ({ category }) => {
  return (
    <div className="p-1 text-sm md:text-base md:p-2 text-gray-600 border-2 border-blue-400 hover:border-blue-600 rounded-md mt-3 mr-3 font-bold">
      <Link href={`/category/${category}`}>
        <a>{category}</a>
      </Link>
    </div>
  );
};

export default CategoryCard;
