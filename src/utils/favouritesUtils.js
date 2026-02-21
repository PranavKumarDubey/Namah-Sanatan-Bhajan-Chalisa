// 👑 COMPLETE FIX FOR DUPLICATION BUG

/**
 * Deduplicate items by checking title + deity combination
 * This prevents same aarti from appearing twice when added from both:
 * - Square cards (aarti-sangrah)
 * - Circular cards (individual god)
 */
export const deduplicateItems = (items) => {
  const seen = new Map();
  
  return items.filter(item => {
    // Create unique key from title + deity
    const title = (item.title || '').toLowerCase().trim();
    const deity = (item.deity || '').toLowerCase().trim();
    const key = `${title}|${deity}`;
    
    if (seen.has(key)) {
      return false; // Skip duplicate
    }
    
    seen.set(key, true);
    return true;
  });
};

/**
 * Check if an item is in favorites
 * Searches across ALL categories (not just one type)
 */
export const isFavourite = (itemId, categoryType) => {
  try {
    const favourites = JSON.parse(
      localStorage.getItem('favourites') || 
      '{"bhajans":[],"aartis":[],"chalisas":[],"mantras":[],"strots":[],"kawachs":[],"videos":[]}'
    );
    
    // 👑 Map category types to storage keys
    const typeMap = {
      'bhajan': 'bhajans',
      'aarti': 'aartis',
      'aarti-sangrah': 'aartis',
      'chalisa': 'chalisas',
      'chalisa-sangrah': 'chalisas',
      'mantra': 'mantras',
      'strot': 'strots',
      'stotram': 'strots',
      'kawach': 'kawachs',
      'video': 'videos'
    };
    
    const typeKey = typeMap[categoryType?.toLowerCase()] || 'aartis';
    const itemIdStr = String(itemId);
    
    // 👑 Search in the specific category
    return favourites[typeKey]?.some(fav => String(fav.id) === itemIdStr) || false;
  } catch (error) {
    console.error('Error checking favourite:', error);
    return false;
  }
};

/**
 * Toggle favorite - adds or removes based on current state
 * Returns true if added, false if removed
 */
export const toggleFavourite = (item, categoryType) => {
  try {
    const favourites = JSON.parse(
      localStorage.getItem('favourites') || 
      '{"bhajans":[],"aartis":[],"chalisas":[],"mantras":[],"strots":[],"kawachs":[],"videos":[]}'
    );
    
    // 👑 Map category types to storage keys
    const typeMap = {
      'bhajan': 'bhajans',
      'aarti': 'aartis',
      'aarti-sangrah': 'aartis',
      'chalisa': 'chalisas',
      'chalisa-sangrah': 'chalisas',
      'mantra': 'mantras',
      'strot': 'strots',
      'stotram': 'strots',
      'kawach': 'kawachs',
      'video': 'videos'
    };
    
    const typeKey = typeMap[categoryType?.toLowerCase()] || 'aartis';
    const itemIdStr = String(item.id);
    
    if (!typeKey) {
      console.error('Unknown category type:', categoryType);
      return false;
    }
    
    // 👑 Check if item exists in ANY category by title + deity
    const existsInAny = checkIfExistsInAnyCategory(item.title, item.deity, favourites);
    
    if (!existsInAny) {
      // 👑 Add to the appropriate category
      favourites[typeKey] = favourites[typeKey] || [];
      
      // ✅✅ UPDATED: Save COMPLETE prayer data for all items
      const favouriteItem = {
        id: itemIdStr,
        title: item.title,
        artist: item.artist || 'Traditional',
        deity: item.deity || null,
        type: categoryType,
        image: item.image || null,
        addedAt: new Date().toISOString(),
        
        // ✅ CRITICAL FIX: Save full content for ALL types
        content: item.content || item.lyrics_preview || '',
        audio_url: item.audio_url || null,
        video_id: item.video_id || null,
        subtitle: item.subtitle || null,
        lang: item.lang || null,
        tags: item.tags || null,
        lyrics_preview: item.lyrics_preview || null  // Keep for backward compatibility
      };
      
      favourites[typeKey].push(favouriteItem);
      
      // 👑 Deduplicate before saving
      favourites[typeKey] = deduplicateItems(favourites[typeKey]);
      localStorage.setItem('favourites', JSON.stringify(favourites));
      return true;
    } else {
      // 👑 Remove from ALL categories by title + deity
      const title = (item.title || '').toLowerCase().trim();
      const deity = (item.deity || '').toLowerCase().trim();
      
      Object.keys(typeMap).forEach(type => {
        const key = typeMap[type];
        favourites[key] = favourites[key]?.filter(fav => {
          const favTitle = (fav.title || '').toLowerCase().trim();
          const favDeity = (fav.deity || '').toLowerCase().trim();
          return !(favTitle === title && favDeity === deity);
        }) || [];
      });
      
      localStorage.setItem('favourites', JSON.stringify(favourites));
      return false;
    }
  } catch (error) {
    console.error('Error toggling favourite:', error);
    return false;
  }
};

/**
 * Helper: Check if item exists in ANY category by title + deity
 * This prevents duplicates across different category types
 */
const checkIfExistsInAnyCategory = (title, deity, favourites) => {
  const titleCheck = (title || '').toLowerCase().trim();
  const deityCheck = (deity || '').toLowerCase().trim();
  
  const allItems = [
    ...favourites.bhajans,
    ...favourites.aartis,
    ...favourites.chalisas,
    ...favourites.mantras,
    ...favourites.strots,
    ...favourites.kawachs,
    ...favourites.videos
  ];
  
  return allItems.some(fav => {
    const favTitle = (fav.title || '').toLowerCase().trim();
    const favDeity = (fav.deity || '').toLowerCase().trim();
    return favTitle === titleCheck && favDeity === deityCheck;
  });
};

/**
 * Remove a favorite by title + deity combination
 */
export const removeFavouriteByTitleDeity = (title, deity) => {
  try {
    const favourites = JSON.parse(
      localStorage.getItem('favourites') || 
      '{"bhajans":[],"aartis":[],"chalisas":[],"mantras":[],"strots":[],"kawachs":[],"videos":[]}'
    );
    
    const titleCheck = (title || '').toLowerCase().trim();
    const deityCheck = (deity || '').toLowerCase().trim();
    
    // Remove from all categories
    Object.keys(favourites).forEach(key => {
      if (Array.isArray(favourites[key])) {
        favourites[key] = favourites[key].filter(fav => {
          const favTitle = (fav.title || '').toLowerCase().trim();
          const favDeity = (fav.deity || '').toLowerCase().trim();
          return !(favTitle === titleCheck && favDeity === deityCheck);
        });
      }
    });
    
    localStorage.setItem('favourites', JSON.stringify(favourites));
    return true;
  } catch (error) {
    console.error('Error removing favourite:', error);
    return false;
  }
};