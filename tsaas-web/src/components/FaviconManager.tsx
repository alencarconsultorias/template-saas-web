"use client";

import { useEffect } from "react";

const FAVICON_STORAGE_KEY = "app_favicon_url";

function setFavicon(href: string | null) {
  if (typeof document === 'undefined') return; // SSR safety
  
  const head = document.head;
  // Remove existing icons
  const existing = head.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]');
  existing.forEach((el) => el.parentElement?.removeChild(el));

  if (!href) return;

  const link = document.createElement("link");
  link.rel = "icon";
  link.href = href;
  link.type = href.endsWith('.svg') ? 'image/svg+xml' : 'image/x-icon';
  head.appendChild(link);
}

export default function FaviconManager() {
  useEffect(() => {
    // Apply current favicon from localStorage
    const current = localStorage.getItem(FAVICON_STORAGE_KEY);
    if (current) {
      setFavicon(current);
    }

    // Listen for updates via storage (other tabs) and custom events (same tab)
    const onStorage = (e: StorageEvent) => {
      if (e.key === FAVICON_STORAGE_KEY) {
        setFavicon(e.newValue);
      }
    };
    const onCustom = (e: Event) => {
      const href = (e as CustomEvent<string | null>).detail ?? null;
      setFavicon(href);
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("favicon:update", onCustom);
    
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("favicon:update", onCustom);
    };
  }, []);

  return null;
}

export function updateFavicon(href: string | null) {
  // Persist and notify
  if (href === null) {
    localStorage.removeItem(FAVICON_STORAGE_KEY);
  } else {
    localStorage.setItem(FAVICON_STORAGE_KEY, href);
  }
  window.dispatchEvent(new CustomEvent("favicon:update", { detail: href }));
}


