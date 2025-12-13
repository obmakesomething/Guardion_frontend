"use client";

import React from "react";
import { AppShell, SectionCard } from "@repo/ui";

export default function PrivacyPage() {
  return (
    <AppShell title="개인정보처리방침" subtitle="수집항목/목적/보유기간/제3자 제공/파기/문의처">
      <SectionCard heading="수집항목">
        <ul>
          <li>이름, 전화번호, 이메일</li>
          <li>현장 정보(주소, 사진, OTP 기록)</li>
          <li>접속/로그 이벤트</li>
        </ul>
      </SectionCard>
      <SectionCard heading="목적/보유기간">
        <p>목적: 서비스 제공, 분쟁 대응, 고객 지원</p>
        <p>보유기간: 관련 법령 또는 동의한 기간</p>
      </SectionCard>
      <SectionCard heading="제3자 제공(기사)">
        <p>출동/작업을 위해 기사/업체에게 필요한 정보(연락처, 주소)를 제공합니다.</p>
      </SectionCard>
      <SectionCard heading="파기/문의">
        <p>목적 달성 시 지체 없이 파기하며, 문의: support@example.com / 000-0000-0000</p>
      </SectionCard>
    </AppShell>
  );
}
