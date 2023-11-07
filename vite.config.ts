import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const cherryPickedKeys = [
  "WEATHER_API_KEY",
  "CITIES_API_KEY",
];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const processEnv = {};
  cherryPickedKeys.forEach(key => processEnv[key] = env[key]);

  return {
    define: {
      'process.env': processEnv,
      'import.meta.env.WEATHER_API_KEY': JSON.stringify(process.env.WEATHER_API_KEY),
      'import.meta.env.CITIES_API_KEY': JSON.stringify(process.env.CITIES_API_KEY)
    },
    plugins: [react()],
  }
})