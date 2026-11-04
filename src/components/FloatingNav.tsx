import { useEffect, useState } from 'react';
import styles from './FloatingNav.module.css';

const ITEMS = [
  { id: 'about', label: '소개' },
  { id: 'experience', label: '경력 사항' },
  { id: 'project', label: '프로젝트' },
  { id: 'skill', label: '기술 스택' },
];

/**
 * 섹션 내비게이션.
 * 좁은 화면: 하단에 떠 있다가 스크롤하면 상단에 붙는다.
 * 넓은 화면: 왼쪽 고정 패널 안에 놓인다.
 */
export default function FloatingNav() {
  const [active, setActive] = useState(ITEMS[0].id);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      // 화면 상단 1/3 지점을 지난 마지막 섹션을 현재 섹션으로 본다
      const line = window.innerHeight / 3;
      let current = ITEMS[0].id;
      for (const { id } of ITEMS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={styles.nav} data-scrolled={scrolled || undefined} aria-label="섹션 이동">
      {ITEMS.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          data-id={id}
          aria-current={active === id ? 'true' : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
