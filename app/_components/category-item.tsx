import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItem {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItem) => {
  return (
    <>
      <Link
        href={`/category/${category.id}/products`}
        className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-4 py-3 shadow-md"
      >
        <Image
          src={category.imageUrl}
          alt={category.name}
          height={30}
          width={30}
        />
        <span className="block text-sm font-semibold md:text-xs">
          {" "}
          {category.name}{" "}
        </span>
      </Link>
    </>
  );
};

export default CategoryItem;
