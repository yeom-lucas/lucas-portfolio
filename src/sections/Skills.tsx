import { useState } from 'react';
import SectionTitle from '../components/SectionTitle';
import { skillGroups } from '../data';
import styles from './Skills.module.css';
import { asset } from '../utils/asset';

const ALL = '전체';

export default function Skills() {
  const [active, setActive] = useState(ALL);
  const groups = active === ALL ? skillGroups : skillGroups.filter((g) => g.category === active);

  return (
    <section id="skill" className={styles.section}>
      <div className="container">
        <SectionTitle>기술 스택</SectionTitle>

        <div className={styles.filters} role="tablist">
          {[ALL, ...skillGroups.map((g) => g.category)].map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              className={styles.filter}
              onClick={() => setActive(c)}
            >
              <span aria-hidden="true">#</span> {c}
            </button>
          ))}
        </div>

        <ul className={styles.grid}>
          {groups.flatMap((g) =>
            g.items.map((s) => (
              <li key={`${g.category}-${s.name}`} className={styles.skill}>
                <div className={styles.icon}>
                  {s.icon ? <img src={asset(s.icon)} alt="" loading="lazy" /> : <span>{s.name}</span>}
                </div>
                <span className={styles.name}>{s.name}</span>
              </li>
            )),
          )}
        </ul>
      </div>
    </section>
  );
}
