export interface SnackbarProps {
  show?: boolean;
  title?: string;
  text: string;
  icon?: string;
  timeout?: number;
  color?: string;
  closable?: boolean;
  border?: string;
  borderColor?: string;
  closeIcon?: string;
  density?: string;
  elevation?: string | number;
  variant?: string;
}
