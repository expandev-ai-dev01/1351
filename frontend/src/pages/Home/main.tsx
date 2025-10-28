import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';

/**
 * @page HomePage
 * @summary Home page with welcome message and quiz start
 * @domain core
 * @type landing-page
 * @category public
 *
 * @routing
 * - Path: /
 * - Guards: None (public page)
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Welcome card with call-to-action
 *
 * @userFlows
 * - Primary: User reads welcome message and starts quiz
 */
export const HomePage = () => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <Card className="max-w-2xl w-full">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Bem-vindo ao Quiz de Capitais do Mundo!
          </h2>

          <p className="text-lg text-gray-600">
            Teste seus conhecimentos sobre as capitais dos países ao redor do mundo. Responda
            perguntas de múltipla escolha e descubra sua pontuação!
          </p>

          <div className="pt-4">
            <Button size="lg" fullWidth>
              Iniciar Quiz
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Como funciona:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Responda perguntas sobre capitais de países</li>
              <li>• Escolha a resposta correta entre as opções</li>
              <li>• Veja sua pontuação ao final do quiz</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
