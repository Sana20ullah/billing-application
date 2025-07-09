import tailwindcss from '@tailwindcss/vite';

export default {
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: {
      origin: [
        'https://billing-backend-mp2p.onrender.com',
        'https://billing-application-5.onrender.com',
        'http://localhost:5173'  // local dev URL
      ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],  // specify allowed methods if needed
      credentials: true
    },
    allowedHosts: [
      '2721-46-143-183-105.ngrok-free.app',
      'billing-application-5.onrender.com',
      'billing-backend-mp2p.onrender.com'
    ],
  },
  plugins: [tailwindcss()],
};
