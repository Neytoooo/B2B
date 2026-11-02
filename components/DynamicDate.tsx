"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  try {
    const raw = new Intl.DateTimeFormat("fr-FR", {
      month: "long",
      year: "numeric",
    }).format(new Date());
    return raw.charAt(0).toUpperCase() + raw.slice(1);
  } catch {
    return "Novembre 2026";
  }
}

function getServerSnapshot() {
  return "Novembre 2026";
}

export default function DynamicDate() {
  const dateStr = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  return <span>{dateStr}</span>;
}
