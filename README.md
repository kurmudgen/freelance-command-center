# Freelance Command Center

A personal dashboard for managing freelance job boards, client pipelines, and target companies. All data persists in localStorage — no backend required.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Storage:** localStorage (client-side only)

## Features

- **Quick Stats** — At-a-glance metrics for active contracts and connect balance
- **Job Boards Hub** — Track job board check-in frequency and status
- **Pipeline Table** — Manage client proposals with status tracking (Submitted, Interviewing, Active, Waiting, Completed)
- **Target Companies** — Maintain a list of target employers with salary ranges and contacts
- **Inline Editing** — Edit all fields directly in the dashboard
- **Persistent State** — All data saved to localStorage across sessions

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard
│   └── globals.css         # Global styles
├── components/
│   ├── Nav.tsx             # Navigation bar
│   ├── QuickStats.tsx      # Stats overview cards
│   ├── JobBoardsHub.tsx    # Job board tracking grid
│   ├── PipelineTable.tsx   # Client pipeline table
│   ├── TargetCompanies.tsx # Target company list
│   ├── EditableField.tsx   # Inline edit component
│   ├── StatusBadge.tsx     # Status indicator badges
│   └── StatusSelect.tsx    # Status dropdown selector
└── lib/
    ├── data.ts             # Default data and seed values
    ├── hooks.ts            # Custom hooks (useLocalStorage)
    └── types.ts            # TypeScript interfaces
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.
