import react from '@vitejs/plugin-react';

export default {
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: true,
    allowedHosts: ['2721-46-143-183-105.ngrok-free.app'],
  },
  plugins: [
    react(), // React plugin
    // tailwindcss is usually configured via PostCSS config, not as a Vite plugin directly
  ],
  build: {
    chunkSizeWarningLimit: 1000, // increase chunk warning limit to 1000KB
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('mathjs')) return 'vendor-mathjs';
            return 'vendor';
          }
        },
      },
    },
  },
};
