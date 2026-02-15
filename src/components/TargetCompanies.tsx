"use client";

import { TargetCompany } from "@/lib/types";
import EditableField from "./EditableField";
import { Building2, Mail, MapPin, DollarSign } from "lucide-react";

interface TargetCompaniesProps {
  targets: TargetCompany[];
  onUpdate: (targets: TargetCompany[]) => void;
}

export default function TargetCompanies({
  targets,
  onUpdate,
}: TargetCompaniesProps) {
  const updateTarget = (id: string, updates: Partial<TargetCompany>) => {
    onUpdate(targets.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {targets.map((target) => (
        <div
          key={target.id}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-4 h-4 text-purple-400" />
            <EditableField
              value={target.name}
              onSave={(v) => updateTarget(target.id, { name: v })}
              className="font-semibold"
            />
          </div>
          <p className="text-sm text-zinc-400 mb-2">
            <EditableField
              value={target.description}
              onSave={(v) => updateTarget(target.id, { description: v })}
            />
          </p>
          {target.salary && (
            <div className="flex items-center gap-1 text-xs text-green-400 mb-1">
              <DollarSign className="w-3 h-3" />
              <EditableField
                value={target.salary}
                onSave={(v) => updateTarget(target.id, { salary: v })}
              />
            </div>
          )}
          <div className="flex items-center gap-1 text-xs text-zinc-500 mb-1">
            <MapPin className="w-3 h-3" />
            <EditableField
              value={target.details}
              onSave={(v) => updateTarget(target.id, { details: v })}
            />
          </div>
          {target.contact && (
            <div className="flex items-center gap-1 text-xs text-blue-400 mt-2">
              <Mail className="w-3 h-3" />
              <span>{target.contact}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
