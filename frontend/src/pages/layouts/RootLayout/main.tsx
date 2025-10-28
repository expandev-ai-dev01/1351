import { Outlet } from 'react-router-dom';

/**
 * @layout RootLayout
 * @summary Root layout component for the application
 * @domain core
 * @type layout-component
 * @category layout
 *
 * @description
 * Main layout wrapper that provides consistent structure
 * across all pages. Contains header, main content area, and footer.
 *
 * @routing
 * - Used as root layout in router configuration
 * - Wraps all page components via Outlet
 */
export const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-primary-600">Quiz de Capitais do Mundo</h1>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-600">
            © {new Date().getFullYear()} Quiz de Capitais do Mundo. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};
