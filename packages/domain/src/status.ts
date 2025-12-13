export enum CaseStatus {
  SUBMITTED = "SUBMITTED",
  NEED_APPROVAL = "NEED_APPROVAL",
  DISPATCHING = "DISPATCHING",
  ACCEPTED = "ACCEPTED",
  ASSIGNED = "ASSIGNED",
  EN_ROUTE = "EN_ROUTE",
  ARRIVED = "ARRIVED",
  WORKING = "WORKING",
  OTP_PENDING = "OTP_PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
  REJECTED = "REJECTED",
  FAILED = "FAILED"
}

export const allowedTransitions: Record<CaseStatus, CaseStatus[]> = {
  [CaseStatus.SUBMITTED]: [CaseStatus.NEED_APPROVAL, CaseStatus.DISPATCHING, CaseStatus.REJECTED, CaseStatus.CANCELLED],
  [CaseStatus.NEED_APPROVAL]: [CaseStatus.DISPATCHING, CaseStatus.REJECTED, CaseStatus.CANCELLED],
  [CaseStatus.DISPATCHING]: [CaseStatus.ACCEPTED, CaseStatus.CANCELLED, CaseStatus.FAILED, CaseStatus.EXPIRED],
  [CaseStatus.ACCEPTED]: [CaseStatus.ASSIGNED, CaseStatus.CANCELLED],
  [CaseStatus.ASSIGNED]: [CaseStatus.EN_ROUTE, CaseStatus.CANCELLED],
  [CaseStatus.EN_ROUTE]: [CaseStatus.ARRIVED, CaseStatus.CANCELLED],
  [CaseStatus.ARRIVED]: [CaseStatus.WORKING, CaseStatus.CANCELLED],
  [CaseStatus.WORKING]: [CaseStatus.OTP_PENDING, CaseStatus.FAILED, CaseStatus.CANCELLED],
  [CaseStatus.OTP_PENDING]: [CaseStatus.COMPLETED, CaseStatus.FAILED],
  [CaseStatus.COMPLETED]: [],
  [CaseStatus.CANCELLED]: [],
  [CaseStatus.EXPIRED]: [],
  [CaseStatus.REJECTED]: [],
  [CaseStatus.FAILED]: []
};

export function canTransition(from: CaseStatus, to: CaseStatus) {
  return allowedTransitions[from]?.includes(to) ?? false;
}
