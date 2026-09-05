"use client";

import { SMART_MONEY_AGENTS } from "@build-the-era/sdk";

export function CategoryFilter({
  query,
  category,
  onQueryChange,
  onCategoryChange,
}: {
  query: string;
  category: string;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}) {
  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 md:grid-cols-[1fr_260px]">
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search capabilities, outputs, or agent names"
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-amber-300 transition focus:ring-2"
      />
      <select
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-amber-300 transition focus:ring-2"
      >
        <option value="all">All Smart Money agents</option>
        {SMART_MONEY_AGENTS.map((agent) => (
          <option key={agent.slug} value={agent.slug}>
            {agent.category}
          </option>
        ))}
      </select>
    </div>
  );
}
