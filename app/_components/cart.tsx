import { useContext } from "react";
import { CartContext } from "../_context/cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "./_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subtotalPrice, totalDiscounts, totalPrice } =
    useContext(CartContext);

  return (
    <>
      <div className="py-5">
        <div className="space-y-4">
          {products.map((product) => (
            <CartItem key={product.id} cartProduct={product} />
          ))}
        </div>
        <div className="mt-6">
          <Card>
            <CardContent className=" space-y-2 p-5">
              <div className=" flex items-center justify-between text-sm">
                <span className=" text-muted-foreground">Subtotal</span>
                <span>{formatCurrency(subtotalPrice)}</span>
              </div>
              <Separator />

              <div className=" flex items-center justify-between text-sm">
                <span className=" text-muted-foreground">Desconto</span>
                <span> - {formatCurrency(totalDiscounts)}</span>
              </div>
              <Separator />

              <div className=" flex items-center justify-between text-sm">
                <span className=" text-muted-foreground">Entrega</span>
                {Number(products[0].restaurant.deliveryFee) === 0 ? (
                  <span className=" uppercase text-primary">Grátis</span>
                ) : (
                  formatCurrency(Number(products[0].restaurant.deliveryFee))
                )}
              </div>
              <Separator />

              <div className=" flex items-center justify-between text-sm font-semibold">
                <span>Total</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <Button className="mt-6 w-full">Finalizar pedido</Button>
      </div>
    </>
  );
};

export default Cart;
