import {defineConfig} from 'vite';
import path from 'path';
import {fileURLToPath} from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  // Base public path
  base: './',

  // Build configuration: compiles the admin SCSS into assets/css/admin.css
  build: {
    outDir: 'assets',
    emptyOutDir: false,

    rolldownOptions: {
      input: {
        'admin-styles': path.resolve(__dirname, 'src/scss/admin.scss'),
      },
      output: {
        // CSS-only entry: any JS stub Vite writes stays next to the CSS
        entryFileNames: 'css/[name].js',

        // CSS output naming
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext  = info[info.length - 1];

          if (ext === 'css') {
            // Remove '-styles' suffix from CSS files
            const name = assetInfo.name.replace('-styles', '');
            return `css/${name}`;
          }

          // Images and other assets
          if (/\.(png|jpe?g|svg|gif|webp|ico)$/.test(assetInfo.name)) {
            return 'images/[name][extname]';
          }

          return 'assets/[name][extname]';
        },
      },
    },

    // Source maps for debugging
    sourcemap: false,
  },

  css: {
    devSourcemap: true
  },

  // Development server (for HMR during development)
  server: {
    port: 3000,
    open: false,
    cors: true,
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@scss': path.resolve(__dirname, 'src/scss'),
      '@js': path.resolve(__dirname, 'src/js'),
      '@images': path.resolve(__dirname, 'src/images'),
    }
  }
});