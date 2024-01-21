"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useCartState, useCartStore } from "../../stores/useCartStore";
import { handleCheckoutSession } from "../../services/handleCheckoutSession";
import { useToast } from "@/components/ui/use-toast";
import { ShoppingCartFooter } from "./ShoppingCartFooter";
import { ShoppingCartProducts } from "./ShoppingCartProducts";
import { ShoppingCartHeading } from "./ShoppingCartHeading";
import type { Session } from "next-auth";

type Props = {
  session: Session | null;
};

export default function ShoppingCart({ session }: Props) {
  const { open, close } = useCartState();
  const { cart, remove } = useCartStore();
  const { toast } = useToast();

  const handleCheckout = async () => {
    if (!session) {
      toast({
        title: "You must be logged in to checkout",
        description: "Please login or create an account to continue.",
      });
      return;
    }

    if (cart.length === 0) {
      toast({
        title: "Your cart is empty",
        description: "Please add some products to your cart to continue.",
      });
      return;
    }

    await handleCheckoutSession(cart);
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
                      <ShoppingCartProducts cart={cart} remove={remove} />
                    </div>

                    <ShoppingCartFooter
                      cart={cart}
                      handleCheckout={handleCheckout}
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
}
