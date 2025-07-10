import react from '@vitejs/plugin-react';

export default {
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000,
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
