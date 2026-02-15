"use client";

import { PipelineItem, PipelineStatus } from "@/lib/types";
import { generateId } from "@/lib/data";
import EditableField from "./EditableField";
import StatusSelect from "./StatusSelect";
import { Plus, Trash2 } from "lucide-react";

const pipelineStatuses: PipelineStatus[] = [
  "Submitted",
  "Interviewing",
  "Active",
  "Waiting",
  "Completed",
];

interface PipelineTableProps {
  items: PipelineItem[];
  onUpdate: (items: PipelineItem[]) => void;
}

export default function PipelineTable({ items, onUpdate }: PipelineTableProps) {
  const updateItem = (id: string, updates: Partial<PipelineItem>) => {
    onUpdate(items.map((i) => (i.id === id ? { ...i, ...updates } : i)));
  };

  const addItem = () => {
    onUpdate([
      ...items,
      {
        id: generateId(),
        client: "New Client",
        platform: "Upwork",
        status: "Submitted",
        rate: "",
        lastContact: "",
        nextAction: "",
        notes: "",
      },
    ]);
  };

  const deleteItem = (id: string) => {
    onUpdate(items.filter((i) => i.id !== id));
  };

  // Group by status for visual separation
  const statusOrder: PipelineStatus[] = [
    "Active",
    "Interviewing",
    "Waiting",
    "Submitted",
    "Completed",
  ];

  const sortedItems = [...items].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  );

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-zinc-500 border-b border-zinc-800">
              <th className="pb-2 pr-4 font-medium">Client / Project</th>
              <th className="pb-2 pr-4 font-medium">Platform</th>
              <th className="pb-2 pr-4 font-medium">Status</th>
              <th className="pb-2 pr-4 font-medium">Rate</th>
              <th className="pb-2 pr-4 font-medium">Last Contact</th>
              <th className="pb-2 pr-4 font-medium">Next Action</th>
              <th className="pb-2 pr-4 font-medium">Notes</th>
              <th className="pb-2 w-8"></th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr
                key={item.id}
                className="border-b border-zinc-800/50 hover:bg-zinc-900/50 group"
              >
                <td className="py-2 pr-4">
                  <EditableField
                    value={item.client}
                    onSave={(v) => updateItem(item.id, { client: v })}
                    className="font-medium"
                  />
                </td>
                <td className="py-2 pr-4">
                  <EditableField
                    value={item.platform}
                    onSave={(v) => updateItem(item.id, { platform: v })}
                  />
                </td>
                <td className="py-2 pr-4">
                  <StatusSelect
                    value={item.status}
                    options={pipelineStatuses}
                    type="pipeline"
                    onChange={(v) => updateItem(item.id, { status: v })}
                  />
                </td>
                <td className="py-2 pr-4">
                  <EditableField
                    value={item.rate}
                    onSave={(v) => updateItem(item.id, { rate: v })}
                  />
                </td>
                <td className="py-2 pr-4">
                  <EditableField
                    value={item.lastContact}
                    onSave={(v) => updateItem(item.id, { lastContact: v })}
                    type="date"
                    placeholder="Set date"
                  />
                </td>
                <td className="py-2 pr-4">
                  <EditableField
                    value={item.nextAction}
                    onSave={(v) => updateItem(item.id, { nextAction: v })}
                    placeholder="Add action"
                  />
                </td>
                <td className="py-2 pr-4 max-w-[200px]">
                  <EditableField
                    value={item.notes}
                    onSave={(v) => updateItem(item.id, { notes: v })}
                    placeholder="Add notes"
                  />
                </td>
                <td className="py-2">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addItem}
        className="mt-3 flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors px-2 py-1"
      >
        <Plus className="w-4 h-4" />
        Add row
      </button>
    </div>
  );
}
