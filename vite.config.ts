import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

let faviconURL = "/favicon.svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "/android-chrome-192x192.png",
        "/android-chrome-512x512.png",
        "/apple-touch-icon.png",
      ],
      manifest: {
        short_name: "Emotion App",
        name: "Emotion App",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
