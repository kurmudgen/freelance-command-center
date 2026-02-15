"use client";

import { BoardStatus, PipelineStatus } from "@/lib/types";

const boardColors: Record<BoardStatus, string> = {
  Daily: "bg-green-500/20 text-green-400 border-green-500/30",
  Weekly: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Pending: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Inactive: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

const pipelineColors: Record<PipelineStatus, string> = {
  Submitted: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Interviewing: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Active: "bg-green-500/20 text-green-400 border-green-500/30",
  Waiting: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Completed: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
};

interface StatusBadgeProps {
  status: BoardStatus | PipelineStatus;
  type: "board" | "pipeline";
  onClick?: () => void;
}

export default function StatusBadge({ status, type, onClick }: StatusBadgeProps) {
  const colors =
    type === "board"
      ? boardColors[status as BoardStatus]
      : pipelineColors[status as PipelineStatus];

  return (
    <span
      onClick={onClick}
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${colors} ${
        onClick ? "cursor-pointer hover:opacity-80" : ""
      }`}
    >
      {status}
    </span>
  );
}
