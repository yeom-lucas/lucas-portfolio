import { Link } from 'react-router-dom';
import ProjectThumb from '../components/ProjectThumb';
import SectionTitle from '../components/SectionTitle';
import { allProjects, featuredProjects, formatDuration, formatPeriod, monthsBetween } from '../data';
import styles from './Projects.module.css';

export default function Projects() {
  return (
    <section id="project" className={styles.section}>
      <div className="container">
        <SectionTitle>프로젝트</SectionTitle>
        <ul className={styles.list}>
          {featuredProjects.map((p) => (
            <li key={p.slug}>
              <Link to={`/career/${p.company.slug}#${p.slug}`} className={styles.card}>
                <ProjectThumb project={p} />
                <div>
                  <h3>{p.title}</h3>
                  <p className={styles.meta}>
                    <span>{p.company.name}</span>
                    <span aria-hidden="true">/</span>
                    <strong>{p.team}</strong>
                  </p>
                  <p className={styles.period}>
                    {formatPeriod(p.start, p.end)} ({formatDuration(monthsBetween(p.start, p.end))})
                  </p>
                  <p className={styles.summary}>{p.summary}</p>
                  <ul className="bullets">
                    {p.tasks.slice(0, 4).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/projects" className={styles.all}>
          전체 프로젝트 보기 <small>({allProjects.length})</small> <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
