import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/products-image";
import ProductsDetails from "./_components/Products-Details";

interface ProductsProps {
  params: {
    id: string;
  };
}

const ProductsPage = async ({ params: { id } }: ProductsProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    },
  });

  const juices = await db.product.findMany({
    where: {
      category: {
        name: "Sucos",
      },
    },
    include: {
      restaurant: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductImage product={product} />
      <ProductsDetails product={product} complementaryProducts={juices} />
    </div>
  );
};

export default ProductsPage;
