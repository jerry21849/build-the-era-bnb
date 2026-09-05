import Link from "next/link";
import { notFound } from "next/navigation";
import { getSmartMoneyAgent, SMART_MONEY_AGENTS } from "@build-the-era/sdk";

export function generateStaticParams() {
  return SMART_MONEY_AGENTS.map((agent) => ({ slug: agent.slug }));
}

export default async function SmartMoneyAgentPage({ params }: { params: { slug: string } }) {
  const agent = getSmartMoneyAgent(params.slug);
  if (!agent) notFound();

  return (
    <main className="min-h-screen bg-[#fbfaf7] px-6 py-8 text-slate-950 md:px-10">
      <div className="mx-auto max-w-4xl">
        <Link href="/smart-money" className="text-sm font-medium text-slate-500 hover:text-slate-950">← All Smart Money agents</Link>
        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-7 shadow-sm md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">Demo capability card</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">{agent.name}</h1>
          <p className="mt-2 text-sm font-medium text-slate-500">{agent.category}</p>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600">{agent.summary}</p>

          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <InfoList title="Capabilities" items={agent.capabilities} />
            <InfoList title="Inputs" items={agent.inputs} />
            <InfoList title="Outputs" items={agent.outputs} />
            <InfoList title="Risk notes" items={agent.riskNotes} warning />
          </div>

          <div className="mt-8 rounded-2xl bg-slate-950 p-5 text-white">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-semibold">Sample run · {agent.sampleRun.title}</h2>
              <span className="rounded-full bg-amber-400 px-2.5 py-1 text-xs font-semibold text-slate-950">{agent.sampleRun.status}</span>
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{agent.sampleRun.result}</p>
          </div>
        </div>
      </div>
    </main>
  );
}

function InfoList({ title, items, warning = false }: { title: string; items: string[]; warning?: boolean }) {
  return (
    <section>
      <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{title}</h2>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
        {items.map((item) => <li key={item} className={warning ? "text-amber-700" : undefined}>• {item}</li>)}
      </ul>
    </section>
  );
}
