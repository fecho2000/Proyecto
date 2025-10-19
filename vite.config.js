import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Proyecto/', // reemplaza con el nombre real de tu repo
  plugins: [react()],
})