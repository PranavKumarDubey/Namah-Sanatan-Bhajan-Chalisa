import React from 'react';
import { Heart, Music, Sparkles, Book, Flame, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { toggleFavourite, isFavourite } from '../../utils/favouritesUtils';

function PrayersSection({ prayers, favorites, onToggleFavorite, deityImage, deityName }) {
  const { isDarkMode } = useTheme();

  return (
    <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-4 sm:mb-6 px-1">
        <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          Prayers & Aartis
        </h2>
        <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-orange-500" />
      </div>

      {/* Prayers List */}
      {prayers && prayers.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {prayers.map(prayer => (
            <PrayerCard
              key={prayer.uniqueKey || prayer.id}
              prayer={prayer}
              isFavorite={favorites[prayer.id] || false}
              onToggleFavorite={onToggleFavorite}
              deityImage={deityImage}
              deityName={deityName}
            />
          ))}
        </div>
      ) : (
        // Empty State
        <div className="text-center py-16 px-4">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
            <Book className="w-10 h-10 text-orange-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No Prayers Available</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto">
            There are no prayers available for this deity at the moment. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
}

const PrayerCard = ({ prayer, isFavorite, onToggleFavorite, deityImage, deityName }) => {
  const [imageError, setImageError] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  // Map prayer types
  const prayerType = prayer?.source || 'aarti';
  const typeMap = {
    'bhajan': 'bhajan', 
    'aarti': 'aarti', 
    'aarti-sangrah': 'aarti',
    'chalisa': 'chalisa', 
    'chalisa-sangrah': 'chalisa', 
    'mantra': 'mantra',
    'strot': 'strot', 
    'stotram': 'strot', 
    'kawach': 'kawach', 
    'video': 'video'
  };
  const categoryType = typeMap[prayerType?.toLowerCase()] || 'aarti';

  // Get icon for prayer type
  const getTypeIcon = () => {
    const icons = {
      bhajan: <Music className="w-3 h-3" />,
      aarti: <Sparkles className="w-3 h-3" />,
      chalisa: <Book className="w-3 h-3" />,
      mantra: <Flame className="w-3 h-3" />,
      strot: <Book className="w-3 h-3" />,
      kawach: <Shield className="w-3 h-3" />
    };
    return icons[categoryType] || <Book className="w-3 h-3" />;
  };

  // Get color for prayer type
  const getTypeColor = () => {
    const colors = {
      bhajan: 'from-orange-500 to-red-600',
      aarti: 'from-yellow-500 to-orange-600',
      chalisa: 'from-blue-500 to-indigo-600',
      mantra: 'from-green-500 to-emerald-600',
      strot: 'from-teal-500 to-cyan-600',
      kawach: 'from-amber-500 to-yellow-600'
    };
    return colors[categoryType] || 'from-orange-500 to-yellow-600';
  };

  // Check if liked on mount
  React.useEffect(() => {
    if (prayer?.id) {
      setIsLiked(isFavourite(prayer.id, categoryType));
    }
  }, [prayer?.id, categoryType]);

  // Handle favorite toggle
  const handleHeartClick = (e) => {
    e.stopPropagation();
    if (!prayer?.id) return;
    
    const item = {
      id: String(prayer.id),
      title: prayer.title || prayer.name || 'Untitled',
      artist: 'Traditional',
      deity: deityName || 'Unknown',
      image: deityImage || '',
      lyrics_preview: prayer.lyrics || prayer.description || null,
      content: prayer.content || '',
      audio_url: prayer.audio_url || null,
      video_id: prayer.video_id || null,
      subtitle: prayer.subtitle || null,
      lang: prayer.lang || null,
      tags: prayer.tags || null
    };
    
    const wasAdded = toggleFavourite(item, categoryType);
    setIsLiked(wasAdded);
    if (onToggleFavorite) onToggleFavorite(prayer.id);
  };

  // Get subtitle
  const getSubtitle = () => {
    if (!prayer?.subtitle) return null;
    if (typeof prayer.subtitle === 'object') {
      return prayer.subtitle.en || prayer.subtitle.ma || Object.values(prayer.subtitle)[0];
    }
    return prayer.subtitle;
  };

  // Handle card click
  const handleCardClick = () => {
    navigate(`/prayer/${prayer.id}/${prayer.source || 'aarti'}`, {
      state: { 
        prayer,
        deityName,
        deityImage
      }
    });
  };

  return (
    <div 
      onClick={handleCardClick} 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 sm:p-5 cursor-pointer overflow-hidden border-2 border-orange-100 hover:border-orange-300 hover:-translate-y-1"
    >
      {/* Background Gradient on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50 to-yellow-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Content */}
      <div className="relative flex items-center gap-3 sm:gap-4">
        {/* Deity Image */}
        <div className="flex-shrink-0 relative">
          <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-2xl overflow-hidden border-3 border-white ring-2 ring-orange-200 shadow-md bg-gradient-to-br from-orange-400 to-amber-500 group-hover:ring-orange-300 group-hover:scale-105 transition-all duration-300">
            {deityImage && !imageError ? (
              <img 
                src={deityImage}
                alt={deityName || prayer.title || 'Prayer'}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-2xl sm:text-3xl text-white">
                🙏
              </div>
            )}
          </div>

          {/* Type Badge on Image */}
          <div className={`absolute -bottom-1 -right-1 bg-gradient-to-r ${getTypeColor()} text-white rounded-lg p-1.5 shadow-lg`}>
            {getTypeIcon()}
          </div>
        </div>

        {/* Prayer Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 leading-tight mb-1">
            {prayer.title || prayer.name || 'Untitled Prayer'}
          </h3>
          
          {getSubtitle() && (
            <p className="text-xs sm:text-sm text-gray-600 line-clamp-1 mb-2">
              {getSubtitle()}
            </p>
          )}

          {/* Type & Language Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-semibold uppercase">
              {getTypeIcon()}
              {prayerType}
            </span>
            
            {prayer.lang && (
              <span className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium">
                {prayer.lang.toUpperCase()}
              </span>
            )}
          </div>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleHeartClick}
          className={`flex-shrink-0 p-2.5 sm:p-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg ${
            isLiked 
              ? 'bg-red-500 text-white scale-110' 
              : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500 hover:scale-105'
          }`}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart 
            className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
              isLiked ? 'fill-current animate-pulse' : ''
            }`} 
          />
        </button>
      </div>

      {/* Bottom Accent Line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${getTypeColor()} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
    </div>
  );
};

export default PrayersSection;