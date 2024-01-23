import Image from "next/image";
import type { ProductCart } from "../../stores/useCartStore";
import { removeItemFromCart } from "../../actions/removeItemFromCart";

type Props = {
  cart: ProductCart[];
  setOptimisticCart: (newCart: ProductCart[]) => void;
};

export const ShoppingCartProducts = ({ cart, setOptimisticCart }: Props) => {
  const remove = (itemId: number) => {
    const newCart = cart.filter((item) => item.id !== itemId);
    setOptimisticCart(newCart);
  };

  return (
    <div className="mt-8">
      <div className="flow-root">
        <ul role="list" className="-my-6 divide-y divide-gray-200">
          {cart.map((product) => (
            <li key={product.id} className="flex py-6">
              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image
                  src={product.pictures?.[0] ?? ""}
                  width={96}
                  height={96}
                  alt=""
                  className="h-full w-full object-cover object-center"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href={product.slug}>{product.name}</a>
                    </h3>
                    <p className="ml-4">${product.price}</p>
                  </div>
                  {/* <p className="mt-1 text-sm text-gray-500">
                {product.color}
              </p> */}
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                  <p className="text-gray-500">Qty {product.quantity}</p>

                  <form
                    className="flex"
                    action={async () => {
                      remove(product.id);
                      await removeItemFromCart({
                        productId: product.id,
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
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
