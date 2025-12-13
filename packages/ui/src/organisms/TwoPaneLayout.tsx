import React from "react";

export const TwoPaneLayout: React.FC<{ list: React.ReactNode; detail: React.ReactNode }> = ({ list, detail }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "340px 1fr",
      gap: 16
    }}
  >
    <div>{list}</div>
    <div>{detail}</div>
  </div>
);
