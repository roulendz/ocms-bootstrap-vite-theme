/**
 * Livewire-Turbo Integration Adapter
 * 
 * This module properly integrates Livewire with Turbo router by overriding
 * the default event handlers and providing compatibility between different
 * versions of Livewire.
 */

// Import types from the declaration file
import type { LivewireComponent } from './types/livewire';

/**
 * Interface for storing component data between page transitions
 */
interface ComponentData {
  fingerprint: LivewireComponent['fingerprint'];
  serverMemo: LivewireComponent['serverMemo'];
  effects: LivewireComponent['effects'];
  id: string;
  el: string | null;
}

/**
 * Self-executing function to avoid polluting the global namespace
 */
(function(): void {
  // Safety check - make sure Livewire is loaded
  if (typeof window.Livewire === 'undefined') {
    console.error('Livewire-Turbo Adapter: window.Livewire is undefined. Make sure @livewireScripts is placed above this script.');
    return;
  }

  // Try to remove the original event listeners if they exist
  try {
    if (typeof window.wireTurboAfterFirstVisit === 'function') {
      document.removeEventListener('page:load', window.wireTurboAfterFirstVisit);
    }
    if (typeof window.wireTurboBeforeCache === 'function') {
      document.removeEventListener('page:before-cache', window.wireTurboBeforeCache);
    }
  } catch (e) {
    console.info('Could not remove original Livewire-Turbo event listeners - continuing anyway');
  }

  // Track the first visit
  let firstTime = true;
  
  // Store Livewire components that need to be reinitialized
  const componentsToReinitialize: ComponentData[] = [];

  /**
   * Safely collects component data before caching
   * for later reinitialization
   */
  function collectComponentData(): void {
    componentsToReinitialize.length = 0;
    
    try {
      // Method 1: Using Livewire.all() if available
      if (typeof window.Livewire.all === 'function') {
        const components = window.Livewire.all();
        components.forEach(component => {
          if (component && component.fingerprint) {
            componentsToReinitialize.push({
              fingerprint: component.fingerprint,
              serverMemo: component.serverMemo,
              effects: component.effects,
              id: component.id,
              el: component.$el ? component.$el.outerHTML : null
            });
          }
        });
      } 
      // Method 2: Query for wire:id elements
      else {
        document.querySelectorAll('[wire\\:id]').forEach((el: Element) => {
          const element = el as HTMLElement;
          if (element && element.__livewire) {
            const component = element.__livewire;
            componentsToReinitialize.push({
              fingerprint: component.fingerprint,
              serverMemo: component.serverMemo,
              effects: component.effects,
              id: component.id,
              el: element.outerHTML
            });
          }
        });
      }
      
      console.info(`Collected ${componentsToReinitialize.length} Livewire components for reinitialization`);
    } catch (e) {
      console.error('Error collecting Livewire component data:', e);
    }
  }

  /**
   * Reinitialize Livewire after a Turbo page visit
   * Uses a delayed approach to avoid plugin conflicts
   */
  function handleTurboPageLoad(): void {
    // Skip initialization on the first load since Livewire
    // is already initialized by its scripts
    if (firstTime) {
      firstTime = false;
      return;
    }

    try {
      // Use a safer way to restart Livewire that avoids
      // plugin reinitialization conflicts
      if (document.querySelectorAll('[wire\\:id]').length > 0) {
        // We need to delay the initialization slightly to avoid conflicts
        setTimeout(() => {
          // For October CMS Hot Controls
          if (window.oc && typeof window.oc.observeControl === 'function') {
            window.oc.observeControl(document.documentElement);
          }
          
          // Handle Alpine.js if it's present
          if (window.Alpine && typeof window.Alpine.flushAndStopDeferringMutations === 'function') {
            window.Alpine.flushAndStopDeferringMutations();
          }
        }, 50);
      } else {
        console.info('No Livewire components found on page, skipping initialization');
      }
    } catch (e) {
      console.error('Error in Livewire-Turbo page load handler:', e);
    }
  }

  /**
   * Prepare Livewire components before the page is cached by Turbo
   */
  function handleTurboBeforeCache(): void {
    try {
      // Collect component data for potential reuse
      collectComponentData();
      
      // For Alpine.js
      if (window.Alpine && typeof window.Alpine.deferMutations === 'function') {
        window.Alpine.deferMutations();
      }
    } catch (e) {
      console.error('Error in Livewire-Turbo before-cache handler:', e);
    }
  }

  // Register our improved event handlers
  document.addEventListener('page:load', handleTurboPageLoad);
  document.addEventListener('page:before-cache', handleTurboBeforeCache);

  // Maintain hooks for Turbo state
  if (typeof window.Livewire.hook === 'function') {
    window.Livewire.hook('beforePushState', (state: any) => {
      if (!state.turbolinks) {
        state.turbolinks = {};
      }
    });

    window.Livewire.hook('beforeReplaceState', (state: any) => {
      if (!state.turbolinks) {
        state.turbolinks = {};
      }
    });
  }

  console.info('Livewire-Turbo adapter initialized successfully');
})();

// This export is necessary to make this a module
export {};