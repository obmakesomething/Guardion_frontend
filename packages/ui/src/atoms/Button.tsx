import React from "react";

type Variant = "primary" | "secondary" | "ghost";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const variantStyle: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "var(--primary)",
    color: "#fff",
    boxShadow: "0 8px 20px rgba(58, 162, 255, 0.3)"
  },
  secondary: {
    background: "var(--neutral-900)",
    color: "#fff"
  },
  ghost: {
    background: "transparent",
    color: "var(--neutral-900)",
    border: "1px solid var(--neutral-200)"
  }
};

export const Button: React.FC<ButtonProps> = ({ variant = "primary", style, children, ...rest }) => {
  return (
    <button
      style={{
        padding: "10px 16px",
        borderRadius: 12,
        border: "none",
        cursor: "pointer",
        fontWeight: 700,
        ...variantStyle[variant],
        ...style
      }}
      {...rest}
    >
      {children}
    </button>
  );
};
