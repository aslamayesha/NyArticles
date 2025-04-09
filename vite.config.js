import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import viteJsconfigPaths from 'vite-jsconfig-paths';
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    plugins: [react(), viteJsconfigPaths(), splitVendorChunkPlugin(), tailwindcss()],
    resolve: {
        alias: {
            src: '/src',
        },
    },
    server: {
        port: 3000,
        host: true,
    },
    build: {
        outDir: './build',
    },
    test: {
        environment: 'jsdom', // For React DOM testing
        globals: true,         // Optional: use global `describe`, `test`, etc.
        setupFiles: './src/setupTests.js' // Optional: for things like jest-dom
      }
});