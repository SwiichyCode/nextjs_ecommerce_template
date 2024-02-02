import { db } from "@/server/db";
import ProductService from "@/features/Admin/services/productService";
import type Stripe from "stripe";
import type { Products } from "@/lib/stripe";
import type { Product } from "@prisma/client";

type ProductQuantities = Record<number, number>;

class ValidationService {
  static async checkValidityOfStockBeforeAddingToCart(productId: number) {
    const { updatedProducts } = await ProductService.updatedProducts();
    const currentProduct = updatedProducts.find((p) => p.id === productId);

    if (!currentProduct) {
      throw new Error("product is not defined");
    }

    const isAvailable = currentProduct.stock > 0;
    return isAvailable;
  }

  static async checkValidityOfStockBeforeCheckout(products: Products) {
    const { updatedProducts } = await ProductService.updatedProducts();

    const productQuantities = products.reduce(
      (acc, { price_data, quantity = 0 }) => {
        const id = price_data?.product_data?.metadata?.product_id;
        if (id != null) {
          acc[typeof id === "number" ? id : parseInt(id, 10)] = quantity;
        }
        return acc;
      },
      {} as ProductQuantities,
    );

    const outOfStockProducts = updatedProducts.filter(
      ({ id, stock }) => stock < productQuantities[id]! || 0,
    );

    if (outOfStockProducts.length > 0) {
      const errorDetails = outOfStockProducts
        .map(({ name, stock }) => `${name} (available stock: ${stock})`)
        .join(", ");

      throw new Error(`Stock not available for ${errorDetails}`);
    }
  }

  static async validateTotalAmountInCheckoutSession(
    checkout_session: Stripe.Checkout.Session,
  ) {
    // Parse product IDs and quantities from the checkout session metadata
    const productIds = JSON.parse(
      checkout_session.metadata?.product_id ?? "[]",
    ) as number[];

    const quantities = JSON.parse(
      checkout_session.metadata?.quantity ?? "[]",
    ) as number[];

    const dbProducts = await db.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    // Create an object mapping product IDs to the corresponding product
    const idToProduct = dbProducts.reduce(
      (acc, product) => {
        acc[product.id] = product;
        return acc;
      },
      {} as Record<number, Product>,
    );

    // Calculate the total amount by multiplying each product's price by its quantity
    const calculatedTotalAmount = productIds.reduce((acc, productId, index) => {
      const product = idToProduct[productId];
      const quantity = Number(quantities[index]);
      const price = Number(product?.price);

      if (isNaN(quantity) || isNaN(price)) {
        throw new Error(
          `Invalid value: quantity = ${quantities[index]}, price = ${product?.price}`,
        );
      }

      return acc + price * 100 * quantity;
    }, 0);

    const totalAmount = checkout_session.amount_total ?? 0;

    if (totalAmount !== calculatedTotalAmount) {
      throw new Error(
        `Invalid total amount: ${totalAmount} !== ${calculatedTotalAmount}`,
      );
    }
  }
}

export default ValidationService;
