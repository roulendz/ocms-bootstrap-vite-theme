// filepath: src/ts/main.ts
console.log('main.ts loaded');
import {BootstrapLoader} from './BootstrapLoader';
import type { LivewireInterface } from './types/livewire';
import Echo from 'laravel-echo';

import Pusher from 'pusher-js';

// Add type extensions for Window
// Add type extensions for Window
declare global {
    interface Window {
        Echo: Echo<any>;
        Pusher: typeof Pusher;
        Livewire: LivewireInterface; // Temporary fix for LivewireComponent typing issue
    }
}

window.Pusher = Pusher;

// Initialize Echo first
window.Echo = new Echo({
    broadcaster: 'reverb',
    auth: {
        headers: {
            'X-CSRF-TOKEN': document.querySelector('script[data-csrf]') 
                ? ((document.querySelector('script[data-csrf]') as HTMLScriptElement).dataset.csrf || '') 
                : ''
        }
    },
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: Number(import.meta.env.VITE_REVERB_PORT ?? 8080),
    wssPort: Number(import.meta.env.VITE_REVERB_PORT ?? 8080),
    forceTLS: false,
    enabledTransports: ['ws', 'wss']
});
console.log('ENV LOG: ', import.meta.env);
console.log('Echo.channel: ', window.Echo);

window.Echo.channel('time-deposits-channel')
    .listen('.timeDepositsCreated', (event: any) => {
        console.log('Received TimeDepositsCreated event:', event);
        window.Livewire.dispatch('timeDepositsCreated');
    });
/**
 * BootstrapLoader class documentation
 * @class
 * @typedef {Object} BootstrapLoader
 * @property {WeakMap<HTMLElement, import('bootstrap').default>} instances - WeakMap of Bootstrap component instances
 */

// Constants
/**
 * CSS selectors for all Bootstrap components
 */
const BOOTSTRAP_COMPONENT_SELECTORS = [
    '[data-bs-toggle="tooltip"]',
    '[data-bs-toggle="popover"]',
    '.modal',
    '.toast',
    '[data-bs-toggle="dropdown"]',
    '[data-bs-toggle="collapse"]',
    '.carousel',
    '[data-bs-toggle="tab"]',
    '.alert'
].join(',');

/**
 * Cleans up Bootstrap components to prevent memory leaks
 */
function cleanupBootstrapComponents(): void {
    document.querySelectorAll(BOOTSTRAP_COMPONENT_SELECTORS).forEach(el => {
        if (el instanceof HTMLElement) {
            try {
                const instance = BootstrapLoader.getInstance(el);
                if (instance?.dispose) {
                    instance.dispose();
                }
                BootstrapLoader.removeInstance(el);
            } catch (error) {
                console.error('Error during Bootstrap component cleanup:', error);
            }
        }
    });
}

// Event listeners
/**
 * Handles initial page load and Turbo visit initialization
 * @listens page:loaded
 */
addEventListener('page:loaded', () => {
    BootstrapLoader.init();
});
/**
 * Cleans up Bootstrap components before page caching
 * @listens page:before-cache
 */
addEventListener('page:before-cache', cleanupBootstrapComponents);
