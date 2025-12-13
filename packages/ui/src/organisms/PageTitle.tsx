import React from "react";

export const PageTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div style={{ marginBottom: 12 }}>
    <h2 style={{ margin: 0 }}>{title}</h2>
    {subtitle && <p style={{ margin: "4px 0", color: "var(--neutral-500)" }}>{subtitle}</p>}
  </div>
);
