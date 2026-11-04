import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import { companies, formatDuration, formatYearMonth, monthsBetween } from '../data';
import styles from './Career.module.css';

export default function Career() {
  return (
    <section id="experience" className={styles.section}>
      <div className="container">
        <SectionTitle>경력 사항</SectionTitle>
        <ol className={styles.timeline}>
          {companies.map((c) => (
            <li key={c.slug} className={styles.item} data-current={c.end === null || undefined}>
              <div className={styles.period}>
                <span>
                  {formatYearMonth(c.start)} ~ {c.end ? formatYearMonth(c.end) : '현재'}
                </span>
                <small>{formatDuration(monthsBetween(c.start, c.end))}</small>
              </div>
              <div className={styles.body}>
                <h3>{c.name}</h3>
                <p className={styles.desc}>{c.description}</p>
                <ul className={styles.roles}>
                  {c.roles.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
                <Link to={`/career/${c.slug}`} className={styles.more}>
                  프로젝트 {c.projects.length}개 보기 <span aria-hidden="true">→</span>
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
