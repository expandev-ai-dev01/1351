import { useNavigate } from 'react-router-dom';
import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';

/**
 * @page NotFoundPage
 * @summary 404 error page for invalid routes
 * @domain core
 * @type error-page
 * @category public
 *
 * @routing
 * - Path: * (catch-all)
 * - Guards: None
 *
 * @userFlows
 * - Primary: User navigates back to home page
 */
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="max-w-md w-full">
        <div className="text-center space-y-6">
          <div className="text-6xl font-bold text-primary-600">404</div>

          <h2 className="text-2xl font-bold text-gray-900">Página não encontrada</h2>

          <p className="text-gray-600">
            A página que você está procurando não existe ou foi movida.
          </p>

          <div className="pt-4">
            <Button onClick={() => navigate('/')} fullWidth>
              Voltar para o início
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NotFoundPage;
