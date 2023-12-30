import vue from "@vitejs/plugin-vue";
import vike from "vike/plugin";
import { UserConfig } from "vite";
import { resolve } from "path";

const config: UserConfig = {
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),
    vike({
      disableUrlNormalization: true,
    }),
  ],
  base: "/",
  clearScreen: false,
  build: {
    rollupOptions: {
      output: {
        format: "es", // Transpile to ESM instead of CJS
      },
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      "@": resolve("./src"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};

export default config;
