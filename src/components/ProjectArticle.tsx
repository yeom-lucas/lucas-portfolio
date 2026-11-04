import { formatDuration, formatPeriod, monthsBetween, type Project } from '../data';
import Gallery from './Gallery';
import styles from './ProjectArticle.module.css';

export default function ProjectArticle({ project: p }: { project: Project }) {
  return (
    <article id={p.slug} className={styles.article}>
      <h2>{p.title}</h2>
      <p className={styles.team}>{p.team}</p>
      <p className={styles.period}>
        {formatPeriod(p.start, p.end)} ({formatDuration(monthsBetween(p.start, p.end))})
      </p>

      <p className={styles.description}>{p.description}</p>

      {p.tasks.length > 0 && (
        <section className={styles.block}>
          <h3>담당 업무</h3>
          <ul className="bullets">
            {p.tasks.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      {p.learnings.length > 0 && (
        <section className={styles.block}>
          <h3>배운 점</h3>
          <ul className="bullets">
            {p.learnings.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>
      )}

      {p.tech.length > 0 && (
        <ul className={styles.tech} aria-label="사용 기술">
          {p.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      )}

      {p.images.length > 0 && (
        <div className={styles.gallery}>
          <Gallery images={p.images} title={p.title} />
        </div>
      )}
    </article>
  );
}
