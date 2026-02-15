"use client";

import Nav from "@/components/Nav";
import QuickStats from "@/components/QuickStats";
import JobBoardsHub from "@/components/JobBoardsHub";
import PipelineTable from "@/components/PipelineTable";
import TargetCompanies from "@/components/TargetCompanies";
import { useLocalStorage } from "@/lib/hooks";
import { defaultBoards, defaultPipeline, defaultTargets } from "@/lib/data";
import { JobBoard, PipelineItem, TargetCompany } from "@/lib/types";

export default function Home() {
  const [boards, setBoards, boardsLoaded] = useLocalStorage<JobBoard[]>(
    "fcc-boards",
    defaultBoards
  );
  const [pipeline, setPipeline, pipelineLoaded] = useLocalStorage<
    PipelineItem[]
  >("fcc-pipeline", defaultPipeline);
  const [targets, setTargets, targetsLoaded] = useLocalStorage<TargetCompany[]>(
    "fcc-targets",
    defaultTargets
  );
  const [connects, setConnects, connectsLoaded] = useLocalStorage<number>(
    "fcc-connects",
    574
  );

  const loaded = boardsLoaded && pipelineLoaded && targetsLoaded && connectsLoaded;

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-zinc-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-10">
        {/* Quick Stats */}
        <section id="stats">
          <QuickStats
            pipeline={pipeline}
            boards={boards}
            connects={connects}
            onConnectsChange={setConnects}
          />
        </section>

        {/* Job Boards Hub */}
        <section id="boards">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-500 rounded-full" />
            Job Boards Hub
          </h2>
          <JobBoardsHub boards={boards} onUpdate={setBoards} />
        </section>

        {/* Active Pipeline */}
        <section id="pipeline">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-green-500 rounded-full" />
            Active Pipeline
          </h2>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <PipelineTable items={pipeline} onUpdate={setPipeline} />
          </div>
        </section>

        {/* Post-Navy Targets */}
        <section id="targets">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <span className="w-1 h-6 bg-purple-500 rounded-full" />
            Post-Navy Target Companies
            <span className="text-xs font-normal text-zinc-500 ml-2">
              After December 2026
            </span>
          </h2>
          <TargetCompanies targets={targets} onUpdate={setTargets} />
        </section>
      </main>

      <footer className="text-center text-xs text-zinc-600 py-8">
        Freelance Command Center
      </footer>
    </div>
  );
}
