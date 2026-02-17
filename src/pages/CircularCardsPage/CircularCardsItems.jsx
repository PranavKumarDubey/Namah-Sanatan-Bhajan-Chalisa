import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const CircularCardsItems = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  
  const IMAGE_BASE_URL = 'https://namah-api.pages.dev/img';

  // ✅ Static deity data - No API call needed
  const godCards = [
    { id: 1, name: 'Om', symbol: '🕉️', image: `${IMAGE_BASE_URL}/1/om.webp`, color: 'bg-gradient-to-br from-amber-300 to-orange-500', route: 'om' },
    { id: 2, name: 'Ganesha', symbol: '🐘', image: `${IMAGE_BASE_URL}/1/ganesh.webp`, color: 'bg-gradient-to-br from-orange-400 to-red-500', route: 'ganesha' },
    { id: 3, name: 'Krishna', symbol: '🪶', image: `${IMAGE_BASE_URL}/1/krishna.webp`, color: 'bg-gradient-to-br from-blue-500 to-purple-600', route: 'krishna' },
    { id: 4, name: 'Shiva', symbol: '🔱', image: `${IMAGE_BASE_URL}/1/shiv.webp`, color: 'bg-gradient-to-br from-gray-600 to-indigo-800', route: 'shiva' },
    { id: 5, name: 'Lakshmi ji', symbol: '🪷', image: `${IMAGE_BASE_URL}/1/laxmi.webp`, color: 'bg-gradient-to-br from-pink-400 to-red-500', route: 'lakshmi' },
    { id: 6, name: 'Hanuman', symbol: '⚡', image: `${IMAGE_BASE_URL}/1/hanuman.webp`, color: 'bg-gradient-to-br from-yellow-400 to-orange-600', route: 'hanuman' },
    { id: 7, name: 'Saraswati ji', symbol: '🎵', image: `${IMAGE_BASE_URL}/1/saraswati.webp`, color: 'bg-gradient-to-br from-blue-200 to-blue-500', route: 'saraswati' },
    { id: 8, name: 'Vishnu', symbol: '🌀', image: `${IMAGE_BASE_URL}/1/vishnu.webp`, color: 'bg-gradient-to-br from-teal-400 to-blue-600', route: 'vishnu' },
    { id: 9, name: 'Maa Durga', symbol: '⚔️', image: `${IMAGE_BASE_URL}/1/durga.webp`, color: 'bg-gradient-to-br from-red-500 to-yellow-500', route: 'durga' },
    { id: 10, name: 'Radha ji', symbol: '📿', image: `${IMAGE_BASE_URL}/1/radha.webp`, color: 'bg-gradient-to-br from-amber-400 to-orange-500', route: 'radha' }
  ];

  const handleCardClick = (route) => {
    navigate(`/deity/${route}`);
  };

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        {/* ✅ Spiritual Header with Dark Mode Support */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center space-x-6">
            <div className={`text-3xl animate-pulse ${isDarkMode ? 'text-purple-400' : 'text-orange-600'}`}>
              ॐ
            </div>
            <h2 className={`text-4xl font-bold mb-2 drop-shadow-lg ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-400 via-purple-300 to-pink-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-orange-600 via-red-600 to-yellow-600 bg-clip-text text-transparent'
            }`}
                style={{fontFamily: 'Georgia, serif'}}>
              Divine Deities
            </h2>
            <div className={`text-3xl animate-pulse ${isDarkMode ? 'text-purple-400' : 'text-orange-600'}`}>
              ॐ
            </div>
          </div>
          
          {/* Decorative Line */}
          <div className="flex items-center justify-center mt-4">
            <div className={`h-px w-32 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-transparent via-purple-400 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-orange-400 to-transparent'
            }`}></div>
            <div className={`mx-4 ${isDarkMode ? 'text-purple-400' : 'text-orange-500'}`}>
              🕉️
            </div>
            <div className={`h-px w-32 ${
              isDarkMode 
                ? 'bg-gradient-to-r from-transparent via-purple-400 to-transparent' 
                : 'bg-gradient-to-r from-transparent via-orange-400 to-transparent'
            }`}></div>
          </div>
        </div>
        
        {/* Horizontal Scrollable Cards */}
        <div className="overflow-x-auto pb-4 pt-4">
          <div className="flex space-x-6 min-w-max px-4">
            {godCards.map((card) => (
              <DeityCard 
                key={card.id}
                card={card}
                onClick={handleCardClick}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const DeityCard = ({ card, onClick, isDarkMode }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="flex-shrink-0 group cursor-pointer py-4" onClick={() => onClick(card.route)}>
      {/* ✅ Card with Dark Mode Support */}
      <div className={`w-24 h-24 rounded-full ${card.color} shadow-lg group-hover:shadow-2xl transform group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 ease-out flex items-center justify-center relative overflow-hidden border-4 ring-2 ring-opacity-50 group-hover:ring-4 group-hover:ring-opacity-100 ${
        isDarkMode
          ? 'border-slate-700 ring-purple-400 group-hover:border-purple-500 group-hover:ring-purple-300'
          : 'border-white ring-orange-300 group-hover:border-yellow-300 group-hover:ring-yellow-400'
      }`}>
        <div className="absolute inset-0 bg-white bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-500 rounded-full"></div>
        <div className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
          isDarkMode
            ? 'shadow-[0_0_20px_rgba(192,132,252,0.6)]'
            : 'shadow-[0_0_20px_rgba(251,191,36,0.6)]'
        }`}></div>
        
        {card.image && !imageError ? (
          <img 
            src={card.image}
            alt={card.name}
            className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500 ease-out relative z-10"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-3xl group-hover:scale-125 transition-transform duration-500 ease-out relative z-10">
            {card.symbol}
          </div>
        )}
      </div>
      
      <div className="text-center mt-3">
        <h3 className={`text-sm font-semibold group-hover:scale-105 transition-all duration-500 ease-out ${
          isDarkMode
            ? 'text-gray-300 group-hover:text-purple-300'
            : 'text-gray-700 group-hover:text-gray-900'
        }`}>
          {card.name}
        </h3>
      </div>
    </div>
  );
};

export default CircularCardsItems;