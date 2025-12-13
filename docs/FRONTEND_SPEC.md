# Lock Platform Frontend Spec (MVP) — 3 Web Apps (Consumer / Callcenter / Tech)
본 문서는 `lock-platform-frontend` 레포에 그대로 복사·붙여넣기해 고정하는 “단일 스펙”이다. (끊김 없이 1개 블록)

---

## 0) 고정 결론(변경 금지)
- 프론트 레포는 **단일 Git Repo**로 운영한다: `lock-platform-frontend`
- 백엔드 레포는 **별도 Git Repo**로 운영한다: `lock-platform-backend`
- 프론트는 **웹앱 3개**를 제공한다:
  - 고객(Consumer) Web
  - 콜센터(Callcenter) Console Web
  - 기사(Tech) Web
- 배포 시 **3자 입장이 분리된 도메인/UX**로 제공한다:
  - `consumer.<domain>`
  - `ops.<domain>`
  - `tech.<domain>`
- 결제는 MVP에서 제외한다. 대신 **“받았다는 기록(정산 이벤트)”만 남긴다**.
- 고객 지도 정책(고정): **기사 위치는 “영역 + ETA”만 표시** (정밀 점/실시간 트래킹 금지)
- 고객 연락 정책(고정): **기사 번호를 고객에게 직접 노출** (릴레이 번호 미사용)
- 리스크 게이트(Need approval) 최소 증빙(고정): **이름 + 전화번호 + 이메일**
- 정부24/카카오 인증, 관리실 연락, 임대차 관계자 연락은 **추후 구현**으로 UI에 자리만 둔다.
- 완료 확정(고정): **고객 OTP로 완료 처리**
- 정산(고정): **콜센터 관점에서 “수락=3,000원 정산 발생(기록)”**을 남긴다.
  - 청구 주기 옵션: **매일/매주/매달** (UI는 MVP에서 “자리/표시”만 가능, 실제 청구는 추후)

---

## 1) Repo Split (고정)

### 1.1 Backend Repo: `lock-platform-backend`
포함:
- `apps/api/`
- `db/migrations/`
- `openapi/openapi.yaml` (**API 계약 단일 소스**)

### 1.2 Frontend Repo: `lock-platform-frontend`
포함:
- `apps/web-consumer/`
- `apps/web-callcenter/`
- `apps/web-tech/`
- `packages/ui/`
- `packages/domain/`
- `packages/api-client/`
- `packages/auth/`
- `packages/config/`
- `openapi/openapi.yaml` (백엔드에서 fetch한 사본)
- `scripts/fetch-openapi.sh`

---

## 2) Frontend Repo 구조(고정)

    lock-platform-frontend/
      apps/
        web-consumer/        # 고객 웹
        web-callcenter/      # 콜센터 콘솔
        web-tech/            # 기사 웹
      packages/
        ui/                  # 디자인 토큰 + 공용 UI 컴포넌트
        domain/              # 상태/전이/포맷터/카피 템플릿(추후 포함)
        api-client/          # OpenAPI 기반 타입/클라이언트(생성물 커밋)
        auth/                # 세션/가드/role util, 헤더 주입
        config/              # eslint/tsconfig/prettier 공통
      openapi/
        openapi.yaml         # backend에서 fetch한 사본
      scripts/
        fetch-openapi.sh
      docs/
        FRONTEND_SPEC.md     # (이 문서)
        API_SYNC.md
      README.md

---

## 3) OpenAPI 동기화(옵션 A 고정)

### 3.1 스크립트: `scripts/fetch-openapi.sh`
(코드 블록 중첩 방지를 위해 들여쓰기로 표기)
    #!/usr/bin/env bash
    set -euo pipefail

    OPENAPI_URL="${OPENAPI_URL:-https://api.example.com/openapi.yaml}"
    TARGET="openapi/openapi.yaml"

    mkdir -p openapi
    curl -fsSL "$OPENAPI_URL" -o "$TARGET"
    echo "Fetched OpenAPI -> $TARGET"

### 3.2 생성물(커밋 대상)
- 입력: `openapi/openapi.yaml`
- 출력(커밋 대상): `packages/api-client/src/generated/schema.d.ts`

`packages/api-client/package.json` 예시:
    {
      "name": "@repo/api-client",
      "scripts": {
        "gen": "openapi-typescript ../../openapi/openapi.yaml -o src/generated/schema.d.ts"
      }
    }

### 3.3 루트 스크립트(고정)
- `pnpm fetch:openapi`  → `scripts/fetch-openapi.sh`
- `pnpm gen:api`        → `pnpm -C packages/api-client gen`
- `pnpm prepare:api`    → `pnpm fetch:openapi && pnpm gen:api`

---

## 4) 인증/헤더/권한(RBAC) 고정

### 4.1 Role(고정)
- `customer`
- `callcenter`
- `tech`
- `admin`

### 4.2 헤더 규약(고정)
- 로그인 사용자: `Authorization: Bearer <access_token>`
- 게스트 케이스 접근(필요 시): `X-Case-Access-Token: <token>`
- 파일 업로드: OpenAPI에 명시된 계약을 따른다(멀티파트 또는 presigned URL).

### 4.3 앱별 로그인 정책(고정)
- 고객(Consumer): 로그인 **선택** (기록/복구 목적)
- 콜센터(Callcenter): 로그인 **필수**
- 기사(Tech): 로그인 **필수**

### 4.4 프론트 가드 원칙(고정)
- 프론트에서 숨기는 것은 보안이 아니다.
- 최종 권한은 백엔드 API에서 강제한다.
- 프론트는 UX를 위한 1차 가드(리다이렉트/안내)만 한다.

---

## 5) 디자인 시스템(고정) — `packages/ui`

### 5.1 Typography/Spacing 규칙(고정)
- Font: **NotoSans**
- Base line-height: **1.7**
- CJK letter-spacing: **-0.03em**
- “단이 나뉠 때” 시각적 호흡: **기본 행간의 1/2 간격**을 섹션 간 여백 규칙으로 사용
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 40 / 56
- 카드/버튼 여백은 “넉넉하게”를 원칙으로 한다(최소 16~24).

### 5.2 Color 규칙(고정)
- Primary: **밝은 파랑–하늘색 계열**
- Neutral: 회색 계열(텍스트/보더/배경)
- Semantic:
  - Success, Warning, Danger, Info

### 5.3 UI 패키지 구조(고정)
    packages/ui/
      tokens/
        colors.ts
        typography.ts
        spacing.ts
        effects.ts
      atoms/
        Button.tsx
        Badge.tsx
        Input.tsx
        Label.tsx
        Skeleton.tsx
        Toast.tsx
      molecules/
        FormField.tsx
        InlineError.tsx
        OtpInput.tsx
        FilterBar.tsx
        ContactBlock.tsx
      organisms/
        AppShell.tsx
        PageTitle.tsx
        SectionCard.tsx
        TwoPaneLayout.tsx
        CaseStickySummary.tsx
        CaseCard.tsx
        Timeline.tsx
        EvidenceGallery.tsx
        PhotoUploader.tsx
        AuditLog.tsx
        RiskGatePanel.tsx
        DispatchPanel.tsx
        QueueTable.tsx
        MapAreaSelector.tsx
        AreaEtaMap.tsx
        TechMap.tsx

---

## 6) UX Writing 원칙(고정)
- 문장은 짧고, 행동은 동사로 시작한다(예: “다시 시도”, “OTP 입력”, “기사에게 전화”).
- 상태 메시지는 “무엇/왜/다음 행동” 순으로 2~3줄 이내로 구성한다.
- 에러 메시지는 2줄 구성:
  - 1줄: 문제(무엇이 실패했는지)
  - 1줄: 다음 행동(재시도/로그인/지원 요청)
- 정책성 제약(예: 지도 표시 제한)은 “고객 경험”보다 “사고 위험”을 우선하는 문장으로 안내한다.

---

## 7) 도메인 모델(고정) — `packages/domain`

### 7.1 CaseStatus enum(최소 세트)
- `SUBMITTED`
- `NEED_APPROVAL`
- `APPROVED`
- `DISPATCHING`
- `DISPATCHED`
- `EN_ROUTE`
- `ARRIVED`
- `WORKING`
- `OTP_PENDING`
- `COMPLETED`
- `CANCELED`
- `REJECTED`
- `FAILED`

### 7.2 허용 전이(고정)
| From | To |
|---|---|
| SUBMITTED | NEED_APPROVAL / APPROVED / REJECTED |
| NEED_APPROVAL | SUBMITTED(재제출) / APPROVED / REJECTED |
| APPROVED | DISPATCHING |
| DISPATCHING | DISPATCHED / FAILED |
| DISPATCHED | EN_ROUTE / CANCELED |
| EN_ROUTE | ARRIVED / CANCELED |
| ARRIVED | WORKING / CANCELED |
| WORKING | OTP_PENDING / FAILED |
| OTP_PENDING | COMPLETED / FAILED |

### 7.3 카피 템플릿 자리(추후 구현 고정)
- `packages/domain/copy/status.ts`에 “추후 구현” 플래그 포함하여 자리만 둔다.
  - 예: “승인 필요 — 관리실 또는 집주인 확인이 필요합니다.” (추후)
  - 예: “OTP 대기 — 작업 완료 후 화면의 코드를 기사에게 전달하세요.” (추후)

### 7.4 포맷터(고정)
- ETA 표기: “약 N분” + 범위 가능(예: “약 10–15분”)
- 주소 요약: 구/동 + 상세는 접어서 표기(고객/콜센터 UX 다름)
- 시간 표기: `YYYY-MM-DD HH:mm` 또는 상대시간 병기(콜센터에 유리)

---

## 8) 서비스 블루프린트(상세, MVP)

Lane: 고객 / 고객웹(Frontstage) / 콜센터(Backstage) / 기사(Backstage) / 시스템(Backend)

| 단계ID | 상태 | 고객 행동 | 고객웹 | 콜센터 | 기사 | 시스템/로그 |
|---|---|---|---|---|---|---|
| BP-01 | - | 사이트 진입 | 랜딩→요청 시작 | - | - | page_view |
| BP-02 | SUBMITTED | 위치/상황/사진/연락 입력 | `/request` 제출 | 큐에 케이스 생성 확인 | - | case_created, evidence_uploaded |
| BP-03 | NEED_APPROVAL(조건) | 이름/전화/이메일 제공 | approval UI 제출 | 승인/거절/보류 | - | case_updated(status), audit_log |
| BP-04 | DISPATCHING | 대기 | 진행 화면 | 배차 수행 | 수락/거절 | dispatch_created, dispatch_assigned |
| BP-05 | EN_ROUTE | 대기 | **영역+ETA** 표시, 기사 번호 표시 | 모니터링 | 출동 | tech_location_ingest(서버), customer_view_obfuscated |
| BP-06 | ARRIVED/WORKING | 현장 대응 | 상태 확인 | 예외/분쟁 지원 | 도착/작업 | status_changed events |
| BP-07 | OTP_PENDING | OTP 전달 | OTP 입력 | - | OTP 요청 | otp_issued, otp_verified |
| BP-08 | COMPLETED | 리포트 확인 | 완료/소견서/증빙 | (추후) 청구/정산 집계 | 소견서 제출 | report_created, case_closed |

---

## 9) 공통 컴포넌트 “재사용 카탈로그”(고정)

### 9.1 Layout
- `AppShell`
  - Props: `title`, `actions[]`, `children`
- `PageTitle`
  - Props: `title`, `subtitle?`
- `SectionCard`
  - Props: `heading`, `children`
- `TwoPaneLayout` (콜센터 중심)
  - Props: `list`, `detail`

### 9.2 Case 도메인
- `CaseStickySummary` (상단 고정 요약바)
  - 포함: 상태 배지, ETA, 주소 요약, 1개 Primary CTA
- `StatusBadge`
  - 상태별 tone: info/warn/danger/success
- `Timeline`
  - steps[] + current
- `CaseCard`
  - 리스트용 요약 카드(상태/주소/접수시각/CTA)
- `AuditLog` (콜센터 필수)
  - “누가/언제/무엇을” 변경했는지 표시
- `RiskGatePanel` (콜센터)
  - Proceed / Need approval / Reject
- `DispatchPanel` (콜센터)
  - 후보 기사 리스트 + 배정 버튼 + 정산(수락=3,000원 기록)
- `QueueTable` (콜센터)
  - 필터/정렬/배지

### 9.3 Forms
- `FormField` (label/hint/error 포함)
- `InlineError` (1줄 문제 + 1줄 다음 행동 + 버튼)
- `Toast`
- `NameField`, `PhoneField`, `EmailField`
- `OtpInput` (길이 고정, 자동 포커스)

### 9.4 Evidence
- `PhotoUploader`
  - 제한: 최대 N장, 이미지 타입, 업로드 진행/실패 재시도
- `EvidenceGallery`
  - 그리드 + 확대 + 메타(시간/작성자)

### 9.5 Map (정책 반영 고정)
- `MapAreaSelector` (고객 요청 단계)
  - 핀/주소 검색 + 상세 위치 설명 입력
- `AreaEtaMap` (고객 트래킹)
  - **정밀 위치 점 금지**
  - “대략 영역(폴리곤/원) + ETA”만
- `TechMap` (기사/콜센터)
  - 기사측은 정밀 GPS 가능(운영용)

### 9.6 Contact
- `ContactBlock` (고객)
  - **기사 번호 직접 노출**
  - 버튼: “기사에게 전화”
  - 주의 문구(짧게): “안전상 정확한 위치는 표시하지 않습니다.”(필요 시)

---

## 10) 공통 에러/로딩/재시도 규칙(3앱 동일)

### 10.1 로딩
- 리스트: Skeleton rows
- 상세: Summary 먼저, 나머지는 Skeleton
- 업로드: 진행률 + 실패 시 “재시도” 1버튼

### 10.2 에러 메시지 구성(고정)
- 1줄: 문제
- 1줄: 다음 행동
- 버튼: 동사형(“다시 시도”, “로그인”, “지원 요청”)

### 10.3 기사 앱 재시도(우선)
- 상태 변경/증빙 업로드 실패 시 “재시도 큐”에 적재 후 재전송
- 중복 전송 방지: idempotency key(백엔드와 추후 합의 항목)

---

## 11) 이벤트 트래킹 규칙(고정)

형식: `<actor>_<area>_<action>`
- 고객: `consumer_*`
- 콜센터: `ops_*`
- 기사: `tech_*`

최소 이벤트 세트:
- `*_page_view`
- `*_submit_attempt`, `*_submit_success`, `*_submit_fail`
- `consumer_call_tech_click`
- `ops_dispatch_assign`
- `tech_status_change`
- `tech_evidence_upload`

---

## 12) 화면 전량 스펙 — 고객 웹(Consumer)

### 공통 정책
- 지도: **영역+ETA만**
- 연락: **기사 번호 직접 노출**
- Need approval 최소: **이름/전화/이메일**
- 정부24/카카오/관리실/임대차: **추후 구현** 표시만

#### C-00 랜딩
- Route: `/`
- 목적: “문 열기 요청” 진입 1클릭
- 컴포넌트: AppShell, PageTitle, SectionCard, PrimaryCTA(요청 시작)
- 이벤트: `consumer_landing_page_view`, `consumer_start_request_click`

#### C-01 요청 작성
- Route: `/request`
- 목적: 케이스 생성 최소 정보 수집
- 섹션:
  - 위치(MapAreaSelector: 주소 검색 + 핀)
  - 상황(텍스트/선택형)
  - 사진(PhotoUploader)
  - 연락처(PhoneField 필수)
  - 고지(짧은 정책 안내)
- 컴포넌트:
  - MapAreaSelector
  - FormField(상황)
  - PhotoUploader
  - PhoneField
  - InfoNotice
  - PrimaryCTA(접수하기)
- API:
  - `POST /cases` (CreateCaseRequest)
  - 증빙 업로드 endpoint(계약에 따름)
- 검증:
  - 위치(lat/lng 또는 addressKey) 필수
  - phone 필수
- 성공 이동: `/cases/{id}/submitted`
- 실패 UX: InlineError + 재시도
- 이벤트:
  - `consumer_case_submit_attempt`
  - `consumer_case_submit_success`
  - `consumer_case_submit_fail`

#### C-02 접수 완료
- Route: `/cases/{id}/submitted`
- 목적: 접수번호 안내 + 진행 화면 이동
- 컴포넌트: SectionCard(접수요약), CopyButton(caseId), PrimaryCTA(진행 보기)
- 이벤트: `consumer_case_submitted_page_view`

#### C-03 진행/트래킹
- Route: `/cases/{id}`
- 목적: 상태/ETA/지도/연락/증빙 제공
- 상단 고정: CaseStickySummary(상태/ETA/주소/CTA 1개)
- 지도: AreaEtaMap(**영역+ETA**)
- 타임라인: Timeline
- 연락: ContactBlock(**기사 직통 번호**)
- 증빙: EvidenceGallery(업로드한 사진)
- API:
  - `GET /cases/{id}` (게스트면 `X-Case-Access-Token` 필요 가능)
- 상태별 CTA:
  - NEED_APPROVAL → “추가 정보 제출”
  - OTP_PENDING → “OTP 입력”
  - COMPLETED → “리포트 보기”
- 에러:
  - 404/401 → “접수 링크 확인 / 로그인(선택) / 지원 요청” 안내
- 이벤트:
  - `consumer_case_page_view`
  - `consumer_call_tech_click`

#### C-04 Need approval (조건부)
- Route: `/cases/{id}/approval` (또는 `/cases/{id}` 내 모달로 구현)
- 트리거: status==NEED_APPROVAL
- 목적: 최소 증빙 수집 후 진행 가능하게
- 필드(MVP): 이름, 전화번호, 이메일
- 컴포넌트: NameField, PhoneField, EmailField, PrimaryCTA
- API(백엔드 계약 필요):
  - `POST /cases/{id}/approval-info`
- 추후 구현 자리:
  - 정부24/카카오 인증(Disabled + “추후” 배지)
  - 관리실 연락/임대차 관계자 연락(Disabled + “추후” 배지)
- 이벤트:
  - `consumer_approval_submit_attempt`
  - `consumer_approval_submit_success`
  - `consumer_approval_submit_fail`

#### C-05 OTP 입력
- Route: `/cases/{id}/otp`
- 목적: 완료 확정
- 컴포넌트: CaseStickySummary, OtpInput, InfoNotice, PrimaryCTA
- API: `POST /cases/{id}/otp/verify`
- 실패 UX: “코드 불일치” + 재시도
- 이벤트:
  - `consumer_otp_submit_attempt`
  - `consumer_otp_submit_success`
  - `consumer_otp_submit_fail`

#### C-06 완료/리포트
- Route: `/cases/{id}/done`
- 목적: 소견서/증빙 요약 제공
- 컴포넌트: SectionCard(완료요약), ReportCard, EvidenceGallery
- API: `GET /cases/{id}/report`
- 이벤트:
  - `consumer_case_done_page_view`
  - `consumer_report_view`

#### C-07 로그인(구글)
- Route: `/login`
- 목적: “내 기록 저장” 목적의 로그인
- 컴포넌트: AuthButtonGoogle, InfoNotice
- API:
  - `/auth/oauth/google/start`
  - `/auth/oauth/google/callback`
- 이벤트:
  - `consumer_login_page_view`
  - `consumer_google_login_start`
  - `consumer_google_login_success`
  - `consumer_google_login_fail`

#### C-08 내 요청 목록(로그인 사용자)
- Route: `/me/cases`
- 목적: 과거 요청 접근
- 컴포넌트: FilterBar, CaseCard 리스트
- API(백엔드 계약 필요): `GET /me/cases`
- 이벤트: `consumer_my_cases_page_view`

---

## 13) 화면 전량 스펙 — 콜센터 콘솔(Callcenter)

#### O-01 로그인
- Route: `/login`
- 목적: callcenter 세션 확보
- 컴포넌트: AuthButtonGoogle(또는 이메일), InfoNotice
- 가드: 미로그인 시 전부 redirect
- 이벤트: `ops_login_page_view`

#### O-02 큐(리스트)
- Route: `/queue`
- 목적: 신규/진행 케이스를 빠르게 처리
- 레이아웃: TwoPaneLayout(리스트/디테일)
- 리스트 컬럼(권장):
  - 상태(StatusBadge)
  - 접수시각
  - 지역(구/동)
  - 리스크 배지(RiskBadge)
  - 현재 단계 CTA(열기/승인/배차)
- 컴포넌트: QueueTable, FilterBar, RiskBadge
- API(백엔드 계약 필요): `GET /ops/cases?status=...`
- 이벤트:
  - `ops_queue_page_view`
  - `ops_case_open`

#### O-03 케이스 상세
- Route: `/queue/{id}`
- 목적: 리스크 판단 + 배차 + 로그
- 섹션:
  - 요약(CaseStickySummary)
  - 리스크게이트(RiskGatePanel)
  - 배차(DispatchPanel)
  - 증빙(EvidenceGallery)
  - 로그(AuditLog)
- 리스크게이트 버튼:
  - Proceed(승인)
  - Need approval(추가 정보 요청)
  - Reject(거절)
- 배차 패널:
  - 후보 기사 정렬(거리/가용/최근 작업수)
  - 배정 버튼
  - 수락 시 **정산 이벤트(3,000원) 기록 배지/토스트/로그**
- API(백엔드 계약 필요):
  - `GET /ops/cases/{id}`
  - `POST /ops/cases/{id}/decision`
  - `POST /ops/dispatch/assign`
  - `GET /ops/techs` (후보 조회)
- 이벤트:
  - `ops_case_detail_page_view`
  - `ops_decision_submit`
  - `ops_dispatch_assign`

#### O-04 기사 디렉토리
- Route: `/techs`
- 목적: 기사 가용/거리 기반 배차 보조
- 컴포넌트: DataTable, TechStatusBadge
- API(백엔드 계약 필요): `GET /ops/techs`
- 이벤트: `ops_techs_page_view`

#### O-05 설정
- Route: `/settings`
- 목적: 운영 정책 자리(최소)
- 항목(추후):
  - 상태 카피 템플릿
  - 알림 룰
  - 청구 주기(매일/매주/매달)

#### O-06 청구(추후)
- Route: `/billing`
- 목적: 콜센터 대상 청구 주기 설정
- 옵션: 매일/매주/매달
- 상태: **추후 구현(자리만)**

---

## 14) 화면 전량 스펙 — 기사 웹(Tech)

#### T-01 로그인
- Route: `/login`
- 목적: tech 세션 확보
- 컴포넌트: Auth UI
- 이벤트: `tech_login_page_view`

#### T-02 배정 목록
- Route: `/jobs`
- 목적: 오늘/현재 작업 확인
- 컴포넌트: CaseCard 리스트, StatusBadge
- API(백엔드 계약 필요): `GET /tech/jobs`
- 이벤트:
  - `tech_jobs_page_view`
  - `tech_job_open`

#### T-03 작업 상세(상태 진행)
- Route: `/jobs/{id}`
- 목적: 출동→도착→작업→OTP 요청
- 상단: CaseStickySummary
- 액션: ActionStepper(큰 버튼)
  - “출동 시작” → EN_ROUTE
  - “도착” → ARRIVED
  - “작업 시작” → WORKING
  - “OTP 요청” → OTP_PENDING
- 증빙: PhotoUploader(전/후), NoteEditor
- API(백엔드 계약 필요):
  - `GET /tech/jobs/{id}`
  - `POST /tech/jobs/{id}/status`
  - `POST /tech/jobs/{id}/evidence`
- 실패 UX:
  - 네트워크 실패 시 “재시도 큐 적재/재전송” + 토스트
- 이벤트:
  - `tech_job_detail_page_view`
  - `tech_status_change`
  - `tech_evidence_upload`

#### T-04 소견서 작성
- Route: `/jobs/{id}/report`
- 목적: 원인/근거/확신도 기록
- 필드(권장):
  - 원인 카테고리(선택)
  - 근거 텍스트(필수)
  - 확신도(낮음/중간/높음)
- 컴포넌트: ReportForm
- API(백엔드 계약 필요): `POST /tech/jobs/{id}/report`
- 이벤트:
  - `tech_report_submit_attempt`
  - `tech_report_submit_success`
  - `tech_report_submit_fail`

#### T-05 위치 권한/설정
- Route: `/settings/location`
- 목적: GPS 권한 안내/활성화
- 컴포넌트: InfoNotice, PrimaryCTA
- 정책 문구:
  - “고객 화면에는 정확한 위치가 표시되지 않습니다(영역+ETA만).”
- 이벤트: `tech_location_settings_page_view`

---

## 15) 프론트 패키지별 책임(고정)

### 15.1 `packages/api-client`
- OpenAPI에서 생성한 타입/스키마를 단일 진실로 사용
- 앱에서 직접 fetch 금지(반드시 client wrapper로 호출)

### 15.2 `packages/auth`
- 세션 상태(`user`, `role`, `access_token`) 관리
- `withAuthHeaders()`:
  - Authorization 주입
  - 필요 시 X-Case-Access-Token 주입 옵션 제공
- Route guard:
  - `requireRole(['callcenter'])`
  - `requireRole(['tech'])`

### 15.3 `packages/ui`
- 토큰/컴포넌트 제공
- 앱 내 “비슷한 카드/버튼/폼” 재구현 금지

### 15.4 `packages/domain`
- CaseStatus/전이/포맷터/카피 템플릿 자리
- 상태 기반 CTA 매핑 함수 제공(예: `getPrimaryCtaByStatus()`)

---

## 16) Codex/외주용 Definition of Done(프론트, 고정)
각 PR은 아래를 만족해야 merge:
1) `@repo/ui` 컴포넌트로 조합(중복 UI 금지)
2) API 호출은 `@repo/api-client`만 사용
3) role 가드 적용(콜센터/기사 앱)
4) 로딩/에러 상태 구현(Skeleton/InlineError)
5) 핵심 액션에 이벤트 로깅 최소 1개
6) 정책 준수:
   - 고객 지도: 영역+ETA만
   - 고객 연락: 기사 직통
   - Need approval: 이름/전화/이메일만(추후 항목은 disabled+label)
7) 접근성 최소:
   - 버튼/입력 label 제공
   - 키보드 포커스 이동 정상

---

## 17) 백엔드에 추가로 필요해질 API 체크리스트(프론트 관점, 누락 방지)
(아래 endpoint가 OpenAPI에 없으면 반드시 추가/정의해야 한다.)

### 17.1 고객
- `POST /cases`
- `GET /cases/{id}`
- `POST /cases/{id}/approval-info` (Need approval 제출)
- `POST /cases/{id}/otp/verify`
- `GET /cases/{id}/report`
- `GET /me/cases` (로그인 사용자 기록)

### 17.2 콜센터
- `GET /ops/cases`
- `GET /ops/cases/{id}`
- `POST /ops/cases/{id}/decision`
- `POST /ops/dispatch/assign`
- `GET /ops/techs`

### 17.3 기사
- `GET /tech/jobs`
- `GET /tech/jobs/{id}`
- `POST /tech/jobs/{id}/status`
- `POST /tech/jobs/{id}/evidence`
- `POST /tech/jobs/{id}/report`

---

## 18) 배포 환경변수(고정)
각 앱은 최소 아래를 가진다.
- `NEXT_PUBLIC_API_BASE_URL`
- `OPENAPI_URL` (CI에서 `prepare:api` 수행 시 필요)
- (선택) `NEXT_PUBLIC_SENTRY_DSN` 등

---

## 19) 마지막 고정 확인(스펙 불변 항목)
- 고객 지도는 정밀 점 금지, “영역+ETA”만.
- 고객은 기사 번호를 직접 본다.
- Need approval 최소는 이름/전화/이메일.
- 정부24/카카오/관리실/임대차 관계자 연락은 “추후 구현” 자리만.
- 완료는 고객 OTP로 확정.
- 정산은 콜센터 기준 수락 시 3,000원 “기록” 남김(결제/청구는 추후).

---

## 20) 추가 법무/운영 요구사항(신규 고정)
- 가격/추가비 동의 로그:
  - 기본 출동비/기본 작업비/추가 작업비(실린더 교체 등)를 사전 고지하고 동의(체크박스/버튼) 기록을 남긴다.
  - 현장 추가비 발생 시 고객 재동의(버튼/서명/문자 확인) 기록을 남긴다. 로그에는 시각/액션/금액/담당자(기사/콜센터)와 동의 방식이 포함된다.
  - 적용 화면: C-01 요청 작성(기본 요금 고지+동의), C-03 진행(추가비 재동의 모달/CTA), O-03 케이스 상세(추가비 승인/기록), T-03 작업 상세(추가비 요청/동의 캡처). 이벤트 예시: `consumer_fee_consent`, `tech_fee_consent`.
- 작업 전·후 사진 필수:
  - 문/도어락/실린더 상태, 손상 여부를 “전/후” 모두 촬영해야 한다(선택 아님). “기존 하자”를 전 사진으로 고정하지 않으면 책임이 플랫폼/기사로 귀속될 수 있음을 안내한다.
  - 적용 화면: T-03 작업 상세(전/후 구분 업로드 필수), O-03 케이스 상세(증빙 확인), C-03 진행/리포트(고객 열람).
- 중개자 고지 + 기사 정보 노출:
  - 화면/문자에 “본 플랫폼은 통신판매 당사자가 아닌 중개자” 문구를 표시한다.
  - 기사(업체)의 상호/연락처/사업자정보(가능한 범위)를 ContactBlock/리포트/문자에 노출한다. 없을 경우 “수집/제공 불가”로 명시한다.
- CS 최소 운영 규칙:
  - 취소/노쇼/지연 기준을 명시한다(예: 출동 시작 이후 취소 시 출동비 발생). 고객 UX(랜딩/요청/진행)와 콜센터 화면에서 확인 가능해야 한다.
  - 이의제기 접수 채널(카톡/전화) + 접수 폼(시간/주소/증빙 필드)을 제공한다.
- 개인정보처리방침 최소 버전:
  - 개인정보 보호법 제30조 필수 항목을 포함한다: 수집항목/목적/보유기간/제3자 제공(기사)/파기/문의처.
  - 각 앱에서 접근 가능한 `/legal/privacy`(또는 동등) 페이지와 푸터 링크를 둔다. “3일 버전”이라도 공개해야 한다.

(끝)
