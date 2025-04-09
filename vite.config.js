import { resolve} from 'path'
import { defineConfig } from 'vite'

import handlebars from "vite-plugin-handlebars";
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
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
                auth: resolve(__dirname, 'src/login.html'),
                settings: resolve(__dirname, 'src/profile.html'),
                chats: resolve(__dirname, 'src/chats.html'),
                reg: resolve(__dirname, 'src/signin.html'),
                p404: resolve(__dirname, 'src/page_404.html'),
                p500: resolve(__dirname, 'src/page_500.html'),
            },
        },
    },    
    css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
          }
        }
    },
    plugins: [handlebars({
        partialDirectory: resolve( __dirname, 'src/partials'),
        context: {
            title_reg: 'Регистрация',
            title_auth: 'Авторизация',
            title_profile: 'Профиль пользователя',
            title_chats: 'Список чатов',            
            title_404: 'Ошибка 404',
            title_500: 'Ошибка 500',
        }
    })],
});


