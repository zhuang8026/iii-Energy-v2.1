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
                api: 'modern-compiler', // or "modern"
                additionalData: `
                    @use "@/assets/scss/variables" as var;
                    @use "@/assets/scss/svgIcon"as svgIcon;
                `
            }
        }
    }
});
