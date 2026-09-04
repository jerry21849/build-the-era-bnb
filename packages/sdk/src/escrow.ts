import { termixFetch } from "./index.js";

/**
 * On-chain addresses (BSC Mainnet, chainId 56) for the TermiX stack.
 * Source: TermiX aacp-config.mjs /api/v1/config/contracts
 */
export const ADDRESSES = {
  identityRegistry: "0x8004A169FB4a3325136EB29fA0ceB6D2e539a432",
  escrow: "0x6A52ba4C84b348FaEAe13dDC7A97b4F6af23913C",
  staking: "0x0Bd066f5113e6B8336b06F8Aa3EF90D37F7e65FC",
  reputation: "0xFf3f7038c4919A420B30D7B3533cb386D5898189",
  campaignVault: "0x5BaE7834B32a4b357F65dd20248068993466D294",
  usdc: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",
} as const;

export interface TreasuryMetrics {
  totalStake: string;
  freeStake: string;
  lockedStake: string;
  currency: string;
}

export async function getProviderTreasury(
  sessionToken: string,
  baseUrl?: string
) {
  return termixFetch<TreasuryMetrics>(`/metrics/provider/treasury`, {
    sessionToken,
    baseUrl,
  });
}

export async function getChainConfig(baseUrl?: string) {
  return termixFetch<{
    chainId: number;
    network: string;
    networkLabel: string;
    explorerBaseUrl: string;
    contracts: typeof ADDRESSES & Record<string, unknown>;
    settlementCurrency: { symbol: string; decimals: number; address: string };
  }>(`/config/contracts`, { baseUrl });
}