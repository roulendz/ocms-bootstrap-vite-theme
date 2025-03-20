import {defineConfig} from 'vite';
import {basename, resolve} from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: resolve(__dirname, '../../.env') });

const themeName = basename(resolve(__dirname));

// Your JS/TS/CSS entrypoints.
const input = {
    main: resolve(__dirname, 'src/ts/main.ts'),
    livewireAdapter: resolve(__dirname, 'src/ts/livewire-turbo-adapter.ts'),
    css: resolve(__dirname, 'src/scss/main.scss'),
};

export default defineConfig(({ command }) => {
    return {
        base: command === 'build' 
            ? `/themes/${themeName}/assets/build/`
            : `/themes/${themeName}/assets/`,
        build: {
            rollupOptions: {
                input,
                output: {
                    
                }
            },
            manifest: true,
            emptyOutDir: true,
            assetsDir: '',
            outDir: 'assets/build',
        },
        server: {
            cors: 'https://bank.test',
        }
    }
});