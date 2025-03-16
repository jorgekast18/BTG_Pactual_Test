import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,  // Habilita el sourcemap para obtener más detalles en caso de error
    rollupOptions: {
      onwarn(warning, warn) {
        // Ignorar ciertos tipos de advertencias, como las de tamaño de chunks o dependencias no resueltas
        if (warning.code === 'PLUGIN_WARNING') {
          return;
        }
        warn(warning);
      }
    }
  }
})
