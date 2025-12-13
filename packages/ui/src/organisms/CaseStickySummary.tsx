import React from "react";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { CaseStatus } from "@repo/domain";
import { formatEta, formatAddressSummary } from "@repo/domain";

export interface CaseStickySummaryProps {
  status: CaseStatus;
  eta?: string | number | [number, number];
  gu: string;
  dong?: string;
  ctaLabel?: string;
  onCta?: () => void;
}

export const CaseStickySummary: React.FC<CaseStickySummaryProps> = ({
  status,
  eta,
  gu,
  dong,
  ctaLabel,
  onCta
}) => (
  <div
    style={{
      position: "sticky",
      top: 12,
      display: "grid",
      gap: 8,
      padding: 12,
      borderRadius: 14,
      border: "1px solid var(--neutral-200)",
      background: "#fff",
      boxShadow: "var(--shadow)"
    }}
  >
    <div style={{ display: "flex", gap: 8, justifyContent: "space-between", alignItems: "center" }}>
      <div style={{ fontWeight: 700 }}>{formatAddressSummary(gu, dong)}</div>
      <Badge tone="info">{status}</Badge>
    </div>
    {eta && <div style={{ color: "var(--neutral-700)" }}>ETA: {formatEta(eta)}</div>}
    {ctaLabel && <Button onClick={onCta}>{ctaLabel}</Button>}
  </div>
);
