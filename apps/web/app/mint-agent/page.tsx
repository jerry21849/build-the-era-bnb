"use client";

import { useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { ConnectButton } from "@/components/ConnectButton";
import {
  prepareAgent,
  getAgentByTxHash,
  type AgentCategory,
  type AgentPrepareInput,
} from "@build-the-era/sdk";

const CATEGORIES: AgentCategory[] = [
  "Code & Smart Contracts",
  "Security & Verification",
  "Data & Research",
  "Design & Brand",
  "Writing & Content",
  "Automation & Ops",
  "Market & Protocol Research",
  "Model & Dataset Ops",
];

const SESSION_STORAGE_KEY = "termix_session_token";

export default function MintAgentPage() {
  const { isConnected, address } = useAccount();
  const { sendTransactionAsync } = useSendTransaction();

  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [category, setCategory] = useState<AgentCategory>("Automation & Ops");
  const [description, setDescription] = useState("");
  const [tagsInput, setTagsInput] = useState("bsc, automation, docs");

  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState<string>("");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [confirmedAgentTokenId, setConfirmedAgentTokenId] = useState<
    string | null
  >(null);
  const [error, setError] = useState<string | null>(null);

  async function onMint() {
    setBusy(true);
    setError(null);
    setTxHash(null);
    setConfirmedAgentTokenId(null);
    try {
      const sessionToken =
        typeof window !== "undefined"
          ? window.localStorage.getItem(SESSION_STORAGE_KEY) ?? ""
          : "";
      if (!sessionToken) {
        throw new Error(
          "No TermiX session in localStorage. Sign in at the homepage first (we'll wire it next)."
        );
      }
      const tags = tagsInput
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const input: AgentPrepareInput = {
        name,
        displayName,
        category,
        description,
        tags,
      };

      setStep("Preparing metadata on TermiX backend…");
      const prepared = await prepareAgent(input, sessionToken);

      setStep("Awaiting wallet signature (registerAgent)…");
      const hash = await sendTransactionAsync({
        to: prepared.contract as `0x${string}`,
        data: prepared.callData as `0x${string}`,
        value: 0n,
      });
      setTxHash(hash);

      setStep("Waiting for indexer to confirm (poll /agents/by-tx)…");
      for (let i = 0; i < 30; i++) {
        const r = await getAgentByTxHash(hash as `0x${string}`, sessionToken);
        if (r.status === "CONFIRMED") {
          const tokenId = r.agent?.agentTokenId ?? null;
          setConfirmedAgentTokenId(tokenId);
          if (tokenId) {
            window.localStorage.setItem("provider_agent_token_id", tokenId);
          }
          break;
        }
        await new Promise((res) => setTimeout(res, 4000));
      }
      setStep("Done.");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Mint your agent</h1>
        <ConnectButton />
      </header>

      {!isConnected ? (
        <p className="text-gray-600">Connect a wallet on BNB Chain to begin.</p>
      ) : (
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void onMint();
          }}
        >
          <Field label="Handle (unique, e.g. katrina-bsc-provider)">
            <input
              required
              className="w-full border rounded p-2 font-mono text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field label="Display name">
            <input
              required
              className="w-full border rounded p-2"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Field>
          <Field label="Category (strict enum)">
            <select
              className="w-full border rounded p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value as AgentCategory)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Description">
            <textarea
              required
              rows={3}
              className="w-full border rounded p-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Field>
          <Field label="Tags (comma-separated)">
            <input
              className="w-full border rounded p-2 font-mono text-sm"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
            />
          </Field>

          <button
            type="submit"
            disabled={busy || !name || !displayName || !description}
            className="bg-black text-white rounded px-4 py-2 disabled:opacity-50"
          >
            {busy ? "Minting…" : "Mint agent"}
          </button>

          {step && (
            <p className="text-sm text-gray-600" aria-live="polite">
              {step}
            </p>
          )}
          {txHash && (
            <p className="text-sm">
              tx:{" "}
              <a
                className="underline font-mono"
                target="_blank"
                rel="noreferrer"
                href={`https://bscscan.com/tx/${txHash}`}
              >
                {txHash.slice(0, 10)}…
              </a>
            </p>
          )}
          {confirmedAgentTokenId && (
            <p className="text-sm text-green-700">
              ✓ Confirmed. agentTokenId = {confirmedAgentTokenId}
            </p>
          )}
          {error && (
            <p className="text-sm text-red-700" role="alert">
              {error}
            </p>
          )}
          <p className="text-xs text-gray-400 mt-4">
            Sender wallet: <span className="font-mono">{address}</span>
          </p>
        </form>
      )}
    </main>
  );
}

function Field({
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