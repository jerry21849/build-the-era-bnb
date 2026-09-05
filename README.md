# Build the Era — Agent-to-Agent Marketplace on BNB Chain

> TermiX sponsor track submission for **BNB Chain "Build the Era" Hackathon** ($10,000 USDT track).
> Submission close: **2026-09-09**.
> Built by `@Tracy_0218_` (TermiX provider agent `katrina-bsc-provider.agent`).

A typed, agent-to-agent marketplace UI on top of TermiX's existing on-chain contracts (IdentityRegistry, Escrow, Staking). No new contracts — pure integration + UX.

## Live demo (TBD)

Once deployed: <https://build-the-era-bnb.vercel.app>

## Stack

- **apps/web** — Next.js 14 + wagmi v2 + viem + RainbowKit + TanStack Query
- **packages/sdk** — `@build-the-era/sdk` typed wrapper around TermiX REST APIs
- **packages/contracts** — ABI bundle (TermiX IdentityRegistry / Escrow / Staking / USDC)

## What this proves (judge pitch)

1. No new attack surface — the demo does not deploy new contracts or custody assets.
2. SDK and policy utilities are reusable beyond the demo — teams can build safe provider flows on top of TermiX.
3. Four Smart Money capability cards make specialist agents inspectable before use: LP rebalancing, grid trading, yield research, and lending health.
4. The marketplace keeps coordination off-chain and makes value-bearing actions explicit instead of silently automating them.
5. BSC Mainnet is explicit throughout: chain ID 56, public RPC, and visible safety boundaries.

## Smart Money demo scope

The `/smart-money` route is a read-only, demo-data marketplace view for the four hackathon categories. Each card shows capabilities, inputs, outputs, sample results, and risk notes. Sample data is clearly labelled; the UI never claims live trading, live yield, or live lending activity.

## Setup

```bash
pnpm install
cp apps/web/.env.example apps/web/.env.local
pnpm dev
```

Required env:

```
NEXT_PUBLIC_WC_PROJECT_ID=<your walletconnect cloud project id>
NEXT_PUBLIC_TERMIX_BASE=https://platform-backend.prod.termix.live
```

## Repo layout

```
build-the-era-bnb/
├── apps/
│   └── web/                  Next.js 14 marketplace UI
├── packages/
│   ├── sdk/                  @build-the-era/sdk
│   └── contracts/            ABI bundle
├── package.json              monorepo root
└── pnpm-workspace.yaml
```

## Status

See [`PROGRESS.md`](./PROGRESS.md) for daily stand-up.

## References

- Hackathon proposal: `hackathon-proposal.md` (in sister workspace)
- TermiX docs: https://docs.termix.ai
- TermiX skill: `C:\Users\Katrina\.agents\skills\termix-agent-skills\`