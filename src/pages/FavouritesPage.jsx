import { useState, useEffect } from 'react';
import { Heart, Play, Music, Video, Trash2, Sparkles, Search, Filter, X, ArrowLeft, Book, Flame, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { deduplicateItems } from '../utils/favouritesUtils';

const Favourites = () => {
  const navigate = useNavigate();
  const { isDarkMode, theme, fontSize, colors } = useTheme();
  
  const [favourites, setFavourites] = useState({
    bhajans: [],
    aartis: [],
    chalisas: [],
    mantras: [],
    strots: [],
    kawachs: [],
    videos: []
  });
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDeity, setFilterDeity] = useState('all');

  useEffect(() => {
    const savedFavourites = localStorage.getItem('favourites');
    if (savedFavourites) {
      try {
        const parsed = JSON.parse(savedFavourites);
        const cleaned = {
          bhajans: deduplicateItems(parsed.bhajans || []),
          aartis: deduplicateItems(parsed.aartis || []),
          chalisas: deduplicateItems(parsed.chalisas || []),
          mantras: deduplicateItems(parsed.mantras || []),
          strots: deduplicateItems(parsed.strots || []),
          kawachs: deduplicateItems(parsed.kawachs || []),
          videos: deduplicateItems(parsed.videos || [])
        };
        
        localStorage.setItem('favourites', JSON.stringify(cleaned));
        setFavourites(cleaned);
      } catch (error) {
        console.error('Error loading favourites:', error);
      }
    }
  }, []);

  useEffect(() => {
    const handleFocus = () => {
      const savedFavourites = localStorage.getItem('favourites');
      if (savedFavourites) {
        try {
          const parsed = JSON.parse(savedFavourites);
          setFavourites({
            bhajans: deduplicateItems(parsed.bhajans || []),
            aartis: deduplicateItems(parsed.aartis || []),
            chalisas: deduplicateItems(parsed.chalisas || []),
            mantras: deduplicateItems(parsed.mantras || []),
            strots: deduplicateItems(parsed.strots || []),
            kawachs: deduplicateItems(parsed.kawachs || []),
            videos: deduplicateItems(parsed.videos || [])
          });
        } catch (error) {
          console.error('Error reloading favourites:', error);
        }
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const removeFavourite = (type, item, e) => {
    if (e) e.stopPropagation();
    
    const titleToRemove = (item.title || '').toLowerCase().trim();
    const deityToRemove = (item.deity || '').toLowerCase().trim();
    
    const newFavourites = {
      ...favourites,
      [type]: favourites[type].filter(fav => {
        const favTitle = (fav.title || '').toLowerCase().trim();
        const favDeity = (fav.deity || '').toLowerCase().trim();
        return !(favTitle === titleToRemove && favDeity === deityToRemove);
      })
    };
    setFavourites(newFavourites);
    localStorage.setItem('favourites', JSON.stringify(newFavourites));
  };

  const clearAllFavourites = () => {
    if (window.confirm('Are you sure you want to clear all favourites?')) {
      const emptyFavourites = { 
        bhajans: [], aartis: [], chalisas: [], mantras: [], strots: [], kawachs: [], videos: [] 
      };
      setFavourites(emptyFavourites);
      localStorage.setItem('favourites', JSON.stringify(emptyFavourites));
    }
  };

  const getFilteredItems = () => {
    let items = [];
    
    if (activeTab === 'all') {
      items = [
        ...favourites.bhajans.map(item => ({ ...item, type: 'bhajan' })),
        ...favourites.aartis.map(item => ({ ...item, type: 'aarti' })),
        ...favourites.chalisas.map(item => ({ ...item, type: 'chalisa' })),
        ...favourites.mantras.map(item => ({ ...item, type: 'mantra' })),
        ...favourites.strots.map(item => ({ ...item, type: 'strot' })),
        ...favourites.kawachs.map(item => ({ ...item, type: 'kawach' })),
        ...favourites.videos.map(item => ({ ...item, type: 'video' }))
      ];
    } else if (activeTab === 'bhajans') {
      items = favourites.bhajans.map(item => ({ ...item, type: 'bhajan' }));
    } else if (activeTab === 'aartis') {
      items = favourites.aartis.map(item => ({ ...item, type: 'aarti' }));
    } else if (activeTab === 'chalisas') {
      items = favourites.chalisas.map(item => ({ ...item, type: 'chalisa' }));
    } else if (activeTab === 'mantras') {
      items = favourites.mantras.map(item => ({ ...item, type: 'mantra' }));
    } else if (activeTab === 'strots') {
      items = favourites.strots.map(item => ({ ...item, type: 'strot' }));
    } else if (activeTab === 'kawachs') {
      items = favourites.kawachs.map(item => ({ ...item, type: 'kawach' }));
    } else if (activeTab === 'videos') {
      items = favourites.videos.map(item => ({ ...item, type: 'video' }));
    }

    if (searchQuery) {
      items = items.filter(item => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.deity && item.deity.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filterDeity !== 'all') {
      items = items.filter(item => 
        item.deity && item.deity.toLowerCase().includes(filterDeity.toLowerCase())
      );
    }

    return items;
  };

  const filteredItems = getFilteredItems();
  const totalCount = favourites.bhajans.length + favourites.aartis.length + 
                    favourites.chalisas.length + favourites.mantras.length + 
                    favourites.strots.length + favourites.kawachs.length + 
                    favourites.videos.length;

  const allDeities = [
    ...new Set([
      ...favourites.bhajans.map(item => item.deity),
      ...favourites.aartis.map(item => item.deity),
      ...favourites.chalisas.map(item => item.deity),
      ...favourites.mantras.map(item => item.deity),
      ...favourites.strots.map(item => item.deity),
      ...favourites.kawachs.map(item => item.deity),
      ...favourites.videos.map(item => item.deity)
    ].filter(Boolean))
  ];

  const getTypeColor = (type) => {
    const colors = {
      bhajan: 'from-orange-500 to-red-600',
      aarti: 'from-yellow-500 to-orange-600',
      chalisa: 'from-blue-500 to-indigo-600',
      mantra: 'from-green-500 to-emerald-600',
      strot: 'from-teal-500 to-cyan-600',
      kawach: 'from-amber-500 to-yellow-600',
      video: 'from-purple-500 to-pink-600'
    };
    return colors[type] || 'from-gray-500 to-gray-700';
  };

  const getTypeIcon = (type) => {
    const icons = {
      bhajan: <Music className="w-4 h-4" />,
      aarti: <Sparkles className="w-4 h-4" />,
      chalisa: <Book className="w-4 h-4" />,
      mantra: <Flame className="w-4 h-4" />,
      strot: <Book className="w-4 h-4" />,
      kawach: <Shield className="w-4 h-4" />,
      video: <Video className="w-4 h-4" />
    };
    return icons[type] || <Heart className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50 pb-20 md:pb-0 transition-colors duration-500">
      <div className="px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6">
        {/* ✅ Header - Only Light Mode Classes (ThemeContext will convert to purple gradient in dark mode) */}
        <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white py-4 sm:py-5 md:py-6 px-4 sm:px-6 overflow-hidden rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-orange-400 shadow-xl sm:shadow-2xl transition-all duration-500">
          <button onClick={() => navigate('/')} className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:bg-white transition-all active:scale-95" aria-label="Go back to home">
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
          </button>

          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 sm:top-4 left-4 sm:left-8">
              <Sparkles className="w-5 h-5 sm:w-6 md:w-8 sm:h-6 md:h-8" />
            </div>
            <div className="absolute top-3 sm:top-6 right-6 sm:right-12">
              <Heart className="w-4 h-4 sm:w-6 md:w-8 sm:h-6 md:h-8" />
            </div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center mb-2 sm:mb-3">
              <Heart className="w-7 h-7 sm:w-8 md:w-10 sm:h-8 md:h-10 mr-2 sm:mr-3 fill-current animate-pulse" />
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-2xl">My Favourites</h1>
              <Heart className="w-7 h-7 sm:w-8 md:w-10 sm:h-8 md:h-10 ml-2 sm:ml-3 fill-current animate-pulse" />
            </div>
            <p className="text-base sm:text-lg md:text-xl text-yellow-100 font-semibold mb-2">मेरे पसंदीदा भजन</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3 md:gap-4 text-xs sm:text-sm text-white/80">
              <span className="flex items-center gap-1.5"><Music className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{favourites.bhajans.length} Bhajans</span>
              <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{favourites.aartis.length} Aartis</span>
              <span className="flex items-center gap-1.5"><Book className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{favourites.chalisas.length} Chalisas</span>
              <span className="flex items-center gap-1.5"><Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{favourites.mantras.length} Mantras</span>
              <span className="flex items-center gap-1.5"><Book className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{favourites.strots.length} Strots</span>
              <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{favourites.kawachs.length} Kawachs</span>
              <span className="flex items-center gap-1.5"><Video className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{favourites.videos.length} Videos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-6 md:mb-8 border-2 border-orange-200 transition-all duration-500">
          <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
            {[
              { key: 'all', label: `All (${totalCount})`, icon: null },
              { key: 'bhajans', label: `Bhajans (${favourites.bhajans.length})`, icon: <Music className="w-3 h-3 md:w-3.5 md:h-3.5" /> },
              { key: 'aartis', label: `Aartis (${favourites.aartis.length})`, icon: <Sparkles className="w-3 h-3 md:w-3.5 md:h-3.5" /> },
              { key: 'chalisas', label: `Chalisas (${favourites.chalisas.length})`, icon: <Book className="w-3 h-3 md:w-3.5 md:h-3.5" /> },
              { key: 'mantras', label: `Mantras (${favourites.mantras.length})`, icon: <Flame className="w-3 h-3 md:w-3.5 md:h-3.5" /> },
              { key: 'strots', label: `Strots (${favourites.strots.length})`, icon: <Book className="w-3 h-3 md:w-3.5 md:h-3.5" /> },
              { key: 'kawachs', label: `Kawachs (${favourites.kawachs.length})`, icon: <Shield className="w-3 h-3 md:w-3.5 md:h-3.5" /> },
              { key: 'videos', label: `Videos (${favourites.videos.length})`, icon: <Video className="w-3 h-3 md:w-3.5 md:h-3.5" /> }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 md:px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-1.5 text-xs md:text-sm ${
                  activeTab === tab.key
                    ? `bg-gradient-to-r ${tab.key === 'all' ? 'from-orange-500 to-yellow-600' : 
                       tab.key === 'bhajans' ? 'from-orange-500 to-red-600' :
                       tab.key === 'aartis' ? 'from-yellow-500 to-orange-600' :
                       tab.key === 'chalisas' ? 'from-blue-500 to-indigo-600' :
                       tab.key === 'mantras' ? 'from-green-500 to-emerald-600' :
                       tab.key === 'strots' ? 'from-teal-500 to-cyan-600' :
                       tab.key === 'kawachs' ? 'from-amber-500 to-yellow-600' :
                       'from-purple-500 to-pink-600'} text-white shadow-lg scale-105`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input type="text" placeholder="Search by title or deity..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-10 md:pl-12 pr-4 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-sm md:text-base placeholder:text-gray-400" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4 md:w-5 md:h-5" />
                </button>
              )}
            </div>

            {allDeities.length > 0 && (
              <div className="relative">
                <Filter className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5 pointer-events-none" />
                <select value={filterDeity} onChange={(e) => setFilterDeity(e.target.value)} className="pl-10 md:pl-12 pr-8 py-2 md:py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors appearance-none bg-white cursor-pointer w-full md:min-w-[200px] text-sm md:text-base">
                  <option value="all">All Deities</option>
                  {allDeities.map(deity => (
                    <option key={deity} value={deity}>{deity}</option>
                  ))}
                </select>
              </div>
            )}

            {totalCount > 0 && (
              <button onClick={clearAllFavourites} className="px-4 md:px-6 py-2 md:py-3 bg-red-100 text-red-600 rounded-xl font-semibold hover:bg-red-200 transition-colors flex items-center justify-center gap-2 text-sm md:text-base border-2 border-red-200">
                <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                Clear All
              </button>
            )}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16 md:py-20">
            <Heart className="w-20 h-20 md:w-24 md:h-24 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
              {totalCount === 0 ? 'No Favourites Yet' : 'No Results Found'}
            </h3>
            <p className="text-sm md:text-base text-gray-500 px-4">
              {totalCount === 0 ? 'Start adding your favourite bhajans, aartis and devotional content by clicking the heart icon' : 'Try adjusting your search or filters'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredItems.map((item, index) => (
              <div 
                key={`${item.type}-${item.id || item.title}-${index}`}
                onClick={() => {
                  if (item.id && item.type !== 'video') {
                    navigate(`/prayer/${item.id}/${item.type}`, {
                      state: {
                        prayer: {
                          id: item.id,
                          title: item.title,
                          content: item.content || item.lyrics_preview || '',
                          audio_url: item.audio_url,
                          video_id: item.video_id,
                          img_url: item.image,
                          tags: item.tags || item.deity,
                          source: item.type,
                          subtitle: item.subtitle || '',
                          lang: item.lang || ''
                        },
                        deityName: item.deity,
                        deityImage: item.image
                      }
                    });
                  }
                }}
                className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2 border-2 border-orange-100 ${
                  item.type !== 'video' ? 'cursor-pointer' : ''
                }`}
              >
                <div className={`bg-gradient-to-r ${getTypeColor(item.type)} p-3 md:p-4 relative`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-white/90 text-gray-800 px-2 md:px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      {getTypeIcon(item.type)}
                      {item.type.toUpperCase()}
                    </span>
                    {item.deity && (
                      <span className="bg-white/90 text-gray-800 px-2 md:px-3 py-1 rounded-full text-xs font-bold">{item.deity}</span>
                    )}
                  </div>
                </div>

                {item.type === 'video' && item.thumbnail && (
                  <div className="relative aspect-video overflow-hidden bg-gray-100">
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.src = 'https://via.placeholder.com/320x180/FF6B35/FFFFFF?text=Video'; }} />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white" />
                    </div>
                  </div>
                )}

                {item.type !== 'video' && item.image && (
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-orange-100 to-rose-100">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                )}

                <div className="p-4 md:p-5">
                  <h3 className="font-bold text-base md:text-lg text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                  {item.artist && <p className="text-xs md:text-sm text-gray-600 mb-3 truncate">{item.artist}</p>}
                  {item.lyrics_preview && <p className="text-xs md:text-sm text-gray-500 italic line-clamp-2 mb-3">"{item.lyrics_preview}"</p>}

                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    {item.type === 'video' && item.video_id && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(`https://www.youtube.com/watch?v=${item.video_id}`, '_blank');
                        }} 
                        className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-600 text-white px-3 md:px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <Play className="w-3 h-3 md:w-4 md:h-4" />Watch
                      </button>
                    )}
                    {(item.type === 'bhajan' || item.type === 'aarti') && item.audio_url && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(item.audio_url, '_blank');
                        }} 
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-600 text-white px-3 md:px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <Play className="w-3 h-3 md:w-4 md:h-4" />Play
                      </button>
                    )}
                    <button 
                      onClick={(e) => {
                        const typeKey = item.type === 'bhajan' ? 'bhajans' : item.type === 'aarti' ? 'aartis' : item.type === 'chalisa' ? 'chalisas' : item.type === 'mantra' ? 'mantras' : item.type === 'strot' ? 'strots' : item.type === 'kawach' ? 'kawachs' : 'videos';
                        removeFavourite(typeKey, item, e);
                      }} 
                      className="bg-red-100 text-red-600 px-3 md:px-4 py-2 rounded-lg font-semibold hover:bg-red-200 transition-colors flex items-center gap-2 text-sm md:text-base border-2 border-red-200" 
                      title="Remove from favourites"
                    >
                      <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-center py-8 md:py-12 px-4">
        <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
          <Heart className="text-xl md:text-2xl text-orange-500 fill-current" />
          <p className="text-sm md:text-base text-gray-600 italic">Your sacred collection of devotional content</p>
          <Heart className="text-xl md:text-2xl text-orange-500 fill-current" />
        </div>
      </div>

      <style>{`.line-clamp-2{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}`}</style>
    </div>
  );
};

export default Favourites;