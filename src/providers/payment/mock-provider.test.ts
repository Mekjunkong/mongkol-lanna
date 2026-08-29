import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { MockPaymentProvider } from "./mock-provider";
import { createPaymentProvider, RealPaymentUnavailableError } from "./provider-factory.server";

const checkout = {
  orderId: "order-1",
  idempotencyKey: "checkout-1",
  amountMinor: 12900,
  currency: "THB",
  returnUrl: "https://example.test/return",
};

describe("MockPaymentProvider", () => {
  it("is deterministic and explicitly labels a no-charge approval", async () => {
    const provider = createPaymentProvider(true);
    const first = await provider.createCheckout(checkout);
    const second = await provider.createCheckout(checkout);
    expect(first).toEqual(second);
    expect(first).toMatchObject({ status: "APPROVED", testMode: true, label: "TEST APPROVAL — NO CHARGE" });
    expect(first.checkoutUrl).toMatch(/^mock:\/\/checkout\//);
  });

  it("verifies only deterministic mock webhook signatures", async () => {
    const provider = new MockPaymentProvider();
    const payload = '{"payment":"mock"}';
    const signature = createHash("sha256").update(`mock-webhook:${payload}`).digest("hex");
    await expect(provider.verifyWebhook(payload, signature)).resolves.toBe(true);
    await expect(provider.verifyWebhook(payload, "invalid")).resolves.toBe(false);
  });

  it("refuses unsupported real checkout", () => {
    expect(() => createPaymentProvider(false)).toThrow(RealPaymentUnavailableError);
  });
});
