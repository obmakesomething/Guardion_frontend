"use client";

import React from "react";
import { AppShell, SectionCard, Button } from "@repo/ui";

export default function TechLoginPage() {
  return (
    <AppShell title="기사 로그인" subtitle="T-01 — 세션 확보">
      <SectionCard heading="로그인">
        <Button>이메일/Google 로그인</Button>
        <p style={{ color: "var(--neutral-500)" }}>이벤트: tech_login_page_view</p>
      </SectionCard>
    </AppShell>
  );
}
