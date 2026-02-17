import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * Automatically scrolls to top on route change
 * Handles MainLayout's overflow-auto container
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Method 1: Scroll the main content container (MainLayout's flex-1 overflow-auto div)
    const mainContent = document.querySelector('.flex-1.overflow-auto');
    if (mainContent) {
      mainContent.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
    
    // Method 2: Also try window scroll (backup)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
    
    // Method 3: Document scroll (backup)
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
  }, [pathname]);

  return null;
};

export default ScrollToTop;