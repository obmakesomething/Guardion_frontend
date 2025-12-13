import React from "react";

export interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  at: string;
}

export const AuditLog: React.FC<{ entries: AuditLogEntry[] }> = ({ entries }) => (
  <div style={{ display: "grid", gap: 8 }}>
    {entries.map((entry) => (
      <div
        key={entry.id}
        style={{
          border: "1px solid var(--neutral-200)",
          borderRadius: 10,
          padding: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div>
          <div style={{ fontWeight: 700 }}>{entry.action}</div>
          <div style={{ color: "var(--neutral-500)", fontSize: 13 }}>{entry.actor}</div>
        </div>
        <div style={{ color: "var(--neutral-700)", fontSize: 13 }}>{entry.at}</div>
      </div>
    ))}
  </div>
);
