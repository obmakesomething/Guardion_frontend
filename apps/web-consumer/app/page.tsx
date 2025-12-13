"use client";

import React from "react";
import { AppShell, SectionCard, Button } from "@repo/ui";

export default function LandingPage() {
  return (
    <AppShell title="문 열기 요청" subtitle="consumer.<domain> — 랜딩 (C-00)">
      <div className="card" style={{ display: "grid", gap: 12 }}>
        <p>단계: 랜딩 → 요청 작성(C-01). 버튼은 요청 흐름으로 이동합니다.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Button onClick={() => (window.location.href = "/request")}>요청 시작</Button>
          <Button variant="ghost" onClick={() => (window.location.href = "/login")}>
            로그인(선택)
          </Button>
        </div>
      </div>
      <SectionCard heading="정책 고지">
        <ul>
          <li>지도: 영역+ETA만 (정밀 점 금지)</li>
          <li>연락: 기사 번호를 고객에게 직접 노출</li>
          <li>Need approval: 이름/전화/이메일만</li>
          <li>중개자 고지 + 기사 정보 노출</li>
          <li>취소/노쇼/지연 기준, 이의제기 채널(카톡/전화/폼)</li>
          <li>개인정보처리방침 `/legal/privacy` 링크</li>
        </ul>
      </SectionCard>
    </AppShell>
  );
}
