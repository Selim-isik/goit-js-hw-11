import { defineConfig } from 'vite';
import { glob } from 'glob';
import path from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => ({
  define: {
    [command === 'serve' ? 'global' : '_global']: {},
  },
  root: 'src',
  publicDir: '../public',
  server: {
    port: 3000,
    hot: true,
  },
  css: {
    postcss: {
      plugins: [SortCss({ sort: 'mobile-first' })],
    },
  },
  build: {
    sourcemap: command === 'serve',
    rollupOptions: {
      input: Object.fromEntries(
        glob
          .sync('./src/**/*.html')
          .map(file => [path.basename(file, '.html'), path.resolve(file)])
      ),
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        assetFileNames: ({ name }) => {
          const ext = name?.split('.').pop();
          if (ext === 'css') return 'assets/css/[name]-[hash][extname]';
          if (ext === 'html') return '[name].[ext]';
          return 'assets/[name]-[hash][extname]';
        },
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
    chunkSizeWarningLimit: 1600,
  },
  plugins: [injectHTML(), FullReload(['./src/**/*.html', './src/**/*.scss'])],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));
