import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

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
            <Button size="lg" fullWidth onClick={() => navigate('/quiz')}>
              Iniciar Quiz
            </Button>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Como funciona:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Escolha o nível de dificuldade e quantidade de perguntas</li>
              <li>• Responda perguntas sobre capitais de países</li>
              <li>• Use dicas quando precisar (3 disponíveis por quiz)</li>
              <li>• Veja sua pontuação e histórico ao final</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;
