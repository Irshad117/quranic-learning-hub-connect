import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add these critical server options:
    cors: true,
    strictPort: true,
    headers: {
      "Cache-Control": "no-cache",
    },
    fs: {
    strict: false, // Allows serving files outside root
    allow: ['..'] // Needed for public directory access
  }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Add these build optimizations:
  build: {
    assetsInclude: ["**/*.json"],
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
  // Ensure proper base path handling:
}));