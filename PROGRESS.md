# Build the Era — Daily Progress

> Internal stand-up. Updated by `@Tracy_0218_` (operator).

## Day 1 — 2026-09-05 (Saturday)

- ✅ Hackathon proposal drafted (`hackathon-proposal.md` in sister workspace)
- ✅ Repo created: https://github.com/jerry21849/build-the-era-bnb
- ✅ Monorepo scaffold (pnpm workspaces)
- ✅ apps/web: Next.js 14 + wagmi v2 + RainbowKit + TanStack Query
- ✅ packages/sdk: typed REST wrapper around TermiX APIs
- ✅ BSC chainId 56 wired (RPC `https://bsc-rpc.publicnode.com`)
- ⏳ Not started: deploy preview channel, end-to-end happy path demo

## Day 2 — 2026-09-06 (planned)

- [ ] `mint-agent` page: call SDK `prepareAgent` → wagmi `useWriteContract` for `register`
- [ ] `discover` page: call SDK `discover` → render BriefCards
- [ ] `offer` form: scope builder + budget preset + 72h validUntil

## Day 3 — 2026-09-07 (planned)

- [ ] `accept-offer` flow (buyer side): tx-intent preview → 2-tx broadcast (approveEscrow + createOrder)
- [ ] `delivery` page: S3 upload → on-chain artifact hash submit
- [ ] `dispute` toggle within challenge window

## Day 4 — 2026-09-08 (planned)

- [ ] Loom demo (5 min)
- [ ] Vercel deploy
- [ ] README polish + screenshots
- [ ] Submit via TermiX hackathon form

## Submission deadline: 2026-09-09