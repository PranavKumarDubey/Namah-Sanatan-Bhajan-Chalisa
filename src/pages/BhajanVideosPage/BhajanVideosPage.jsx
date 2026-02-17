import React, { useState, useEffect } from 'react';
import { Play, Heart, Eye, Clock, ChevronLeft, ChevronRight, Sparkles, Flame, Loader, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import useFetch from '../../hooks/useFetch';

// ✅ Updated favourites utilities - matching Favourites.jsx structure
const toggleVideoFavourite = (video) => {
  try {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '{"bhajans":[],"aartis":[],"chalisas":[],"mantras":[],"strots":[],"kawachs":[],"videos":[]}');
    
    const exists = favourites.videos.some(item => item.id === video.id);
    
    if (!exists) {
      // Add to favourites with complete info
      favourites.videos.push({
        id: video.id,
        title: video.title,
        artist: video.artist || 'Traditional',
        deity: video.deity || null,
        type: 'video',
        thumbnail: video.thumbnail,
        video_id: video.video_id,
        lyrics_preview: null,
        addedAt: new Date().toISOString()
      });
      localStorage.setItem('favourites', JSON.stringify(favourites));
      return true;
    } else {
      // Remove from favourites
      favourites.videos = favourites.videos.filter(item => item.id !== video.id);
      localStorage.setItem('favourites', JSON.stringify(favourites));
      return false;
    }
  } catch (error) {
    console.error('Error toggling video favourite:', error);
    return false;
  }
};

const isVideoFavourite = (id) => {
  try {
    const favourites = JSON.parse(localStorage.getItem('favourites') || '{"bhajans":[],"aartis":[],"chalisas":[],"mantras":[],"strots":[],"kawachs":[],"videos":[]}');
    return favourites.videos.some(item => item.id === id);
  } catch (error) {
    console.error('Error checking video favourite:', error);
    return false;
  }
};

const BhajanVideosPage = () => {
  const navigate = useNavigate();
  const { isDarkMode, theme, fontSize, colors } = useTheme();
  
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [organizedVideos, setOrganizedVideos] = useState([]);
  const [allVideos, setAllVideos] = useState([]);
  
  // ✅ Fetch from ALL endpoints
  const { data: aartiData, loading: aartiLoading } = useFetch('aarti.json');
  const { data: chalisaData, loading: chalisaLoading } = useFetch('chalisa.json');
  const { data: bhajanData, loading: bhajanLoading } = useFetch('bhajan.json');
  const { data: mantraData, loading: mantraLoading } = useFetch('mantra.json');
  const { data: strotData, loading: strotLoading } = useFetch('strot.json');
  const { data: kawachData, loading: kawachLoading } = useFetch('kawach.json');

  // Check if any API is still loading
  const loading = aartiLoading || chalisaLoading || bhajanLoading || 
                  mantraLoading || strotLoading || kawachLoading;

  // ✅ Deity configuration with tags mapping
  const deityConfig = {
    ganesh: {
      id: 'ganesh',
      title: 'Ganesh Ji Bhajans',
      subtitle: 'गणेश जी भजन',
      icon: '🐘',
      color: 'from-yellow-500 to-orange-600',
      tags: ['ganesh', 'ganapati', 'vinayak', 'ganpati', 'ganesha']
    },
    shiv: {
      id: 'shiv',
      title: 'Shiva Ji Bhajans',
      subtitle: 'शिव जी भजन',
      icon: '🔱',
      color: 'from-indigo-600 to-purple-700',
      tags: ['shiv', 'shiva', 'mahadev', 'bholenath', 'shankar', 'mahakal', 'bhairav']
    },
    krishna: {
      id: 'krishna',
      title: 'Bhagwan Krishna Bhajans',
      subtitle: 'भगवान कृष्ण भजन',
      icon: '🪶',
      color: 'from-blue-500 to-purple-600',
      tags: ['krishna', 'kanha', 'govind', 'gopal', 'balkrishna', 'radha', 'vitthala']
    },
    durga: {
      id: 'durga',
      title: 'Maa Durga Bhajans',
      subtitle: 'माँ दुर्गा भजन',
      icon: '⚔️',
      color: 'from-red-600 to-pink-700',
      tags: ['durga', 'ambe', 'parvati', 'devi', 'shailputri', 'brahmacharini', 
             'chandraghanta', 'kushmanda', 'skandmata', 'katyayani', 'kalratri', 
             'mahagauri', 'siddhadhatri', 'kamakhya', 'jwala', 'chinpurni', 
             'vindhyavasini', 'annapurna', 'vaishno', 'sheetla', 'chhat']
    },
    vishnu: {
      id: 'vishnu',
      title: 'Vishnu Ji Bhajans',
      subtitle: 'विष्णु जी भजन',
      icon: '🌀',
      color: 'from-cyan-500 to-blue-600',
      tags: ['vishnu', 'narayana', 'satyanarayana', 'narashinh', 'jagganath']
    },
    ram: {
      id: 'ram',
      title: 'Bhagwan Ram Bhajans',
      subtitle: 'भगवान राम भजन',
      icon: '🏹',
      color: 'from-green-500 to-emerald-600',
      tags: ['ram', 'rama', 'raghupati', 'ramlala', 'sita']
    },
    hanuman: {
      id: 'hanuman',
      title: 'Hanuman Ji Bhajans',
      subtitle: 'हनुमान जी भजन',
      icon: '⚡',
      color: 'from-orange-600 to-red-700',
      tags: ['hanuman', 'bajrang', 'pawanputra', 'balaji']
    },
    laxmi: {
      id: 'laxmi',
      title: 'Laxmi Maa Bhajans',
      subtitle: 'लक्ष्मी माँ भजन',
      icon: '💰',
      color: 'from-pink-500 to-rose-600',
      tags: ['laxmi', 'lakshmi', 'mahalaxmi']
    },
    saraswati: {
      id: 'saraswati',
      title: 'Saraswati Maa Bhajans',
      subtitle: 'सरस्वती माँ भजन',
      icon: '📚',
      color: 'from-yellow-400 to-amber-500',
      tags: ['saraswati', 'sarasvati', 'gayatri']
    },
    other: {
      id: 'other',
      title: 'Other Bhajans',
      subtitle: 'अन्य भजन',
      icon: '🙏',
      color: 'from-gray-500 to-slate-600',
      tags: ['surya', 'chandra', 'shani', 'brihaspati', 'kuber', 'ganga', 
             'tulsi', 'santoshi', 'gau', 'navgrah', 'budhwar', 'sai', 
             'khatushyam', 'gyaneshwar', 'vishwakarma', 'jitiya']
    }
  };

  // ✅ Combine all API data when available
  useEffect(() => {
    const combinedData = [
      ...(Array.isArray(aartiData) ? aartiData : []),
      ...(Array.isArray(chalisaData) ? chalisaData : []),
      ...(Array.isArray(bhajanData) ? bhajanData : []),
      ...(Array.isArray(mantraData) ? mantraData : []),
      ...(Array.isArray(strotData) ? strotData : []),
      ...(Array.isArray(kawachData) ? kawachData : [])
    ];

    console.log('📊 Total videos from all APIs:', combinedData.length);
    console.log('📁 Sources:', {
      aarti: aartiData?.length || 0,
      chalisa: chalisaData?.length || 0,
      bhajan: bhajanData?.length || 0,
      mantra: mantraData?.length || 0,
      strot: strotData?.length || 0,
      kawach: kawachData?.length || 0
    });

    setAllVideos(combinedData);

    if (combinedData.length > 0) {
      const organized = organizeVideosByDeity(combinedData);
      setOrganizedVideos(organized);
      console.log('✅ Organized sections:', organized.map(s => `${s.title}: ${s.videos.length} videos`));
      
      // Load initial favourites state
      loadFavouritesState();
    }
  }, [aartiData, chalisaData, bhajanData, mantraData, strotData, kawachData]);

  // ✅ Load favourites state from localStorage
  const loadFavouritesState = () => {
    try {
      const favourites = JSON.parse(localStorage.getItem('favourites') || '{"bhajans":[],"aartis":[],"chalisas":[],"mantras":[],"strots":[],"kawachs":[],"videos":[]}');
      const initialLiked = new Set();
      
      favourites.videos.forEach(video => {
        initialLiked.add(video.id);
      });
      
      setLikedVideos(initialLiked);
      console.log('✅ Loaded favourites:', initialLiked.size, 'videos');
    } catch (error) {
      console.error('Error loading favourites state:', error);
    }
  };

  // ✅ Reload favourites when window gains focus (to sync with Favourites page)
  useEffect(() => {
    const handleFocus = () => {
      loadFavouritesState();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // ✅ Function to organize videos by deity tags
  const organizeVideosByDeity = (videos) => {
    const groupedVideos = {};
    
    // Initialize empty arrays for each deity
    Object.keys(deityConfig).forEach(deityKey => {
      groupedVideos[deityKey] = [];
    });

    // Process each video
    videos.forEach(video => {
      if (!video.video_id) return; // Skip if no video_id

      // Get video tags (can be comma-separated string or array)
      const videoTags = typeof video.tags === 'string' 
        ? video.tags.toLowerCase().split(',').map(t => t.trim())
        : Array.isArray(video.tags) 
        ? video.tags.map(t => t.toLowerCase().trim())
        : [];

      // Find matching deity
      let matched = false;
      for (const [deityKey, config] of Object.entries(deityConfig)) {
        const hasMatch = videoTags.some(tag => config.tags.includes(tag));
        
        if (hasMatch) {
          groupedVideos[deityKey].push({
            id: video.id.toString(),
            title: video.title,
            artist: 'Traditional',
            thumbnail: video.video_id 
              ? `https://i.ytimg.com/vi/${video.video_id}/hqdefault.jpg`
              : video.img_url || 'https://via.placeholder.com/320x180/FF6B35/FFFFFF?text=Bhajan+Video',
            duration: 'N/A',
            views: 'N/A',
            deity: config.title,
            video_id: video.video_id
          });
          matched = true;
          break;
        }
      }
    });

    // Convert to array format and filter empty sections
    return Object.entries(deityConfig)
      .map(([key, config]) => ({
        ...config,
        videos: groupedVideos[key]
      }))
      .filter(section => section.videos.length > 0);
  };

  // ✅ Toggle like with proper state management
  const toggleLike = (video) => {
    const wasAdded = toggleVideoFavourite(video);
    
    setLikedVideos(prev => {
      const newSet = new Set(prev);
      if (wasAdded) {
        newSet.add(video.id);
      } else {
        newSet.delete(video.id);
      }
      return newSet;
    });
  };

  const scrollSection = (sectionId, direction) => {
    const container = document.getElementById(sectionId);
    if (container) {
      const scrollAmount = window.innerWidth < 640 ? 280 : window.innerWidth < 768 ? 320 : 400;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleVideoClick = (video) => {
    window.open(`https://www.youtube.com/watch?v=${video.video_id}`, '_blank');
  };

  const handleBackClick = () => {
    navigate('/');
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-orange-600 animate-spin mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading Bhajans...</p>
        </div>
      </div>
    );
  };

  // ✅ No Videos State
  if (!organizedVideos || organizedVideos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center text-gray-600">
          <p className="text-xl font-bold mb-2">No Videos Available</p>
          <p className="text-sm">Total videos loaded: {allVideos.length}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-amber-50 to-yellow-50 pb-20 md:pb-0 transition-colors duration-500">
      
      <div className="px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6">
        {/* ✅ Header - Matching Favourites and Settings pages exactly */}
        <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white py-4 sm:py-5 md:py-6 px-4 sm:px-6 overflow-hidden rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-orange-400 shadow-xl sm:shadow-2xl transition-all duration-500 mb-6 sm:mb-8">
          {/* Back Arrow Button */}
          <button
            onClick={handleBackClick}
            className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:bg-white transition-all active:scale-95"
            aria-label="Go back to home"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
          </button>

          {/* Decorative background patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 sm:top-4 left-4 sm:left-8">
              <Sparkles className="w-5 h-5 sm:w-6 md:w-8 sm:h-6 md:h-8" />
            </div>
            <div className="absolute top-3 sm:top-6 right-6 sm:right-12">
              <Flame className="w-4 h-4 sm:w-6 md:w-8 sm:h-6 md:h-8" />
            </div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <Play className="w-7 h-7 sm:w-8 md:w-10 sm:h-8 md:h-10 mr-2 sm:mr-3 animate-pulse" />
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-2xl">
                Bhajan Videos
              </h1>
              <Sparkles className="w-7 h-7 sm:w-8 md:w-10 sm:h-8 md:h-10 ml-2 sm:ml-3 animate-pulse" />
            </div>
            <p className="text-base sm:text-lg md:text-xl text-yellow-100 font-semibold mb-2">
              भजन वीडियो संग्रह
            </p>
            <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto px-4">
              Watch divine bhajans, devotional songs and spiritual videos
            </p>
            <p className="text-xs sm:text-sm text-white/80 mt-2">
              📊 {allVideos.length} videos • 💖 {likedVideos.size} favourites
            </p>
          </div>
        </div>
      </div>

      {/* Video Sections */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        {organizedVideos.map((section) => (
          <div key={section.id} className="mb-10 sm:mb-12 md:mb-16">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4 sm:mb-6 px-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <span className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0">{section.icon}</span>
                  <h2 className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${section.color} bg-clip-text text-transparent truncate`}>
                    {section.title}
                  </h2>
                  <span className="text-sm text-gray-500">({section.videos.length})</span>
                </div>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-orange-600 font-semibold ml-8 sm:ml-10 md:ml-14 truncate">
                  {section.subtitle}
                </p>
              </div>
              
              {/* Navigation Buttons */}
              <div className="hidden sm:flex gap-2 flex-shrink-0 ml-4">
                <button
                  onClick={() => scrollSection(section.id, 'left')}
                  className="bg-white hover:bg-orange-50 rounded-full p-2 md:p-3 shadow-lg transition-all hover:scale-110"
                  aria-label="Scroll left"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                </button>
                <button
                  onClick={() => scrollSection(section.id, 'right')}
                  className="bg-white hover:bg-orange-50 rounded-full p-2 md:p-3 shadow-lg transition-all hover:scale-110"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                </button>
              </div>
            </div>

            {/* Video Cards Container */}
            <div
              id={section.id}
              className="flex overflow-x-auto gap-3 sm:gap-4 md:gap-6 pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory px-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {section.videos.map((video) => (
                <div
                  key={video.id}
                  className="group flex-shrink-0 snap-start w-[260px] sm:w-[280px] md:w-[320px]"
                >
                  {/* ✅ Card - Only Light Mode Classes */}
                  <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                    {/* Thumbnail */}
                    <div 
                      className="relative aspect-video overflow-hidden cursor-pointer"
                      onClick={() => handleVideoClick(video)}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/320x180/FF6B35/FFFFFF?text=Bhajan+Video';
                        }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-3 sm:p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <Play className="w-6 h-6 sm:w-8 sm:h-8 text-orange-600 fill-orange-600" />
                        </div>
                      </div>

                      {/* Deity Tag */}
                      <div className={`absolute top-2 left-2 bg-gradient-to-r ${section.color} text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                        {section.icon}
                      </div>

                      {/* ✅ Favorite Heart Button - Top Right */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(video);
                        }}
                        className={`absolute top-2 right-2 p-2 rounded-full transition-all shadow-lg z-10 ${
                          likedVideos.has(video.id)
                            ? 'bg-red-500 text-white scale-110'
                            : 'bg-white/90 backdrop-blur-sm text-gray-600 hover:bg-red-50 hover:text-red-500'
                        }`}
                        aria-label={likedVideos.has(video.id) ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart
                          className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-200 ${
                            likedVideos.has(video.id) ? 'fill-current' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Video Info */}
                    <div className="p-3 sm:p-4">
                      <h3 className="font-bold text-base sm:text-lg text-gray-800 mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 truncate">
                        {video.artist}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-gray-500 text-xs sm:text-sm">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="truncate">Watch on YouTube</span>
                        </div>

                        {/* Like Status Badge */}
                        {likedVideos.has(video.id) && (
                          <div className="flex items-center gap-1 text-red-500 text-xs font-semibold">
                            <Heart className="w-3 h-3 fill-current" />
                            <span>Saved</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Decoration */}
      <div className="text-center pb-8 sm:pb-12 px-4">
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4">
          <div className="text-xl sm:text-2xl">🙏</div>
          <p className="text-sm sm:text-base text-gray-600 italic">
            Experience divine bliss through devotional music
          </p>
          <div className="text-xl sm:text-2xl">🙏</div>
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BhajanVideosPage;