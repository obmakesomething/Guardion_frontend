import React from "react";
import { Button } from "../atoms/Button";

export const MapAreaSelector: React.FC<{ onDescribe?: (v: string) => void }> = ({ onDescribe }) => (
  <div style={{ display: "grid", gap: 8 }}>
    <div
      style={{
        height: 180,
        borderRadius: 12,
        background:
          "repeating-linear-gradient(45deg, var(--neutral-100), var(--neutral-100) 12px, #fff 12px, #fff 24px)",
        border: "1px dashed var(--neutral-200)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--neutral-500)"
      }}
    >
      주소 검색 + 핀 (영역 선택)
    </div>
    <textarea
      placeholder="상세 위치 설명"
      style={{ width: "100%", minHeight: 80, padding: 10, borderRadius: 10, border: "1px solid var(--neutral-200)" }}
      onChange={(e) => onDescribe?.(e.target.value)}
    />
    <Button variant="ghost">주소 검색</Button>
  </div>
);
