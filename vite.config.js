import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'three-core': ['three'],
          'three-react': ['@react-three/fiber', '@react-three/drei'],
          'motion': ['motion'],
          'emailjs': ['@emailjs/browser'],
        },
      },
    },
  },
})
