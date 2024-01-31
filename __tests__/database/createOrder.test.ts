import CheckoutService from "@/features/Shop/services/checkout.service";
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
    id: 1,
    sessionId: "sessionId",
    userId: "userId",
    customerInformationId: 1,
    paymentIntentId: "paymentIntentId",
    amountTotal: 1,
    status: OrderStatus.PROCESSING,
    orderItem: [
      {
        productId: 1,
        quantity: 1,
      },
    ],

    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  };

  const mockOrder = {
    id: 1,
    sessionId: "sessionId",
    userId: "userId",
    customerInformationId: 1,
    paymentIntentId: "paymentIntentId",
    amountTotal: 1,
    status: OrderStatus.PROCESSING,
    orderItem: [
      {
        productId: 1,
        quantity: 1,
      },
    ],
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
  };

  prismaMock.order.create.mockResolvedValue(mockOrder);

  const order = await CheckoutService.createOrder(mockOrderData);

  expect(order).toEqual(mockOrder);
});
