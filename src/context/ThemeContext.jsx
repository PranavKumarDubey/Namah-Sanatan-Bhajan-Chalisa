import { createContext, useContext, useState, useEffect } from 'react';

// =====================================================
// CREATE CONTEXT
// =====================================================
const ThemeContext = createContext();

// =====================================================
// CUSTOM HOOK (for easy access)
// =====================================================
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  
  return context;
};

// =====================================================
// THEME PROVIDER COMPONENT
// =====================================================
export const ThemeProvider = ({ children }) => {
  
  // ✅ Theme State (light, dark, auto)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved || 'light';
  });

  // ✅ Font Size State (small, medium, large)
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize');
    return saved || 'medium';
  });

  // =====================================================
  // INJECT DYNAMIC CSS FOR DARK MODE
  // =====================================================
  useEffect(() => {
    // Remove existing dynamic style if present
    const existingStyle = document.getElementById('dynamic-theme-style');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create style element
    const style = document.createElement('style');
    style.id = 'dynamic-theme-style';
    
    // Check if dark mode is active
    const isDark = 
      theme === 'dark' || 
      (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDark) {
      // 🌙 MODERN DARK MODE - Navy Blue + Purple Headers
      style.textContent = `
        /* ============================================
           🎨 MODERN DARK MODE THEME
           Background: Navy Blue (#0f172a, #1e293b, #334155)
           Headers: Darker Purple → Pink → Orange
           (#6b21a8 → #db2777 → #ea580c)
           Accents: Purple interactive elements
           Bells: Golden (#fbbf24)
        ============================================ */

        /* Global Background - Deep Navy Gradient */
        html.dark body {
          background: linear-gradient(to bottom, #0f172a, #1e293b, #0f172a) !important;
        }

        /* ✅ Page Background Gradients - ALL VARIANTS - Navy Blue */
        html.dark .bg-gradient-to-b.from-orange-50 {
          background: linear-gradient(to bottom, #0f172a, #1e293b, #334155) !important;
        }

        html.dark .bg-gradient-to-br.from-orange-50 {
          background: linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a) !important;
        }

        html.dark .bg-gradient-to-br.from-orange-50.via-yellow-50 {
          background: linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a) !important;
        }
        
        /* Favourites page background: from-rose-50 via-orange-50 to-amber-50 → Navy Blue */
        html.dark .bg-gradient-to-br.from-rose-50 {
          background: linear-gradient(to bottom right, #0f172a, #1e293b, #334155) !important; /* Same navy blue as other pages */
        }

        /* ✅ Quote Section & Card Backgrounds */
        html.dark .bg-gradient-to-r.from-orange-50.to-yellow-50 {
          background: linear-gradient(to right, #1e293b, #334155) !important;
        }

        /* ✅ Header Gradients - Exact Favourites Visual Colors (Darker Purple Left) */
        html.dark .bg-gradient-to-r.from-orange-500.via-orange-600.to-yellow-500 {
          background: linear-gradient(to right, #6b21a8, #db2777, #ea580c) !important; /* purple-800, pink-600, orange-600 */
        }

        html.dark .bg-gradient-to-r.from-orange-600 {
          background: linear-gradient(to right, #6b21a8, #db2777, #ea580c) !important;
        }

        html.dark .bg-gradient-to-r.from-orange-600.via-red-600.to-yellow-600 {
          background: linear-gradient(to right, #6b21a8, #db2777, #ea580c) !important;
        }

        html.dark .bg-gradient-to-r.from-orange-500.via-red-500.to-yellow-500 {
          background: linear-gradient(to right, #6b21a8, #db2777, #ea580c) !important;
        }
        
        /* Also convert rose-pink-orange to darker purple-pink-orange */
        html.dark .bg-gradient-to-r.from-rose-600.via-pink-600.to-orange-600 {
          background: linear-gradient(to right, #6b21a8, #db2777, #ea580c) !important;
        }

        /* ✅ Text Gradients - Purple Theme in Dark Mode */
        html.dark .bg-gradient-to-r.from-orange-600.bg-clip-text {
          background: linear-gradient(to right, #c084fc, #a855f7, #8b5cf6) !important; /* purple-400, purple-500, purple-600 */
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }

        html.dark .bg-gradient-to-r.from-orange-600.via-red-600.to-yellow-600.bg-clip-text {
          background: linear-gradient(to right, #c084fc, #a855f7, #8b5cf6) !important;
          -webkit-background-clip: text !important;
          background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
        }

        /* ✅ Card Backgrounds - Elevated Dark Surfaces - Navy Blue Theme */
        html.dark .bg-white {
          background-color: #1e293b !important;
        }

        html.dark .bg-orange-50 {
          background-color: #1e293b !important;
        }

        html.dark .bg-amber-50 {
          background-color: #334155 !important;
        }

        html.dark .bg-yellow-50 {
          background-color: #475569 !important;
        }

        html.dark .bg-red-50 {
          background-color: #1e293b !important;
        }
        
        html.dark .bg-rose-50 {
          background-color: #0f172a !important; /* Navy blue like other pages */
        }
        
        html.dark .bg-gray-100 {
          background-color: #334155 !important; /* Lighter navy */
        }
        
        html.dark .bg-gray-200 {
          background-color: #475569 !important; /* Even lighter navy */
        }

        /* ✅ Text Colors - High Contrast & Readable - Navy Theme */
        html.dark .text-gray-800 {
          color: #f1f5f9 !important;
        }

        html.dark .text-gray-700 {
          color: #e2e8f0 !important; /* Light gray for better readability */
        }

        html.dark .text-gray-600 {
          color: #cbd5e1 !important;
        }

        html.dark .text-gray-500 {
          color: #94a3b8 !important;
        }
        
        html.dark .text-gray-400 {
          color: #64748b !important; /* Neutral gray */
        }
        
        html.dark .text-gray-300 {
          color: #cbd5e1 !important; /* Light gray */
        }

        /* Orange/Yellow Text - Purple Theme in Dark Mode */
        html.dark .text-orange-600 {
          color: #c084fc !important; /* purple-400 */
        }

        html.dark .text-orange-500 {
          color: #d8b4fe !important; /* purple-300 */
        }

        html.dark .text-amber-700 {
          color: #fbbf24 !important; /* gold for bells */
        }

        html.dark .text-amber-600 {
          color: #fcd34d !important; /* gold for bells */
        }

        html.dark .text-red-500 {
          color: #fca5a5 !important;
        }

        /* Yellow text - Light purple for header subtitles */
        html.dark .text-yellow-100 {
          color: #e9d5ff !important; /* purple-200 for header subtitles */
        }

        html.dark .text-yellow-200 {
          color: #d8b4fe !important; /* purple-300 for header subtitles */
        }
        
        /* Rose text colors to purple for Favourites */
        html.dark .text-rose-100 {
          color: #e9d5ff !important; /* purple-200 */
        }
        
        html.dark .text-rose-600 {
          color: #c084fc !important; /* purple-400 */
        }
        
        html.dark .text-rose-500 {
          color: #a855f7 !important; /* purple-500 */
        }

        /* White text variations */
        html.dark .text-white\\/90 {
          color: rgba(241, 245, 249, 0.9) !important;
        }

        html.dark .text-white\\/80 {
          color: rgba(241, 245, 249, 0.8) !important;
        }

        /* ✅ Borders - Match Favourites (purple-600) */
        html.dark .border-orange-400 {
          border-color: #9333ea !important; /* purple-600 */
        }

        html.dark .border-orange-200 {
          border-color: #c4b5fd !important; /* purple-300 */
        }
        
        html.dark .border-rose-400 {
          border-color: #9333ea !important; /* purple-600 */
        }

        html.dark .border-gray-200 {
          border-color: #334155 !important; /* Navy blue */
        }

        html.dark .border-white {
          border-color: #475569 !important;
        }

        html.dark .border-yellow-300 {
          border-color: #fbbf24 !important; /* gold for bells */
        }

        html.dark .border-yellow-400 {
          border-color: #fcd34d !important; /* gold for bells */
        }

        html.dark .border-amber-700 {
          border-color: #92400e !important; /* dark amber for bells */
        }
        
        html.dark .border-orange-100 {
          border-color: #334155 !important; /* Navy blue */
        }
        
        html.dark .border-gray-100 {
          border-color: #1e293b !important; /* Dark navy */
        }

        /* ✅ Ring Colors - Purple accents matching headers */
        html.dark .ring-orange-200 {
          --tw-ring-color: #a78bfa !important; /* purple-400 */
        }

        html.dark .ring-orange-300 {
          --tw-ring-color: #8b5cf6 !important; /* purple-500 */
        }

        html.dark .ring-yellow-400 {
          --tw-ring-color: #fbbf24 !important; /* gold for bells */
        }

        /* Modern Shadows - Soft & Elevated */
        html.dark .shadow-lg {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5) !important;
        }

        html.dark .shadow-xl {
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6) !important;
        }

        html.dark .shadow-2xl {
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7) !important;
        }

        /* Card Hover - Subtle Glow */
        html.dark .hover\\:shadow-2xl:hover {
          box-shadow: 0 20px 50px rgba(251, 191, 36, 0.15) !important;
        }

        /* Hover States - Slightly Lighter Navy */
        html.dark .hover\\:bg-orange-50:hover {
          background-color: #334155 !important;
        }

        html.dark .hover\\:bg-red-50:hover {
          background-color: #334155 !important;
        }

        html.dark .hover\\:bg-white:hover {
          background-color: #334155 !important;
        }

        html.dark .hover\\:bg-white\\/30:hover {
          background-color: rgba(51, 65, 85, 0.3) !important;
        }
        
        html.dark .hover\\:bg-gray-200:hover {
          background-color: #475569 !important; /* Lighter navy */
        }
        
        html.dark .hover\\:text-gray-600:hover {
          color: #94a3b8 !important; /* Lighter gray */
        }

        /* Semi-transparent Backgrounds */
        html.dark .bg-white\\/90 {
          background-color: rgba(30, 41, 59, 0.9) !important;
        }

        html.dark .bg-white\\/80 {
          background-color: rgba(30, 41, 59, 0.8) !important;
        }

        html.dark .bg-white\\/20 {
          background-color: rgba(30, 41, 59, 0.2) !important;
        }

        html.dark .bg-white\\/30 {
          background-color: rgba(30, 41, 59, 0.3) !important;
        }

        /* Buttons - Elevated & Modern */
        html.dark button.bg-white {
          background-color: #334155 !important;
          color: #f1f5f9 !important;
        }

        html.dark button.hover\\:bg-white:hover {
          background-color: #475569 !important;
        }

        /* Keep gradient classes vibrant */
        html.dark [class*="bg-gradient-to"]:not(.from-orange-600):not(.from-orange-500):not(.from-orange-50) {
          opacity: 0.95;
        }

        /* Deity-specific gradient colors - Keep Yellow/Amber as Golden */
        html.dark .from-yellow-500 {
          --tw-gradient-from: #fbbf24 !important; /* gold */
        }

        html.dark .from-yellow-400 {
          --tw-gradient-from: #fcd34d !important; /* gold */
        }

        html.dark .from-amber-500 {
          --tw-gradient-from: #f59e0b !important; /* amber */
        }

        html.dark .to-orange-600 {
          --tw-gradient-to: #f59e0b !important; /* amber */
        }

        html.dark .to-amber-600 {
          --tw-gradient-to: #d97706 !important; /* dark amber */
        }

        html.dark .from-indigo-600 {
          --tw-gradient-from: #6366f1 !important;
        }

        html.dark .to-purple-700 {
          --tw-gradient-to: #7c3aed !important;
        }

        html.dark .from-blue-500 {
          --tw-gradient-from: #3b82f6 !important;
        }

        html.dark .to-purple-600 {
          --tw-gradient-to: #9333ea !important;
        }

        html.dark .from-red-600 {
          --tw-gradient-from: #dc2626 !important;
        }

        html.dark .to-pink-700 {
          --tw-gradient-to: #ec4899 !important;
        }

        html.dark .from-green-500 {
          --tw-gradient-from: #10b981 !important;
        }

        html.dark .to-emerald-600 {
          --tw-gradient-to: #059669 !important;
        }

        html.dark .from-cyan-500 {
          --tw-gradient-from: #06b6d4 !important;
        }

        html.dark .to-blue-600 {
          --tw-gradient-to: #2563eb !important;
        }

        /* Background Gradient - bells KEEP GOLDEN/AMBER */
        html.dark .bg-gradient-to-b.from-yellow-400 {
          background: linear-gradient(to bottom, #fbbf24, #f59e0b, #d97706) !important; /* golden shades */
        }

        html.dark .bg-gradient-to-b.from-orange-400 {
          background: linear-gradient(to bottom, #fb923c, #f59e0b) !important;
        }

        /* Scrollbar - Modern Dark */
        html.dark ::-webkit-scrollbar-track {
          background: #0f172a;
        }

        html.dark ::-webkit-scrollbar-thumb {
          background: #475569;
        }

        html.dark ::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }

        /* Input Fields - Clean & Modern - Navy Background with Purple Accents */
        html.dark input,
        html.dark textarea,
        html.dark select {
          background-color: #1e293b !important;
          color: #f1f5f9 !important;
          border-color: #334155 !important;
        }

        html.dark input:focus,
        html.dark textarea:focus,
        html.dark select:focus {
          border-color: #a78bfa !important; /* purple-400 - matches header theme */
          box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.1) !important;
        }
        
        /* Also convert rose focus colors to purple */
        html.dark .focus\\:border-rose-500:focus {
          border-color: #a78bfa !important; /* purple-400 */
        }
        
        html.dark .focus\\:border-orange-500:focus {
          border-color: #a78bfa !important; /* purple-400 */
        }

        /* Backdrop Blur - Modern Glass Effect */
        html.dark .backdrop-blur-sm {
          background-color: rgba(15, 23, 42, 0.8) !important;
          backdrop-filter: blur(12px);
        }

        /* Icons - Keep Vibrant */
        html.dark .text-orange-600 svg,
        html.dark .text-red-500 svg {
          filter: brightness(1.1);
        }

        /* Image placeholders */
        html.dark img[src*="placeholder"] {
          filter: brightness(0.9);
        }

        /* Ensure text is always readable */
        html.dark * {
          text-shadow: none;
        }

        /* Special: Keep deity icon backgrounds vibrant */
        html.dark [class*="from-"]:not(.bg-gradient-to-b):not(.bg-gradient-to-r):not(.bg-gradient-to-br) {
          opacity: 1 !important;
        }
      `;
    }

    // Append to head
    document.head.appendChild(style);

    // Cleanup
    return () => {
      const styleToRemove = document.getElementById('dynamic-theme-style');
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
  }, [theme]);

  // =====================================================
  // APPLY THEME TO DOM
  // =====================================================
  useEffect(() => {
    const root = document.documentElement;
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // Apply data-theme attribute for CSS variables
    root.setAttribute('data-theme', theme);
    
    // Handle dark mode class for Tailwind
    if (theme === 'light') {
      root.classList.remove('dark');
    } else if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'auto') {
      // Auto mode - follow system preference
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', isDark);
    }
  }, [theme]);

  // =====================================================
  // APPLY FONT SIZE TO DOM
  // =====================================================
  useEffect(() => {
    const root = document.documentElement;
    
    // Save to localStorage
    localStorage.setItem('fontSize', fontSize);
    
    // Apply data-font-size attribute for CSS variables
    root.setAttribute('data-font-size', fontSize);
    
    // Apply font-size class to html element
    root.classList.remove('font-size-small', 'font-size-medium', 'font-size-large');
    root.classList.add(`font-size-${fontSize}`);
  }, [fontSize]);

  // =====================================================
  // LISTEN TO SYSTEM THEME CHANGES (for auto mode)
  // =====================================================
  useEffect(() => {
    if (theme !== 'auto') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };

    // Add listener
    mediaQuery.addEventListener('change', handleChange);
    
    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // =====================================================
  // COMPUTED VALUES
  // =====================================================
  
  // Check if dark mode is currently active
  const isDarkMode = 
    theme === 'dark' || 
    (theme === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  // =====================================================
  // HELPER FUNCTIONS
  // =====================================================
  
  // Set theme mode with validation
  const setThemeMode = (mode) => {
    if (['light', 'dark', 'auto'].includes(mode)) {
      setTheme(mode);
    } else {
      console.warn(`Invalid theme mode: ${mode}. Use 'light', 'dark', or 'auto'.`);
    }
  };

  // Set font size with validation
  const setFontSizeMode = (size) => {
    if (['small', 'medium', 'large'].includes(size)) {
      setFontSize(size);
    } else {
      console.warn(`Invalid font size: ${size}. Use 'small', 'medium', or 'large'.`);
    }
  };

  // Toggle between light -> dark -> auto -> light
  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'auto';
      return 'light';
    });
  };

  // Cycle through font sizes: small -> medium -> large -> small
  const cycleFontSize = () => {
    setFontSize(prev => {
      if (prev === 'small') return 'medium';
      if (prev === 'medium') return 'large';
      return 'small';
    });
  };

  // =====================================================
  // CSS VARIABLES OBJECT (for inline styles)
  // =====================================================
  const colors = {
    bgPrimary: 'var(--bg-primary)',
    bgSecondary: 'var(--bg-secondary)',
    textPrimary: 'var(--text-primary)',
    textSecondary: 'var(--text-secondary)',
    borderColor: 'var(--border-color)',
    accentOrange: 'var(--accent-orange)',
    accentGradient: 'var(--accent-gradient)',
  };

  // =====================================================
  // CONTEXT VALUE
  // =====================================================
  const value = {
    // States
    theme,
    fontSize,
    isDarkMode,
    
    // Setters
    setTheme: setThemeMode,
    setFontSize: setFontSizeMode,
    
    // Toggles
    toggleTheme,
    cycleFontSize,
    
    // CSS Variables
    colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// =====================================================
// EXPORT CONTEXT (optional, for advanced use)
// =====================================================
export default ThemeContext;