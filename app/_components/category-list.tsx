import { db } from "../_lib/prisma";
import CategoryItem from "./category-item";

const CategoryList = async () => {
  const categories = await db.category.findMany({});

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:flex md:overflow-x-scroll md:pb-4 [&::-webkit-scrollbar]:hidden">
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </div>
    </>
  );
};

export default CategoryList;
