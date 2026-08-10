// Adapted from shadcn/ui: https://ui.shadcn.com/docs/components/toast.
"use client";

import {
  useState,
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";

type Toast = {
  id: string;
  title?: string;
  description?: string;
};

type ToastInput = {
  title?: string;
  description?: string;
};

type ToastContextValue = {
  toast: (input: ToastInput) => void;
  dismissToast: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idCounterRef = useRef(0);

  const toast = ({ title, description }: ToastInput) => {
    // Use a counter instead of Math.random() to avoid hydration mismatch.
    const id = `toast-${idCounterRef.current++}`;
    const newToast: Toast = { id, title, description };

    setToasts((prevToasts) => [...prevToasts, newToast]);

    // Auto dismiss after 5 seconds.
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, 5000);
  };

  const dismissToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast, dismissToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="bg-background border rounded-md shadow-lg p-4 max-w-md animate-in fade-in slide-in-from-bottom-5"
          >
            {t.title && <h3 className="font-medium">{t.title}</h3>}
            {t.description && (
              <p className="text-sm text-muted-foreground">{t.description}</p>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
