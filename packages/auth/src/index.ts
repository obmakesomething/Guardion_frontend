export type Role = "customer" | "callcenter" | "tech" | "admin" | "guest";

export interface Session {
  user?: { id: string; name: string; email?: string };
  role: Role;
  accessToken?: string;
}

let cachedSession: Session = { role: "guest" };

export function useSession(): Session {
  return cachedSession;
}

export function setSession(session: Session) {
  cachedSession = session;
}

export function requireRole(roles: Role[], current: Session): boolean {
  return roles.includes(current.role);
}

export function withAuthHeaders(init: RequestInit = {}, session: Session = cachedSession) {
  const headers = new Headers(init.headers || {});
  if (session.accessToken) {
    headers.set("Authorization", `Bearer ${session.accessToken}`);
  }
  return { ...init, headers };
}
