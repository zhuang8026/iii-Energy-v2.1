/**
 * 注意：此配置文件已停用，並正式轉入 v3
 * **/

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    base: `./`,
    plugins: [react()],
    resolve: {
        alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
        // alias: {
        //     '@': path.resolve(__dirname, 'src') // 將 '@' 映射到 'src' 目錄
        // }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                    @import "@/assets/scss/_variables.scss";
                    @import "@/assets/scss/_svgIcon.scss";
                `,
                api: 'modern-compiler' // or "modern"
            }
        }
    }
});
