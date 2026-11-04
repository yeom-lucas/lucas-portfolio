import { useParams } from 'react-router-dom';
import BackLink from '../components/BackLink';
import Footer from '../components/Footer';
import ProjectArticle from '../components/ProjectArticle';
import { findCompany, formatDuration, formatYearMonth, monthsBetween } from '../data';
import NotFound from './NotFound';
import styles from './CompanyPage.module.css';

export default function CompanyPage() {
  const company = findCompany(useParams().slug);
  if (!company) return <NotFound />;

  return (
    <>
      <main className="container">
        <BackLink />
        <header className={styles.header}>
          <p className={styles.period}>
            {formatYearMonth(company.start)} — {company.end ? formatYearMonth(company.end) : '재직 중'}
            <span>({formatDuration(monthsBetween(company.start, company.end))})</span>
          </p>
          <h1>{company.name}</h1>
          <p className={styles.desc}>{company.description}</p>
          <ul className={styles.roles}>
            {company.roles.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </header>
        {company.projects.map((p) => (
          <ProjectArticle key={p.slug} project={p} />
        ))}
      </main>
      <Footer />
    </>
  );
}
