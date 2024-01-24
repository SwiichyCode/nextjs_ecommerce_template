import { ShoppingCartProductItem } from "./ShoppingCartProductItem";
import type { CartWithProduct } from "./index";

type Props = {
  cart: CartWithProduct[];
};

export const ShoppingCartProducts = ({ cart }: Props) => {
  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {cart.flatMap((cartItem) =>
            cartItem.cartItems.map((item) => (
              <ShoppingCartProductItem
                key={item.id}
                item={item}
                quantity={item.quantity}
              />
            )),
          )}
        </ul>
      </div>
    </div>
  );
};
