'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';

interface ToastContextValue {
  toastMessage: string;
  visible: boolean;
  showToast: (msg: string) => void;
  hideToast: () => void;

  pendingToast: string | null;
  setPendingToast: (msg: string | null) => void;
  clearPendingToast: () => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [toastMessage, setToastMessage] = useState('');
  const [visible, setVisible] = useState(false);

  const [pendingToast, setPendingToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setVisible(true);
    setTimeout(() => setVisible(false), 2000);
  }, []);

  const hideToast = useCallback(() => setVisible(false), []);

  const clearPendingToast = useCallback(() => setPendingToast(null), []);

  useEffect(() => {
    if (pendingToast) {
      const timer = setTimeout(() => {
        showToast(pendingToast);
        clearPendingToast();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [pendingToast, showToast, clearPendingToast]);

  return (
    <ToastContext.Provider
      value={{
        toastMessage,
        visible,
        showToast,
        hideToast,
        pendingToast,
        setPendingToast,
        clearPendingToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
}

export function useToastContext() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('ToastContext must be used within ToastProvider');
  return ctx;
}
