import SectionTitle from '../components/SectionTitle';
import { formatYearMonth, profile } from '../data';
import styles from './Education.module.css';

export default function Education() {
  return (
    <section id="education" className={styles.section}>
      <div className="container">
        <SectionTitle>학력</SectionTitle>
        <ul className={styles.list}>
          {profile.education.map((e) => (
            <li key={e.school} className={styles.item}>
              <div className={styles.logo} aria-hidden="true">
                {e.school.slice(0, 1)}
              </div>
              <div>
                <h3>{e.school}</h3>
                <p className={styles.meta}>
                  <span>
                    {formatYearMonth(e.start)} - {formatYearMonth(e.end)}
                  </span>
                  <span>{e.status}</span>
                  <span>{e.major}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
