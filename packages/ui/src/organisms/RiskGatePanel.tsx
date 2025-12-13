import React from "react";
import { Button } from "../atoms/Button";

export interface RiskGatePanelProps {
  onProceed?: () => void;
  onNeedApproval?: () => void;
  onReject?: () => void;
}

export const RiskGatePanel: React.FC<RiskGatePanelProps> = ({ onProceed, onNeedApproval, onReject }) => (
  <div className="card" style={{ display: "grid", gap: 10 }}>
    <div style={{ fontWeight: 700 }}>리스크 게이트</div>
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button onClick={onProceed}>Proceed (승인)</Button>
      <Button variant="secondary" onClick={onNeedApproval}>
        Need approval
      </Button>
      <Button variant="ghost" onClick={onReject}>
        Reject
      </Button>
    </div>
  </div>
);
