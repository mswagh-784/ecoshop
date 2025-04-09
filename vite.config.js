import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    hmr: {
      clientPort: 443
    },
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '.ngrok-free.app'
    ]
  }
})
