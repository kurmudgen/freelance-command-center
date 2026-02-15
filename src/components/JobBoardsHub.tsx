"use client";

import { JobBoard, BoardStatus } from "@/lib/types";
import { generateId } from "@/lib/data";
import EditableField from "./EditableField";
import StatusSelect from "./StatusSelect";
import {
  Briefcase,
  Palette,
  Code,
  Brain,
  Rocket,
  Trophy,
  Hammer,
  Newspaper,
  Linkedin,
  ExternalLink,
  Plus,
  Trash2,
  CalendarCheck,
  Globe,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  briefcase: Briefcase,
  palette: Palette,
  code: Code,
  brain: Brain,
  rocket: Rocket,
  trophy: Trophy,
  hammer: Hammer,
  newspaper: Newspaper,
  linkedin: Linkedin,
  globe: Globe,
};

const boardStatuses: BoardStatus[] = ["Daily", "Weekly", "Pending", "Inactive"];

interface JobBoardsHubProps {
  boards: JobBoard[];
  onUpdate: (boards: JobBoard[]) => void;
}

export default function JobBoardsHub({ boards, onUpdate }: JobBoardsHubProps) {
  const updateBoard = (id: string, updates: Partial<JobBoard>) => {
    onUpdate(boards.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const addBoard = () => {
    onUpdate([
      ...boards,
      {
        id: generateId(),
        name: "New Board",
        url: "https://",
        icon: "globe",
        status: "Pending",
        lastChecked: "",
        notes: "",
      },
    ]);
  };

  const deleteBoard = (id: string) => {
    onUpdate(boards.filter((b) => b.id !== id));
  };

  const markCheckedToday = (id: string) => {
    updateBoard(id, { lastChecked: new Date().toISOString().split("T")[0] });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {boards.map((board) => {
          const Icon = iconMap[board.icon] || Globe;
          return (
            <div
              key={board.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-zinc-300" />
                  </div>
                  <div>
                    <EditableField
                      value={board.name}
                      onSave={(v) => updateBoard(board.id, { name: v })}
                      className="font-semibold text-sm"
                    />
                    <a
                      href={board.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-500 hover:text-blue-400 flex items-center gap-1 mt-0.5"
                    >
                      Open <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <StatusSelect
                    value={board.status}
                    options={boardStatuses}
                    type="board"
                    onChange={(v) => updateBoard(board.id, { status: v })}
                  />
                  <button
                    onClick={() => deleteBoard(board.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mb-2">
                <CalendarCheck className="w-3.5 h-3.5" />
                <span>Last checked:</span>
                <button
                  onClick={() => markCheckedToday(board.id)}
                  className="hover:text-green-400 transition-colors"
                  title="Mark as checked today"
                >
                  {board.lastChecked || "Never"}
                </button>
              </div>
              <div className="text-xs text-zinc-400">
                <EditableField
                  value={board.notes}
                  onSave={(v) => updateBoard(board.id, { notes: v })}
                  placeholder="Add notes..."
                />
              </div>
            </div>
          );
        })}
        <button
          onClick={addBoard}
          className="border border-dashed border-zinc-700 rounded-xl p-4 flex items-center justify-center gap-2 text-zinc-500 hover:text-zinc-300 hover:border-zinc-600 transition-colors min-h-[140px]"
        >
          <Plus className="w-5 h-5" />
          Add Board
        </button>
      </div>
    </div>
  );
}
