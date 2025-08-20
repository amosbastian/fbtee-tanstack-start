import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import fbteePreset from "@nkzw/babel-preset-fbtee";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    target: "es2022",
  },
  plugins: [
    tailwindcss(),
    tanstackStart({
      tsr: {
        srcDirectory: "src",
      },
      target: "node-server",
      customViteReactPlugin: true,
    }),
    react({
      babel: {
        presets: [fbteePreset],
      },
    }),
  ],
  resolve: {
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
});
