import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000, // تشغيل السيرفر على بورت 3000
    proxy: {
      '/track-visit': 'https://tracking.ozex.site',
      '/track-action': 'https://tracking.ozex.site',
      '/track-duration': 'https://tracking.ozex.site',
      '/analytics': 'https://tracking.ozex.site',
      '/extended-analytics': 'https://tracking.ozex.site',
      '/actions-rank': 'https://tracking.ozex.site'
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
