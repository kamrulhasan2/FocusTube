import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useStoreRehydrated, useStoreActions, StoreProvider } from 'easy-peasy';
import { Container, CircularProgress, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import { store } from './store';
import NotFoundPage from './pages/NotFoundPage';
import SavedPlaylistsPage from './pages/SavePlaylistsPage';


const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

function WaitForStateRehydration({ children }) { 
  const isRehydrated = useStoreRehydrated();
  const initializeStore = useStoreActions((actions) => actions.app.initializeStore);

  useEffect(() => {
    if (isRehydrated) {
      initializeStore();
    }
  }, [isRehydrated, initializeStore]);

  return isRehydrated ? children : (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Container>
  );
}

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
          <WaitForStateRehydration>
            <Router>
                <Header />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/saved" element={<SavedPlaylistsPage />} />
                    <Route path="/404" element={<NotFoundPage />} />
                    <Route path="*" element={<Navigate replace to="/404" />} />
                  </Routes>
                <Footer />
            </Router>
          </WaitForStateRehydration>        
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;