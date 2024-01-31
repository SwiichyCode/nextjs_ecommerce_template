import Image from "next/image";
import { useTransition } from "react";
import type { SetOptimisticCartFunction } from "../../hooks/useOptimisticCart";
import type { ProductCart } from "../../stores/useCartStore";
import { removeProduct } from "../../actions/cart/removeproduct.action";
import { updateProductQuantity } from "../../actions/cart/updateproductquantity.action";
import { cn } from "@/lib/utils";

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
  const [isPending, startTransition] = useTransition();

  const updateQuantity = async (action: "increment" | "decrement") => {
    startTransition(async () => {
      if (action === "decrement" && quantity === 1) {
        setOptimisticCart({ action: "remove", product: item });
        await removeProduct({ productId: id });
      }

      setOptimisticCart({ action, product: item });
      await updateProductQuantity({
        productId: id,
        quantity: action === "increment" ? quantity + 1 : quantity - 1,
      });
    });
  };

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
          <p className="ml-4">${quantity * price}</p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex flex-col">
            <form className="flex items-center gap-2">
              <button
                type="submit"
                disabled={isPending}
                className={cn(
                  "flex w-6 items-center justify-center rounded bg-slate-200 px-2",
                  isPending && "opacity-50",
                )}
                formAction={async () => {
                  await updateQuantity("decrement");
                }}
              >
                -
              </button>
              <p className="text-gray-500">{quantity}</p>
              <button
                type="submit"
                className={cn(
                  "flex w-6 items-center justify-center rounded bg-slate-200 px-2",
                  isPending && "opacity-50",
                )}
                formAction={async () => {
                  await updateQuantity("increment");
                }}
              >
                +
              </button>
            </form>
          </div>

          <form
            className="flex"
            action={async () => {
              setOptimisticCart({ action: "remove", product: item });
              await removeProduct({
                productId: id,
              });
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
