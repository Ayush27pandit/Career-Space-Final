// vite.config.ts
import path from "path";
import react from "file:///home/sid/code/react/Carrier-Space/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///home/sid/code/react/Carrier-Space/node_modules/vite/dist/node/index.js";
var __vite_injected_original_dirname = "/home/sid/code/react/Carrier-Space";
var basenameProd = "/react-shadcn-starter";
var vite_config_default = defineConfig(({ command }) => {
  const isProd = command === "build";
  return {
    base: isProd ? basenameProd : "",
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "./src")
      }
    },
    define: {
      global: {
        basename: isProd ? basenameProd : ""
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9zaWQvY29kZS9yZWFjdC9DYXJyaWVyLVNwYWNlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9zaWQvY29kZS9yZWFjdC9DYXJyaWVyLVNwYWNlL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3NpZC9jb2RlL3JlYWN0L0NhcnJpZXItU3BhY2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCJcblxuY29uc3QgYmFzZW5hbWVQcm9kID0gJy9yZWFjdC1zaGFkY24tc3RhcnRlcidcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQgfSkgPT4ge1xuICBjb25zdCBpc1Byb2QgPSBjb21tYW5kID09PSAnYnVpbGQnXG5cbiAgcmV0dXJuIHtcbiAgICBiYXNlOiBpc1Byb2QgPyBiYXNlbmFtZVByb2QgOiAnJyxcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgICB9LFxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICBnbG9iYWw6IHtcbiAgICAgICAgYmFzZW5hbWU6IGlzUHJvZCA/IGJhc2VuYW1lUHJvZCA6ICcnLFxuICAgICAgfSxcbiAgICB9LFxuICB9XG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1IsT0FBTyxVQUFVO0FBQ3pTLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUY3QixJQUFNLG1DQUFtQztBQUl6QyxJQUFNLGVBQWU7QUFFckIsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxRQUFRLE1BQU07QUFDM0MsUUFBTSxTQUFTLFlBQVk7QUFFM0IsU0FBTztBQUFBLElBQ0wsTUFBTSxTQUFTLGVBQWU7QUFBQSxJQUM5QixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsSUFDakIsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLE1BQ3RDO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sUUFBUTtBQUFBLFFBQ04sVUFBVSxTQUFTLGVBQWU7QUFBQSxNQUNwQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
