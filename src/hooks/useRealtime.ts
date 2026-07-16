"use client";

import { useEffect } from "react";

export default function useRealtime(
  onRefresh: () => void
) {
  useEffect(() => {
    const source = new EventSource("/api/events");

    source.onmessage = () => {
      onRefresh();
    };

    source.onerror = () => {
      source.close();
    };

    return () => source.close();
  }, [onRefresh]);
}