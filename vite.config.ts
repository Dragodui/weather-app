import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
  plugins: [react()],
  base: './', 
  build: {
    outDir: 'build',
    sourcemap: true,
  },
  define: {
    'process.env.WEATHER_API_KEY': JSON.stringify(process.env.WEATHER_API_KEY),
    'process.env.CITIES_API_KEY': JSON.stringify(process.env.CITIES_API_KEY)
  },
})
