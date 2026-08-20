"use client";

import { useEffect, useState } from "react";
import { X, Check, Loader2, AlertCircle } from "lucide-react";

type ToastType = "success" | "error" | "loading" | "info";

interface AISuggestionToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  actionLabel?: string;
  onAction?: () => void;
}

export function AISuggestionToast({
  message,
  type,
  onClose,
  actionLabel,
  onAction
}: AISuggestionToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  const icons = {
    success: <Check className="h-5 w-5 text-emerald-400" />,
    error: <AlertCircle className="h-5 w-5 text-red-400" />,
    loading: <Loader2 className="h-5 w-5 animate-spin text-purple-400" />,
    info: <Loader2 className="h-5 w-5 text-blue-400" />
  };

  const backgrounds = {
    success: "bg-emerald-500/10 border-emerald-500/30",
    error: "bg-red-500/10 border-red-500/30",
    loading: "bg-purple-500/10 border-purple-500/30",
    info: "bg-blue-500/10 border-blue-500/30"
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl animate-slide-in ${backgrounds[type]}`}
      role="alert"
    >
      {icons[type]}
      <span className="text-sm text-white">{message}</span>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="ml-2 text-xs font-semibold text-purple-300 hover:text-purple-200 underline"
        >
          {actionLabel}
        </button>
      )}
      <button
        onClick={() => { setVisible(false); onClose(); }}
        className="ml-2 p-1 text-slate-400 hover:text-white transition"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

interface AIToastManagerProps {
  toasts: Array<{
    id: string;
    message: string;
    type: ToastType;
    actionLabel?: string;
    onAction?: () => void;
  }>;
  onDismiss: (id: string) => void;
}

export function AIToastManager({ toasts, onDismiss }: AIToastManagerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <AISuggestionToast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => onDismiss(toast.id)}
          actionLabel={toast.actionLabel}
          onAction={toast.onAction}
        />
      ))}
    </div>
  );
}