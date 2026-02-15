"use client";

import { PipelineItem, JobBoard } from "@/lib/types";
import {
  Send,
  Users,
  Clock,
  Zap,
} from "lucide-react";

interface QuickStatsProps {
  pipeline: PipelineItem[];
  boards: JobBoard[];
  connects: number;
  onConnectsChange: (val: number) => void;
}

export default function QuickStats({
  pipeline,
  connects,
  onConnectsChange,
}: QuickStatsProps) {
  const submitted = pipeline.filter((p) => p.status === "Submitted").length;
  const active = pipeline.filter(
    (p) => p.status === "Active" || p.status === "Interviewing"
  ).length;
  const waiting = pipeline.filter((p) => p.status === "Waiting").length;

  const stats = [
    {
      label: "Submitted",
      value: submitted,
      icon: Send,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      label: "Active Clients",
      value: active,
      icon: Users,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      label: "Pending",
      value: waiting,
      icon: Clock,
      color: "text-orange-400",
      bg: "bg-orange-500/10",
    },
    {
      label: "Connects",
      value: connects,
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      editable: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div
          key={s.label}
          className={`${s.bg} border border-zinc-800 rounded-xl p-4 flex items-center gap-3`}
        >
          <s.icon className={`w-8 h-8 ${s.color}`} />
          <div>
            <div className="flex items-center gap-2">
              {s.editable ? (
                <input
                  type="number"
                  value={s.value}
                  onChange={(e) => onConnectsChange(Number(e.target.value))}
                  className="text-2xl font-bold bg-transparent border-none outline-none w-20"
                />
              ) : (
                <span className="text-2xl font-bold">{s.value}</span>
              )}
            </div>
            <span className="text-xs text-zinc-400">{s.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
