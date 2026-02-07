import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/portfolio/',
  build: {
    outDir: 'dist',
    // Increase warning threshold so we can focus on meaningful bundle sizes in this project
    chunkSizeWarningLimit: 1500, // in KB
    rollupOptions: {
      output: {
        // Simple manual chunking to split major vendors and keep the main chunk smaller.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'vendor_framer-motion';
            if (id.includes('react')) return 'vendor_react';
            // put large UI libs like lodash / date-fns in their own chunk if detected
            if (id.includes('lodash')) return 'vendor_lodash';
            return 'vendor_misc';
          }
        },
      },
    },
  }
})
