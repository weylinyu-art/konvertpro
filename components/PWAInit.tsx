// components/PWAInit.tsx
// Register service worker for offline support + installability
"use client";
import { useEffect } from "react";

export default function PWAInit() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch(() => {}); // Fail silently
    }
  }, []);
  return null;
}
