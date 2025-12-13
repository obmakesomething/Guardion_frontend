import { withAuthHeaders, Session } from "@repo/auth";
import type { Case, DispatchCandidate } from "./generated/schema";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com";

async function request<T>(path: string, init: RequestInit = {}, session?: Session): Promise<T> {
  const res = await fetch(`${baseUrl}${path}`, withAuthHeaders(init, session));
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return (await res.json()) as T;
}

export const apiClient = {
  getCase(id: string, session?: Session) {
    return request<Case>(`/cases/${id}`, {}, session);
  },
  listOpsCases(session?: Session) {
    return request<Case[]>(`/ops/cases`, {}, session);
  },
  listTechCandidates(session?: Session) {
    return request<DispatchCandidate[]>(`/ops/techs`, {}, session);
  }
};

export type { Case, DispatchCandidate };
