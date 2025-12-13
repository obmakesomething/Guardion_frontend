import React from "react";

export const Skeleton: React.FC<{ height?: number; width?: string | number }> = ({ height = 14, width = "100%" }) => (
  <div
    style={{
      height,
      width,
      background: "linear-gradient(90deg, #f8fafc, #e2e8f0, #f8fafc)",
      borderRadius: 8
    }}
  />
);
