import React from "react";

export const Label: React.FC<{ htmlFor?: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} style={{ fontWeight: 700, fontSize: 14, display: "block", marginBottom: 6 }}>
    {children}
  </label>
);
