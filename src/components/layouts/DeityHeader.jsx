import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';

function DeityHeader({ deity, deityImage }) {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [imageError, setImageError] = useState(false);

  const displayImage = deityImage || deity?.image;

  return (
    <div className="px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6">
      <div className={`relative w-full h-40 sm:h-44 md:h-48 lg:h-52 xl:h-56 bg-gradient-to-br from-orange-400 to-amber-500 overflow-hidden rounded-2xl sm:rounded-3xl border-2 sm:border-4 ${
        isDarkMode ? 'border-gray-800' : 'border-white'
      } shadow-xl sm:shadow-2xl ring-2 sm:ring-4 ring-orange-200`}>
        
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className={`absolute top-2 left-2 sm:top-3 sm:left-3 md:top-4 md:left-4 z-10 ${
            isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
          } backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          } transition-all active:scale-95`}
          aria-label="Go back"
        >
          <ArrowLeft className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-gray-200' : 'text-gray-700'}`} />
        </button>

        {/* Deity Image */}
        {displayImage && !imageError ? (
          <img 
            src={displayImage} 
            alt={deity?.name || 'Deity'}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white text-6xl">
            🙏
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Title and Description */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5 text-center text-white">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-3xl font-normal tracking-wide drop-shadow-lg mb-1 sm:mb-2">
            {deity?.name || 'Divine Deity'}
          </h1>
          {deity?.description && (
            <p className="text-xs sm:text-sm md:text-sm text-orange-100 drop-shadow-md px-2 sm:px-4 line-clamp-2 font-light">
              {deity.description}
            </p>
          )}
          {deity?.mantra && (
            <p className="text-xs sm:text-sm md:text-sm text-orange-100 drop-shadow-md px-2 sm:px-4 line-clamp-2 font-light">
              {deity.mantra}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DeityHeader;