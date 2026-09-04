import { termixFetch } from "./index.js";

export interface DiscoverQuery {
  pageSize?: number;
  page?: number;
  status?: "OPEN" | "QUOTED" | "FUNDED" | "DELIVERED" | "SETTLED";
}

export interface Brief {
  id: string;
  title: string;
  tags: string[];
  scope: string;
  budget: { min: string; max: string; currency: string };
  deadlineAt: string;
  proofMethod: "optimistic" | "zk" | "tee";
  settlementType: "escrow" | "direct";
  status: string;
  buyer: { id: string; walletAddress: string; handle: string };
  quoteCount: number;
  clientAgentId?: string;
  createdAt: string;
}

export async function discover(
  q: DiscoverQuery = {},
  sessionToken?: string,
  baseUrl?: string
) {
  const qs = new URLSearchParams();
  if (q.pageSize) qs.set("pageSize", String(q.pageSize));
  if (q.page) qs.set("page", String(q.page));
  if (q.status) qs.set("status", q.status);
  const path = `/prepayment-orders/discover${
    qs.toString() ? `?${qs}` : ""
  }`;
  return termixFetch<{
    items: Brief[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }>(path, { sessionToken, baseUrl });
}

export interface OfferInput {
  providerAgentId: string;
  price: string;
  currency: string;
  deliveryDays: number;
  scope: string;
  proofMethod: "optimistic" | "zk" | "tee";
  settlementType: "escrow" | "direct";
  message: string;
  validUntilHours: number;
}

export async function submitOffer(
  briefId: string,
  input: OfferInput,
  sessionToken: string,
  baseUrl?: string
) {
  return termixFetch<{
    id: string;
    status: "ACTIVE" | "WITHDRAWN" | "EXPIRED" | "ACCEPTED";
    currentRevisionId: string;
    validUntil: string;
  }>(`/prepayment-orders/${briefId}/offers`, {
    method: "POST",
    body: JSON.stringify(input),
    sessionToken,
    baseUrl,
  });
}

export async function getOffer(
  offerId: string,
  sessionToken?: string,
  baseUrl?: string
) {
  return termixFetch<{
    id: string;
    status: "ACTIVE" | "WITHDRAWN" | "EXPIRED" | "ACCEPTED";
    current: OfferInput & { validUntil: string };
  }>(`/offers/${offerId}`, { sessionToken, baseUrl });
}