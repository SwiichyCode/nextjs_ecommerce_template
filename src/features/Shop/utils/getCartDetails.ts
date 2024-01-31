// import type { Cart } from "@prisma/client";

// export const getCartDetails = (cart: Cart | null) => {
//   if (!cart) return { totalItems: 0, itemQuantities: {} };

//   const itemQuantities = cart.productIds.reduce(
//     (acc, productId) => {
//       acc[productId] = (acc[productId] ?? 0) + 1;
//       return acc;
//     },
//     {} as Record<string, number>,
//   );

//   const totalItems = Object.values(itemQuantities).reduce(
//     (acc, quantity) => acc + quantity,
//     0,
//   );

//   return { totalItems, itemQuantities };
// };
