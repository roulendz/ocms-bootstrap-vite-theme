import {defineConfig} from 'vite';
import {basename, resolve} from 'path';

const themeName = basename(resolve(__dirname));

// Your JS/TS/CSS entrypoints.
const input = {
    main: resolve(__dirname, 'src/ts/main.ts'),
    livewireAdapter: resolve(__dirname, 'src/ts/livewire-turbo-adapter.ts'),
    css: resolve(__dirname, 'src/scss/main.scss'),
};

export default defineConfig(() => {
    return {
        base: `/themes/${themeName}/assets/`,
        build: {
            rollupOptions: {
                input,
                output: {
                    manualChunks: (id) => {
                        if (id.includes('livewire-turbo-adapter')) {
                            return 'livewire-turbo-adapter';
                        }
                    }
                }
            },
            manifest: true,
            emptyOutDir: true,
            assetsDir: '',
            outDir: 'assets/build',
        },
        server: {
            cors: 'http://bank.test',
        }
    }
});