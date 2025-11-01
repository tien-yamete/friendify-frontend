import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/shared/components'),
      '@services': path.resolve(__dirname, './src/shared/services'),
      '@contexts': path.resolve(__dirname, './src/shared/contexts'),
      '@configurations': path.resolve(__dirname, './src/shared/config'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@features': path.resolve(__dirname, './src/features'),
    }
  },
  build: {
    outDir: 'dist'
  }
})
