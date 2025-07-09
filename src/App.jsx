import { useEffect } from 'react';
import { useStoreRehydrated, useStoreActions } from 'easy-peasy';
import { Container, CircularProgress, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Header from './components/Header';
import { Router, Routes, Route } from 'react-router';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';


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
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WaitForStateRehydration>
           <Router>
              <Header />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                </Routes>
              <Footer />
           </Router>
        </WaitForStateRehydration>
      </ThemeProvider>
  );
}

export default App;