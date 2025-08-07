import { toast as hotToast } from 'react-hot-toast';

export const toast = {
  success: (message: string) => hotToast.success(message),
  error: (message: string) => hotToast.error(message),
  loading: (message: string) => hotToast.loading(message),
  info: (message: string) => hotToast(message, {
    icon: 'ℹ️',
    duration: 3000,
    style: {
      borderRadius: '8px',
      background: '#3b82f6',
      color: '#fff',
    },
  }),
  warning: (message: string) => hotToast(message, {
    icon: '⚠️',
    duration: 4000,
    style: {
      borderRadius: '8px',
      background: '#f59e0b',
      color: '#fff',
    },
  }),
  promise: hotToast.promise,
  dismiss: hotToast.dismiss,
};