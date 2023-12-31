import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      styles: path.resolve(__dirname, 'src/styles'),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      data: path.resolve(__dirname, 'src/data'),
      context: path.resolve(__dirname, 'src/context'),
      hooks: path.resolve(__dirname, 'src/hooks'),
    },
  },
})
