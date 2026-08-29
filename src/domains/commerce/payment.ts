export type PaymentState = "PENDING" | "APPROVED" | "FAILED" | "CANCELLED" | "REFUNDED";

export interface CheckoutInput {
  orderId: string;
  idempotencyKey: string;
  amountMinor: number;
  currency: string;
  returnUrl: string;
}

export interface CheckoutSession {
  providerPaymentId: string;
  status: PaymentState;
  checkoutUrl: string;
  testMode: boolean;
  label: string;
}

export interface PaymentStatus {
  providerPaymentId: string;
  status: PaymentState;
  testMode: boolean;
}

export interface PaymentCapabilities {
  refunds: boolean;
  webhooks: boolean;
}

export interface PaymentProvider {
  readonly name: string;
  readonly isMock: boolean;
  readonly capabilities: PaymentCapabilities;
  createCheckout(input: CheckoutInput): Promise<CheckoutSession>;
  getStatus(providerPaymentId: string): Promise<PaymentStatus>;
  verifyWebhook(payload: string, signature: string | null): Promise<boolean>;
}
