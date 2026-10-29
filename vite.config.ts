import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          minSize: 20_000,
          groups: [
            {
              name: 'react-vendor',
              test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)[\\/]/,
              priority: 30,
            },
            {
              name: 'supabase-vendor',
              test: /[\\/]node_modules[\\/](@supabase|@tanstack|@radix-ui)[\\/]/,
              priority: 20,
            },
            {
              name: 'motion-vendor',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 10,
            },
            {
              name: 'vendor',
              test: /[\\/]node_modules[\\/]/,
              priority: 0,
            },
          ],
        },
      },
    },
  },
})
