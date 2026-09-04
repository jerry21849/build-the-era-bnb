"use client";

import { WagmiProvider, http, createConfig } from "wagmi";
import { bsc } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { injected } from "wagmi/connectors";

const TERMIX_BASE =
  process.env.NEXT_PUBLIC_TERMIX_BASE ??
  "https://platform-backend.prod.termix.live";

export { TERMIX_BASE };

// Wagmi config: BSC Mainnet + injected connector (MetaMask / Rabby / Binance
// Wallet extension). Add WalletConnect / Coinbase connectors in production.
export const wagmiConfig = createConfig({
  chains: [bsc],
  connectors: [
    injected({ shimDisconnect: true }),
  ],
  transports: {
    [bsc.id]: http(
      process.env.NEXT_PUBLIC_BSC_RPC ?? "https://bsc-rpc.publicnode.com"
    ),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}