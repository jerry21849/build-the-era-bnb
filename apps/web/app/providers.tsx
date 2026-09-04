"use client";

import { WagmiProvider, http } from "wagmi";
import { bsc } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RainbowKitProvider,
  getDefaultConfig,
} from "@rainbow-me/rainbowkit";

const TERMIX_BASE =
  process.env.NEXT_PUBLIC_TERMIX_BASE ??
  "https://platform-backend.prod.termix.live";

const config = getDefaultConfig({
  appName: "Build the Era — TermiX Marketplace",
  projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "demo-build-the-era",
  chains: [bsc],
  transports: {
    [bsc.id]: http(
      process.env.NEXT_PUBLIC_BSC_RPC ?? "https://bsc-rpc.publicnode.com"
    ),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// Re-export for downstream imports
export { TERMIX_BASE };