import React from "react";
import { Badge } from "../atoms/Badge";

export interface AppShellProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ title, subtitle, actions, children }) => (
  <div className="page">
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "18px 22px",
        border: "1px solid var(--neutral-200)",
        borderRadius: "var(--radius)",
        background: "#fff",
        boxShadow: "var(--shadow)",
        marginBottom: 16
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: 28 }}>{title}</h1>
        {subtitle && <small style={{ color: "var(--neutral-500)" }}>{subtitle}</small>}
      </div>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <Badge tone="info">MVP</Badge>
        {actions}
      </div>
    </header>
    {children}
  </div>
);
