import { useEffect, useState } from 'react';
import styles from './CountUp.module.css';

/** 0 부터 목표 숫자까지 빠르게 올라가다 끝에서 천천히 멈춘다 */
export default function CountUp({
  to,
  duration = 1500,
  delay = 600,
}: {
  to: number;
  duration?: number;
  delay?: number;
}) {
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [value, setValue] = useState(reduceMotion ? to : 0);

  useEffect(() => {
    if (reduceMotion) return;
    let frame = 0;
    let start = 0;
    const step = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(Math.round(to * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    const timer = window.setTimeout(() => {
      frame = requestAnimationFrame(step);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [to, duration, delay, reduceMotion]);

  return (
    <>
      {/* 자리수만큼 폭을 잡아 두어 숫자가 바뀌어도 옆 글자가 흔들리지 않는다 */}
      <span className={styles.num} style={{ minWidth: `${String(to).length}ch` }} aria-hidden="true">
        {value}
      </span>
      <span className={styles.srOnly}>{to}</span>
    </>
  );
}
