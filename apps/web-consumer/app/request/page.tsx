"use client";

import React, { useState } from "react";
import {
  AppShell,
  SectionCard,
  FormField,
  Input,
  PhotoUploader,
  MapAreaSelector,
  Button,
  InlineError
} from "@repo/ui";

export default function RequestPage() {
  const [phone, setPhone] = useState("");
  const [showError, setShowError] = useState(false);

  const submit = () => {
    if (!phone) {
      setShowError(true);
      return;
    }
    alert("요청 접수 → C-02");
    window.location.href = "/cases/123/submitted";
  };

  return (
    <AppShell title="요청 작성" subtitle="C-01 — 위치/상황/사진/연락 + 요금 동의">
      <div className="grid" style={{ display: "grid", gap: 16 }}>
        <SectionCard heading="위치">
          <MapAreaSelector />
        </SectionCard>

        <SectionCard heading="상황">
          <FormField label="상황 설명" hint="예: 문이 잠겼고 비상키 없음">
            <textarea
              style={{ width: "100%", minHeight: 100, padding: 12, borderRadius: 10, border: "1px solid var(--neutral-200)" }}
              placeholder="상황을 입력하세요"
            />
          </FormField>
        </SectionCard>

        <SectionCard heading="사진(필수)">
          <PhotoUploader label="문/도어락/실린더 사진" required />
        </SectionCard>

        <SectionCard heading="연락처">
          <FormField label="전화번호" hint="필수">
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="010-1234-5678" />
          </FormField>
        </SectionCard>

        <SectionCard heading="요금/동의">
          <p>기본 출동비/기본 작업비/추가 작업비를 사전 고지하고 동의를 기록합니다.</p>
          <ul>
            <li>기본 출동비 예: 30,000원 (출동 시작 이후 취소 시 발생)</li>
            <li>기본 작업비 예: 40,000원</li>
            <li>추가 작업비: 현장 추가비 발생 시 재동의(버튼/서명/문자) 기록</li>
          </ul>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <input type="checkbox" id="fee" /> <label htmlFor="fee">요금 정책에 동의합니다.</label>
          </div>
          <p style={{ color: "var(--neutral-500)" }}>이벤트: consumer_fee_consent</p>
        </SectionCard>

        <SectionCard heading="정책 안내">
          <ul>
            <li>지도: 영역+ETA만, 기사 번호 직통 노출</li>
            <li>Need approval 시 이름/전화/이메일만 추가 수집</li>
            <li>중개자 고지, 취소/노쇼/지연 기준, 이의제기 채널</li>
          </ul>
        </SectionCard>

        {showError && (
          <InlineError
            title="필수 입력을 확인하세요"
            actionLabel="다시 시도"
            detail="전화번호와 동의를 입력 후 제출하세요."
            onAction={() => setShowError(false)}
          />
        )}

        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={submit}>접수하기</Button>
          <Button variant="ghost" onClick={() => setShowError(false)}>
            다시 입력
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
