# ocms-bootstrap-vite-theme


This theme is a basic starter theme for OctoberCMS, designed to demonstrate integration with Bootstrap, ViteJS, and the OFFLINE-GmbH Vite plugin. It provides a foundation for building modern OctoberCMS websites with a streamlined development workflow.

## Built with

*   **OctoberCMS:** [https://octobercms.com/](https://octobercms.com/) - The content management system this theme is built for.
*   **ViteJS:** [https://vitejs.dev/](https://vitejs.dev/) - A fast, modern frontend build tool that provides a rapid development experience and optimized production builds. Used for asset bundling and development server.
*   **OFFLINE-GmbH Vite Plugin for OctoberCMS:** [https://github.com/OFFLINE-GmbH/oc-vite-plugin](https://github.com/OFFLINE-GmbH/oc-vite-plugin) - An OctoberCMS plugin that seamlessly integrates ViteJS for asset management within your theme.
*   **Bootstrap:** [https://getbootstrap.com/](https://getbootstrap.com/) -  A popular CSS framework for responsive and mobile-first web development. Used for styling and layout.

## Installation

1. **Environment Variables:** Add the following `.env` variables to your OctoberCMS project root. These are required for the Vite Plugin to function correctly:

```dotenv
VITE_MANIFEST_FILENAME=manifest.json
VITE_DEV_ENVS=dev,local
VITE_HOST=http://localhost:5173
```

**Important:** Refer to the [OFFLINE-GmbH Vite plugin documentation](https://github.com/OFFLINE-GmbH/oc-vite-plugin) for detailed explanations of these variables and potentially other configuration options. Ensure the `VITE_HOST` matches the address where your Vite development server will run.

2. **Clone the Theme Repository:** Navigate to your OctoberCMS `themes` directory and clone the theme repository:

    ```sh
    cd <CMS Installation>/themes
    git clone https://github.com/marcsoler/ocms-bootstrap-vite-theme.git
    ```

3. **Install NPM Packages:**  After cloning the theme, navigate into the theme directory and install the required Node.js packages using npm:

    ```sh
    npm install
    ```

## Usage

This theme is designed for both development and production environments.

*   **Development Mode:** For local development and active theme modification, start the Vite development server:

    ```sh
    npm run dev
    ```

    This will start Vite's hot-reloading development server.  While this server is running, any changes you make to your theme's assets (CSS, JS, etc.) will be instantly reflected in your OctoberCMS site when you refresh the page. **Ensure your OctoberCMS environment is set to `dev` or `local` to utilize the Vite development server.**

*   **Production Mode:** When your OctoberCMS site is in production (or when you want to deploy a static version of your theme), you need to compile the assets using Vite:

    ```sh
    npm run build
    ```

    This command will generate optimized and production-ready assets in your theme's `assets` directory.  When OctoberCMS runs in production mode, it will serve these pre-compiled static assets.

## Contributing

Contributions are welcome! Please submit pull requests for bug fixes, new features, or improvements. Have a bug or a
feature request? Please open an issue.

## License

This theme is licensed under the [MIT License](LICENSE). See the LICENSE file for details.
