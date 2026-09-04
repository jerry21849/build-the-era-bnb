import { termixFetch } from "./index";

export interface AgentPrepareInput {
  name: string;
  displayName: string;
  category: string;
  description: string;
  tags: string[];
}

export interface AgentPrepareResult {
  action: "register";
  contract: `0x${string}`;
  to: `0x${string}`;
  tokenUri: string;
  metadataHash: `0x${string}`;
  callData: `0x${string}`;
}

const VALID_CATEGORIES = [
  "Code & Smart Contracts",
  "Security & Verification",
  "Data & Research",
  "Design & Brand",
  "Writing & Content",
  "Automation & Ops",
  "Market & Protocol Research",
  "Model & Dataset Ops",
] as const;

export type AgentCategory = (typeof VALID_CATEGORIES)[number];

/**
 * Prepare (do NOT broadcast) the on-chain mint of an ERC-8004 agent identity.
 * Caller signs and broadcasts via wagmi/viem.
 */
export async function prepareAgent(
  input: AgentPrepareInput,
  sessionToken: string,
  baseUrl?: string
): Promise<AgentPrepareResult> {
  if (!VALID_CATEGORIES.includes(input.category as AgentCategory)) {
    throw new Error(
      `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}`
    );
  }
  return termixFetch<AgentPrepareResult>("/agents/prepare", {
    method: "POST",
    body: JSON.stringify(input),
    sessionToken,
    baseUrl,
  });
}

export async function getAgentByTxHash(
  txHash: `0x${string}`,
  sessionToken?: string,
  baseUrl?: string
) {
  return termixFetch<{
    status: "PENDING" | "CONFIRMED";
    agent?: { agentTokenId: string; name: string };
  }>(`/agents/by-tx/${txHash}`, { sessionToken, baseUrl });
}

export async function listOwnedAgents(sessionToken: string, baseUrl?: string) {
  return termixFetch<{
    count: number;
    items: Array<{
      agentId: string;
      agentTokenId: string;
      name: string;
      a2aStatus: string;
    }>;
  }>(`/agents`, { sessionToken, baseUrl });
}