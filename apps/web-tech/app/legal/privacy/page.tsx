"use client";

import React from "react";
import { AppShell, SectionCard } from "@repo/ui";

export default function PrivacyPage() {
  return (
    <AppShell title="개인정보처리방침" subtitle="기사 웹">
      <SectionCard heading="수집항목/목적">
        <p>기사 계정 정보, 위치 권한(운영용), 작업 로그 — 출동/정산/분쟁 대응.</p>
      </SectionCard>
      <SectionCard heading="제3자 제공">
        <p>고객/콜센터에 기사 정보(상호/연락처/사업자정보)를 노출합니다.</p>
      </SectionCard>
      <SectionCard heading="보유기간/파기/문의">
        <p>법령 및 계약에 따라 보유 후 파기. 문의: support@example.com</p>
      </SectionCard>
    </AppShell>
  );
}
