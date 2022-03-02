import { defineConfig, loadEnv } from "vite";
import { join } from "path";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, join(__dirname, '../'));
  console.log(env.VITE_BASE_URL);
  return {
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true,
        template: "index.html",
        filename: 'index.html',
        entry: "src/main.jsx",
        inject: {
          data: {
            baseUrl: env.VITE_BASE_URL,
          },
        },
      }),
    ],
    server: {
      proxy: {
        "/api": {
          target: `${env.VITE_BASE_URL || "http://localhost:3001"}`,
        },
      },
    }
  };
});
