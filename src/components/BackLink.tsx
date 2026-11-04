import { useNavigate } from 'react-router-dom';
import styles from './BackLink.module.css';

export default function BackLink() {
  const navigate = useNavigate();
  // 사이트 안에서 들어왔으면 뒤로, 직접 들어왔으면 홈으로
  const goBack = () => (window.history.state?.idx > 0 ? navigate(-1) : navigate('/'));

  return (
    <button onClick={goBack} className={styles.back}>
      <span aria-hidden="true">←</span> 이전으로
    </button>
  );
}
