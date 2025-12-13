export interface Case {
  id: string;
  status: string;
  phone: string;
  gu?: string;
  dong?: string;
  eta?: string;
}

export interface DispatchCandidate {
  id: string;
  name: string;
  distanceKm?: number;
  availability?: string;
  recentJobs?: number;
}
