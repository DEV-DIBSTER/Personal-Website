// Adapted from shadcn/ui: https://ui.shadcn.com/docs/components/toast.
"use client";

import { useState, createContext, useContext, useRef } from "react";

const ToastContext = createContext({});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idCounterRef = useRef(0);

  const toast = ({ title, description }) => {
    // Use a counter instead of Math.random() to avoid hydration mismatch.
    const id = `toast-${idCounterRef.current++}`;
    const newToast = { id, title, description };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    // Auto dismiss after 5 seconds.
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 5000);
  };

  const dismissToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast, dismissToast }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-background border rounded-md shadow-lg p-4 max-w-md animate-in fade-in slide-in-from-bottom-5"
          >
            {toast.title && <h3 className="font-medium">{toast.title}</h3>}
            {toast.description && <p className="text-sm text-muted-foreground">{toast.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);