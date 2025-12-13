"use client";

import React from "react";
import { AppShell, TwoPaneLayout, QueueTable, SectionCard, CaseStickySummary, Button } from "@repo/ui";
import { CaseStatus } from "@repo/domain";

const rows = [
  { id: "201", status: CaseStatus.SUBMITTED, receivedAt: "12:30", region: "강남구", risk: "낮음" },
  { id: "202", status: CaseStatus.NEED_APPROVAL, receivedAt: "12:10", region: "마포구", risk: "중간" },
  { id: "203", status: CaseStatus.DISPATCHING, receivedAt: "11:58", region: "송파구", risk: "높음" }
];

export default function QueuePage() {
  return (
    <AppShell title="큐" subtitle="O-02 — 리스트/디테일">
      <TwoPaneLayout
        list={<QueueTable rows={rows} onOpen={(id) => (window.location.href = `/queue/${id}`)} />}
        detail={
          <SectionCard heading="선택한 케이스">
            <p>리스트에서 케이스를 선택하세요.</p>
            <CaseStickySummary status={CaseStatus.SUBMITTED} gu="강남구" dong="역삼동" />
            <Button variant="ghost" onClick={() => (window.location.href = "/settings")}>
              설정 보기
            </Button>
          </SectionCard>
        }
      />
    </AppShell>
  );
}
