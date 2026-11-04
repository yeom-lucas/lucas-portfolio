import { Link } from 'react-router-dom';
import BackLink from '../components/BackLink';
import Footer from '../components/Footer';
import ProjectThumb from '../components/ProjectThumb';
import { allProjects, formatDuration, formatPeriod, monthsBetween } from '../data';
import styles from './ProjectsPage.module.css';

export default function ProjectsPage() {
  return (
    <>
      <main className="container">
        <BackLink />
        <header className={styles.header}>
          <p>프로젝트</p>
          <h1>
            전체 프로젝트 <span>{allProjects.length}</span>
          </h1>
        </header>
        <ul className={styles.list}>
          {allProjects.map((p) => (
            <li key={p.slug}>
              <Link to={`/career/${p.company.slug}#${p.slug}`} className={styles.row}>
                <ProjectThumb project={p} />
                <div>
                  <h2>{p.title}</h2>
                  <p className={styles.meta}>
                    {p.company.name} · {formatPeriod(p.start, p.end)} (
                    {formatDuration(monthsBetween(p.start, p.end))})
                  </p>
                  <p className={styles.summary}>{p.summary}</p>
                  <ul className={styles.tech}>
                    {p.tech.slice(0, 6).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}
