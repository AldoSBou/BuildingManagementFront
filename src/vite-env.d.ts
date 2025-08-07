/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API Configuration
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_TIMEOUT: string;
  
  // App Information
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_DESCRIPTION: string;
  
  // Environment
  readonly VITE_ENVIRONMENT: 'development' | 'staging' | 'production';
  readonly VITE_DEBUG_MODE: string;
  readonly VITE_SHOW_API_LOGS: string;
  readonly VITE_SHOW_CONSOLE_LOGS: string;
  
  // Development
  readonly VITE_DEV_TOOLS_ENABLED: string;
  readonly VITE_DEV_EMAIL: string;
  readonly VITE_DEV_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}