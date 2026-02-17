import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Heart, Volume2, Pause, AlertCircle, Play, Sparkles, Loader } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import useFetch from '../hooks/useFetch';
import { toggleFavourite, isFavourite } from '../utils/favouritesUtils';

// ✅ Top Decorative Divider Component
const TopDivider = () => {
  return (
    <svg
      width="100%"
      height="40"
      viewBox="0 0 600 40"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="transition-colors duration-500"
    >
      <g className="fill-orange-500 stroke-orange-500" strokeWidth="2">
        <polygon points="20,20 40,10 40,30" />
        <line x1="40" y1="20" x2="260" y2="20" />
        <polygon points="290,20 300,10 310,20 300,30" />
        <polygon points="320,20 330,10 340,20 330,30" />
        <line x1="340" y1="20" x2="560" y2="20" />
        <polygon points="580,20 560,10 560,30" />
      </g>
    </svg>
  );
};

// ✅ Side Decorative Border Component - Improved Design
const DecorativeBorder = () => {
  return (
    <svg
      width="30"
      height="100%"
      viewBox="0 0 30 1000"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="transition-colors duration-500"
    >
      <line x1="15" y1="0" x2="15" y2="1000" className="stroke-orange-500" strokeWidth="2" />
      <g className="fill-orange-500">
        {[...Array(25)].map((_, i) => (
          <polygon
            key={i}
            points={`15,${15 + i * 40} 22,${22 + i * 40} 15,${29 + i * 40} 8,${22 + i * 40}`}
          />
        ))}
      </g>
    </svg>
  );
};

const PrayerDetailPage = () => {
  const { prayerId, category } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode } = useTheme();
  
  const [prayer, setPrayer] = useState(location.state?.prayer || null);
  const [isLiked, setIsLiked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);

  const deityName = location.state?.deityName || '';
  const deityImage = location.state?.deityImage || '';
  
  // ✅ Use existing useFetch hook
  const { data: categoryData, loading } = useFetch(
    prayer && !prayer.content && category ? `${category}.json` : null
  );

  // ✅ Update prayer with full content from API
  useEffect(() => {
    if (categoryData && Array.isArray(categoryData) && prayerId && !prayer?.content) {
      const fullPrayer = categoryData.find(p => String(p.id) === String(prayerId));
      if (fullPrayer) {
        setPrayer(fullPrayer);
      }
    }
  }, [categoryData, prayerId, prayer?.content]);

  // ✅ Check if prayer is favorited
  useEffect(() => {
    if (prayer?.id) {
      const categoryType = mapCategoryType(category || prayer.source || 'aarti');
      setIsLiked(isFavourite(prayer.id, categoryType));
    }
  }, [prayer?.id, category]);

  // ✅ Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, [audio]);

  // ✅ Map category names
  const mapCategoryType = (cat) => {
    const typeMap = {
      'bhajan': 'bhajan',
      'aarti': 'aarti',
      'chalisa': 'chalisa',
      'mantra': 'mantra',
      'strot': 'strot',
      'stotram': 'strot',
      'kawach': 'kawach',
      'video': 'video'
    };
    return typeMap[cat?.toLowerCase()] || 'aarti';
  };

  // ✅ Toggle favorite
  const handleFavoriteToggle = () => {
    if (!prayer) return;

    const item = {
      id: String(prayer.id),
      title: prayer.title || 'Untitled',
      artist: 'Traditional',
      deity: deityName || extractDeityFromTags(prayer.tags),
      image: deityImage || prayer.img_url || '',
      lyrics_preview: prayer.content?.substring(0, 100) || null,
      content: prayer.content || '',
      audio_url: prayer.audio_url || null,
      video_id: prayer.video_id || null,
      subtitle: prayer.subtitle || null,
      lang: prayer.lang || null,
      tags: prayer.tags || null
    };
    
    const categoryType = mapCategoryType(category || 'aarti');
    const wasAdded = toggleFavourite(item, categoryType);
    setIsLiked(wasAdded);
  };

  // ✅ Extract deity name from tags
  const extractDeityFromTags = (tags) => {
    if (!tags) return 'Unknown';
    const firstTag = tags.split(',')[0].trim();
    return firstTag.charAt(0).toUpperCase() + firstTag.slice(1);
  };

  // ✅ Toggle audio playback
  const handleAudioToggle = () => {
    if (!prayer?.audio_url) return;

    if (!audio) {
      const newAudio = new Audio(prayer.audio_url);
      newAudio.play();
      setAudio(newAudio);
      setIsPlaying(true);

      newAudio.onended = () => {
        setIsPlaying(false);
      };
    } else {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play();
        setIsPlaying(true);
      }
    }
  };

  // ✅ Format content with line breaks
  const formatContent = (text) => {
    if (!text) return [];
    const lines = text.split('\n').filter(line => line.trim() !== '');
    
    const mergedLines = [];
    for (let i = 0; i < lines.length; i += 2) {
      if (i + 1 < lines.length) {
        mergedLines.push(`${lines[i]} ${lines[i + 1]}`);
      } else {
        mergedLines.push(lines[i]);
      }
    }
    
    return mergedLines;
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100 to-orange-50 flex items-center justify-center px-4 transition-colors duration-500">
        <div className="text-center">
          <Loader className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-orange-800 font-semibold">Loading prayer...</p>
        </div>
      </div>
    );
  }

  // ✅ Error State - Prayer not found
  if (!prayer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100 to-orange-50 flex items-center justify-center px-4 transition-colors duration-500 pb-20 md:pb-0">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-orange-900 mb-2">
            Prayer not found
          </h2>
          <p className="text-gray-600 mb-6">
            Unable to load prayer details. Please try again.
          </p>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-full hover:shadow-xl transition-all duration-300 font-semibold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const contentLines = formatContent(prayer.content || '');
  const subtitle = typeof prayer.subtitle === 'object' 
    ? (prayer.subtitle.en || prayer.subtitle.hi || prayer.subtitle.ma) 
    : prayer.subtitle;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-orange-100 to-orange-50 relative overflow-hidden pb-20 md:pb-8 transition-colors duration-500">
      
      {/* ✅ Left Decorative Border */}
      <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-7 md:w-8 pointer-events-none z-0 opacity-90">
        <DecorativeBorder />
      </div>

      {/* ✅ Right Decorative Border */}
      <div className="absolute right-0 top-0 bottom-0 w-6 sm:w-7 md:w-8 pointer-events-none z-0 opacity-90">
        <DecorativeBorder />
      </div>

      {/* ✅ Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 sm:px-10 md:px-12 lg:px-16 py-4 sm:py-6">
        
        {/* ✅ YouTube Video Section */}
        {prayer.video_id && (
          <div className="mb-6 relative">
            {/* Top Border */}
            <div className="mb-2">
              <svg width="100%" height="2" viewBox="0 0 600 2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <line x1="0" y1="1" x2="600" y2="1" className="stroke-orange-500 transition-colors duration-500" strokeWidth="2" />
              </svg>
            </div>
            
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-3 border-orange-400 transition-all duration-500 hover:border-orange-500 hover:shadow-3xl">
              <img 
                src={`https://img.youtube.com/vi/${prayer.video_id}/hqdefault.jpg`}
                alt={prayer.title}
                className="w-full h-36 sm:h-40 md:h-48 object-cover"
                onError={(e) => {
                  if (e.target.src.includes('hqdefault')) {
                    e.target.src = `https://img.youtube.com/vi/${prayer.video_id}/sddefault.jpg`;
                  } else if (e.target.src.includes('sddefault')) {
                    e.target.src = `https://img.youtube.com/vi/${prayer.video_id}/0.jpg`;
                  }
                }}
              />
              
              {/* ✅ Action Buttons Overlay */}
              <div className="absolute top-2 left-2 right-2 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between z-20">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 sm:p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all active:scale-95 duration-300"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                </button>

                <div className="flex items-center gap-2">
                  {prayer.audio_url && (
                    <button
                      onClick={handleAudioToggle}
                      className="p-2 sm:p-2.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all active:scale-95 duration-300"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                      ) : (
                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                      )}
                    </button>
                  )}

                  <button
                    onClick={handleFavoriteToggle}
                    className={`p-2 sm:p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all active:scale-95 duration-300 hover:scale-110 ${
                      isLiked ? 'bg-red-500/95 hover:bg-red-600' : 'bg-white/95 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 sm:w-5 sm:h-5 ${isLiked ? 'text-white fill-current' : 'text-orange-600'}`} />
                  </button>
                </div>
              </div>

              {/* Play Button */}
              <button
                onClick={() => window.open(`https://www.youtube.com/watch?v=${prayer.video_id}`, '_blank')}
                className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/20 via-black/40 to-black/60 hover:from-black/30 hover:via-black/50 hover:to-black/70 transition-all group"
              >
                <div className="bg-red-600 rounded-full p-3 sm:p-4 shadow-2xl group-hover:scale-110 group-hover:bg-red-700 transition-all duration-300">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-white fill-current" />
                </div>
              </button>
            </div>

            {/* Bottom Border */}
            <div className="mt-2">
              <svg width="100%" height="2" viewBox="0 0 600 2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <line x1="0" y1="1" x2="600" y2="1" className="stroke-orange-500 transition-colors duration-500" strokeWidth="2" />
              </svg>
            </div>

            {/* ✅ Overlapping Deity Image */}
            <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 z-10">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 sm:border-5 border-yellow-400 shadow-2xl ring-3 sm:ring-4 ring-orange-400/70 bg-gradient-to-br from-orange-300 to-amber-400 transition-all duration-500 hover:scale-105">
                {(deityImage || prayer.img_url) ? (
                  <img 
                    src={deityImage || prayer.img_url}
                    alt={deityName || prayer.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl">
                    🙏
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ✅ Header with Actions (only when no video) */}
        {!prayer.video_id && (
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 sm:p-3 bg-orange-500 rounded-full shadow-xl hover:bg-orange-600 transition-all active:scale-95 duration-300"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              {prayer.audio_url && (
                <button
                  onClick={handleAudioToggle}
                  className="p-2.5 sm:p-3 bg-orange-500 rounded-full shadow-xl hover:bg-orange-600 transition-all active:scale-95 duration-300"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  )}
                </button>
              )}

              <button
                onClick={handleFavoriteToggle}
                className={`p-2.5 sm:p-3 rounded-full shadow-xl transition-all active:scale-95 duration-300 ${
                  isLiked ? 'bg-red-500 hover:bg-red-600' : 'bg-orange-500 hover:bg-orange-600'
                }`}
              >
                <Heart className={`w-5 h-5 sm:w-6 sm:h-6 text-white ${isLiked ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        )}

        {/* ✅ Circular Deity Image (when no video) */}
        {!prayer.video_id && (
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 sm:border-5 border-yellow-400 shadow-2xl ring-3 sm:ring-4 ring-orange-400/70 bg-gradient-to-br from-orange-300 to-amber-400 transition-all duration-500 hover:scale-105">
                {(deityImage || prayer.img_url) ? (
                  <img 
                    src={deityImage || prayer.img_url}
                    alt={deityName || prayer.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl sm:text-5xl">
                    🙏
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ✅ Spacing for overlapping image */}
        {prayer.video_id && <div className="h-14 sm:h-16 md:h-18"></div>}

        {/* ✅ Prayer Title - Updated with Orange Gradient & Dark Mode */}
        <div className="text-center mb-5">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-3 px-4 leading-tight transition-colors duration-500 ${
            isDarkMode 
              ? 'text-white' 
              : 'bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent'
          }`}>
            {prayer.title}
          </h1>
          
          {subtitle && (
            <p className={`text-base sm:text-lg md:text-xl mb-3 px-4 transition-colors duration-500 font-semibold ${
              isDarkMode ? 'text-orange-300' : 'text-orange-700'
            }`}>
              {subtitle}
            </p>
          )}
        </div>

        {/* ✅ Decorative Divider */}
        <div className="mb-6">
          <TopDivider />
        </div>

        {/* ✅ Prayer Content - Enhanced with Warm Orange Text & Dark Mode */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 border-2 border-orange-300 transition-all duration-500">
          <div className="space-y-4 sm:space-y-5 text-center">
            {contentLines.length > 0 ? (
              contentLines.map((line, index) => (
                <p 
                  key={index}
                  className={`text-base sm:text-lg md:text-xl leading-relaxed font-hindi tracking-wide transition-colors duration-500 ${
                    isDarkMode ? 'text-white' : 'text-orange-800'
                  }`}
                  style={{ 
                    fontFamily: '"Noto Sans Devanagari", "Poppins", sans-serif',
                  }}
                >
                  {line}
                </p>
              ))
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                <p className="text-orange-600 text-lg font-semibold">No content available</p>
              </div>
            )}
          </div>
        </div>

        {/* ✅ Footer Info */}
        <div className="text-center mt-6 space-y-3 pb-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {prayer.lang && (
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 rounded-full text-sm font-semibold border-2 border-orange-200 shadow-sm">
                <span className="mr-2">🌐</span>
                {prayer.lang.toUpperCase()}
              </span>
            )}
            
            {(category || prayer.tags) && (
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-800 rounded-full text-sm font-semibold border-2 border-orange-200 shadow-sm">
                <span className="mr-2">🏷️</span>
                {prayer.tags || category}
              </span>
            )}
          </div>

          {/* Bottom blessing */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <span className="text-xl">🙏</span>
            <p className="text-sm text-orange-600 italic font-light">
              May this prayer bring peace to your soul
            </p>
            <span className="text-xl">🙏</span>
          </div>
        </div>
      </div>

      {/* ✅ Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        
        .font-hindi {
          font-family: 'Noto Sans Devanagari', 'Poppins', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default PrayerDetailPage;