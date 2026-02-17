import useFetch from './useFetch';

/**
 * Hook to fetch category data based on category name
 * Maps category names to their respective JSON endpoints
 */
export const useCategoryData = (categoryName) => {
  // Map category names to endpoints
  const endpointMap = {
    'aarti-sangrah': 'aarti.json',
    'chalisa-sangrah': 'chalisa.json',
    'bhajan': 'bhajan.json',
    'mantra': 'mantra.json',
    'stotram': 'strot.json',
    'kawach': 'kawach.json' // ✅ ADDED
  };

  const endpoint = endpointMap[categoryName] || 'aarti.json';
  
  return useFetch(endpoint);
};

// Individual hooks for each category (optional - use if you prefer)
export const useAarti = () => useFetch('aarti.json');
export const useChalisa = () => useFetch('chalisa.json');
export const useBhajan = () => useFetch('bhajan.json');
export const useMantra = () => useFetch('mantra.json');
export const useStotram = () => useFetch('strot.json');
export const useKawach = () => useFetch('kawach.json'); 