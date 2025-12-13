"use client";

import React from "react";
import { AppShell, SectionCard, EvidenceGallery, Button } from "@repo/ui";
import { useParams } from "next/navigation";

export default function CaseDonePage() {
  const params = useParams();
  const id = params?.id || "123";

  return (
    <AppShell title="완료/리포트" subtitle="C-06 — 소견서/증빙 요약">
      <div style={{ display: "grid", gap: 16 }}>
        <SectionCard heading={`케이스 ${id} 완료`}>
          <p>소견서: 잠금 장치 교체, 추가비 동의 완료</p>
          <EvidenceGallery
            items={[
              { id: "1", label: "전 - 실린더", time: "2024-01-01 12:00" },
              { id: "2", label: "후 - 실린더", time: "2024-01-01 12:40" }
            ]}
          />
          <Button variant="ghost">리포트 저장</Button>
        </SectionCard>
      </div>
    </AppShell>
  );
}
