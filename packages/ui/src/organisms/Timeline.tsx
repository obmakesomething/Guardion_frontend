import React from "react";

export const Timeline: React.FC<{ steps: string[]; current: number }> = ({ steps, current }) => (
  <ol style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
    {steps.map((step, idx) => (
      <li
        key={step}
        style={{
          display: "flex",
          gap: 8,
          alignItems: "center",
          color: idx <= current ? "var(--neutral-900)" : "var(--neutral-500)"
        }}
      >
        <span
          style={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: idx <= current ? "var(--primary)" : "var(--neutral-200)",
            display: "inline-block"
          }}
        />
        <span>{step}</span>
      </li>
    ))}
  </ol>
);
