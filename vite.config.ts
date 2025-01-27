import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // Define global to be window in the Vite build
  },
  resolve: {
    alias: {
      "@lexical/react": "lexical/dist/react.esm.js", // Adjust the path based on the actual file structure of @lexical/react
    },
  },
});
