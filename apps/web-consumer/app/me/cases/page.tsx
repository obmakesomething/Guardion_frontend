"use client";

import React from "react";
import { AppShell, FilterBar, CaseCard } from "@repo/ui";
import { CaseStatus } from "@repo/domain";

const cases = [
  { id: "101", status: CaseStatus.COMPLETED, gu: "강남구", createdAt: new Date().toISOString() },
  { id: "102", status: CaseStatus.DISPATCHING, gu: "마포구", createdAt: new Date().toISOString() }
];

export default function MyCasesPage() {
  return (
    <AppShell title="내 요청 목록" subtitle="C-08 — 로그인 사용자">
      <FilterBar>
        <span className="badge">최근 30일</span>
        <span className="badge">전체 상태</span>
      </FilterBar>
      <div style={{ display: "grid", gap: 12 }}>
        {cases.map((c) => (
          <CaseCard key={c.id} id={c.id} status={c.status} gu={c.gu} createdAt={c.createdAt} onOpen={() => (window.location.href = `/cases/${c.id}`)} />
        ))}
      </div>
    </AppShell>
  );
}
