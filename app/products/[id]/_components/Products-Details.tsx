"use client";

import {
  calculeteProductTotalPrice,
  formatCurrency,
} from "@/app/_components/_helpers/price";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import { Button } from "@/app/_components/ui/button";
import { Card } from "@/app/_components/ui/card";
import { Prisma } from "@prisma/client";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  complementaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductsDetails = ({
  product,
  complementaryProducts,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);

  const handleCreaseQuantityClick = () => {
    setQuantity((currentState) => currentState + 1);
  };
  const handleDecreaseQuantityClick = () => {
    setQuantity((currentState) => {
      if (currentState === 1) return 1;

      return currentState - 1;
    });
  };

  return (
    <>
      <div className="relative z-50 mt-[-1rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
        <div className=" flex items-center gap-[0.375rem] px-5">
          <div className="relative h-7 w-7">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {product.restaurant.name}
          </span>
        </div>

        <h1 className=" mb-2 mt-1 px-5 text-xl font-semibold">
          {" "}
          {product.name}
        </h1>
        <div className=" flex justify-between px-5">
          <div>
            <div className="flex items-center gap-1">
              <h2 className=" text-xl font-semibold">
                {formatCurrency(calculeteProductTotalPrice(product))}
              </h2>
              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>
            {product.discountPercentage > 0 && (
              <p className=" text-muted-foreground ">
                De: {formatCurrency(Number(product.price))}
              </p>
            )}
          </div>
          <div className=" flex items-center gap-3 text-center">
            <Button
              size="icon"
              variant="ghost"
              className="border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantityClick}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button size="icon" onClick={handleCreaseQuantityClick}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <div className="px-5">
          <Card className="mt-3 flex justify-around py-3">
            <div className=" flex flex-col items-center">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">Entrega</span>
                <BikeIcon size={14} />
              </div>
              {Number(product.restaurant.deliveryFee) > 0 ? (
                <p className="text-xs font-semibold">
                  {formatCurrency(Number(product.restaurant.deliveryFee))}
                </p>
              ) : (
                <p className="text-sm font-semibold">Grátis</p>
              )}
            </div>

            <div className=" flex flex-col items-center">
              <div className="flex items-center gap-1 text-muted-foreground">
                <span className="text-xs">Entrega</span>
                <BikeIcon size={14} />
              </div>
              <p className=" text-xs font-semibold">
                {product.restaurant.deliveryTimeMinutes} min{" "}
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-6 space-y-3 px-5">
          <h3 className="font-semibold">Sobre</h3>
          <p className=" text-sm text-muted-foreground">
            {product.description}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <h3 className="px-5 font-semibold">Sucos</h3>
        </div>
        <ProductList products={complementaryProducts} />
        <div className="mt-6 px-5">
          <Button className="w-full font-semibold"> Adicionar à sacola </Button>
        </div>
      </div>
    </>
  );
};

export default ProductsDetails;
