import { useEffect, useRef, useState } from 'react';
import styles from './Gallery.module.css';
import { asset } from '../utils/asset';

/** 가로 스크롤 썸네일 + 클릭하면 크게 보기 */
export default function Gallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (index === null) d.close();
    else if (!d.open) d.showModal();
  }, [index]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setIndex((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === 'ArrowLeft') setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index, images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <ul className={styles.strip}>
        {images.map((src, i) => (
          <li key={src}>
            <button onClick={() => setIndex(i)} aria-label={`${title} 이미지 ${i + 1} 크게 보기`}>
              <img src={asset(src)} alt="" loading="lazy" />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        className={styles.dialog}
        onClose={() => setIndex(null)}
        onClick={(e) => e.target === e.currentTarget && setIndex(null)}
      >
        {index !== null && (
          <figure>
            <img src={asset(images[index])} alt={`${title} 이미지 ${index + 1}`} />
            <figcaption>
              {index + 1} / {images.length}
            </figcaption>
          </figure>
        )}
        {images.length > 1 && (
          <>
            <button
              className={`${styles.nav} ${styles.prev}`}
              onClick={() => setIndex((i) => (i === null ? i : (i - 1 + images.length) % images.length))}
              aria-label="이전 이미지"
            >
              ‹
            </button>
            <button
              className={`${styles.nav} ${styles.next}`}
              onClick={() => setIndex((i) => (i === null ? i : (i + 1) % images.length))}
              aria-label="다음 이미지"
            >
              ›
            </button>
          </>
        )}
        <button className={styles.close} onClick={() => setIndex(null)} aria-label="닫기">
          ✕
        </button>
      </dialog>
    </>
  );
}
