import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Output to build/ like the other FWG landing pages, so the Vercel config matches.
export default defineConfig({
  build: { outDir: "build" },
  plugins: [react()],
  server: { port: 4029, host: "0.0.0.0" },
});
