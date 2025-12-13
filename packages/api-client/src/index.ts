import { withAuthHeaders, Session } from "@repo/auth";
import type { components } from "./generated/schema";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.example.com";

type Case = components["schemas"]["Case"];
type CaseDetail = components["schemas"]["CaseDetail"];
type CaseStatus = components["schemas"]["CaseStatus"];
type AcceptCaseResponse = components["schemas"]["AcceptCaseResponse"];
type Accrual = components["schemas"]["Accrual"];
type Invoice = components["schemas"]["Invoice"];
type GenerateInvoiceRequest = components["schemas"]["GenerateInvoiceRequest"];

async function request<T>(path: string, init: RequestInit = {}, session?: Session): Promise<T> {
  const headers = new Headers(init.headers || {});
  const finalInit = withAuthHeaders({ ...init, headers }, session);
  const res = await fetch(`${baseUrl}${path}`, finalInit);
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  return (await res.json()) as T;
}

export const apiClient = {
  getCase(id: string, session?: Session) {
    return request<CaseDetail>(`/cases/${id}`, {}, session);
  },
  listOrgCases(orgId: string, session?: Session, status?: CaseStatus) {
    const query = status ? `?status=${status}` : "";
    return request<{ cases: Case[] }>(`/orgs/${orgId}/cases${query}`, {}, session);
  },
  listTechAssignments(session?: Session) {
    return request<{ cases: Case[] }>(`/tech/cases/assigned`, {}, session);
  },
  acceptCase(id: string, session?: Session) {
    return request<AcceptCaseResponse>(`/cases/${id}/accept`, { method: "POST" }, session);
  },
  listAccruals(orgId: string, session?: Session) {
    return request<{ accruals: Accrual[] }>(`/orgs/${orgId}/accruals`, {}, session);
  },
  generateInvoice(orgId: string, body: GenerateInvoiceRequest, session?: Session) {
    return request<Invoice>(
      `/orgs/${orgId}/invoices/generate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      },
      session
    );
  }
};

export type { Case, CaseDetail, CaseStatus, AcceptCaseResponse, Accrual, Invoice };
