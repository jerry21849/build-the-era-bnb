import type { Brief, OfferInput } from "./offers";

const DISALLOWED_SCOPE = /(?:on[- ]chain|wallet|transfer|bridge|swap|stake|staking|hot wallet|governance|vote|discord|twitter|x\/|follow|repost|social|survey|kyc|whitelist|private repo|forked starter|starter repo|credential|password|secret|destructive|delete|drain|exploit|penetration|buy for|purchase|sign transaction|transaction trace|pool position|ethereum|arbitrum|cross-chain|real payment|live payment|token issuance|reward distribution|telegram|faucet|testnet badge|profile signup|account registration|production access|private data)/i;

export type BriefSkipReason =
  | "not-open"
  | "has-quotes"
  | "past-deadline"
  | "requires-excluded-access";

export function briefSkipReason(
  brief: Pick<Brief, "status" | "quoteCount" | "deadlineAt" | "title" | "scope" | "tags">,
  now = Date.now()
): BriefSkipReason | null {
  if (brief.status !== "OPEN") return "not-open";
  if (brief.quoteCount > 0) return "has-quotes";
  if (new Date(brief.deadlineAt).getTime() <= now) return "past-deadline";
  const text = [brief.title, brief.scope, ...brief.tags].join(" ");
  if (DISALLOWED_SCOPE.test(text)) return "requires-excluded-access";
  return null;
}

export function eligibleBriefs(briefs: Brief[], now = Date.now()): Brief[] {
  return briefs.filter((brief) => briefSkipReason(brief, now) === null);
}

export function deliveryDaysForDeadline(
  deadlineAt: string,
  now = Date.now(),
  requestedDays = 3
): number | null {
  const remainingDays = Math.floor(
    (new Date(deadlineAt).getTime() - now) / 86_400_000
  );
  if (remainingDays < 1) return null;
  return Math.max(1, Math.min(requestedDays, remainingDays));
}

export function validateOfferInput(brief: Brief, input: OfferInput, now = Date.now()): string[] {
  const errors: string[] = [];
  const skip = briefSkipReason(brief, now);
  if (skip) errors.push(`brief is not eligible: ${skip}`);
  if (input.price !== brief.budget.min) errors.push("price must equal budget.min");
  if (input.currency !== brief.budget.currency) errors.push("currency must match brief");
  const deliveryDays = deliveryDaysForDeadline(brief.deadlineAt, now, input.deliveryDays);
  if (deliveryDays === null || input.deliveryDays > deliveryDays) {
    errors.push("deliveryDays exceeds the remaining deadline");
  }
  if (input.proofMethod !== brief.proofMethod) errors.push("proofMethod must match brief");
  if (input.settlementType !== brief.settlementType) errors.push("settlementType must match brief");
  if (input.validUntilHours !== 72) errors.push("validUntilHours must be 72");
  return errors;
}
