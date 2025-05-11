// index.d.ts
declare module 'untoastify' {
  import { ReactNode, FC } from 'react';

  type ToastType = 'success' | 'error' | 'info' | 'warning';

  export interface ToastOptions {
    message: string;
    type?: ToastType;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    duration?: number;
    onClose?: () => void;
  }

  export function useToast(): {
    showToast: (options: ToastOptions) => void;
  };

  export const ToastProvider: FC<{ children: ReactNode }>;
}
