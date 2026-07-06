import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Route-level code splitting (via React.lazy in App.jsx) already
    // breaks pages into their own chunks. This groups the remaining
    // shared vendor code into a few cacheable, purpose-named chunks
    // instead of one monolithic bundle, so a change to app code
    // doesn't invalidate the cache for React/router/animation deps.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('react-dom') || id.includes('/react/') || id.includes('scheduler')) {
            return 'react-vendor';
          }
          if (id.includes('react-router')) {
            return 'router';
          }
          if (id.includes('framer-motion')) {
            return 'animations';
          }
          if (id.includes('lucide-react')) {
            return 'icons';
          }
          if (id.includes('react-markdown') || id.includes('remark') || id.includes('mdast') || id.includes('micromark') || id.includes('unist') || id.includes('unified') || id.includes('vfile')) {
            // Only pulled in when the chat window is actually opened
            // (see chatbot/ChatWidget.jsx lazy import).
            return 'markdown';
          }
          return 'vendor';
        },
      },
    },
    // cssCodeSplit is true by default in Vite, kept explicit for clarity:
    // each lazy-loaded route's CSS ships alongside its own JS chunk
    // instead of one large stylesheet blocking first paint.
    cssCodeSplit: true,
    // Source maps add real build time/output size and aren't needed
    // in the production artifact users download.
    sourcemap: false,
    // Default is 500kb; raised slightly so the vendor chunk warning
    // doesn't fire on framer-motion (which is inherently sizeable),
    // while still catching genuine regressions.
    chunkSizeWarningLimit: 600,
  },
})
