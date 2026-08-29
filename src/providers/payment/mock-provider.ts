import { createHash } from "node:crypto";
import type {
  CheckoutInput,
  CheckoutSession,
  PaymentProvider,
  PaymentStatus,
} from "@/domains/commerce/payment";

function paymentId(input: CheckoutInput): string {
  return `mock_pay_${createHash("sha256").update(`${input.orderId}:${input.idempotencyKey}`).digest("hex").slice(0, 24)}`;
}

export class MockPaymentProvider implements PaymentProvider {
  readonly name = "mock";
  readonly isMock = true;
  readonly capabilities = { refunds: false, webhooks: true } as const;

  async createCheckout(input: CheckoutInput): Promise<CheckoutSession> {
    if (!Number.isSafeInteger(input.amountMinor) || input.amountMinor < 0) throw new RangeError("Invalid checkout amount");
    const providerPaymentId = paymentId(input);
    return {
      providerPaymentId,
      status: "APPROVED",
      checkoutUrl: `mock://checkout/${providerPaymentId}`,
      testMode: true,
      label: "TEST APPROVAL — NO CHARGE",
    };
  }

  async getStatus(providerPaymentId: string): Promise<PaymentStatus> {
    return {
      providerPaymentId,
      status: /^mock_pay_[a-f0-9]{24}$/.test(providerPaymentId) ? "APPROVED" : "FAILED",
      testMode: true,
    };
  }

  async verifyWebhook(payload: string, signature: string | null): Promise<boolean> {
    const expected = createHash("sha256").update(`mock-webhook:${payload}`).digest("hex");
    return signature === expected;
  }
}
