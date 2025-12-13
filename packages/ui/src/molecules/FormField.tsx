import React from "react";
import { Label } from "../atoms/Label";

export interface FormFieldProps {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({ label, hint, error, children }) => (
  <div style={{ display: "grid", gap: 6, marginBottom: 12 }}>
    <Label>{label}</Label>
    {children}
    {hint && <small style={{ color: "var(--neutral-500)" }}>{hint}</small>}
    {error && <small style={{ color: "var(--danger)", fontWeight: 600 }}>{error}</small>}
  </div>
);
