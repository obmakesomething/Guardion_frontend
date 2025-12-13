"use client";

import React from "react";
import { AppShell, SectionCard } from "@repo/ui";

export default function BillingPage() {
  return (
    <AppShell title="청구 (자리만)" subtitle="O-06 — 추후 구현">
      <SectionCard heading="청구 주기">
        <p>옵션: 매일 / 매주 / 매달 (추후 구현)</p>
      </SectionCard>
    </AppShell>
  );
}
