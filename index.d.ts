import { ReactNode } from 'react';

export interface ToastProps {
  message: string;
  icon?: ReactNode;
  bgColor?: string;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onClose?: () => void;
}

export declare function Toast(props: ToastProps): JSX.Element;
