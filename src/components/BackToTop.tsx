import { useEffect, useState } from 'react';
import styles from './BackToTop.module.css';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={styles.button}
      data-visible={visible || undefined}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="맨 위로"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
        <path fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" d="m6 15 6-6 6 6" />
      </svg>
    </button>
  );
}
