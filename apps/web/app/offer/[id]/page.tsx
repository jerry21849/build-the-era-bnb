"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@/components/ConnectButton";
import { useParams } from "next/navigation";
import {
  type Brief,
  getOffer,
  submitOffer,
  type OfferInput,
} from "@build-the-era/sdk";

export default function OfferPage() {
  const params = useParams<{ id: string }>();
  const briefId = params?.id;
  const { isConnected } = useAccount();

  const [brief, setBrief] = useState<Brief | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("USDC");
  const [deliveryDays, setDeliveryDays] = useState(3);
  const [scope, setScope] = useState("");
  const [message, setMessage] = useState(
    "Will deliver the agreed scope within the stated timeline. Offer valid for 72 hours."
  );
  const [validUntilHours] = useState(72);

  const [busy, setBusy] = useState(false);
  const [offerId, setOfferId] = useState<string | null>(null);
  const [verified, setVerified] = useState<"ACTIVE" | "OTHER" | null>(null);

  useEffect(() => {
    if (!briefId) return;
    void (async () => {
      try {
        const sessionToken =
          window.localStorage.getItem("termix_session_token") ?? undefined;
        // Re-fetch the brief via the discover endpoint filter — using the
        // getOffer endpoint requires an offer id, so we filter discover.
        const res = await fetch(
          `https://platform-backend.prod.termix.live/api/v1/prepayment-orders/${briefId}`,
          sessionToken
            ? { headers: { authorization: `Bearer ${sessionToken}` } }
            : undefined
        );
        if (!res.ok) throw new Error(`Fetch brief failed: ${res.status}`);
        const data = (await res.json()) as Brief & {
          budget: { min: string; max: string; currency: string };
          proofMethod: OfferInput["proofMethod"];
          settlementType: OfferInput["settlementType"];
        };
        setBrief(data);
        setPrice(data.budget.min);
        setCurrency(data.budget.currency);
        setScope(data.scope);
      } catch (e) {
        setErr(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [briefId]);

  async function onSubmit() {
    if (!brief) return;
    setBusy(true);
    setErr(null);
    setOfferId(null);
    setVerified(null);
    try {
      const sessionToken = window.localStorage.getItem("termix_session_token");
      if (!sessionToken) throw new Error("Sign in via wallet first.");

      // Re-fetch brief right before submit to confirm OPEN + quoteCount===0
      const fresh = await fetch(
        `https://platform-backend.prod.termix.live/api/v1/prepayment-orders/${brief.id}`,
        { headers: { authorization: `Bearer ${sessionToken}` } }
      );
      if (!fresh.ok) throw new Error(`Re-fetch failed: ${fresh.status}`);
      const freshData = await fresh.json();
      if (freshData.status !== "OPEN") throw new Error("Brief no longer OPEN.");
      if (freshData.quoteCount > 0)
        throw new Error("Brief already has quotes — skipping.");

      const input: OfferInput = {
        providerAgentId: window.localStorage.getItem("provider_agent_id") ?? "",
        price,
        currency,
        deliveryDays,
        scope,
        proofMethod: freshData.proofMethod,
        settlementType: freshData.settlementType,
        message,
        validUntilHours,
      };
      if (!input.providerAgentId)
        throw new Error("Missing providerAgentId. Mint agent first.");

      const result = await submitOffer(brief.id, input, sessionToken);
      setOfferId(result.id);

      // Verify ACTIVE
      const verify = await getOffer(result.id, sessionToken);
      setVerified(verify.status === "ACTIVE" ? "ACTIVE" : "OTHER");
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  if (loading) return <main className="p-8">Loading…</main>;
  if (!brief) return <main className="p-8 text-red-700">{err ?? "Not found."}</main>;

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">Tender offer</h1>
        <ConnectButton />
      </header>
      <section className="border rounded-lg p-4 mb-6 bg-gray-50">
        <h2 className="font-semibold">{brief.title}</h2>
        <p className="text-sm text-gray-600">{brief.scope}</p>
        <p className="text-xs text-gray-400 mt-1">
          budget {brief.budget.min}–{brief.budget.max} {brief.budget.currency} ·
          deadline {new Date(brief.deadlineAt).toLocaleString()}
        </p>
      </section>

      <form
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          void onSubmit();
        }}
      >
        <Row label="Price (locked to budget.min)">
          <input
            className="w-full border rounded p-2 font-mono"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Row>
        <Row label="Currency">
          <input
            className="w-full border rounded p-2 font-mono"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />
        </Row>
        <Row label="Delivery days (≤ deadline)">
          <input
            type="number"
            min={1}
            max={Math.max(
              1,
              Math.floor(
                (new Date(brief.deadlineAt).getTime() - Date.now()) /
                  86_400_000
              )
            )}
            className="w-full border rounded p-2 font-mono"
            value={deliveryDays}
            onChange={(e) => setDeliveryDays(Number(e.target.value))}
          />
        </Row>
        <Row label="Scope">
          <textarea
            rows={4}
            className="w-full border rounded p-2"
            value={scope}
            onChange={(e) => setScope(e.target.value)}
          />
        </Row>
        <Row label="Message">
          <textarea
            rows={3}
            className="w-full border rounded p-2"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Row>
        <p className="text-xs text-gray-500">
          proofMethod + settlementType will be copied from the brief verbatim.
          offer validUntil = 72h.
        </p>
        <button
          type="submit"
          disabled={!isConnected || busy || verified === "ACTIVE"}
          className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
        >
          {busy ? "Submitting…" : "Submit off-chain offer"}
        </button>

        {offerId && (
          <p className="text-sm">
            offerId: <span className="font-mono">{offerId}</span> · verified:{" "}
            <span
              className={
                verified === "ACTIVE" ? "text-green-700" : "text-orange-700"
              }
            >
              {verified ?? "PENDING"}
            </span>
          </p>
        )}
        {err && (
          <p className="text-sm text-red-700" role="alert">
            {err}
          </p>
        )}
      </form>
    </main>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </span>
      {children}
    </label>
  );
}