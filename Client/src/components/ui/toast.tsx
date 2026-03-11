import { createContext, ReactNode, useContext, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

type ToastType = "default" | "destructive";

interface Toast {
  id: number;
  title: string;
  description?: string;
  type?: ToastType;
}

interface ToastContextValue {
  showToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-[100] space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "w-72 rounded-md border px-4 py-3 shadow-lg bg-neutral-900 text-white",
              toast.type === "destructive" && "border-red-500"
            )}
          >
            <p className="font-semibold">{toast.title}</p>
            {toast.description ? (
              <p className="text-sm text-neutral-300 mt-1">{toast.description}</p>
            ) : null}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx;
}

