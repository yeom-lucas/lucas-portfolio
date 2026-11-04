import SectionTitle from '../components/SectionTitle';
import { profile } from '../data';
import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <SectionTitle>소개</SectionTitle>
        <p className={styles.summary}>{profile.about.summary}</p>
        <ul className={styles.list}>
          {profile.about.strengths.map((s, i) => (
            <li key={s.title} className={styles.item}>
              <span className={styles.num}>{String(i + 1).padStart(2, '0')}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
