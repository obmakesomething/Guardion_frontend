import React from "react";
import { Button } from "../atoms/Button";

export const InlineError: React.FC<{
  title: string;
  actionLabel: string;
  onAction?: () => void;
  detail?: string;
}> = ({ title, actionLabel, onAction, detail }) => (
  <div
    style={{
      border: "1px solid var(--danger)",
      background: "#fef2f2",
      color: "#991b1b",
      padding: 12,
      borderRadius: 12,
      display: "grid",
      gap: 6
    }}
  >
    <strong>{title}</strong>
    {detail && <span style={{ color: "#b91c1c" }}>{detail}</span>}
    <div>
      <Button variant="secondary" onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  </div>
);
