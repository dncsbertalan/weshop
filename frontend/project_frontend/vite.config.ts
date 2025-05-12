import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5220',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      '/hubs': {
        target: 'http://localhost:5220',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
})
