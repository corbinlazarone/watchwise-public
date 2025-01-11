export enum ALERT_TYPE {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
}

export interface Alert {
  type: ALERT_TYPE;
  message: string;
}

export interface AlertProps {
  children: React.ReactNode;
  variant?: "info" | "warning" | "error" | "success";
}

export interface AlertPropsForPopup {
  message: string;
  type?: "info" | "success" | "warning" | "error";
  duration?: number;
  onClose: () => void;
}
