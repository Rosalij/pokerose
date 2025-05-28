import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'login.html'),
        adminGallery: resolve(__dirname, 'admingallery.html'),
        adminMenu: resolve(__dirname, 'adminmenu.html'),
        adminOrders: resolve(__dirname, 'adminorders.html'),
      }
    }
  }
})
