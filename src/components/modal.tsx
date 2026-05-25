"use client";

import { ReactNode } from "react";

import { cn } from "@/utils/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 px-4 py-8 backdrop-blur-sm">
      <div className={cn("w-full max-w-2xl rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-xl")}>
        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#111827]">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#E5E7EB] px-3 py-1 text-sm text-[#6B7280] transition hover:bg-[#F1F5F9]"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
