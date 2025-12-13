import React from "react";

export const FilterBar: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      display: "flex",
      gap: 10,
      flexWrap: "wrap",
      alignItems: "center",
      marginBottom: 12
    }}
  >
    {children}
  </div>
);
