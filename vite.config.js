import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        adminGallery: resolve(__dirname, 'adminGallery.html'),
        adminMenu: resolve(__dirname, 'adminMenu.html'),
        adminOrders: resolve(__dirname, 'adminOrders.html'),
      }
    }
  }
})