export type BoardStatus = "Daily" | "Weekly" | "Pending" | "Inactive";

export interface JobBoard {
  id: string;
  name: string;
  url: string;
  icon: string;
  status: BoardStatus;
  lastChecked: string;
  notes: string;
}

export type PipelineStatus =
  | "Submitted"
  | "Interviewing"
  | "Active"
  | "Waiting"
  | "Completed";

export interface PipelineItem {
  id: string;
  client: string;
  platform: string;
  status: PipelineStatus;
  rate: string;
  lastContact: string;
  nextAction: string;
  notes: string;
}

export interface TargetCompany {
  id: string;
  name: string;
  description: string;
  salary: string;
  details: string;
  contact: string;
}
