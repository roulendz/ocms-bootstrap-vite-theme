import {defineConfig} from 'vite';
import {basename, resolve} from 'path';

const themeName = basename(resolve(__dirname));

// Your JS/TS/CSS entrypoints.
const input = {
    main: resolve(__dirname, 'src/ts/main.ts'),
    css: resolve(__dirname, 'src/scss/main.scss'),
};

export default defineConfig(() => {
    return {
        base: `/themes/${themeName}/assets/`,
        build: {
            rollupOptions: {input},
            manifest: true,
            emptyOutDir: true,
            assetsDir: '',
            outDir: 'assets',
        },
        server: {
            cors: true, // Set URL
        }
    }
});
