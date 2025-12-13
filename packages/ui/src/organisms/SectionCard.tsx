import React from "react";

export const SectionCard: React.FC<{ heading: string; children: React.ReactNode }> = ({ heading, children }) => (
  <div className="card" style={{ display: "grid", gap: 10 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <h3 style={{ margin: 0 }}>{heading}</h3>
    </div>
    {children}
  </div>
);
