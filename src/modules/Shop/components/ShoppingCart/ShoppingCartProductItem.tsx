import Image from "next/image";
import { removeCartItem } from "../../actions/removeItemFromCart";
import type { SetOptimisticCartFunction } from "../../hooks/useOptimisticCart";
import type { ProductCart } from "../../stores/useCartStore";

type Props = {
  item: ProductCart;
  quantity: number;
  setOptimisticCart: SetOptimisticCartFunction;
};

export const ShoppingCartProductItem = ({
  item,
  quantity,
  setOptimisticCart,
}: Props) => {
  const { id, pictures, slug, name, price } = item;

  return (
    <li key={id} className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <Image
          src={pictures?.[0] ?? ""}
          width={96}
          height={96}
          alt=""
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>
            <a href={slug}>{name}</a>
          </h3>
          <p className="ml-4">${price}</p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {quantity}</p>

          <form
            className="flex"
            action={async () => {
              // Set the optimistic cart state
              setOptimisticCart({ action: "remove", product: item });
              await removeCartItem(id);
            }}
          >
            <button
              type="submit"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              // onClick={() => remove(product)}
            >
              Remove
            </button>
          </form>

          {/* <button
            type="button"
            onClick={async () => {
              await removeCartItem(id);
            }}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Remove
          </button> */}
        </div>
      </div>
    </li>
  );
};
