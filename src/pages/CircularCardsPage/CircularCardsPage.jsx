import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import DeityHeader from '../../components/layouts/DeityHeader';
import PrayersSection from '../../components/layouts/PrayersSection';
import { 
  useAarti, 
  useChalisa, 
  useBhajan, 
  useMantra, 
  useStotram, 
  useKawach 
} from '../../hooks/useCategoryHooks';

const CircularCardsPage = () => {
  const { deityName } = useParams();
  const { isDarkMode } = useTheme();
  const [favorites, setFavorites] = useState({});
  const [allPrayers, setAllPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const IMAGE_BASE_URL = 'https://namah-api.pages.dev/img';

  // ✅ Use custom hooks instead of direct API calls
  const { data: aartiData, loading: aartiLoading, error: aartiError } = useAarti();
  const { data: chalisaData, loading: chalisaLoading, error: chalisaError } = useChalisa();
  const { data: bhajanData, loading: bhajanLoading, error: bhajanError } = useBhajan();
  const { data: mantraData, loading: mantraLoading, error: mantraError } = useMantra();
  const { data: strotData, loading: strotLoading, error: strotError } = useStotram();
  const { data: kawachData, loading: kawachLoading, error: kawachError } = useKawach();

  const deityImage = `${IMAGE_BASE_URL}/1/${getDeityImageName(deityName)}.webp`;

  // ✅ Process data when all hooks have loaded
  useEffect(() => {
    // Check if all data is loaded
    const allLoading = aartiLoading || chalisaLoading || bhajanLoading || 
                       mantraLoading || strotLoading || kawachLoading;
    
    if (allLoading) {
      setLoading(true);
      return;
    }

    // Check for errors
    const errors = [aartiError, chalisaError, bhajanError, mantraError, strotError, kawachError].filter(Boolean);
    if (errors.length > 0) {
      setError(errors[0]);
      setLoading(false);
      return;
    }

    // Process all data
    const deityVariants = getDeityVariants(deityName);
    const combinedPrayers = [];

    const datasets = [
      { name: 'aarti', data: aartiData },
      { name: 'chalisa', data: chalisaData },
      { name: 'bhajan', data: bhajanData },
      { name: 'mantra', data: mantraData },
      { name: 'strot', data: strotData },
      { name: 'kawach', data: kawachData }
    ];

    datasets.forEach(({ name, data }) => {
      if (Array.isArray(data)) {
        const filtered = data.filter(prayer => {
          if (prayer.tags) {
            const tags = prayer.tags.toLowerCase();
            return deityVariants.some(variant => 
              tags.includes(variant.toLowerCase())
            );
          }
          return false;
        });

        filtered.forEach(prayer => {
          combinedPrayers.push({
            ...prayer,
            source: name,
            id: String(prayer.id),
            uniqueKey: `${name}-${prayer.id}`
          });
        });
      }
    });

    setAllPrayers(combinedPrayers);
    setLoading(false);
  }, [
    deityName,
    aartiData, chalisaData, bhajanData, mantraData, strotData, kawachData,
    aartiLoading, chalisaLoading, bhajanLoading, mantraLoading, strotLoading, kawachLoading,
    aartiError, chalisaError, bhajanError, mantraError, strotError, kawachError
  ]);

  const toggleFavorite = (id) => {
    setFavorites(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // ✅ Loading State with Dark Mode
  if (loading) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-slate-900 to-slate-800' 
          : 'bg-gradient-to-b from-orange-50 to-amber-50'
      }`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-16 w-16 border-b-4 mx-auto mb-4 ${
            isDarkMode ? 'border-purple-500' : 'border-orange-500'
          }`}></div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading prayers...
          </p>
        </div>
      </div>
    );
  }

  // ✅ Error State with Dark Mode
  if (error) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-slate-900 to-slate-800' 
          : 'bg-gradient-to-b from-orange-50 to-amber-50'
      }`}>
        <div className="text-center px-4 max-w-2xl">
          <div className={`rounded-lg p-6 mb-4 ${
            isDarkMode 
              ? 'bg-red-900/30 border border-red-700' 
              : 'bg-red-50 border border-red-200'
          }`}>
            <h2 className={`text-xl font-medium mb-2 ${
              isDarkMode ? 'text-red-400' : 'text-red-800'
            }`}>
              Failed to Load
            </h2>
            <p className={isDarkMode ? 'text-red-300' : 'text-red-600'}>
              {error}
            </p>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className={`px-6 py-3 rounded-full transition ${
              isDarkMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-orange-500 hover:bg-orange-600 text-white'
            }`}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen w-full transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-slate-900 to-slate-800' 
        : 'bg-gradient-to-b from-orange-50 to-amber-50'
    }`}>
      <div className="w-full max-w-7xl mx-auto pb-6 sm:pb-8 lg:pb-10">
        
        {/* ✅ Use DeityHeader Component */}
        <DeityHeader 
          deity={{
            name: formatDeityName(deityName),
            description: `${allPrayers.length} Prayers and Aartis`
          }}
          deityImage={deityImage}
        />
        
        {/* ✅ Use PrayersSection Component */}
        <PrayersSection
          prayers={allPrayers}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          deityImage={deityImage}
          deityName={formatDeityName(deityName)}
        />
        
      </div>
    </div>
  );
};

// Helper Functions
function getDeityVariants(deityName) {
  const variantsMap = {
    'ganesha': ['ganesha', 'ganesh', 'ganapati'],
    'ganesh': ['ganesha', 'ganesh', 'ganapati'],
    'shiva': ['shiva', 'shiv'],
    'shiv': ['shiva', 'shiv'],
    'krishna': ['krishna', 'balkrishna'],
    'hanuman': ['hanuman'],
    'lakshmi': ['lakshmi', 'laxmi'],
    'saraswati': ['saraswati'],
    'vishnu': ['vishnu'],
    'durga': ['durga', 'ambe', 'parvati'],
    'brahma': ['brahma', 'brihaspati'],
    'om': ['om', 'budhwar'],
    'shani': ['shani'],
    'radha': ['radha'],
    'surya': ['surya']
  };
  return variantsMap[deityName?.toLowerCase()] || [deityName];
}

function getDeityImageName(deityName) {
  const imageNameMap = {
    'om': 'om', 
    'ganesha': 'ganesh', 
    'ganesh': 'ganesh', 
    'krishna': 'krishna',
    'shiva': 'shiv', 
    'shiv': 'shiv', 
    'lakshmi': 'laxmi', 
    'hanuman': 'hanuman',
    'saraswati': 'saraswati', 
    'vishnu': 'vishnu', 
    'durga': 'durga',
    'brahma': 'brahma', 
    'shani': 'shani', 
    'radha': 'radha'
  };
  return imageNameMap[deityName?.toLowerCase()] || 'om';
}

function formatDeityName(deityName) {
  const nameMap = {
    'ganesha': 'Ganesha', 
    'ganesh': 'Ganesha', 
    'shiva': 'Shiva', 
    'shiv': 'Shiva',
    'krishna': 'Krishna', 
    'hanuman': 'Hanuman', 
    'lakshmi': 'Goddess Lakshmi',
    'saraswati': 'Goddess Saraswati', 
    'vishnu': 'Vishnu', 
    'durga': 'Goddess Durga',
    'brahma': 'Brahma', 
    'om': 'Om', 
    'shani': 'Shani', 
    'radha': 'Goddess Radha'
  };
  return nameMap[deityName?.toLowerCase()] || deityName;
}

export default CircularCardsPage;