import { prismaMock } from "../../singleton";
import CheckoutService from "@/features/Shop/services/checkout.service";
import type { updateProductStockType } from "@/features/Shop/types/checkoutservice.type";

enum Status {
  ACTIVE = "ACTIVE",
  DRAFT = "DRAFT",
}

test("should update product stock", async () => {
  const mockData: updateProductStockType = {
    productIds: [1, 2],
    quantities: [1, 1],
  };

  const mockProducts = [
    {
      id: 1,
      name: "Product 1",
      description: "Description 1",
      pictures: ["pic1.jpg"],
      price: 10,
      stock: 10,
      weight: 1,
      status: Status.ACTIVE,
      slug: "product-1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Product 2",
      description: "Description 2",
      pictures: ["pic2.jpg"],
      price: 20,
      stock: 10,
      weight: 2,
      status: Status.ACTIVE,
      slug: "product-2",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  prismaMock.product.findMany.mockResolvedValue(mockProducts);
  prismaMock.product.update.mockImplementation(() => Promise.resolve() as any);

  await CheckoutService.updateProductStock(mockData);

  expect(prismaMock.product.findMany).toHaveBeenCalledWith({
    where: { id: { in: mockData.productIds } },
  });

  expect(prismaMock.product.update).toHaveBeenCalledTimes(2);
  expect(prismaMock.product.update).toHaveBeenCalledWith({
    where: { id: 1 },
    data: { stock: { decrement: 1 } },
  });
  expect(prismaMock.product.update).toHaveBeenCalledWith({
    where: { id: 2 },
    data: { stock: { decrement: 1 } },
  });
});
