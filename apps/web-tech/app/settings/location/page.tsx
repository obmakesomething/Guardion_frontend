"use client";

import React from "react";
import { AppShell, SectionCard, Button } from "@repo/ui";

export default function LocationSettingsPage() {
  return (
    <AppShell title="위치 권한" subtitle="T-05 — GPS 권한 안내">
      <SectionCard heading="위치 안내">
        <p>고객 화면에는 정확한 위치가 표시되지 않습니다(영역+ETA만).</p>
        <Button>위치 권한 요청</Button>
      </SectionCard>
    </AppShell>
  );
}
