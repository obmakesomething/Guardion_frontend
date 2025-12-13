"use client";

import React from "react";
import { AppShell, SectionCard } from "@repo/ui";

export default function SettingsPage() {
  return (
    <AppShell title="설정" subtitle="O-05 — 운영 정책 자리">
      <SectionCard heading="정책">
        <ul>
          <li>상태 카피 템플릿</li>
          <li>알림 룰</li>
          <li>청구 주기(매일/매주/매달) — 자리만</li>
        </ul>
      </SectionCard>
    </AppShell>
  );
}
