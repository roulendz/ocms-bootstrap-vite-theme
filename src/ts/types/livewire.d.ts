/**
 * Type declarations for Livewire, Alpine.js, and OctoberCMS
 * These provide TypeScript compatibility for global browser extensions
 */
/**
 * Type declarations for Livewire, Alpine.js, and OctoberCMS
 * These provide TypeScript compatibility for global browser extensions
 */
// Filepath: src/ts/types/livewire.d.ts
// Export the interfaces so they can be imported
export interface LivewireComponent {
  id: string;
  fingerprint: {
    id: string;
    name: string;
    locale: string;
    path: string;
    method: string;
    [key: string]: any;
  };
  serverMemo: {
    data: Record<string, any>;
    [key: string]: any;
  };
  effects: Record<string, any>;
  $el?: HTMLElement;
  [key: string]: any;
}

export interface LivewireInterface {
  all(): LivewireComponent[];
  components?: Map<string, LivewireComponent>;
  hook(name: string, callback: (arg: any) => void): void;
  start?(): void;
  stop?(): void;
  restart?(): void;
  [key: string]: any;
}

export interface AlpineInterface {
  flushAndStopDeferringMutations?(): void;
  deferMutations?(): void;
  [key: string]: any;
}

export interface OctoberInterface {
  observeControl(element: HTMLElement): void;
  [key: string]: any;
}

// Extend global interfaces
declare global {
  interface Window {
    Livewire: LivewireInterface;
    Alpine?: AlpineInterface;
    oc?: OctoberInterface;
    wireTurboAfterFirstVisit?: () => void;
    wireTurboBeforeCache?: () => void;
  }
  
  interface HTMLElement {
    __livewire?: LivewireComponent;
  }
}
