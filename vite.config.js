import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages serves the site from a sub-path, so assets are referenced
// relatively. Combined with HashRouter this keeps deep links working.
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    // The capstone checklist expects the production bundle inside server/build;
    // `npm run deploy` copies it to docs/ so GitHub Pages can serve it.
    outDir: "server/build",
    emptyOutDir: true,
  },
});
