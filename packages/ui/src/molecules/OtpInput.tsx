import React from "react";
import { Input } from "../atoms/Input";

export const OtpInput: React.FC<{ value: string; onChange: (v: string) => void; length?: number }> = ({
  value,
  onChange,
  length = 6
}) => {
  return (
    <Input
      aria-label="OTP 코드"
      value={value}
      onChange={(e) => {
        const next = e.target.value.replace(/[^0-9]/g, "").slice(0, length);
        onChange(next);
      }}
      inputMode="numeric"
      pattern="[0-9]*"
      placeholder="OTP 입력"
    />
  );
};
