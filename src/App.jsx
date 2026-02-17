import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import AppRoutes from './routes/AppRoutes';
import SpiritualLoader from './components/loader/SpiritualLoader';
import ScrollToTop from './components/ScrollToTop';
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SpiritualLoader />;
  }

  return (
    <BrowserRouter>
     <ScrollToTop/>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;