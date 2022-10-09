/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    REACT_APP_API_BASE_URL: string;
    REACT_APP_CLOUD_NAME: string;
  }
}
