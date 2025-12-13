"use client";

import React from "react";
import {
  AppShell,
  CaseStickySummary,
  RiskGatePanel,
  DispatchPanel,
  EvidenceGallery,
  AuditLog,
  SectionCard,
  Button
} from "@repo/ui";
import { CaseStatus } from "@repo/domain";
import { useParams } from "next/navigation";

export default function QueueDetailPage() {
  const params = useParams();
  const id = params?.id || "201";

  return (
    <AppShell title={`케이스 ${id}`} subtitle="O-03 — 리스크/배차/로그/추가비 동의">
      <div style={{ display: "grid", gap: 16 }}>
        <CaseStickySummary status={CaseStatus.DISPATCHING} eta={[12, 18]} gu="강남구" dong="역삼동" ctaLabel="추가비 동의 로그" onCta={() => alert("추가비 동의 로그 확인")} />
        <RiskGatePanel />
        <DispatchPanel
          candidates={[
            { id: "t1", name: "홍길동", distanceKm: 2.4, availability: "가능", recentJobs: 3 },
            { id: "t2", name: "김기사", distanceKm: 4.2, availability: "가능", recentJobs: 5 }
          ]}
          onAssign={(techId) => alert(`배정 ${techId} (정산 3,000원 기록)`)}
        />
        <SectionCard heading="추가비 동의">
          <p>실린더 교체 요청 → 고객 재동의(버튼/서명/문자) 기록.</p>
          <Button variant="ghost">동의 로그 열기</Button>
        </SectionCard>
        <SectionCard heading="증빙 (전/후 필수)">
          <EvidenceGallery items={[{ id: "1", label: "전 - 도어락" }, { id: "2", label: "후 - 도어락" }]} />
        </SectionCard>
        <SectionCard heading="감사 로그">
          <AuditLog
            entries={[
              { id: "1", actor: "ops1", action: "Need approval 요청", at: "12:05" },
              { id: "2", actor: "ops1", action: "배차 시도", at: "12:07" }
            ]}
          />
        </SectionCard>
      </div>
    </AppShell>
  );
}
