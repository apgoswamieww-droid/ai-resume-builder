"use client";

import { useState, useTransition } from "react";
import { AlertTriangle, X, Loader2, Trash2 } from "lucide-react";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "info";
  onConfirm: () => Promise<void> | void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      iconBg: "bg-red-500/10 border-red-500/30",
      iconColor: "text-red-400",
      button: "bg-red-600 hover:bg-red-500 shadow-red-500/20",
    },
    warning: {
      iconBg: "bg-amber-500/10 border-amber-500/30",
      iconColor: "text-amber-400",
      button: "bg-amber-600 hover:bg-amber-500 shadow-amber-500/20",
    },
    info: {
      iconBg: "bg-blue-500/10 border-blue-500/30",
      iconColor: "text-blue-400",
      button: "bg-blue-600 hover:bg-blue-500 shadow-blue-500/20",
    },
  }[variant];

  const handleConfirm = () => {
    startTransition(async () => {
      await onConfirm();
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-blue-950/50">
        <div className="flex items-start justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${variantStyles.iconBg}`}>
            <AlertTriangle className={`h-6 w-6 ${variantStyles.iconColor}`} />
          </div>
          <button
            onClick={onCancel}
            disabled={isPending}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm text-slate-400 leading-relaxed">{message}</p>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-800/80 pt-4">
          <button
            onClick={onCancel}
            disabled={isPending}
            className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isPending}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold text-white shadow-md transition disabled:opacity-50 ${variantStyles.button}`}
          >
            {isPending ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                {confirmLabel}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}