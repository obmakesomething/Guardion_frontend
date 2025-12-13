"use client";

import React from "react";
import { AppShell, SectionCard, FormField, Input, Button } from "@repo/ui";
import { useParams } from "next/navigation";

export default function ReportPage() {
  const params = useParams();
  const id = params?.id || "301";

  return (
    <AppShell title="소견서 작성" subtitle="T-04 — 원인/근거/확신도">
      <SectionCard heading={`케이스 ${id} 리포트`}>
        <FormField label="원인 카테고리">
          <Input placeholder="예: 실린더 고장" />
        </FormField>
        <FormField label="근거(필수)">
          <textarea
            style={{ width: "100%", minHeight: 100, padding: 12, borderRadius: 10, border: "1px solid var(--neutral-200)" }}
            placeholder="근거를 입력하세요"
          />
        </FormField>
        <FormField label="확신도">
          <select style={{ padding: 10, borderRadius: 10, border: "1px solid var(--neutral-200)" }}>
            <option>낮음</option>
            <option>중간</option>
            <option>높음</option>
          </select>
        </FormField>
        <Button>리포트 제출</Button>
      </SectionCard>
    </AppShell>
  );
}
