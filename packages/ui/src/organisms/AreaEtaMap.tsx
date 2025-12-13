import React from "react";
import { formatEta } from "@repo/domain";

export const AreaEtaMap: React.FC<{ eta?: string | number | [number, number] }> = ({ eta }) => (
  <div
    style={{
      height: 200,
      borderRadius: 12,
      background:
        "radial-gradient(circle at 50% 50%, rgba(58,162,255,0.15), rgba(58,162,255,0.05) 45%, transparent 60%), var(--neutral-100)",
      border: "1px dashed var(--neutral-200)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--neutral-700)",
      textAlign: "center",
      padding: 12
    }}
  >
    영역 기반 위치 표시 (정밀 점 금지)
    <br />
    {eta && <strong>ETA {formatEta(eta)}</strong>}
  </div>
);
