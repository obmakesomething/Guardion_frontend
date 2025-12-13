"use client";

import React from "react";
import { AppShell, SectionCard, Button } from "@repo/ui";
import { useParams } from "next/navigation";

export default function SubmittedPage() {
  const params = useParams();
  const id = params?.id || "123";

  return (
    <AppShell title="접수 완료" subtitle="C-02 — 접수번호 안내">
      <SectionCard heading="접수 요약">
        <p>케이스 ID: {id}</p>
        <p>접수 완료되었습니다. 진행 화면에서 상태와 ETA를 확인하세요.</p>
        <Button onClick={() => (window.location.href = `/cases/${id}`)}>진행 보기</Button>
      </SectionCard>
    </AppShell>
  );
}
