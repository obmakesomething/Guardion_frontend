import React from "react";

export interface Evidence {
  id: string;
  label: string;
  url?: string;
  author?: string;
  time?: string;
}

export const EvidenceGallery: React.FC<{ items: Evidence[] }> = ({ items }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: 12
    }}
  >
    {items.map((item) => (
      <div
        key={item.id}
        style={{
          border: "1px solid var(--neutral-200)",
          borderRadius: 12,
          padding: 8,
          display: "grid",
          gap: 6
        }}
      >
        <div
          style={{
            height: 100,
            borderRadius: 10,
            background: item.url ? `url(${item.url}) center/cover` : "var(--neutral-100)"
          }}
        />
        <div style={{ fontWeight: 600 }}>{item.label}</div>
        {item.author && <div style={{ color: "var(--neutral-700)" }}>작성: {item.author}</div>}
        {item.time && <div style={{ color: "var(--neutral-500)", fontSize: 12 }}>{item.time}</div>}
      </div>
    ))}
  </div>
);
