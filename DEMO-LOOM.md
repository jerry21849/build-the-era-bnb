# Loom Demo — Build the Era (TermiX sponsor track)

> **Status**: script drafted 2026-09-05. Recording itself cannot be done
> autonomously (Loom requires a human-presented recording session). Operator
> `@Tracy_0218_` records, edits, and uploads the resulting `.mp4` to the
> submission form.

## Recording targets

- **Length**: 4:30–5:30 minutes
- **Resolution**: 1080p
- **Audio**: narration in Cantonese + on-screen English captions for judges
- **Format**: upload as `.mp4` ≤ 250 MB, attach to hackathon submission

## Scene-by-scene script

### Scene 1 — Cold open (0:00–0:25)

| Time | Visual | Voiceover |
|---|---|---|
| 0:00 | Title card: **Build the Era — Agent-to-Agent Marketplace on BNB Chain** | "This is what an agent economy looks like when trust is on-chain, not on a platform." |
| 0:10 | Show TermiX logo + BNB Chain logo side-by-side | "Built on TermiX, the trustless agent marketplace on BNB Chain." |
| 0:20 | Show hackathon prize banner: "$10,000 USDT track" | "Submission for the Build the Era Hackathon, TermiX sponsor track." |

### Scene 2 — Wallet connect (0:25–1:00)

| Time | Visual | Voiceover |
|---|---|---|
| 0:25 | Open the live demo URL | "Open the demo." |
| 0:30 | Click "Connect Wallet" → injected-wallet chooser | "Connect an injected BNB Chain wallet. This prototype keeps the connector surface intentionally small and explicit." |
| 0:50 | Pick MetaMask → confirm | "One click, BSC mainnet, no extra round-tripping." |

### Scene 3 — Mint agent (1:00–2:15)

| Time | Visual | Voiceover |
|---|---|---|
| 1:00 | Navigate to `/mint-agent` | "The first flow: mint an ERC-8004 identity." |
| 1:10 | Fill form (handle, display name, category, tags) | "Each agent gets a unique handle and an on-chain identity. Category is a strict enum — backend rejects junk." |
| 1:35 | Click **Mint agent** | "The flow is two steps: backend prepares the metadata and call data, then wallet signs one transaction. No new contracts, just TermiX's audited IdentityRegistry." |
| 1:50 | MetaMask popup appears | "Wallet prompts to sign. Gas only — no mint fee." |
| 2:00 | Confirmation screen with agentTokenId | "Indexer confirms. The agent is now live on BNB Chain and visible in the wallet's owned-agents list." |

### Scene 4 — Smart Money + Discover + offer (2:15–4:00)

| Time | Visual | Voiceover |
|---|---|---|
| 2:15 | Navigate to `/smart-money` | "Before taking work, inspect four Smart Money capability cards: LP rebalancing, grid strategy, yield research, and lending health." |
| 2:35 | Open one card and show DEMO badge, inputs, outputs, and risk notes | "These are read-only sample runs. The marketplace makes capability and risk boundaries visible without custody or autonomous execution." |
| 2:50 | Navigate to `/discover` | "Next, providers browse OPEN briefs." |
| 2:30 | List of OPEN TASKs | "Filter: status OPEN, quoteCount zero. Briefs requiring on-chain custody, external social accounts, or unprovided private repos are excluded by the provider policy baked into this UI." |
| 3:00 | Click **Tender offer** on a brief | "Provider side: build an offer in 30 seconds." |
| 3:15 | Form auto-populated with budget.min, currency, deadline | "Price locked to budget.min, currency from the brief, delivery days capped by the deadline. proofMethod and settlementType are copied verbatim — no guessing." |
| 3:40 | Click submit → ACTIVE confirmation | "Submit is a single off-chain POST. No gas, no chain reorg risk. The UI re-fetches the offer to verify status is ACTIVE before celebrating." |

### Scene 5 — Wrap-up (4:00–5:00)

| Time | Visual | Voiceover |
|---|---|---|
| 4:00 | Show `PROGRESS.md` with implemented and deferred scopes | "We shipped a public BSC marketplace slice and four Smart Money capability cards, while keeping funding, delivery, and external credentials explicitly out of the demo boundary." |
| 4:15 | Show repo link + `packages/sdk` README | "The SDK is reusable. Any team can spin up their own agent marketplace UI on top of TermiX." |
| 4:30 | Show TermiX points / Kaito mindshare banner | "Every verified marketplace activity accrues TermiX Points. Builders earn mindshare on Kaito. Symbiotic loop." |
| 4:50 | Title card + GitHub repo URL | "Try it: github.com/jerry21849/build-the-era-bnb. Thanks for watching." |

## Recording checklist (operator)

- [ ] Open `https://build-the-era-bnb.vercel.app` (post-deploy URL)
- [ ] Use **Loom desktop app** (not browser extension — better audio)
- [ ] Set resolution 1080p, mic input to **default**, enable HD
- [ ] Screen: full window, hide notifications, dark mode optional
- [ ] Pre-fill the mint form so on-screen text is large enough to read
- [ ] Narrate in Cantonese; on-screen captions in English for judges
- [ ] Trim cold open to ≤ 25 s; total length ≤ 5:30
- [ ] Export as `.mp4`, upload to Loom, copy share link to submission form

## What to do if a step fails on camera

- **Wallet signature rejected**: re-prompt, explain "user-side approval"
- **Indexer slow to confirm**: show the poll loop; narrate "this typically takes 5–15 s on BSC"
- **Brief already QUOTED**: switch to a different OPEN, quoteCount=0 brief

## Submission form fields (to copy into TermiX hackathon form)

- Team name: `@Tracy_0218_`
- Track: $10,000 USDT (TermiX sponsor track)
- Project name: **Build the Era — Agent-to-Agent Marketplace**
- GitHub: https://github.com/jerry21849/build-the-era-bnb
- Live demo: https://build-the-era-bnb.vercel.app (post-deploy)
- Loom: <paste share link here>
- One-line pitch: "A typed agent-to-agent marketplace UI on BNB Chain, built entirely on TermiX's audited contracts — no new code on-chain, just a clean UX and a reusable SDK."