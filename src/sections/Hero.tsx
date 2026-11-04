import CountUp from '../components/CountUp';
import { allProjects, formatDuration, profile, totalCareerMonths } from '../data';
import { asset } from '../utils/asset';
import styles from './Hero.module.css';

export default function Hero() {
  const career = formatDuration(totalCareerMonths());
  const [years, months] = career.match(/\d+/g) ?? ['0', '0'];

  return (
    <section id="intro" className={styles.hero}>
      <div className="container">
        <img
          className={styles.avatar}
          src={asset(profile.avatar)}
          alt={`${profile.name} 캐리커처`}
          width={112}
          height={112}
        />
        <p className={styles.eyebrow}>{profile.role} 포트폴리오</p>
        <h1 className={styles.title}>
          보이지 않는 곳을
          <br />
          단단하게 만드는
          <br />
          <span className={styles.name}>{profile.name}</span>입니다.
        </h1>
        <p className={styles.intro}>
          {profile.intro.map((line, i) => (
            <span key={line} style={{ animationDelay: `${0.4 + i * 0.35}s` }}>
              {line}
            </span>
          ))}
        </p>

        <dl className={styles.stats}>
          <div>
            <dt>경력</dt>
            <dd>
              <CountUp to={Number(years)} />
              <small>년</small> <CountUp to={Number(months)} />
              <small>개월</small>
            </dd>
          </div>
          <div>
            <dt>프로젝트 경험</dt>
            <dd>
              <CountUp to={allProjects.length} />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
