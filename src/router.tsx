import { createBrowserRouter } from 'react-router-dom';
import { AppLayout } from './AppLayout';
import { AttributesPage } from './pages/AttributesPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { ComicPage } from './pages/ComicPage';
import { EvolutionLabPage } from './pages/EvolutionLabPage';
import { TokenPage } from './pages/TokenPage';
import { HomePage } from './pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'Evaluation', element: <EvolutionLabPage /> },
      { path: 'evaluation', element: <EvolutionLabPage /> },
      { path: 'calculator', element: <CalculatorPage /> },
      { path: 'Calculator', element: <CalculatorPage /> },
      { path: 'comic', element: <ComicPage /> },
      { path: 'Comic', element: <ComicPage /> },
      { path: 'token', element: <TokenPage /> },
      { path: 'Token', element: <TokenPage /> },
      { path: 'attributes', element: <AttributesPage /> },
      { path: 'Attributes', element: <AttributesPage /> },
    ],
  },
]);
