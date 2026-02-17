import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

import SquareCards from '../pages/SquareCardsPage/SquareCards';
import SpiritualFooter from './SpiritualFooter';
import CircularCardsItems from '../pages/CircularCardsPage/CircularCardsItems';

const Display = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const formatDate = (date) => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const sanataniThoughts = [
    "सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः - May all beings be happy, may all beings be healthy",
    "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन - You have the right to perform action, but never to the fruits of action",
    "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत - Whenever there is decline of righteousness, O Bharata",
    "सत्यमेव जयते - Truth alone triumphs",
    "वसुधैव कुटुम्बकम् - The world is one family",
    "आत्मनो मोक्षार्थं जगद्धिताय च - For one's own salvation and for the welfare of the world"
  ];

  const [currentThought] = useState(() => 
    sanataniThoughts[Math.floor(Math.random() * sanataniThoughts.length)]
  );

  const handleInstallApp = () => {
    console.log('Installing app...');
  };

  const handleBellClick = () => {
    console.log('Bell rung! 🔔');
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 p-5 min-h-screen">
      {/* ✅ Greeting Card - Only Light Mode Classes */}
      <div className="relative bg-white rounded-3xl shadow-xl border border-orange-200 overflow-visible mb-20 backdrop-blur-sm bg-opacity-95">
        
        {/* ✅ Header - Only Light Mode Classes (ThemeContext will convert) */}
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 p-4 text-white rounded-t-3xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 drop-shadow-lg" style={{fontFamily: "'Cormorant Garamond', serif"}}>
                {getGreeting()}   
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl opacity-90 font-semibold" style={{fontFamily: "'EB Garamond', serif"}}>
                Today is {formatDate(currentTime)}
              </p>
            </div>
            <div className="text-right">
              <button 
                onClick={handleInstallApp}
                className="bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 shadow-lg"
                style={{fontFamily: "'Libre Baskerville', serif"}}
              >
                📱 Install App
              </button>
            </div>
          </div>
        </div>

        {/* ✅ Inspirational Quote Section - Only Light Mode Classes */}
        <div className="p-5 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-b-3xl">
          <div className="flex items-start space-x-3">
            <div className="text-xl text-orange-600 flex-shrink-0">
              🕉️
            </div>
            <div className="flex-1">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-2 flex items-center" style={{fontFamily: "'Merriweather', serif"}}>
                <span className="mr-2">✨</span>
                Today's Spiritual Thought
              </h3>
              <blockquote className="text-sm sm:text-base text-gray-700 italic leading-relaxed border-l-3 border-orange-400 pl-3" style={{fontFamily: "'Lora', serif"}}>
                "{currentThought}"
              </blockquote>
              <div className="mt-2 text-xs sm:text-sm text-orange-600 font-semibold" style={{fontFamily: "'Poppins', sans-serif"}}>
                — Ancient Vedic Wisdom
              </div>
            </div>
          </div>
        </div>

        {/* ✅ Left Bell - Only Light Mode Classes */}
        <div className="absolute bottom-0 left-8 transform translate-y-full z-10">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-4 bg-gradient-to-b from-orange-400 to-amber-700"></div>
            
            <div 
              onClick={handleBellClick}
              className="relative cursor-pointer transform hover:scale-110 transition-all duration-300"
              style={{
                animation: 'swingLeft 3s ease-in-out infinite',
                transformOrigin: 'top center'
              }}
            >
              <div className="w-14 h-16 bg-gradient-to-b from-yellow-400 via-amber-500 to-amber-600 rounded-b-full shadow-xl border-2 border-amber-700 relative">
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-700 rounded-full"></div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-amber-900 rounded-full"></div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-lg font-bold text-amber-900">ॐ</div>
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-amber-800 rounded-full opacity-60"></div>
                <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-9 h-0.5 bg-amber-800 rounded-full opacity-60"></div>
                <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-amber-800 rounded-full opacity-60"></div>
              </div>
              <div className="absolute -top-3 -left-3 w-20 h-20 border-2 border-yellow-400 rounded-full opacity-0 animate-ping"></div>
            </div>
            
            <div className="text-center mt-2">
              <p className="text-sm font-semibold text-amber-700" style={{fontFamily: "'Poppins', sans-serif"}}>Peace</p>
              <p className="text-xs text-amber-600">शांति</p>
            </div>
          </div>
        </div>

        {/* ✅ Right Bell - Only Light Mode Classes */}
        <div className="absolute bottom-0 right-8 transform translate-y-full z-10">
          <div className="flex flex-col items-center">
            <div className="w-0.5 h-4 bg-gradient-to-b from-orange-400 to-amber-700"></div>
            
            <div 
              onClick={handleBellClick}
              className="relative cursor-pointer transform hover:scale-110 transition-all duration-300"
              style={{
                animation: 'swingRight 3s ease-in-out infinite 0.5s',
                transformOrigin: 'top center'
              }}
            >
              <div className="w-14 h-16 bg-gradient-to-b from-yellow-400 via-amber-500 to-amber-600 rounded-b-full shadow-xl border-2 border-amber-700 relative">
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-amber-700 rounded-full"></div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-2 h-4 bg-amber-900 rounded-full"></div>
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2 text-lg font-bold text-amber-900">ॐ</div>
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-10 h-0.5 bg-amber-800 rounded-full opacity-60"></div>
                <div className="absolute top-9 left-1/2 transform -translate-x-1/2 w-9 h-0.5 bg-amber-800 rounded-full opacity-60"></div>
                <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-amber-800 rounded-full opacity-60"></div>
              </div>
              <div className="absolute -top-3 -left-3 w-20 h-20 border-2 border-yellow-400 rounded-full opacity-0 animate-ping" style={{animationDelay: '0.5s'}}></div>
            </div>
            
            <div className="text-center mt-2">
              <p className="text-sm font-semibold text-amber-700" style={{fontFamily: "'Poppins', sans-serif"}}>Prosperity</p>
              <p className="text-xs text-amber-600">समृद्धि</p>
            </div>
          </div>
        </div>
      </div>

     <CircularCardsItems/>
      <SquareCards/>
      <SpiritualFooter/>
      
      {/* ✨ Google Fonts Import */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Playfair+Display:wght@600;700;800&family=Merriweather:wght@700;900&family=Lora:ital,wght@1,400;1,500&family=Poppins:wght@400;600;700&display=swap');
        
        @keyframes swingLeft {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-12deg); }
          75% { transform: rotate(12deg); }
        }
        
        @keyframes swingRight {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(12deg); }
          75% { transform: rotate(-12deg); }
        }
      `}</style>
    </div>
  );
}

export default Display;