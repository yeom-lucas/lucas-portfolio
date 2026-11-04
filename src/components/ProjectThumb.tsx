import { thumbnailOf, type Project } from '../data';
import styles from './ProjectThumb.module.css';

/** 이미지가 있으면 이미지, 없으면 프로젝트 라벨을 그라데이션 타일로 */
export default function ProjectThumb({ project }: { project: Project }) {
  const src = thumbnailOf(project);

  if (src) {
    return (
      <div className={styles.thumb}>
        <img src={src} alt={`${project.title} 썸네일`} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`${styles.thumb} ${styles.tile}`} aria-hidden="true">
      <span>{project.label ?? project.title.slice(0, 6)}</span>
    </div>
  );
}
