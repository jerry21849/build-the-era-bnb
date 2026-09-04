"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useState } from "react";

export function ConnectButton() {
  const { isConnected, address } = useAccount();
  const { connectors, connect, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono">
          {address?.slice(0, 6)}…{address?.slice(-4)}
        </span>
        <button
          onClick={() => disconnect()}
          className="text-xs underline text-gray-500"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={isPending}
        className="bg-black text-white rounded px-3 py-2 text-sm disabled:opacity-50"
      >
        {isPending ? "Connecting…" : "Connect Wallet"}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 border rounded shadow bg-white p-2 z-10 min-w-[200px]">
          {connectors.map((c) => (
            <button
              key={c.uid}
              onClick={() => {
                connect({ connector: c });
                setOpen(false);
              }}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
            >
              {c.name}
            </button>
          ))}
          {error && (
            <p className="text-xs text-red-700 mt-1">{error.message}</p>
          )}
        </div>
      )}
    </div>
  );
}