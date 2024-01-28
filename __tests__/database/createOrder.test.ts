import CheckoutService from "@/modules/Shop/services/checkout.service";
import { prismaMock } from "../../singleton";

enum OrderStatus {
  PENDING = "PENDING",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELED = "CANCELED",
}

test("should create a order", async () => {
  const mockOrderData = {
    sessionId: "sessionId",
    userId: "userId",
    customerInformationId: 1,
    productIds: [1],
    quantities: [1],
  };

  const mockOrder = {
    id: 1,
    status: OrderStatus.PENDING,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
    ...mockOrderData,
  };

  prismaMock.order.create.mockResolvedValue(mockOrder);

  const order = await CheckoutService.createOrder(mockOrderData);

  expect(order).toEqual(mockOrder);
});
