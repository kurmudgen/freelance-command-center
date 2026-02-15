"use client";

import { useState, useRef, useEffect } from "react";
import StatusBadge from "./StatusBadge";
import { BoardStatus, PipelineStatus } from "@/lib/types";

type ValidStatus = BoardStatus | PipelineStatus;

interface StatusSelectProps<T extends ValidStatus> {
  value: T;
  options: T[];
  type: "board" | "pipeline";
  onChange: (value: T) => void;
}

export default function StatusSelect<T extends ValidStatus>({
  value,
  options,
  type,
  onChange,
}: StatusSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative inline-block">
      <StatusBadge
        status={value}
        type={type}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute z-50 top-full mt-1 left-0 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl p-1 min-w-[120px]">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className="block w-full text-left px-2 py-1 rounded hover:bg-zinc-700 transition-colors"
            >
              <StatusBadge status={opt} type={type} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
