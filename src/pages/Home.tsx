import BackToTop from '../components/BackToTop';
import ContactLinks from '../components/ContactLinks';
import FloatingNav from '../components/FloatingNav';
import Footer from '../components/Footer';
import About from '../sections/About';
import Career from '../sections/Career';
import Education from '../sections/Education';
import Hero from '../sections/Hero';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';
import styles from './Home.module.css';

/** 넓은 화면: 왼쪽에 소개 고정, 오른쪽만 스크롤. 좁은 화면: 위아래로 쌓인다 */
export default function Home() {
  return (
    <div className={styles.layout}>
      <aside className={styles.side}>
        <div className={styles.sideMain}>
          <Hero />
          <FloatingNav />
        </div>
        <div className={styles.sideContact}>
          <p>궁금하신 점은 편하게 연락 주세요. 빠르게 답변드리겠습니다.</p>
          <ContactLinks />
        </div>
      </aside>
      <div className={styles.content}>
        <main>
          <About />
          <Career />
          <Projects />
          <Skills />
          <Education />
        </main>
        {/* 좁은 화면에서는 왼쪽 패널 연락처 대신 맨 아래에 */}
        <div className={styles.mobileFooter}>
          <Footer />
        </div>
      </div>
      <BackToTop />
    </div>
  );
}
