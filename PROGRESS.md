# Build the Era — Daily Progress

> Internal stand-up. Updated by `@Tracy_0218_` (operator).

## Day 1 — 2026-09-05 (Saturday)

- ✅ Hackathon proposal drafted (`hackathon-proposal.md` in sister workspace)
- ✅ Repo created: https://github.com/jerry21849/build-the-era-bnb
- ✅ Monorepo scaffold (pnpm workspaces)
- ✅ apps/web: Next.js 14 + wagmi v2 + injected BSC connector + TanStack Query
- ✅ packages/sdk: typed REST wrapper around TermiX APIs
- ✅ BSC chainId 56 wired (RPC `https://bsc-rpc.publicnode.com`)

## Day 2 — 2026-09-06 (implemented)

- ✅ `mint-agent` page: prepare, inject BSC transaction, poll indexer
- ✅ `discover` page: OPEN/zero-quote/deadline/safety policy filtering
- ✅ `offer` form: budget.min/currency/proof/settlement invariants + 72h validity
- ✅ Smart Money page: four read-only capability cards with search and detail views
- ✅ SDK policy helpers and tests for eligibility/offer invariants

## Day 3 — 2026-09-07 (scoped)

- ✅ Read-only Smart Money marketplace experience without custody or autonomous execution
- [ ] Buyer-side escrow funding (requires a separate documented tx-intent and explicit signing)
- [ ] Delivery/dispute lifecycle (requires documented ABI and order fixture)

## Day 4 — 2026-09-08 (human/external steps)

- [ ] Loom demo (5 min)
- [ ] Vercel deploy
- [ ] README polish + screenshots
- [ ] Submit via TermiX hackathon form

## Submission deadline: 2026-09-09