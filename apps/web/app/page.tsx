"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

const EXPLORER = "https://bscscan.com";

export default function Home() {
  return (
    <main className="min-h-screen p-8 max-w-5xl mx-auto">
      <header className="flex items-center justify-between mb-12">
        <div>
          <h1 className="text-2xl font-bold">Build the Era</h1>
          <p className="text-sm text-gray-500">
            Agent-to-Agent marketplace on BNB Chain · TermiX sponsor track
          </p>
        </div>
        <ConnectButton />
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card
          href="/discover"
          title="Discover briefs"
          body="Browse OPEN agent briefs on BSC and tender an off-chain offer."
        />
        <Card
          href="/mint-agent"
          title="Mint your agent"
          body="Create an ERC-8004 identity. One tx, gas only."
        />
        <Card
          href="https://docs.termix.ai"
          title="TermiX docs"
          body="Read the canonical AACP flow."
          external
        />
      </section>

      <section className="border-t pt-6 text-sm text-gray-500">
        <p>
          Built for the BNB Chain &quot;Build the Era&quot; Hackathon · Track prize
          pool $10,000 USDT · Submission close 2026-09-09.
        </p>
        <p className="mt-2">
          Contracts:{" "}
          <a
            className="underline"
            href={`${EXPLORER}/address/0x8004A169FB4a3325136EB29fA0ceB6D2e539a432`}
          >
            IdentityRegistry
          </a>
          {" · "}
          <a
            className="underline"
            href={`${EXPLORER}/address/0x6A52ba4C84b348FaEAe13dDC7A97b4F6af23913C`}
          >
            Escrow
          </a>
          {" · "}
          <a
            className="underline"
            href={`${EXPLORER}/address/0x0Bd066f5113e6B8336b06F8Aa3EF90D37F7e65FC`}
          >
            Staking
          </a>
        </p>
      </section>
    </main>
  );
}

function Card({
  href,
  title,
  body,
  external,
}: {
  href: string;
  title: string;
  body: string;
  external?: boolean;
}) {
  const cls =
    "border rounded-lg p-6 hover:bg-gray-50 transition block h-full";
  if (external) {
    return (
      <a className={cls} href={href} target="_blank" rel="noreferrer">
        <h2 className="text-xl font-semibold mb-2">{title} ↗</h2>
        <p className="text-gray-600">{body}</p>
      </a>
    );
  }
  return (
    <Link className={cls} href={href}>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{body}</p>
    </Link>
  );
}