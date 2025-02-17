export class BootstrapLoader {
    /**
     * Map of Bootstrap components to their import functions
     */
    private static componentMap = {
        alert: () => import('bootstrap/js/dist/alert'),
        carousel: () => import('bootstrap/js/dist/carousel'),
        collapse: () => import('bootstrap/js/dist/collapse'),
        dropdown: () => import('bootstrap/js/dist/dropdown'),
        modal: () => import('bootstrap/js/dist/modal'),
        popover: () => import('bootstrap/js/dist/popover'),
        tab: () => import('bootstrap/js/dist/tab'),
        toast: () => import('bootstrap/js/dist/toast'),
        tooltip: () => import('bootstrap/js/dist/tooltip'),
    };

    /**
     * Dynamically loads and initializes a Bootstrap component
     * @param componentName - The name of the Bootstrap component (e.g., 'tooltip', 'modal')
     * @param selector - The CSS selector for elements that require the component
     * @param options - Optional configuration object for the component
     */
    private static async loadComponent<T>(
        componentName: keyof typeof BootstrapLoader.componentMap,
        selector: string,
        options?: Partial<T>
    ): Promise<void> {

        try {
            const elements: HTMLElement[] = Array.from(document.querySelectorAll(selector));

            if (elements.length > 0) {
                console.log(`Found ${elements.length} elements for ${componentName}, loading...`);

                const module = await BootstrapLoader.componentMap[componentName]();
                const Component = module.default;

                elements.forEach(el => new Component(el, options));
            }
        } catch (error) {
            console.error(`Error initializing ${componentName}:`, error);
        }

    }

    static async initializeTooltips(): Promise<void> {
        await this.loadComponent('tooltip', '[data-bs-toggle="tooltip"]');
    }

    static async initializePopovers(): Promise<void> {
        await this.loadComponent('popover', '[data-bs-toggle="popover"]');
    }

    static async initializeModals(): Promise<void> {
        await this.loadComponent('modal', '.modal');
    }

    static async initializeToasts(): Promise<void> {
        await this.loadComponent('toast', '.toast', {autohide: true});
    }

    static async initializeDropdowns(): Promise<void> {
        await this.loadComponent('dropdown', '[data-bs-toggle="dropdown"]');
    }

    static async initializeCollapses(): Promise<void> {
        await this.loadComponent('collapse', '[data-bs-toggle="collapse"]');
    }

    static async initializeCarousels(): Promise<void> {
        await this.loadComponent('carousel', '.carousel');
    }

    static async initializeTabs(): Promise<void> {
        await this.loadComponent('tab', '[data-bs-toggle="tab"]');
    }

    static async initializeAlerts(): Promise<void> {
        await this.loadComponent('alert', '.alert');
    }

    /**
     * Initializes all Bootstrap components at once
     */
    static async initializeAll(): Promise<void> {

        await Promise.all([
            this.initializeAlerts(),
            this.initializeCarousels(),
            this.initializeCollapses(),
            this.initializeTooltips(),
            this.initializePopovers(),
            this.initializeModals(),
            this.initializeToasts(),
            this.initializeDropdowns(),
            this.initializeTabs(),

        ]);
    }

    /**
     * Default initialization method for Bootstrap components
     */
    static init(): void {
        this.initializeAll();
    }
}
