import React from "react";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { CaseStatus } from "@repo/domain";
import { formatAddressSummary, formatTime } from "@repo/domain";

export interface CaseCardProps {
  id: string;
  status: CaseStatus;
  gu: string;
  dong?: string;
  createdAt: string | Date;
  onOpen?: () => void;
}

export const CaseCard: React.FC<CaseCardProps> = ({ id, status, gu, dong, createdAt, onOpen }) => (
  <div className="card" style={{ display: "grid", gap: 8 }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontWeight: 700 }}>CASE-{id}</div>
      <Badge tone="info">{status}</Badge>
    </div>
    <div style={{ color: "var(--neutral-700)" }}>{formatAddressSummary(gu, dong)}</div>
    <div style={{ color: "var(--neutral-500)", fontSize: 13 }}>접수: {formatTime(createdAt)}</div>
    {onOpen && <Button onClick={onOpen}>열기</Button>}
  </div>
);
