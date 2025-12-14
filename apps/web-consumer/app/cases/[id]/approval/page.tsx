"use client";

import React, { useState } from "react";
import { AppShell, SectionCard, FormField, Input, Button, InlineError } from "@repo/ui";
import { useParams } from "next/navigation";

export default function ApprovalPage() {
  const params = useParams();
  const id = params?.id || "123";
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);

  const submit = () => {
    if (!name || !phone || !email) {
      setError(true);
      return;
    }
    alert("추가 정보 제출 완료");
    window.location.href = `/cases/${id}`;
  };

  return (
    <AppShell title="승인 필요" subtitle="C-04 — Need approval 최소 정보">
      <SectionCard heading={`케이스 ${id} 추가 정보`}>
        <FormField label="이름">
          <Input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} />
        </FormField>
        <FormField label="전화번호">
          <Input value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)} />
        </FormField>
        <FormField label="이메일">
          <Input value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
        </FormField>
        <p style={{ color: "var(--neutral-500)" }}>정부24/카카오 인증, 관리실 연락, 임대차 연락은 추후 구현(Disabled)</p>
        {error && (
          <InlineError
            title="필수 정보를 입력하세요"
            actionLabel="다시 입력"
            onAction={() => setError(false)}
            detail="이름/전화번호/이메일을 모두 입력해야 합니다."
          />
        )}
        <Button onClick={submit}>제출</Button>
      </SectionCard>
    </AppShell>
  );
}
