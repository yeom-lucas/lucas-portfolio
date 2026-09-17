import { useEffect, useRef, useState } from 'react';

/** 로딩 표시를 시작하기까지 기다리는 시간 (설계 §9) */
const LOADING_DELAY_MS = 150;

export interface AsyncState<T> {
  data: T | null;
  error: Error | null;
  /** 조회가 150ms를 넘겼을 때만 true */
  isLoading: boolean;
  reload: () => void;
}

export function useAsyncData<T>(loader: () => Promise<T>): AsyncState<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [attempt, setAttempt] = useState(0);

  // loader가 매 렌더마다 새 함수여도 조회를 다시 돌리지 않도록 ref에 담는다
  const loaderRef = useRef(loader);
  loaderRef.current = loader;

  useEffect(() => {
    let cancelled = false;
    setError(null);

    const timer = setTimeout(() => {
      if (!cancelled) setIsLoading(true);
    }, LOADING_DELAY_MS);

    loaderRef
      .current()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e : new Error(String(e)));
      })
      .finally(() => {
        clearTimeout(timer);
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [attempt]);

  return { data, error, isLoading, reload: () => setAttempt((n) => n + 1) };
}
