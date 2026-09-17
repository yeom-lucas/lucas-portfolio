import { Component, type ErrorInfo, type ReactNode } from 'react';
import styles from './ErrorBoundary.module.css';

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

/**
 * 하위 컴포넌트에서 렌더링 에러가 나면 전체가 흰 화면이 되는 것을 막는다.
 * 이벤트 핸들러나 비동기 코드의 에러는 잡지 못한다 (그쪽은 useAsyncData가 담당).
 */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('렌더링 에러:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className={styles.wrap}>
          <h1 className={styles.title}>화면을 그리는 중 문제가 생겼습니다</h1>
          <p className={styles.message}>{this.state.error.message}</p>
          <button className={styles.button} onClick={() => window.location.reload()}>
            새로고침
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
