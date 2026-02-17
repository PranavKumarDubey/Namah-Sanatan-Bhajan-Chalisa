// Add this at the top with other imports
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2, Heart, Download, Smartphone, BookOpen, Music, Shield, Sparkles, Flame, ScrollText } from 'lucide-react';
import { useTheme } from "../../context/ThemeContext";
import { useCategoryData } from "../../hooks/useCategoryHooks";
import { getCategoryByKey } from '../../config/categories';
import { toggleFavourite, isFavourite } from '../../utils/favouritesUtils';

const SquareCardsContent = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [likedItems, setLikedItems] = useState(new Set());

  const onBack = () => navigate(-1);

  // ✅ App Download URL
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.vstech.vire.namah&pcampaignid=web_share';

  // Handler for download button
  const handleDownload = () => {
    window.open(PLAY_STORE_URL, '_blank', 'noopener,noreferrer');
  };

  // ... rest of your existing code (fetch data, helpers, etc.) ...
  
  // Fetch data from API
  const { data: apiData, loading, error } = useCategoryData(categoryName);

  // Get category metadata from centralized config
  const currentCategory = getCategoryByKey(categoryName);
  const { displayName, hindiName, color } = currentCategory;

  // Get Lucide Icon Component based on category
  const getIconComponent = () => {
    switch(categoryName) {
      case 'aarti-sangrah': return Flame;
      case 'chalisa-sangrah': return BookOpen;
      case 'bhajan': return Music;
      case 'mantra': return Sparkles;
      case 'stotram': return ScrollText;
      case 'kawach': return Shield;
      default: return Sparkles;
    }
  };

  const IconComponent = getIconComponent();

  // Helper function to get icon based on tags
  const getIconForTag = (tags) => {
    const tagLower = tags.toLowerCase();
    if (tagLower.includes('ganesh')) return '🐘';
    if (tagLower.includes('shiv') || tagLower.includes('mahakal')) return '🔱';
    if (tagLower.includes('hanuman') || tagLower.includes('balaji')) return '⚡';
    if (tagLower.includes('krishna')) return '🪶';
    if (tagLower.includes('durga') || tagLower.includes('devi') || tagLower.includes('ambe')) return '⚔️';
    if (tagLower.includes('laxmi') || tagLower.includes('lakshmi')) return '🪷';
    if (tagLower.includes('saraswati')) return '🎵';
    if (tagLower.includes('ram')) return '🏹';
    if (tagLower.includes('vishnu') || tagLower.includes('narayan')) return '🌀';
    if (tagLower.includes('sai')) return '🙏';
    if (tagLower.includes('surya')) return '☀️';
    return '🕉️';
  };

  // Helper function to get color based on tags
  const getColorForTag = (tags) => {
    const tagLower = tags.toLowerCase();
    if (tagLower.includes('ganesh')) return 'from-orange-400 to-red-500';
    if (tagLower.includes('shiv')) return 'from-gray-600 to-indigo-800';
    if (tagLower.includes('hanuman')) return 'from-orange-500 to-red-600';
    if (tagLower.includes('krishna')) return 'from-blue-500 to-purple-600';
    if (tagLower.includes('durga')) return 'from-red-500 to-yellow-500';
    if (tagLower.includes('laxmi') || tagLower.includes('lakshmi')) return 'from-pink-400 to-red-500';
    if (tagLower.includes('saraswati')) return 'from-blue-200 to-blue-500';
    if (tagLower.includes('ram')) return 'from-green-400 to-blue-500';
    if (tagLower.includes('vishnu')) return 'from-teal-400 to-blue-600';
    if (tagLower.includes('surya')) return 'from-yellow-400 to-orange-500';
    return 'from-orange-400 to-red-500';
  };

  // Base URL for images
  const IMAGE_BASE_URL = 'https://namah-api.pages.dev/img';

  // Transform API data with String IDs
  const items = apiData ? apiData.map(item => ({
    id: String(item.id),
    title: item.title,
    icon: getIconForTag(item.tags),
    imageUrl: item.img_url ? `${IMAGE_BASE_URL}${item.img_url}` : null,
    color: getColorForTag(item.tags),
    deity: displayName,
    tags: item.tags
  })) : [];

  // Load initial favourites state
  useEffect(() => {
    if (items.length > 0 && categoryName) {
      const initialLiked = new Set();
      items.forEach(item => {
        if (isFavourite(item.id, categoryName)) {
          const itemKey = `${item.title}-${item.deity}`;
          initialLiked.add(itemKey);
        }
      });
      setLikedItems(initialLiked);
    }
  }, [items.length, categoryName]);

  // Reload favourites when window gains focus
  useEffect(() => {
    const handleFocus = () => {
      if (items.length > 0 && categoryName) {
        const updatedLiked = new Set();
        items.forEach(item => {
          if (isFavourite(item.id, categoryName)) {
            const itemKey = `${item.title}-${item.deity}`;
            updatedLiked.add(itemKey);
          }
        });
        setLikedItems(updatedLiked);
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [items.length, categoryName]);

  // Toggle like with proper state management
  const toggleLike = (item, e) => {
    if (e) e.stopPropagation();
    
    const itemToAdd = {
      id: item.id,
      title: item.title,
      artist: 'Traditional',
      deity: item.deity,
      image: item.imageUrl,
      lyrics_preview: null
    };
    
    const wasAdded = toggleFavourite(itemToAdd, categoryName);
    
    setLikedItems(prev => {
      const newSet = new Set(prev);
      const itemKey = `${item.title}-${item.deity}`;
      if (wasAdded) {
        newSet.add(itemKey);
      } else {
        newSet.delete(itemKey);
      }
      return newSet;
    });
  };

  // Scroll function
  const scrollContainer = (direction) => {
    const container = document.getElementById('scroll-container');
    if (container) {
      const scrollAmount = window.innerWidth < 640 ? 200 : 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Loading State
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-slate-900 to-slate-800' 
          : 'bg-gradient-to-b from-orange-50 to-amber-50'
      }`}>
        <div className="text-center">
          <Loader2 className={`w-12 h-12 animate-spin mx-auto mb-4 ${
            isDarkMode ? 'text-purple-500' : 'text-orange-600'
          }`} />
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Loading {displayName}...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-slate-900 to-slate-800' 
          : 'bg-gradient-to-b from-orange-50 to-amber-50'
      }`}>
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Oops! Something went wrong
          </h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {error}
          </p>
          <button
            onClick={onBack}
            className={`px-6 py-3 rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // No Data State
  if (!items || items.length === 0) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-500 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-slate-900 to-slate-800' 
          : 'bg-gradient-to-b from-orange-50 to-amber-50'
      }`}>
        <div className="text-center">
          <IconComponent className={`w-20 h-20 mx-auto mb-4 ${
            isDarkMode ? 'text-purple-400' : 'text-orange-500'
          }`} />
          <h2 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            No {displayName} Available
          </h2>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Please check back later
          </p>
          <button
            onClick={onBack}
            className={`px-6 py-3 rounded-lg transition-colors ${
              isDarkMode
                ? 'bg-purple-600 text-white hover:bg-purple-700'
                : 'bg-orange-600 text-white hover:bg-orange-700'
            }`}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-slate-900 to-slate-800' 
        : 'bg-gradient-to-b from-orange-50 to-amber-50'
    }`}>
      
      {/* Compact Icon-Based Header */}
      <div className="px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6">
        <div className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl transition-all duration-500 ${
          isDarkMode ? 'border-2 border-purple-500/30' : 'border-4 border-white'
        }`}>
          
          {/* Gradient Background */}
          <div className={`relative bg-gradient-to-br ${color} p-6 sm:p-8 md:p-10`}>
            
            {/* Decorative Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10">
              <div className="flex flex-col items-center justify-center text-center">
                
                {/* Icon */}
                <div className="mb-4 relative">
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl"></div>
                  <IconComponent 
                    className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-white drop-shadow-2xl" 
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title Section */}
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                    {displayName}
                  </h1>
                  
                  <p className="text-lg sm:text-xl md:text-2xl font-semibold text-white/90 drop-shadow-md">
                    {hindiName}
                  </p>

                  {/* Favourites Count */}
                  {likedItems.size > 0 && (
                    <div className="flex items-center justify-center gap-2 mt-3">
                      <Heart className="w-4 h-4 text-white fill-white" />
                      <span className="text-white text-sm font-medium">
                        {likedItems.size} saved
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={onBack}
            className={`absolute top-3 left-3 z-50 backdrop-blur-sm rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
              isDarkMode
                ? 'bg-slate-800/80 hover:bg-slate-700'
                : 'bg-white/80 hover:bg-white'
            }`}
            aria-label="Go back"
          >
            <ArrowLeft className={`w-5 h-5 ${
              isDarkMode ? 'text-white' : 'text-gray-700'
            }`} />
          </button>
        </div>
      </div>

      {/* Trending Section */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
        <h2 className={`text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 ${
          isDarkMode
            ? 'bg-gradient-to-r from-purple-400 via-purple-300 to-pink-400 bg-clip-text text-transparent'
            : 'bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent'
        }`}>
          Trending {displayName}
        </h2>

        {/* Horizontal Scrollable Cards */}
        <div className="relative max-w-7xl mx-auto">
          {/* Left Arrow */}
          <button
            onClick={() => scrollContainer("left")}
            className={`hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow-lg hover:scale-110 active:scale-95 transition-transform ${
              isDarkMode
                ? 'bg-slate-800/90 hover:bg-slate-700'
                : 'bg-white/90 hover:bg-white'
            }`}
          >
            <ChevronLeft className={`w-5 h-5 ${
              isDarkMode ? 'text-purple-400' : 'text-orange-600'
            }`} />
          </button>

          {/* Cards Container */}
          <div
            id="scroll-container"
            className="flex overflow-x-auto gap-3 sm:gap-4 md:gap-6 pb-4 scrollbar-hide scroll-smooth px-0 sm:px-8 md:px-12"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {items.map((item, index) => {
              const isLiked = likedItems.has(`${item.title}-${item.deity}`);
              const fullPrayerData = apiData[index];
              
              return (
                <div
                  key={item.id}
                  className="group flex-shrink-0"
                  style={{ 
                    width: "clamp(150px, 45vw, 280px)",
                    animation: `fadeInScale 0.5s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Card */}
                  <div
                    onClick={() => {
                      navigate(`/prayer/${item.id}/${categoryName}`, {
                        state: {
                          prayer: fullPrayerData,
                          deityName: item.deity,
                          deityImage: item.imageUrl
                        }
                      });
                    }}
                    className={`relative aspect-square bg-gradient-to-br ${item.color} rounded-xl sm:rounded-2xl shadow-lg hover:scale-105 active:scale-95 hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer ${
                      isDarkMode
                        ? 'border-2 border-purple-500/30 ring-2 ring-purple-400/20'
                        : 'border-4 border-white ring-4 ring-orange-200'
                    }`}
                  >
                    {/* God Image */}
                    {item.imageUrl ? (
                      <>
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                        <div className={`absolute inset-0 ${
                          isDarkMode
                            ? 'bg-gradient-to-t from-slate-900/60 via-transparent to-transparent'
                            : 'bg-gradient-to-t from-black/50 via-transparent to-transparent'
                        }`}></div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                        {item.icon}
                      </div>
                    )}

                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => toggleLike(item, e)}
                      className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full transition-all shadow-lg z-30 ${
                        isLiked
                          ? 'bg-red-500 text-white scale-110'
                          : isDarkMode
                          ? 'bg-slate-800/90 backdrop-blur-sm text-gray-300 hover:bg-red-500 hover:text-white'
                          : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
                      }`}
                      aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart
                        className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200 ${
                          isLiked ? 'fill-current' : ''
                        }`}
                      />
                    </button>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl sm:rounded-2xl"></div>
                  </div>

                  {/* Title */}
                  <div className="text-center mt-2 sm:mt-3">
                    <h3 className={`font-semibold text-sm sm:text-base md:text-lg line-clamp-2 mb-1 ${
                      isDarkMode ? 'text-gray-200' : 'text-gray-800'
                    }`}>
                      {item.title}
                    </h3>
                    {isLiked && (
                      <div className="flex items-center justify-center gap-1 text-red-500 text-xs font-semibold">
                        <Heart className="w-3 h-3 fill-current" />
                        <span>Saved</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scrollContainer("right")}
            className={`hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full p-2 shadow-lg hover:scale-110 active:scale-95 transition-transform ${
              isDarkMode
                ? 'bg-slate-800/90 hover:bg-slate-700'
                : 'bg-white/90 hover:bg-white'
            }`}
          >
            <ChevronRight className={`w-5 h-5 ${
              isDarkMode ? 'text-purple-400' : 'text-orange-600'
            }`} />
          </button>
        </div>

        {/* Scroll Hint for Mobile */}
        <div className={`flex sm:hidden items-center justify-center mt-4 space-x-2 text-xs animate-bounce ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          <ChevronLeft className="w-4 h-4" />
          <span>Swipe to explore more</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>

      {/* App Download Section with Working Links */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 pb-20 sm:pb-24">
        <div className={`relative rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 overflow-hidden transition-all duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-purple-500/30'
            : 'bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-200'
        }`}>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Left Content */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <Smartphone className={`w-10 h-10 sm:w-12 sm:h-12 ${
                    isDarkMode ? 'text-purple-400' : 'text-orange-600'
                  }`} />
                  <h3 className={`text-2xl sm:text-3xl md:text-4xl font-bold transition-colors duration-500 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Download Namah App
                  </h3>
                </div>
                
                <p className={`text-base sm:text-lg mb-6 transition-colors duration-500 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Experience divine prayers and mantras on the go! Access thousands of {displayName.toLowerCase()}, bhajans, and more offline.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { icon: BookOpen, text: '512+ Prayers' },
                    { icon: Music, text: ' 1000+ Bhajans' },
                    { icon: Shield, text: 'Add Free Bhajans Video' },
                    { icon: Sparkles, text: 'Daily Updates' }
                  ].map((feature, idx) => (
                    <div key={idx} className={`flex items-center gap-2 p-3 rounded-lg transition-colors duration-500 ${
                      isDarkMode ? 'bg-slate-700/50' : 'bg-white/70'
                    }`}>
                      <feature.icon className={`w-5 h-5 ${
                        isDarkMode ? 'text-purple-400' : 'text-orange-600'
                      }`} />
                      <span className={`text-sm font-semibold ${
                        isDarkMode ? 'text-gray-200' : 'text-gray-800'
                      }`}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Download Button - Play Store Only */}
                <div className="flex justify-center md:justify-start">
                  <button 
                    onClick={handleDownload}
                    className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95 transition-all duration-300 ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-500 hover:to-pink-500'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600'
                    }`}
                  >
                    <Download className="w-6 h-6" />
                    <div className="text-left">
                      <div className="text-xs opacity-90">Download on</div>
                      <div className="text-base">Play Store</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Right Phone Mockup - Hidden on mobile */}
              <div className="hidden lg:block flex-shrink-0">
                <div className={`relative w-64 h-64 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-white'
                }`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Smartphone className={`w-32 h-32 ${
                      isDarkMode ? 'text-purple-400' : 'text-orange-500'
                    }`} />
                  </div>
                  <div className={`absolute top-4 right-4 w-16 h-16 rounded-full opacity-20 ${
                    isDarkMode ? 'bg-purple-500' : 'bg-orange-500'
                  }`}></div>
                  <div className={`absolute bottom-4 left-4 w-24 h-24 rounded-full opacity-10 ${
                    isDarkMode ? 'bg-pink-500' : 'bg-red-500'
                  }`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        #scroll-container::-webkit-scrollbar {
          display: none;
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        #scroll-container {
          -webkit-overflow-scrolling: touch;
        }

        .group {
          -webkit-tap-highlight-color: transparent;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default SquareCardsContent;