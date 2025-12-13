import React from "react";
import { Button } from "../atoms/Button";
import { Badge } from "../atoms/Badge";

export interface ContactBlockProps {
  techName: string;
  techPhone: string;
  company?: string;
  businessInfo?: string;
}

export const ContactBlock: React.FC<ContactBlockProps> = ({ techName, techPhone, company, businessInfo }) => (
  <div
    style={{
      border: "1px solid var(--neutral-200)",
      borderRadius: 14,
      padding: 12,
      display: "grid",
      gap: 8
    }}
  >
    <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ fontWeight: 700 }}>{techName}</div>
      <Badge tone="info">기사 직통 번호</Badge>
    </div>
    <div style={{ color: "var(--neutral-700)" }}>
      {company && <div>상호: {company}</div>}
      <div>전화: {techPhone}</div>
      {businessInfo && <div>사업자정보: {businessInfo}</div>}
    </div>
    <div style={{ color: "var(--neutral-500)", fontSize: 13 }}>
      본 플랫폼은 통신판매 당사자가 아닌 중개자입니다. 안전상 정확한 위치는 표시하지 않습니다.
    </div>
    <Button onClick={() => (window.location.href = `tel:${techPhone}`)}>기사에게 전화</Button>
  </div>
);
