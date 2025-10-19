import { useEffect, useState } from "react";

export function useFetch<T = unknown>(url?: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) return;
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(url)
      .then((r) => {        
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {        
        if (!cancelled) setData(json as T);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}