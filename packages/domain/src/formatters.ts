export function formatEta(label: string | number | [number, number]): string {
  if (Array.isArray(label)) {
    const [min, max] = label;
    return `약 ${min}–${max}분`;
  }
  if (typeof label === "number") {
    return `약 ${label}분`;
  }
  return label;
}

export function formatAddressSummary(gu: string, dong?: string) {
  return dong ? `${gu} ${dong}` : gu;
}

export function formatTime(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")} ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}
