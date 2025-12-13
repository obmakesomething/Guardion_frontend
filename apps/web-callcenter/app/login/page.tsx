"use client";

import React from "react";
import { AppShell, SectionCard, Button } from "@repo/ui";

export default function OpsLoginPage() {
  return (
    <AppShell title="콜센터 로그인" subtitle="O-01 — 전 화면 가드">
      <SectionCard heading="로그인">
        <p>콜센터 콘솔은 로그인 필수입니다.</p>
        <Button>Google로 로그인</Button>
        <p style={{ color: "var(--neutral-500)" }}>이벤트: ops_login_page_view</p>
      </SectionCard>
    </AppShell>
  );
}
