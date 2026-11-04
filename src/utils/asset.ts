/**
 * public 폴더 파일 경로에 배포 기준 경로를 붙인다.
 * NAS 등 루트 배포는 '/', GitHub Pages 는 '/lucas-portfolio/' (vite.config.ts 의 base).
 */
export function asset(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}
