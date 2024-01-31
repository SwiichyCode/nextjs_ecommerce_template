import CheckoutService from "@/features/Shop/services/checkout.service";
import { prismaMock } from "../../singleton";

enum SessionStatus {
  ACTIVE = "ACTIVE",
  COMPLETED = "COMPLETED",
  EXPIRED = "EXPIRED",
  FAILED = "FAILED",
}

test("should create a checkout session", async () => {
  const mockCheckoutData = {
    sessionId: "sessionId",
    userId: "userId",
    sessionUrl: "sessionUrl",
    productIds: [1],
    quantities: [1],
  };

  const mockCheckoutSession = {
    id: 1,
    status: SessionStatus.ACTIVE,
    createdAt: expect.any(Date),
    updatedAt: expect.any(Date),
    ...mockCheckoutData,
  };

  prismaMock.checkoutSession.create.mockResolvedValue(mockCheckoutSession);

  const checkoutSession =
    await CheckoutService.createCheckoutSession(mockCheckoutData);

  expect(checkoutSession).toEqual(mockCheckoutSession);
});
