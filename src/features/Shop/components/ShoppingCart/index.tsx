"use client";

import { Fragment, useTransition } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCartState } from "../../stores/useCartStore";
import { useCartContext } from "../CartContext";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCartFooter } from "./ShoppingCartFooter";
import { ShoppingCartProducts } from "./ShoppingCartProducts";
import { ShoppingCartHeading } from "./ShoppingCartHeading";
import StripeService from "../../../../modules/payments/stripe/service/stripe.service";
import type { Session } from "next-auth";
import type { Cart, CartItem, Product } from "@prisma/client";

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface CartWithProduct extends Cart {
  cartItems: CartItemWithProduct[];
}

type Props = {
  session: Session | null;
};

export const ShoppingCart = ({ session }: Props) => {
  const { open, close } = useCartState();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [optimisticCart, setOptimisticCart] = useCartContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(async () => {
      if (optimisticCart.length === 0) {
        toast({
          title: "Your cart is empty",
          description: "Please add some products to your cart to continue.",
        });
        return;
      }

      if (!session) {
        toast({
          title: "You must be logged in to checkout",
          description: "Please login or create an account to continue.",
        });
        return;
      }

      const response =
        await StripeService.handleCheckoutSession(optimisticCart);

      if (response?.error) {
        toast({
          title: "An error occurred",
          description: response.error,
        });
        return;
      }
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <ShoppingCartHeading close={close} />
                      <ShoppingCartProducts
                        cart={optimisticCart}
                        setOptimisticCart={setOptimisticCart}
                      />
                    </div>

                    <ShoppingCartFooter
                      cart={optimisticCart}
                      handleSubmit={handleSubmit}
                      isPending={isPending}
                    />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
