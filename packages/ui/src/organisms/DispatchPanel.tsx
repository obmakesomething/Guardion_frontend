import React from "react";
import { Button } from "../atoms/Button";

export interface TechCandidate {
  id: string;
  name: string;
  distanceKm?: number;
  availability?: string;
  recentJobs?: number;
}

export const DispatchPanel: React.FC<{ candidates: TechCandidate[]; onAssign?: (techId: string) => void }> = ({
  candidates,
  onAssign
}) => (
  <div className="card" style={{ display: "grid", gap: 10 }}>
    <div style={{ fontWeight: 700 }}>배차</div>
    <div style={{ display: "grid", gap: 8 }}>
      {candidates.map((tech) => (
        <div
          key={tech.id}
          style={{
            border: "1px solid var(--neutral-200)",
            borderRadius: 12,
            padding: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <div style={{ fontWeight: 700 }}>{tech.name}</div>
            <div style={{ color: "var(--neutral-500)", fontSize: 13 }}>
              거리: {tech.distanceKm ?? "?"}km · 가용: {tech.availability ?? "?"} · 최근 작업:{" "}
              {tech.recentJobs ?? 0}
            </div>
          </div>
          <Button onClick={() => onAssign?.(tech.id)}>배정</Button>
        </div>
      ))}
    </div>
    <div style={{ color: "var(--neutral-500)", fontSize: 13 }}>수락 시 3,000원 정산 이벤트 기록</div>
  </div>
);
