# Quiz de Capitais do Mundo

Sistema de quiz para testar conhecimentos gerais sobre capitais do mundo.

## Tecnologias

- React 18.3.1
- TypeScript 5.6.3
- Vite 5.4.11
- TailwindCSS 3.4.14
- React Router DOM 6.26.2
- TanStack Query 5.59.20
- Axios 1.7.7
- Zustand 5.0.1

## Estrutura do Projeto

```
src/
├── app/                    # Configuração da aplicação
│   ├── main.tsx           # Entry point
│   ├── App.tsx            # Componente raiz
│   ├── providers.tsx      # Providers globais
│   └── router.tsx         # Configuração de rotas
├── core/                  # Componentes e utilitários compartilhados
│   ├── components/        # Componentes UI genéricos
│   ├── lib/              # Configurações de bibliotecas
│   └── utils/            # Funções utilitárias
├── domain/               # Domínios de negócio (features)
├── pages/                # Páginas da aplicação
│   ├── layouts/          # Layouts compartilhados
│   ├── Home/            # Página inicial
│   └── NotFound/        # Página 404
└── assets/              # Recursos estáticos
    └── styles/          # Estilos globais
```

## Instalação

```bash
# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env

# Configurar variáveis de ambiente no .env
```

## Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build de produção
npm run preview

# Lint do código
npm run lint
```

## Variáveis de Ambiente

- `VITE_API_URL`: URL base da API (padrão: http://localhost:4000)
- `VITE_API_VERSION`: Versão da API (padrão: v1)
- `VITE_API_TIMEOUT`: Timeout das requisições em ms (padrão: 30000)

## Funcionalidades

### Realização de Quiz
- Responder perguntas sobre capitais de países
- Seleção de resposta correta entre múltiplas opções
- Verificação automática das respostas
- Exibição da pontuação final

## Arquitetura

### Padrões de Código
- Componentes funcionais com TypeScript
- Hooks customizados para lógica reutilizável
- TanStack Query para gerenciamento de estado do servidor
- Tailwind CSS para estilização
- Lazy loading de páginas para otimização

### Estrutura de Componentes
- Cada componente possui sua própria pasta
- Arquivos separados: main.tsx (implementação), types.ts (tipos), variants.ts (estilos)
- index.ts para exports centralizados

### API Integration
- Cliente HTTP configurado com Axios
- Separação entre endpoints públicos e autenticados
- Interceptors para autenticação e tratamento de erros

## Contribuição

Este projeto segue padrões rigorosos de arquitetura e documentação. Consulte a documentação de arquitetura antes de contribuir.

## Licença

Todos os direitos reservados.