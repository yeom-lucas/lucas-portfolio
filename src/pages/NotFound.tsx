import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="container" style={{ padding: '160px 24px', textAlign: 'center' }}>
      <h1>페이지를 찾을 수 없습니다</h1>
      <p style={{ marginTop: 16 }}>
        <Link to="/" style={{ fontWeight: 700 }}>
          홈으로 →
        </Link>
      </p>
    </main>
  );
}
