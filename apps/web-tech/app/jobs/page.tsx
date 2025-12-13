"use client";

import React from "react";
import { AppShell, CaseCard } from "@repo/ui";
import { CaseStatus } from "@repo/domain";

const jobs = [
  { id: "301", status: CaseStatus.ASSIGNED, gu: "강남구", createdAt: new Date().toISOString() },
  { id: "302", status: CaseStatus.NEED_APPROVAL, gu: "마포구", createdAt: new Date().toISOString() }
];

export default function JobsPage() {
  return (
    <AppShell title="배정 목록" subtitle="T-02 — 오늘/현재 작업">
      <div style={{ display: "grid", gap: 12 }}>
        {jobs.map((job) => (
          <CaseCard
            key={job.id}
            id={job.id}
            status={job.status}
            gu={job.gu}
            createdAt={job.createdAt}
            onOpen={() => (window.location.href = `/jobs/${job.id}`)}
          />
        ))}
      </div>
    </AppShell>
  );
}
