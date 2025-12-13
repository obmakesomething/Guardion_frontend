"use client";

import React from "react";
import {
  AppShell,
  CaseStickySummary,
  AreaEtaMap,
  Timeline,
  ContactBlock,
  EvidenceGallery,
  SectionCard,
  Button
} from "@repo/ui";
import { CaseStatus } from "@repo/domain";
import { useParams } from "next/navigation";

const steps = ["접수", "승인/검토", "배차", "출동", "OTP", "완료"];

export default function CaseDetailPage() {
  const params = useParams();
  const id = params?.id || "123";
  const status = CaseStatus.DISPATCHED;

  return (
    <AppShell title={`케이스 ${id}`} subtitle="C-03 — 진행/트래킹">
      <div style={{ display: "grid", gap: 16 }}>
        <CaseStickySummary status={status} eta={[10, 15]} gu="강남구" dong="역삼동" ctaLabel="OTP 입력" onCta={() => (window.location.href = `/cases/${id}/otp`)} />
        <SectionCard heading="지도 / ETA">
          <AreaEtaMap eta={[10, 15]} />
        </SectionCard>
        <SectionCard heading="타임라인">
          <Timeline steps={steps} current={3} />
        </SectionCard>
        <SectionCard heading="기사 연락">
          <ContactBlock techName="홍길동 기사" techPhone="010-1234-5678" company="열쇠마스터" businessInfo="123-45-67890" />
        </SectionCard>
        <SectionCard heading="증빙 (전/후 필수)">
          <EvidenceGallery
            items={[
              { id: "1", label: "전 - 문 상태", time: "2024-01-01 12:00" },
              { id: "2", label: "후 - 문 상태", time: "2024-01-01 12:40" }
            ]}
          />
          <p style={{ color: "var(--neutral-500)" }}>전/후 사진이 누락되면 작업 진행을 차단합니다.</p>
        </SectionCard>
        <SectionCard heading="추가비 동의">
          <p>실린더 교체 등 추가비 발생 시 재동의(버튼/서명/문자) 로그를 보여줍니다.</p>
          <Button variant="ghost">추가비 동의 요청 보기</Button>
        </SectionCard>
      </div>
    </AppShell>
  );
}
