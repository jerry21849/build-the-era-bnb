export * from "./agents.js";
export * from "./offers.js";
export * from "./escrow.js";

export const DEFAULT_BASE_URL =
  "https://platform-backend.prod.termix.live/api/v1";

/**
 * Lower-level helper for authenticated off-chain REST calls.
 * Sessions are issued via `POST /auth/wallet`; pass the access token through.
 */
export async function termixFetch<T = unknown>(
  path: string,
  init: RequestInit & { baseUrl?: string; sessionToken?: string } = {}
): Promise<T> {
  const baseUrl = init.baseUrl ?? DEFAULT_BASE_URL;
  const headers = new Headers(init.headers);
  headers.set("content-type", "application/json");
  if (init.sessionToken) {
    headers.set("authorization", `Bearer ${init.sessionToken}`);
  }
  const res = await fetch(`${baseUrl}${path}`, { ...init, headers });
  if (!res.ok) {
    throw new Error(
      `TermiX ${init.method ?? "GET"} ${path} failed: ${res.status}`
    );
  }
  return res.json() as Promise<T>;
}