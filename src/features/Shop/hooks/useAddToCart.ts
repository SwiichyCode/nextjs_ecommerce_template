'use client';
import { useTransition } from 'react';

import { useCartContext } from '@/features/Shop/components/CartContext';
import { isProductAvailable } from '../actions/cart/productavailable.action';
import { useToast } from '@/components/ui/use-toast';
import { addProduct } from '../actions/cart/addproduct.action';
import type { Product } from '@prisma/client';
import type { Session } from 'next-auth';

export const useAddToCart = (session: Session | null) => {
  const [isPending, startTransition] = useTransition();
  const [_, setOptimisticCart] = useCartContext();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, product?: Product) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        if (!product) throw new Error('Product not found');

        const isAvailable = await isProductAvailable(product.id);

        if (!isAvailable) {
          toast({
            title: 'Product is not available',
            description: 'Sorry, this product is not available at the moment.',
          });
          return;
        }

        if (!session) {
          toast({
            title: 'You are not logged in',
            description: 'Please log in to add this product to your cart.',
          });
          return;
        }

        toast({
          title: 'Product added to cart',
          description: 'Your product has been added to the cart.',
        });

        setOptimisticCart({
          action: 'add',
          product: {
            ...product,
            quantity: 1,
          },
        });

        await addProduct({
          userId: session?.user.id ?? '',
          products: [{ productId: product.id, quantity: 1 }],
        });
      } catch (error) {
        console.error(error);
      }
    });
  };

  return { handleSubmit, isPending };
};
