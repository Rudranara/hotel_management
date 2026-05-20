"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3500,
        style: {
          borderRadius: "18px",
          background: "rgba(15, 23, 42, 0.92)",
          color: "#f8fafc",
          border: "1px solid rgba(148, 163, 184, 0.22)",
        },
      }}
    />
  );
}
