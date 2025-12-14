"use client";

import React from "react";
import { AppShell, SectionCard, Button, Timeline, CaseStickySummary } from "@repo/ui";
import { CaseStatus } from "@repo/domain";

export default function LandingPage() {
  const steps = ["사진/위치 제출", "검증·배정", "출동·OTP", "완료"];

  return (
    <AppShell
      title="문 열기 긴급 요청"
      subtitle="consumer.<domain> — 사진·위치 제출 → 검증/배정 → OTP 완료"
      actions={
        <Button variant="ghost" onClick={() => (window.location.href = "/me/cases")}>
          내 요청 보기
        </Button>
      }
    >
      <div style={{ display: "grid", gap: 16 }}>
        <SectionCard heading="누구이신가요?">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {[
              { role: "고객", desc: "문 열어달라고 요청", link: "/" },
              { role: "콜센터", desc: "검증/배정/정산", link: "https://ops.<domain>" },
              { role: "기사", desc: "배정/출동/OTP 요청", link: "https://tech.<domain>" }
            ].map((item) => (
              <div key={item.role} className="card" style={{ display: "grid", gap: 6 }}>
                <div style={{ fontWeight: 700 }}>{item.role}</div>
                <div style={{ color: "var(--neutral-700)" }}>{item.desc}</div>
                <Button variant="ghost" onClick={() => (window.location.href = item.link)}>
                  들어가기
                </Button>
              </div>
            ))}
          </div>
        </SectionCard>

        <section
          className="card"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 20,
            alignItems: "stretch",
            background: "linear-gradient(135deg, #0ea5e9 0%, #38bdf8 50%, #f8fafc 100%)",
            color: "#0f172a",
            position: "relative",
            overflow: "hidden"
          }}
        >
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ background: "rgba(255,255,255,0.14)", padding: "8px 12px", borderRadius: 12, color: "#fff" }}>
              OTP로만 완료 확정 · 콜센터 검증 후 기사 배정
            </div>
            <h2 style={{ margin: 0, fontSize: 30, color: "#fff" }}>사진 + 위치만 올리면 바로 출동 준비</h2>
            <p style={{ margin: 0, color: "rgba(255,255,255,0.9)" }}>
              고객이 제출 → 콜센터 검증 → 배정/출동 → OTP 완료까지 실시간으로 안내합니다. 지도는 영역·ETA 중심, 기사 번호는 직접 노출합니다.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Button onClick={() => (window.location.href = "/request")}>요청 시작</Button>
              <Button variant="ghost" onClick={() => (window.location.href = "/login")}>
                로그인(선택)
              </Button>
              <Button variant="ghost" onClick={() => (window.location.href = "/legal/privacy")}>
                개인정보 처리방침
              </Button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 10 }}>
              {[
                { label: "평균 배정", value: "10~15분" },
                { label: "완료 확정", value: "고객 OTP만" },
                { label: "필수 증빙", value: "전·후 사진 + 감사로그" }
              ].map((item) => (
                <div key={item.label} style={{ background: "#fff", borderRadius: 12, padding: 12, boxShadow: "var(--shadow)" }}>
                  <div style={{ fontSize: 12, color: "var(--neutral-500)" }}>{item.label}</div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ background: "#fff", border: "1px solid var(--neutral-200)", boxShadow: "var(--shadow)", display: "grid", gap: 12 }}>
            <CaseStickySummary status={CaseStatus.DISPATCHING} eta={[12, 18]} gu="강남구" dong="역삼동" ctaLabel="요청 작성" onCta={() => (window.location.href = "/request")} />
            <Timeline steps={steps} current={1} />
            <div style={{ display: "grid", gap: 6, padding: 10, borderRadius: 12, background: "var(--neutral-100)", border: "1px dashed var(--neutral-200)" }}>
              <div style={{ fontWeight: 700 }}>안내 요약</div>
              <div style={{ color: "var(--neutral-700)" }}>Need approval 시 이름/전화/이메일만 추가 입력.</div>
              <div style={{ color: "var(--neutral-700)" }}>기사 GPS 공유 → 고객에게는 ETA/거리 중심으로 표시.</div>
              <div style={{ color: "var(--neutral-700)" }}>수락 시 정산 기록(3,000원)만 남기고 결제는 없음.</div>
            </div>
          </div>
        </section>

        <SectionCard heading="진행 단계">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {[
              { title: "1) 요청 작성", detail: "주소·지도 핀 + 사진(필수) + 연락처 제출", action: "시작하기", link: "/request" },
              { title: "2) 검증/배정", detail: "콜센터가 리스크 확인 후 기사 배정, Need approval 시 최소 정보만 추가", action: "승인 안내", link: "/cases/123/approval" },
              { title: "3) 출동/트래킹", detail: "GPS ETA 확인, 기사 연락처 즉시 노출, 추가비 동의 로그", action: "진행 보기", link: "/cases/123" },
              { title: "4) OTP 완료", detail: "현장 작업 후 고객 OTP 입력으로만 완료 확정", action: "OTP 입력", link: "/cases/123/otp" }
            ].map((step) => (
              <div key={step.title} className="card" style={{ border: "1px solid var(--neutral-200)", boxShadow: "var(--shadow)", display: "grid", gap: 8 }}>
                <div style={{ fontWeight: 700 }}>{step.title}</div>
                <div style={{ color: "var(--neutral-700)" }}>{step.detail}</div>
                <Button variant="ghost" onClick={() => (window.location.href = step.link)}>
                  {step.action}
                </Button>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard heading="정책 고지">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            <div className="card" style={{ border: "1px solid var(--neutral-200)" }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>지도/연락</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: "var(--neutral-700)" }}>
                <li>지도: 영역+ETA만 (정밀 점 금지)</li>
                <li>연락: 기사 번호를 고객에게 직접 노출</li>
              </ul>
            </div>
            <div className="card" style={{ border: "1px solid var(--neutral-200)" }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>Need approval</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: "var(--neutral-700)" }}>
                <li>이름 / 전화번호 / 이메일만 추가 수집</li>
                <li>정부24/카카오/관리실/임대차 확인은 자리만 제공(추후)</li>
              </ul>
            </div>
            <div className="card" style={{ border: "1px solid var(--neutral-200)" }}>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>정산/감사</div>
              <ul style={{ margin: 0, paddingLeft: 18, color: "var(--neutral-700)" }}>
                <li>수락 시 정산 기록 3,000원(결제 없음)</li>
                <li>사진 열람·다운로드 모두 감사 로그</li>
                <li>전/후 사진 필수, OTP 성공 시각 기록</li>
              </ul>
            </div>
          </div>
        </SectionCard>
      </div>
    </AppShell>
  );
}
