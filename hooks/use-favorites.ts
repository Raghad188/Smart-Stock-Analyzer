"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "smart-stock-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      setFavorites(stored ? JSON.parse(stored) : ["2222", "1120", "7010"]);
      setReady(true);
    });
  }, []);

  const toggleFavorite = useCallback((symbol: string) => {
    setFavorites((current) => {
      const next = current.includes(symbol)
        ? current.filter((item) => item !== symbol)
        : [...current, symbol];
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return {
    favorites,
    ready,
    isFavorite: (symbol: string) => favorites.includes(symbol),
    toggleFavorite
  };
}
