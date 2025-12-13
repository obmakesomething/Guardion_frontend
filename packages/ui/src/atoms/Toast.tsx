import React from "react";

export const Toast: React.FC<{ message: string; tone?: "info" | "success" | "warning" | "danger" }> = ({
  message,
  tone = "info"
}) => {
  const colors: Record<typeof tone, string> = {
    info: "#0ea5e9",
    success: "#16a34a",
    warning: "#f59e0b",
    danger: "#ef4444"
  };
  return (
    <div
      style={{
        padding: "10px 12px",
        borderRadius: 12,
        background: colors[tone],
        color: "#fff",
        fontWeight: 600
      }}
    >
      {message}
    </div>
  );
};
