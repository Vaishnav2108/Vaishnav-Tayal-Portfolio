import { createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react';

const ToastContext = createContext<(message: string) => void>(() => {});
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef<number>();

  const show = useCallback((m: string) => {
    setMessage(m);
    setVisible(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setVisible(false), 2600);
  }, []);

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className={`toast${visible ? ' show' : ''}`} role="status" aria-live="polite">{message}</div>
    </ToastContext.Provider>
  );
}
