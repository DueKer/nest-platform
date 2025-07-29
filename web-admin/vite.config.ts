import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // 确保在所有环境下都能正确加载资源
  publicDir: 'public', // 明确指定public目录
  server: {
    port: 3000,
    open: true,
    strictPort: true, // 如果端口已被占用，则会直接失败
    host: true, // 允许局域网访问
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});