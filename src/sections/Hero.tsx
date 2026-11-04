import { allProjects, formatDuration, profile, totalCareerMonths } from '../data';
import styles from './Hero.module.css';

export default function Hero() {
  const career = formatDuration(totalCareerMonths());
  const [years, months] = career.match(/\d+/g) ?? ['0', '0'];

  return (
    <section id="intro" className={styles.hero}>
      <div className="container">
        <p className={styles.monogram} aria-hidden="true">
          {profile.monogram}
        </p>
        <h1 className={styles.title}>
          안녕하세요,
          <br />
          {profile.role}
          <br />
          {profile.name}입니다.
        </h1>
        <p className={styles.intro}>
          {profile.intro.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </p>

        <dl className={styles.stats}>
          <div>
            <dt>경력</dt>
            <dd>
              {years}
              <small>년</small> {months}
              <small>개월</small>
            </dd>
          </div>
          <div>
            <dt>프로젝트 경험</dt>
            <dd>{allProjects.length}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
