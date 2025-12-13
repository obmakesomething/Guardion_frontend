"use client";

import React from "react";
import { AppShell, SectionCard } from "@repo/ui";

export default function PrivacyPage() {
  return (
    <AppShell title="개인정보처리방침" subtitle="콜센터 콘솔용">
      <SectionCard heading="수집항목/목적">
        <p>이름, 연락처, 계정, 접속 로그 — 운영/배차/감사 기록 목적.</p>
      </SectionCard>
      <SectionCard heading="제3자 제공(기사)">
        <p>케이스 처리 및 분쟁 대응을 위해 기사/업체에 필요한 정보를 제공합니다.</p>
      </SectionCard>
      <SectionCard heading="보유기간/파기/문의">
        <p>법령에 따르며 목적 달성 후 파기. 문의: support@example.com</p>
      </SectionCard>
    </AppShell>
  );
}
