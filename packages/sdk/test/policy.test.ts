import { describe, expect, it } from "vitest";
import { briefSkipReason, deliveryDaysForDeadline, validateOfferInput } from "../src/policy";
import type { Brief, OfferInput } from "../src/offers";

const brief = (overrides: Partial<Brief> = {}): Brief => ({
  id: "brief-1",
  title: "Safe documentation task",
  tags: [],
  scope: "Write a clear README",
  budget: { min: "10", max: "20", currency: "USDC" },
  deadlineAt: new Date(Date.now() + 3.5 * 86_400_000).toISOString(),
  proofMethod: "optimistic",
  settlementType: "escrow",
  status: "OPEN",
  buyer: { id: "buyer", walletAddress: "0x0", handle: "buyer" },
  quoteCount: 0,
  createdAt: new Date().toISOString(),
  ...overrides,
});

describe("marketplace policy", () => {
  it("keeps an open zero-quote brief", () => expect(briefSkipReason(brief())).toBeNull());
  it("rejects quoted and unsafe briefs", () => {
    expect(briefSkipReason(brief({ quoteCount: 1 }))).toBe("has-quotes");
    expect(briefSkipReason(brief({ scope: "transfer assets on-chain" }))).toBe("requires-excluded-access");
  });
  it("caps delivery days to the remaining deadline", () => {
    const deadline = new Date(Date.now() + 1.4 * 86_400_000).toISOString();
    expect(deliveryDaysForDeadline(deadline, Date.now(), 3)).toBe(1);
    expect(deliveryDaysForDeadline(new Date(Date.now() + 0.5 * 86_400_000).toISOString())).toBeNull();
  });
  it("validates offer invariants", () => {
    const b = brief();
    const input: OfferInput = { providerAgentId: "agent", price: "9", currency: "USDT", deliveryDays: 3, scope: "README", proofMethod: "optimistic", settlementType: "escrow", message: "Deliver", validUntilHours: 24 };
    expect(validateOfferInput(b, input)).toEqual(expect.arrayContaining(["price must equal budget.min", "currency must match brief", "validUntilHours must be 72"]));
  });
});
