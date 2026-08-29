import type { PaymentProvider } from "@/domains/commerce/payment";
import { MockPaymentProvider } from "./mock-provider";

export class RealPaymentUnavailableError extends Error {
  constructor() {
    super("Mock checkout is disabled, but no approved real payment provider is implemented");
    this.name = "RealPaymentUnavailableError";
  }
}

export function createPaymentProvider(mockCheckout = true): PaymentProvider {
  if (mockCheckout) return new MockPaymentProvider();
  throw new RealPaymentUnavailableError();
}
