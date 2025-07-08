import tailwindcss from '@tailwindcss/vite'

export default {
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    cors: true,
    allowedHosts: ['2721-46-143-183-105.ngrok-free.app'],
  },
  plugins: [tailwindcss()],
}
