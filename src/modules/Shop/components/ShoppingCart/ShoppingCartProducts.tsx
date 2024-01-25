import { ShoppingCartProductItem } from "./ShoppingCartProductItem";
import type { SetOptimisticCartFunction } from "../../hooks/useOptimisticCart";
import type { ProductCart } from "../../stores/useCartStore";

type Props = {
  cart: ProductCart[];
  setOptimisticCart: SetOptimisticCartFunction;
};

export const ShoppingCartProducts = ({ cart, setOptimisticCart }: Props) => {
  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {cart.map((item) => (
            <ShoppingCartProductItem
              key={item.id}
              item={item}
              quantity={item.quantity}
              setOptimisticCart={setOptimisticCart}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
