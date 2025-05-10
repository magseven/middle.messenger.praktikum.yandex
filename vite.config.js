import { resolve} from 'path'
import { defineConfig } from 'vite'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// import handlebars from "vite-plugin-handlebars";
export default defineConfig({
    root: resolve( __dirname, 'src'),
    server: {
        port: 8080,
    },
    preview: {
        port: 3000,
    },
    build: {
        outDir: resolve( __dirname, 'dist'),
    },    
    css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
          }
        }
    },
    // plugins: [handlebars({
    //     partialDirectory: resolve( __dirname, 'src/partials'),
    // })],
});


