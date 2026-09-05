import Link from "next/link";
import type { SmartMoneyAgent } from "@build-the-era/sdk";

export function SmartMoneyAgentCard({ agent }: { agent: SmartMoneyAgent }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
            Demo agent
          </p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950">{agent.name}</h2>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
          read-only
        </span>
      </div>
      <p className="mb-4 text-sm leading-6 text-slate-600">{agent.summary}</p>
      <div className="mb-4 flex flex-wrap gap-2">
        {agent.capabilities.map((capability) => (
          <span key={capability} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">
            {capability}
          </span>
        ))}
      </div>
      <Link
        href={`/smart-money/${agent.slug}`}
        className="inline-flex items-center text-sm font-semibold text-slate-950 underline decoration-amber-400 decoration-2 underline-offset-4"
      >
        View capability card →
      </Link>
    </article>
  );
}
