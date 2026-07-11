"use client";

import { useEffect, useState } from "react";

export default function useAnalytics() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return data;
}