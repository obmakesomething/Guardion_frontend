"use client";

import React from "react";
import { AppShell, SectionCard, TechMap } from "@repo/ui";

export default function TechsPage() {
  return (
    <AppShell title="기사 디렉토리" subtitle="O-04 — 가용/거리 기반">
      <SectionCard heading="TechMap">
        <TechMap />
        <p style={{ color: "var(--neutral-500)" }}>기사 위치는 운영용 정밀 GPS 사용 가능.</p>
      </SectionCard>
    </AppShell>
  );
}
