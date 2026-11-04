import styles from './SectionTitle.module.css';

export default function SectionTitle({ children }: { children: string }) {
  return <h2 className={styles.title}>{children}</h2>;
}
