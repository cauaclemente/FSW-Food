"use client";

import {
  calculeteProductTotalPrice,
  formatCurrency,
} from "@/app/_components/_helpers/price";
import Cart from "@/app/_components/cart";
import DeliveryInfo from "@/app/_components/delivery-info";
import DiscountBadge from "@/app/_components/discount-badge";
import ProductList from "@/app/_components/product-list";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/_components/ui/alert-dialog";
import { Button } from "@/app/_components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/app/_components/ui/sheet";
import { CartContext } from "@/app/_context/cart";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";

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
  const { addProductsToCart, products } = useContext(CartContext);

  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);

  const addToCart = ({ emptyCart }: { emptyCart?: boolean }) => {
    addProductsToCart({ product, quantity, emptyCart });
    setIsCartOpen(true);
  };

  const handleAddToCartClick = () => {
    const hasDifferentRestaurantProduct = products.some(
      (cartProduct) => cartProduct.restaurantId != product.restaurantId,
    );

    if (hasDifferentRestaurantProduct) {
      return setIsConfirmationDialogOpen(true);
    }

    addToCart({
      emptyCart: false,
    });
  };

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
          <DeliveryInfo restaurant={product.restaurant} />
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
          <Button
            className="w-full font-semibold"
            onClick={handleAddToCartClick}
          >
            {" "}
            Adicionar à sacola{" "}
          </Button>
        </div>
      </div>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-[85vw]">
          <SheetHeader>
            <SheetTitle className=" text-left">Sacola</SheetTitle>
          </SheetHeader>
          <Cart />
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={isConfirmationDialogOpen}
        onOpenChange={setIsConfirmationDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Você só pode adicionar itens de um restaurante por vez
            </AlertDialogTitle>
            <AlertDialogDescription>
              Deseja esvaziar a sacaola e adicionar este item?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel> Cancelar </AlertDialogCancel>
            <AlertDialogAction onClick={() => addToCart({ emptyCart: true })}>
              {" "}
              Esvaziar sacola e adicionar{" "}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductsDetails;
