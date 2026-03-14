import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/api": {
        target: "https://8000-firebase-nevo-fashion-cloud-1772556336752.cluster-bqwaigqtxbeautecnatk4o6ynk.cloudworkstations.dev",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
