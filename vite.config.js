import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  // Dev proxy: route /api to backend to avoid CORS and unsafe port issues in browser
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:6000',
        changeOrigin: true,
        secure: false,
        // strip the /api prefix when forwarding
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
