"use client";

import React, { useState } from "react";
import {
  AppShell,
  CaseStickySummary,
  SectionCard,
  PhotoUploader,
  EvidenceGallery,
  Button,
  InlineError
} from "@repo/ui";
import { CaseStatus } from "@repo/domain";
import { useParams } from "next/navigation";

const steps: { label: string; to: CaseStatus }[] = [
  { label: "배정됨", to: CaseStatus.ASSIGNED },
  { label: "출동 시작", to: CaseStatus.EN_ROUTE },
  { label: "도착", to: CaseStatus.ARRIVED },
  { label: "작업 시작", to: CaseStatus.WORKING },
  { label: "OTP 요청", to: CaseStatus.OTP_PENDING }
];

export default function JobDetailPage() {
  const params = useParams();
  const id = params?.id || "301";
  const [statusIndex, setStatusIndex] = useState(0);
  const [error, setError] = useState(false);

  const advance = () => {
    if (statusIndex >= steps.length - 1) {
      setError(true);
      return;
    }
    setStatusIndex((prev) => prev + 1);
  };

  return (
    <AppShell title={`작업 ${id}`} subtitle="T-03 — 출동→도착→작업→OTP">
      <div style={{ display: "grid", gap: 16 }}>
        <CaseStickySummary status={steps[statusIndex].to} eta={[10, 15]} gu="강남구" dong="역삼동" />
        <SectionCard heading="Action Stepper">
          <p>현재 단계: {steps[statusIndex].label}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {steps.map((step, idx) => (
              <Button key={step.label} variant={idx === statusIndex ? "primary" : "ghost"} onClick={() => setStatusIndex(idx)}>
                {step.label}
              </Button>
            ))}
          </div>
          <Button onClick={advance}>다음 단계</Button>
          {error && (
            <InlineError
              title="더 진행할 단계가 없습니다"
              actionLabel="닫기"
              onAction={() => setError(false)}
              detail="OTP_PENDING 이후는 완료/보고 단계입니다."
            />
          )}
        </SectionCard>

        <SectionCard heading="추가 작업비 요청/동의">
          <p>실린더 교체 등 추가비 발생 시 고객 재동의를 요청하고 로그를 남깁니다.</p>
          <Button variant="ghost" onClick={() => alert("추가비 동의 요청 기록")}>
            동의 요청 보내기
          </Button>
        </SectionCard>

        <SectionCard heading="전/후 사진 (필수)">
          <PhotoUploader label="전 사진" required />
          <PhotoUploader label="후 사진" required />
          <EvidenceGallery items={[{ id: "pre", label: "전", time: "12:00" }, { id: "post", label: "후", time: "12:40" }]} />
        </SectionCard>

        <SectionCard heading="노트">
          <textarea
            style={{ width: "100%", minHeight: 80, padding: 12, borderRadius: 10, border: "1px solid var(--neutral-200)" }}
            placeholder="현장 메모를 기록하세요"
          />
        </SectionCard>
      </div>
    </AppShell>
  );
}
