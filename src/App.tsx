import { AppRoutes } from './pages/routes.jsx';
import { ThemeProvider } from './contexts/theme-context.js';

function App() {
  return (
    <div>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </div>
  );
}

export default App;