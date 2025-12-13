import React from "react";
import { Button } from "../atoms/Button";

export interface PhotoUploaderProps {
  label?: string;
  onUpload?: (files: FileList) => void;
  required?: boolean;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({ label = "사진 업로드", onUpload, required }) => (
  <div
    style={{
      border: "1px dashed var(--neutral-200)",
      borderRadius: 12,
      padding: 12,
      display: "grid",
      gap: 8
    }}
  >
    <div style={{ fontWeight: 700 }}>{label}{required ? " (필수)" : ""}</div>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => e.target.files && onUpload?.(e.target.files)}
      aria-label={label}
    />
    <Button variant="ghost">재시도 / 다시 선택</Button>
  </div>
);
