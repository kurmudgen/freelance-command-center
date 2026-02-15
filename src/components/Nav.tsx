"use client";

import { LayoutDashboard, Globe, GitBranch, Target } from "lucide-react";

const links = [
  { href: "#stats", label: "Stats", icon: LayoutDashboard },
  { href: "#boards", label: "Job Boards", icon: Globe },
  { href: "#pipeline", label: "Pipeline", icon: GitBranch },
  { href: "#targets", label: "Post-Navy", icon: Target },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-40 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <h1 className="text-lg font-bold tracking-tight">
          Freelance Command Center
        </h1>
        <div className="flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <l.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{l.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
