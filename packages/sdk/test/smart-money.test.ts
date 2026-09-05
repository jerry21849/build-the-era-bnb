import { describe, expect, it } from "vitest";
import { SMART_MONEY_AGENTS, SMART_MONEY_CATEGORIES, getSmartMoneyAgent } from "../src/smart-money";

describe("Smart Money fixtures", () => {
  it("contains exactly four unique categories", () => {
    expect(SMART_MONEY_CATEGORIES).toHaveLength(4);
    expect(new Set(SMART_MONEY_CATEGORIES).size).toBe(4);
    expect(SMART_MONEY_AGENTS).toHaveLength(4);
  });
  it("marks every sample run as demo-only", () => {
    for (const agent of SMART_MONEY_AGENTS) expect(agent.sampleRun.status).toBe("DEMO");
  });
  it("resolves each slug", () => {
    for (const agent of SMART_MONEY_AGENTS) expect(getSmartMoneyAgent(agent.slug)?.name).toBe(agent.name);
  });
});
