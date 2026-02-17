import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Heart, Sparkles, Download, Smartphone } from 'lucide-react';

const SpiritualFooter = () => {
  const { isDarkMode } = useTheme();
  
  // Play Store URL
  const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.vstech.vire.namah&pcampaignid=web_share';
  
  const handleDownload = () => {
    window.open(PLAY_STORE_URL, '_blank', 'noopener,noreferrer');
  };
  
  return (
    <footer className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white overflow-hidden transition-all duration-500 pb-20 md:pb-0">
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-8">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <div className="absolute top-6 right-12">
          <Sparkles className="w-6 h-6 animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="absolute bottom-4 left-1/4 text-3xl">🙏</div>
        <div className="absolute bottom-6 right-1/3 text-2xl">✨</div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Top Decorative Border */}
        <div className="flex items-center justify-center mb-6">
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent w-full max-w-md"></div>
          <div className="mx-4 text-2xl text-yellow-200 flex-shrink-0">ॐ</div>
          <div className="h-px bg-gradient-to-r from-transparent via-yellow-300 to-transparent w-full max-w-md"></div>
        </div>

        {/* Main Content - Centered */}
        <div className="text-center space-y-6">
          {/* App Name & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-200" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-100 drop-shadow-lg">
                Namah
              </h2>
              <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-200" />
            </div>
            
            <p className="text-sm sm:text-base text-orange-100 font-semibold max-w-2xl mx-auto px-4">
              Your spiritual companion for devotional prayers, bhajans, and divine blessings
            </p>
            
            <p className="text-xs sm:text-sm text-yellow-200 italic font-light">
              आपका आध्यात्मिक साथी • भक्ति और प्रार्थना का संग्रह
            </p>
          </div>

          {/* App Download Section */}
          <div className="max-w-md mx-auto">
            <button 
              onClick={handleDownload}
              className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm border-2 border-yellow-300/50 hover:border-yellow-200 rounded-2xl px-6 py-4 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl group"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="bg-yellow-300/20 p-2 rounded-full group-hover:bg-yellow-300/30 transition-all">
                  <Smartphone className="w-6 h-6 text-yellow-100" />
                </div>
                <div className="flex-1 text-left">
                  <div className="text-xs text-yellow-200 font-medium">Download Namah App</div>
                  <div className="text-sm sm:text-base text-white font-bold flex items-center gap-2">
                    Get it on Play Store
                    <Download className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </button>
          </div>

          {/* Sacred Quote */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 max-w-3xl mx-auto border border-yellow-300/30">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">🙏</span>
              <p className="text-lg sm:text-xl font-bold text-yellow-100">
                ॐ सर्वे भवन्तु सुखिनः ॐ
              </p>
              <span className="text-xl">🙏</span>
            </div>
            <p className="text-xs sm:text-sm text-white/90 italic">
              "May all beings be happy and free from suffering"
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center my-6">
            <div className="h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent w-full max-w-lg"></div>
          </div>

          {/* Copyright & Credits */}
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-4 h-4 text-red-300 fill-current" />
              <p className="text-sm text-orange-100">
                Made with devotion for spiritual seekers
              </p>
              <Heart className="w-4 h-4 text-red-300 fill-current" />
            </div>
            
            <p className="text-xs text-orange-200">
              © 2025 Namah. All rights reserved.
            </p>
            
            <p className="text-xs text-yellow-200 font-light">
              Developed by Pranav Dubey | VSTech Solutions
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 opacity-60"></div>
    </footer>
  );
};

export default SpiritualFooter; 