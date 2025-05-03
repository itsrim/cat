import path from 'node:path';

import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    target: 'esnext'
  },
  plugins: [
    react(),
    federation({
      name: 'chatbotai-remote-app',
      filename: 'remoteEntry.js',
      exposes: {
        './features': './src/exposes/index.tsx'
      },
      shared: ['react', 'react-dom']
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts'
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      "~assets": path.resolve(__dirname, "./src/assets"),
      "~components": path.resolve(__dirname, "./src/components"),
      "~constants": path.resolve(__dirname, "./src/constants"),
      "~helpers": path.resolve(__dirname, "./src/helpers"),
      "~services": path.resolve(__dirname, "./src/services"),
      "~/i18n": path.resolve(__dirname, "./src/i18n.ts"),
    }
  }
});
