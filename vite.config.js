import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: false
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-ecoshop.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
