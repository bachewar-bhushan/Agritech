import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: true, // Enables access over the network
    port: 5173, // You can change the port if needed
    proxy: {
			"/api": {
				target: "https://www.agritech.oceanoex.com",
			},
		},

  build: {
    outDir: 'dist',
  },
}})
