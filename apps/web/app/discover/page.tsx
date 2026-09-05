"use client";

import { useEffect, useState } from "react";
import { ConnectButton } from "@/components/ConnectButton";
import Link from "next/link";
import { discover, eligibleBriefs, type Brief } from "@build-the-era/sdk";

export default function DiscoverPage() {
  const [items, setItems] = useState<Brief[]>([]);
  const [total, setTotal] = useState(0);
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancel = false;
    void (async () => {
      try {
        const sessionToken =
          window.localStorage.getItem("termix_session_token") ?? undefined;
        const res = await discover(
          { pageSize: 20, status: "OPEN" },
          sessionToken
        );
        if (cancel) return;
        const eligible = eligibleBriefs(res.items);
        setItems(eligible);
        setTotal(eligible.length);
      } catch (e) {
        if (!cancel) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancel) setBusy(false);
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Discover briefs</h1>
          <p className="text-sm text-gray-500">
            OPEN TASKs on BSC · quoteCount === 0 only ·{" "}
            <Link className="underline" href="/">
              ← back
            </Link>
          </p>
        </div>
        <ConnectButton />
      </header>

      {busy && <p className="text-gray-500">Loading…</p>}
      {error && <p className="text-red-700 text-sm">{error}</p>}
      {!busy && !error && items.length === 0 && (
        <p className="text-gray-500">No OPEN briefs with zero quotes yet.</p>
      )}

      <ul className="space-y-3">
        {items.map((b) => (
          <li key={b.id} className="border rounded-lg p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h2 className="font-semibold">{b.title}</h2>
                <p className="text-sm text-gray-600 mt-1">{b.scope}</p>
                <p className="text-xs text-gray-400 mt-2">
                  deadline {new Date(b.deadlineAt).toLocaleString()} · proof{" "}
                  {b.proofMethod} · settlement {b.settlementType}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono">
                  {b.budget.min} {b.budget.currency}
                </p>
                <Link
                  className="text-sm underline mt-2 inline-block"
                  href={`/offer/${b.id}`}
                >
                  Tender offer →
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-400 mt-6">
        Showing {items.length} of {total} OPEN briefs.
      </p>
    </main>
  );
}