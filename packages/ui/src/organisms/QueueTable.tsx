import React from "react";
import { Badge } from "../atoms/Badge";
import { Button } from "../atoms/Button";
import { CaseStatus } from "@repo/domain";

export interface QueueRow {
  id: string;
  status: CaseStatus;
  receivedAt: string;
  region: string;
  risk: string;
}

export const QueueTable: React.FC<{ rows: QueueRow[]; onOpen?: (id: string) => void }> = ({ rows, onOpen }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr>
        <th style={{ textAlign: "left", padding: 8 }}>상태</th>
        <th style={{ textAlign: "left", padding: 8 }}>접수시각</th>
        <th style={{ textAlign: "left", padding: 8 }}>지역</th>
        <th style={{ textAlign: "left", padding: 8 }}>리스크</th>
        <th style={{ textAlign: "left", padding: 8 }}>CTA</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.id} style={{ borderBottom: "1px solid var(--neutral-200)" }}>
          <td style={{ padding: 8 }}>
            <Badge tone="info">{row.status}</Badge>
          </td>
          <td style={{ padding: 8 }}>{row.receivedAt}</td>
          <td style={{ padding: 8 }}>{row.region}</td>
          <td style={{ padding: 8 }}>{row.risk}</td>
          <td style={{ padding: 8 }}>
            <Button variant="ghost" onClick={() => onOpen?.(row.id)}>
              열기
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
