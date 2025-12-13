"use client";

import React, { useState } from "react";
import { AppShell, CaseStickySummary, OtpInput, Button, SectionCard, InlineError } from "@repo/ui";
import { CaseStatus } from "@repo/domain";
import { useParams } from "next/navigation";

export default function OtpPage() {
  const params = useParams();
  const id = params?.id || "123";
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);

  const verify = () => {
    if (otp.length < 6) {
      setError(true);
      return;
    }
    alert("OTP 확인 완료 → 완료 화면");
    window.location.href = `/cases/${id}/done`;
  };

  return (
    <AppShell title="OTP 입력" subtitle="C-05 — 고객 OTP로 완료 확정">
      <div style={{ display: "grid", gap: 16 }}>
        <CaseStickySummary status={CaseStatus.OTP_PENDING} eta={5} gu="강남구" dong="역삼동" />
        <SectionCard heading="OTP 입력">
          <OtpInput value={otp} onChange={setOtp} />
          <p style={{ color: "var(--neutral-500)" }}>기사에게 받은 코드를 입력하세요.</p>
          {error && (
            <InlineError
              title="코드 불일치"
              detail="코드를 다시 확인하고 입력하세요."
              actionLabel="다시 시도"
              onAction={() => setError(false)}
            />
          )}
          <div style={{ display: "flex", gap: 10 }}>
            <Button onClick={verify}>OTP 확인</Button>
            <Button variant="ghost" onClick={() => setOtp("")}>
              지우기
            </Button>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
