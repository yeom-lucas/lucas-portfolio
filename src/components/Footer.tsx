import ContactLinks from './ContactLinks';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>궁금하신 점은 편하게 연락 주세요. 빠르게 답변드리겠습니다.</p>
        <div className={styles.links}>
          <ContactLinks />
        </div>
      </div>
    </footer>
  );
}
