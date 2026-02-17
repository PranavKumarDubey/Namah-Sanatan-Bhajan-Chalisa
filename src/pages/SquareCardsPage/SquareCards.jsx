import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Flame, BookOpen, Music, Sparkles, ScrollText, Shield } from 'lucide-react';

const SquareCards = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleCardClick = (categoryKey) => {
    navigate(`/category/${categoryKey}`);
  };

  return (
    <div className={`w-full py-6 sm:py-8 md:py-12 transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' 
        : 'bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className={`relative rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 mb-8 sm:mb-10 overflow-hidden transition-all duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600'
            : 'bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500'
        }`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mx-4 drop-shadow-lg" 
                  style={{fontFamily: 'Georgia, serif'}}>
                Sacred Collection
              </h2>
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse" />
            </div>
            
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-semibold mb-4" 
               style={{fontFamily: 'Times New Roman, serif'}}>
              पवित्र संग्रह
            </p>

            <div className="flex items-center justify-center">
              <div className="h-0.5 bg-white/30 w-20 sm:w-24 md:w-32"></div>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 mx-4 text-white" />
              <div className="h-0.5 bg-white/30 w-20 sm:w-24 md:w-32"></div>
            </div>
          </div>
        </div>

        {/* Cards Grid - 3 columns on all devices */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 xl:gap-10 mb-8 sm:mb-12 max-w-6xl mx-auto">
          
          {/* Card 1 - Aarti */}
          <div onClick={() => handleCardClick('aarti-sangrah')} className="group cursor-pointer">
            <div className={`relative rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-3 active:scale-95 transition-all duration-500 overflow-hidden backdrop-blur-sm border-2 ${
              isDarkMode ? 'bg-slate-800/90 border-purple-500/30 hover:border-purple-400' : 'bg-white/90 border-white/50 hover:border-orange-300'
            }`}>
              <div className="h-1.5 sm:h-2 bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500"></div>
              <div className="p-3 sm:p-5 lg:p-8">
                <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-orange-500 via-red-500 to-yellow-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Flame className="w-7 h-7 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-white" strokeWidth={2.5} />
                </div>
                <h3 className={`text-xs sm:text-base lg:text-xl font-bold mb-1 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Aarti Sangrah</h3>
                <p className={`text-xs sm:text-sm lg:text-lg font-semibold text-center mb-1 sm:mb-2 ${isDarkMode ? 'text-purple-300' : 'text-orange-600'}`}>आरती संग्रह</p>
                <p className={`text-[10px] sm:text-xs lg:text-sm text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Divine Prayers</p>
                <div className="mt-3 sm:mt-4 flex justify-center">
                  <div className="h-0.5 sm:h-1 w-8 sm:w-12 lg:w-16 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Chalisa */}
          <div onClick={() => handleCardClick('chalisa-sangrah')} className="group cursor-pointer">
            <div className={`relative rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-3 active:scale-95 transition-all duration-500 overflow-hidden backdrop-blur-sm border-2 ${
              isDarkMode ? 'bg-slate-800/90 border-purple-500/30 hover:border-purple-400' : 'bg-white/90 border-white/50 hover:border-orange-300'
            }`}>
              <div className="h-1.5 sm:h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"></div>
              <div className="p-3 sm:p-5 lg:p-8">
                <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <BookOpen className="w-7 h-7 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-white" strokeWidth={2.5} />
                </div>
                <h3 className={`text-xs sm:text-base lg:text-xl font-bold mb-1 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Chalisa Sangrah</h3>
                <p className={`text-xs sm:text-sm lg:text-lg font-semibold text-center mb-1 sm:mb-2 ${isDarkMode ? 'text-purple-300' : 'text-orange-600'}`}>चालीसा</p>
                <p className={`text-[10px] sm:text-xs lg:text-sm text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>40 Verses</p>
                <div className="mt-3 sm:mt-4 flex justify-center">
                  <div className="h-0.5 sm:h-1 w-8 sm:w-12 lg:w-16 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 - Bhajan */}
          <div onClick={() => handleCardClick('bhajan')} className="group cursor-pointer">
            <div className={`relative rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-3 active:scale-95 transition-all duration-500 overflow-hidden backdrop-blur-sm border-2 ${
              isDarkMode ? 'bg-slate-800/90 border-purple-500/30 hover:border-purple-400' : 'bg-white/90 border-white/50 hover:border-orange-300'
            }`}>
              <div className="h-1.5 sm:h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500"></div>
              <div className="p-3 sm:p-5 lg:p-8">
                <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Music className="w-7 h-7 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-white" strokeWidth={2.5} />
                </div>
                <h3 className={`text-xs sm:text-base lg:text-xl font-bold mb-1 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Bhajan</h3>
                <p className={`text-xs sm:text-sm lg:text-lg font-semibold text-center mb-1 sm:mb-2 ${isDarkMode ? 'text-purple-300' : 'text-orange-600'}`}>भजन</p>
                <p className={`text-[10px] sm:text-xs lg:text-sm text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Devotional Songs</p>
                <div className="mt-3 sm:mt-4 flex justify-center">
                  <div className="h-0.5 sm:h-1 w-8 sm:w-12 lg:w-16 rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 - Mantra */}
          <div onClick={() => handleCardClick('mantra')} className="group cursor-pointer">
            <div className={`relative rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-3 active:scale-95 transition-all duration-500 overflow-hidden backdrop-blur-sm border-2 ${
              isDarkMode ? 'bg-slate-800/90 border-purple-500/30 hover:border-purple-400' : 'bg-white/90 border-white/50 hover:border-orange-300'
            }`}>
              <div className="h-1.5 sm:h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"></div>
              <div className="p-3 sm:p-5 lg:p-8">
                <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Sparkles className="w-7 h-7 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-white" strokeWidth={2.5} />
                </div>
                <h3 className={`text-xs sm:text-base lg:text-xl font-bold mb-1 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Mantra</h3>
                <p className={`text-xs sm:text-sm lg:text-lg font-semibold text-center mb-1 sm:mb-2 ${isDarkMode ? 'text-purple-300' : 'text-orange-600'}`}>मंत्र</p>
                <p className={`text-[10px] sm:text-xs lg:text-sm text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sacred Chants</p>
                <div className="mt-3 sm:mt-4 flex justify-center">
                  <div className="h-0.5 sm:h-1 w-8 sm:w-12 lg:w-16 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 5 - Stotram */}
          <div onClick={() => handleCardClick('stotram')} className="group cursor-pointer">
            <div className={`relative rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-3 active:scale-95 transition-all duration-500 overflow-hidden backdrop-blur-sm border-2 ${
              isDarkMode ? 'bg-slate-800/90 border-purple-500/30 hover:border-purple-400' : 'bg-white/90 border-white/50 hover:border-orange-300'
            }`}>
              <div className="h-1.5 sm:h-2 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"></div>
              <div className="p-3 sm:p-5 lg:p-8">
                <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <ScrollText className="w-7 h-7 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-white" strokeWidth={2.5} />
                </div>
                <h3 className={`text-xs sm:text-base lg:text-xl font-bold mb-1 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Stotram</h3>
                <p className={`text-xs sm:text-sm lg:text-lg font-semibold text-center mb-1 sm:mb-2 ${isDarkMode ? 'text-purple-300' : 'text-orange-600'}`}>स्तोत्रम्</p>
                <p className={`text-[10px] sm:text-xs lg:text-sm text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Hymns of Praise</p>
                <div className="mt-3 sm:mt-4 flex justify-center">
                  <div className="h-0.5 sm:h-1 w-8 sm:w-12 lg:w-16 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 6 - Kawach */}
          <div onClick={() => handleCardClick('kawach')} className="group cursor-pointer">
            <div className={`relative rounded-xl sm:rounded-2xl lg:rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-105 hover:-translate-y-3 active:scale-95 transition-all duration-500 overflow-hidden backdrop-blur-sm border-2 ${
              isDarkMode ? 'bg-slate-800/90 border-purple-500/30 hover:border-purple-400' : 'bg-white/90 border-white/50 hover:border-orange-300'
            }`}>
              <div className="h-1.5 sm:h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
              <div className="p-3 sm:p-5 lg:p-8">
                <div className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto mb-3 sm:mb-4 lg:mb-6 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Shield className="w-7 h-7 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-white" strokeWidth={2.5} />
                </div>
                <h3 className={`text-xs sm:text-base lg:text-xl font-bold mb-1 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Kawach</h3>
                <p className={`text-xs sm:text-sm lg:text-lg font-semibold text-center mb-1 sm:mb-2 ${isDarkMode ? 'text-purple-300' : 'text-orange-600'}`}>कवच</p>
                <p className={`text-[10px] sm:text-xs lg:text-sm text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Sacred Guard</p>
                <div className="mt-3 sm:mt-4 flex justify-center">
                  <div className="h-0.5 sm:h-1 w-8 sm:w-12 lg:w-16 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Blessing */}
        <div className="flex items-center justify-center mt-6 sm:mt-8 pb-6 sm:pb-8 space-x-3 sm:space-x-4">
          <div className={`text-xl sm:text-2xl ${isDarkMode ? 'text-purple-400' : 'text-orange-600'}`}>🙏</div>
          <p className={`text-xs sm:text-sm lg:text-base italic ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            May divine blessings be with you
          </p>
          <div className={`text-xl sm:text-2xl ${isDarkMode ? 'text-purple-400' : 'text-orange-600'}`}>🙏</div>
        </div>
      </div>
    </div>
  );
};

export default SquareCards;