export const SMART_MONEY_CATEGORIES = [
  "lp-rebalancing",
  "grid-trading",
  "yield-optimization",
  "lending-health",
] as const;

export type SmartMoneyCategory = (typeof SMART_MONEY_CATEGORIES)[number];

export interface SmartMoneyAgent {
  slug: SmartMoneyCategory;
  name: string;
  category: string;
  summary: string;
  capabilities: string[];
  inputs: string[];
  outputs: string[];
  riskNotes: string[];
  sampleRun: {
    title: string;
    status: "DEMO";
    result: string;
  };
}

export const SMART_MONEY_AGENTS: SmartMoneyAgent[] = [
  {
    slug: "lp-rebalancing",
    name: "LP Rebalance Analyst",
    category: "LP rebalancing analysis",
    summary: "Compares range health, inventory drift, and fee efficiency before suggesting a rebalance review.",
    capabilities: ["range-health scoring", "inventory-drift analysis", "fee-efficiency comparison"],
    inputs: ["pool snapshot", "price range", "fee history"],
    outputs: ["rebalance rationale", "risk flags", "scenario table"],
    riskNotes: ["No transaction signing", "Sample data only", "Not investment advice"],
    sampleRun: { title: "ETH/USDT range review", status: "DEMO", result: "Range concentration is elevated; review before changing allocation." },
  },
  {
    slug: "grid-trading",
    name: "Grid Strategy Analyst",
    category: "Grid-trading strategy analysis",
    summary: "Models grid spacing and drawdown scenarios without placing orders or connecting to a trading account.",
    capabilities: ["grid-spacing scenarios", "drawdown sensitivity", "fee-aware comparisons"],
    inputs: ["price band", "grid count", "fee assumption"],
    outputs: ["scenario matrix", "break-even estimate", "risk notes"],
    riskNotes: ["No order placement", "No custody", "Historical/sample assumptions"],
    sampleRun: { title: "BSC range scenarios", status: "DEMO", result: "Wider spacing lowers churn but increases idle-range exposure." },
  },
  {
    slug: "yield-optimization",
    name: "Yield Research Analyst",
    category: "Yield-optimization research",
    summary: "Structures a comparable yield review across protocols using explicit assumptions and risk disclosures.",
    capabilities: ["APY normalization", "lock-up comparison", "risk-factor mapping"],
    inputs: ["protocol snapshots", "APY observations", "lock-up terms"],
    outputs: ["comparison table", "assumption log", "risk checklist"],
    riskNotes: ["No deposits", "No wallet connection", "Rates are illustrative"],
    sampleRun: { title: "BSC yield comparison", status: "DEMO", result: "The highest displayed APY also carries the shortest observation history." },
  },
  {
    slug: "lending-health",
    name: "Lending Health Monitor",
    category: "Lending-health monitoring",
    summary: "Explains health-factor signals and alert thresholds from read-only sample positions.",
    capabilities: ["health-factor bands", "liquidation-distance notes", "alert-threshold design"],
    inputs: ["collateral snapshot", "borrow snapshot", "oracle timestamp"],
    outputs: ["health status", "alert rationale", "monitoring checklist"],
    riskNotes: ["No repayment", "No liquidation", "Demo positions only"],
    sampleRun: { title: "Sample lending position", status: "DEMO", result: "Health factor is inside the watch band; monitor oracle freshness." },
  },
];

export function getSmartMoneyAgent(slug: string): SmartMoneyAgent | undefined {
  return SMART_MONEY_AGENTS.find((agent) => agent.slug === slug);
}
