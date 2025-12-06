import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:7241",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/hubs": {
        target: "https://localhost:7241",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [react(), tsconfigPaths()],
});
