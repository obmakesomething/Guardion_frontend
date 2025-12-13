import React from "react";

export const Badge: React.FC<{ tone?: "info" | "success" | "warning" | "danger"; children: React.ReactNode }> = ({
  tone = "info",
  children
}) => {
  const styles: Record<typeof tone, React.CSSProperties> = {
    info: { background: "#e0f2fe", color: "#0369a1" },
    success: { background: "#dcfce7", color: "#166534" },
    warning: { background: "#fef9c3", color: "#92400e" },
    danger: { background: "#fee2e2", color: "#b91c1c" }
  };
  return (
    <span
      style={{
        padding: "6px 12px",
        borderRadius: 999,
        fontWeight: 700,
        fontSize: 12,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        ...styles[tone]
      }}
    >
      {children}
    </span>
  );
};
