import React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({ fullWidth = true, style, ...rest }) => {
  return (
    <input
      style={{
        width: fullWidth ? "100%" : undefined,
        padding: "10px 12px",
        borderRadius: 10,
        border: "1px solid var(--neutral-200)",
        fontSize: 14,
        ...style
      }}
      {...rest}
    />
  );
};
