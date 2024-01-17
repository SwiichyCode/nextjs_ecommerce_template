"use client";

import { createContext, useOptimistic } from "react";
import type { Product } from "@prisma/client";

interface ProductContextType {
  optimisticProduct: Product[];
  setOptimisticProduct: (product: Product) => void;
}

interface ProductProviderType {
  products: Product[];
  children: React.ReactNode;
}

export const productContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({
  children,
  products,
}: ProductProviderType) => {
  const [optimisticProduct, setOptimisticProduct] = useOptimistic(
    products,
    (state, newProduct: Product) => {
      return {
        ...state,
        newProduct,
      };
    },
  );

  return (
    <productContext.Provider
      value={{
        optimisticProduct,
        setOptimisticProduct,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
