import React from 'react';
import { createRoot } from 'react-dom/client'; // createRoot를 react-dom/client에서 임포트
import App from './App'; // App 컴포넌트 (또는 메인 컴포넌트) 임포트
import './index.css'; // 필요한 경우 CSS 파일 임포트

// 애플리케이션의 루트 엘리먼트를 가져옵니다.
const rootElement = document.getElementById('root');
// createRoot를 사용하여 루트 컴포넌트를 렌더링합니다.
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
