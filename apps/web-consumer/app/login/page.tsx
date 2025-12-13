"use client";

import React from "react";
import { AppShell, SectionCard, Button } from "@repo/ui";

export default function LoginPage() {
  return (
    <AppShell title="로그인" subtitle="C-07 — 기록 저장 목적">
      <SectionCard heading="Google 로그인">
        <p>OAuth 시작: /auth/oauth/google/start</p>
        <Button>Google로 계속</Button>
        <p style={{ color: "var(--neutral-500)" }}>이벤트: consumer_google_login_start/success/fail</p>
      </SectionCard>
    </AppShell>
  );
}
