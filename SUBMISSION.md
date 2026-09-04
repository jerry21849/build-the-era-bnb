# Hackathon Submission — TermiX × BNB Chain "Build the Era"

> Submission form draft. Operator copies the values below into the live form
> at `https://www.agent.family/campaigns` (TermiX sponsor track, $10,000 USDT
> track, submission close 2026-09-09).

## Required fields

| Field | Value |
|---|---|
| Team name | `@Tracy_0218_` |
| Contact handle | `@Tracy_0218_` (X / Twitter) |
| Track | **TermiX sponsor track — $10,000 USDT** |
| Project name | **Build the Era — Agent-to-Agent Marketplace** |
| GitHub repo | https://github.com/jerry21849/build-the-era-bnb |
| Live demo URL | https://build-the-era-bnb.vercel.app (post-deploy) |
| Loom video URL | <paste after recording — see `DEMO-LOOM.md`> |
| Submission date | 2026-09-08 (target; 2026-09-09 hard close) |

## One-line pitch

A typed agent-to-agent marketplace UI on BNB Chain, built entirely on TermiX's audited contracts — no new code on-chain, just a clean UX and a reusable SDK.

## Three-bullet summary

- **Mints agents** through TermiX's existing IdentityRegistry (ERC-8004). One tx, gas only, no new contract.
- **Discovers briefs** via TermiX's `/prepayment-orders/discover`, with the same provider-side filters we run on-chain (status=OPEN, quoteCount=0, no on-chain custody / external social / private repo / destructive).
- **Tenders off-chain offers** at `budget.min`, locks delivery days to deadline, copies `proofMethod` + `settlementType` from the brief verbatim, then re-fetches the offer to verify ACTIVE.

## Architecture (one paragraph for the form)

`apps/web` (Next.js 14 + wagmi v2 + RainbowKit) consumes `@build-the-era/sdk` (TypeScript wrapper around TermiX REST APIs). Wallet-side actions go through `wagmi` with `chainId: 56` and RPC `https://bsc-rpc.publicnode.com`. No new contracts: IdentityRegistry `0x8004A169FB4a3325136EB29fA0ceB6D2e539A432`, Escrow `0x6A52ba4C84b348FaEAe13dDC7A97b4F6af23913C`, Staking `0x0Bd066f5113e6B8336b06F8Aa3EF90D37F7e65FC`, USDC `0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d`.

## On-chain evidence (include in submission)

At least one end-to-end happy-path tx hash:

- Agent mint: `0x998ee944d8c5597a38584758c3dcf53c2dd9631218b4a23d3075e082d8f67c87`
  (operator's `katrina-bsc-provider.agent`, agentTokenId `334733`).
- Provider offer: `cmtn8pcf00xrswr018e3fs5ds` (ACTIVE, 71.66 USDC, Playwright brief).
  Conversation: `cmtn8pce20xrnwr01kcr6aab1`.

These were produced via the same flow the demo UI implements.

## What we did NOT do (transparency for judges)

- Did not deploy any new contracts.
- Did not request or store any private key.
- Did not change any platform-fee or governance parameter.
- Did not run any external social-account actions on the operator's behalf.

## Risks we acknowledged in the proposal

| Risk | Mitigation in shipped code |
|---|---|
| TermiX API schema drift | SDK pinned to documented endpoints; REST wrappers in `packages/sdk/src/*.ts` are unit-testable |
| wagmi v2 hook bugs | Minimal hook surface (`useAccount`, `useSendTransaction`) |
| 2-tx escrow funding | Out of scope for Day 1–2; will land Day 3 if needed |
| Submission form offline | Cache submission JSON locally; retry |

## Post-submission follow-through

- Open the repo's Discussions tab for judge Q&A.
- Keep `packages/sdk` open-source and re-usable beyond the demo.
- If awarded, ship a v2 with on-chain dispute window UI + multi-provider agent cards.

---

> Operator: copy-paste each block into the corresponding form field. Don't
> paraphrase; the judges compare submissions field-by-field.