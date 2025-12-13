export enum CaseStatus {
  SUBMITTED = "SUBMITTED",
  NEED_APPROVAL = "NEED_APPROVAL",
  APPROVED = "APPROVED",
  DISPATCHING = "DISPATCHING",
  DISPATCHED = "DISPATCHED",
  EN_ROUTE = "EN_ROUTE",
  ARRIVED = "ARRIVED",
  WORKING = "WORKING",
  OTP_PENDING = "OTP_PENDING",
  COMPLETED = "COMPLETED",
  CANCELED = "CANCELED",
  REJECTED = "REJECTED",
  FAILED = "FAILED"
}

export const allowedTransitions: Record<CaseStatus, CaseStatus[]> = {
  [CaseStatus.SUBMITTED]: [CaseStatus.NEED_APPROVAL, CaseStatus.APPROVED, CaseStatus.REJECTED],
  [CaseStatus.NEED_APPROVAL]: [CaseStatus.SUBMITTED, CaseStatus.APPROVED, CaseStatus.REJECTED],
  [CaseStatus.APPROVED]: [CaseStatus.DISPATCHING],
  [CaseStatus.DISPATCHING]: [CaseStatus.DISPATCHED, CaseStatus.FAILED],
  [CaseStatus.DISPATCHED]: [CaseStatus.EN_ROUTE, CaseStatus.CANCELED],
  [CaseStatus.EN_ROUTE]: [CaseStatus.ARRIVED, CaseStatus.CANCELED],
  [CaseStatus.ARRIVED]: [CaseStatus.WORKING, CaseStatus.CANCELED],
  [CaseStatus.WORKING]: [CaseStatus.OTP_PENDING, CaseStatus.FAILED],
  [CaseStatus.OTP_PENDING]: [CaseStatus.COMPLETED, CaseStatus.FAILED],
  [CaseStatus.COMPLETED]: [],
  [CaseStatus.CANCELED]: [],
  [CaseStatus.REJECTED]: [],
  [CaseStatus.FAILED]: []
};

export function canTransition(from: CaseStatus, to: CaseStatus) {
  return allowedTransitions[from]?.includes(to) ?? false;
}
