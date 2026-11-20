import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve('.') } },
  test: { include: ['src/**/*.test.{ts,tsx}'], environment: 'jsdom', globals: true, setupFiles: ['./src/test/setup.ts'], clearMocks: true, restoreMocks: true, coverage: { provider: 'v8', reporter: ['text', 'html'], include: ['src/lib/**/*.ts'], exclude: ['**/*.test.ts'] } },
});
