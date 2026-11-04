import BackToTop from '../components/BackToTop';
import FloatingNav from '../components/FloatingNav';
import Footer from '../components/Footer';
import Career from '../sections/Career';
import Education from '../sections/Education';
import Hero from '../sections/Hero';
import Projects from '../sections/Projects';
import Skills from '../sections/Skills';

export default function Home() {
  return (
    <>
      <FloatingNav />
      <main>
        <Hero />
        <Career />
        <Projects />
        <Skills />
        <Education />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
