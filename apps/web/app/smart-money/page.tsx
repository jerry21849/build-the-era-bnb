"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { SMART_MONEY_AGENTS } from "@build-the-era/sdk";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ConnectButton } from "@/components/ConnectButton";
import { SmartMoneyAgentCard } from "@/components/SmartMoneyAgentCard";

export default function SmartMoneyPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return SMART_MONEY_AGENTS.filter((agent) => {
      const matchesCategory = category === "all" || agent.slug === category;
      const haystack = [agent.name, agent.category, agent.summary, ...agent.capabilities, ...agent.outputs]
        .join(" ")
        .toLowerCase();
      return matchesCategory && (!normalized || haystack.includes(normalized));
    });
  }, [category, query]);

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-6 py-8 text-slate-950 md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 flex items-start justify-between gap-6">
          <div>
            <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-950">← Build the Era</Link>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">BNB Smart Money Era</p>
            <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">Specialists you can inspect before you trust.</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">Four read-only capability cards for Smart Money workflows on BSC. Every result is demo data: no custody, no autonomous trades, no investment advice.</p>
          </div>
          <ConnectButton />
        </header>

        <section className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          <strong>Safety boundary:</strong> these cards explain analysis workflows and show sample outputs. They do not connect to live funds, sign transactions, place orders, rebalance liquidity, or execute lending actions.
        </section>

        <CategoryFilter query={query} category={category} onQueryChange={setQuery} onCategoryChange={setCategory} />
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {filtered.map((agent) => <SmartMoneyAgentCard key={agent.slug} agent={agent} />)}
        </div>
        {filtered.length === 0 && <p className="mt-8 rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">No capability card matches that search.</p>}
      </div>
    </main>
  );
}
