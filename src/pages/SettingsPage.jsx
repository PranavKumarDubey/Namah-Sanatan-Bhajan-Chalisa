    import { useState, useEffect } from 'react';
      import { useNavigate } from 'react-router-dom';
      import { useTheme } from '../context/ThemeContext';
      import { 
        ArrowLeft, 
        Palette, 
        Type, 
        Trash2, 
        Info,
        Sun,
        Moon,
        Monitor,
        Check,
        AlertCircle,
        Heart,
        Settings as SettingsIcon,
        Sparkles
      } from 'lucide-react';

      const Settings = () => {
        const navigate = useNavigate();
        const { theme, setTheme, fontSize, setFontSize } = useTheme();
        
        const [showClearConfirm, setShowClearConfirm] = useState(false);
        const [showSuccessMessage, setShowSuccessMessage] = useState('');

        const handleClearFavourites = () => {
          const emptyFavourites = {
            bhajans: [],
            aartis: [],
            chalisas: [],
            mantras: [],
            strots: [],
            kawachs: [],
            videos: []
          };
          localStorage.setItem('favourites', JSON.stringify(emptyFavourites));
          setShowClearConfirm(false);
          setShowSuccessMessage('All favourites cleared successfully!');
          setTimeout(() => setShowSuccessMessage(''), 3000);
        };

        const getTotalFavourites = () => {
          try {
            const favourites = JSON.parse(localStorage.getItem('favourites') || '{}');
            return (
              (favourites.bhajans?.length || 0) +
              (favourites.aartis?.length || 0) +
              (favourites.chalisas?.length || 0) +
              (favourites.mantras?.length || 0) +
              (favourites.strots?.length || 0) +
              (favourites.kawachs?.length || 0) +
              (favourites.videos?.length || 0)
            );
          } catch {
            return 0;
          }
        };

        const totalFavourites = getTotalFavourites();

        return (
          <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 pb-20 md:pb-8 transition-colors duration-500">
            
            <div className="px-3 sm:px-4 md:px-6 pt-3 sm:pt-4 md:pt-6">
              {/* ✅ Header - Matching Favourites Page Style */}
              <div className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white py-4 sm:py-5 md:py-6 px-4 sm:px-6 overflow-hidden rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-orange-400 shadow-xl sm:shadow-2xl transition-all duration-500 mb-6 sm:mb-8">
                <button onClick={() => navigate('/')} className="absolute top-2 left-2 sm:top-3 sm:left-3 z-20 bg-white/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full shadow-md hover:bg-white transition-all active:scale-95" aria-label="Go back to home">
                  <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
                </button>

                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 sm:top-4 left-4 sm:left-8">
                    <Sparkles className="w-5 h-5 sm:w-6 md:w-8 sm:h-6 md:h-8" />
                  </div>
                  <div className="absolute top-3 sm:top-6 right-6 sm:right-12">
                    <SettingsIcon className="w-4 h-4 sm:w-6 md:w-8 sm:h-6 md:h-8" />
                  </div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto text-center">
                  <div className="flex items-center justify-center mb-2 sm:mb-3">
                    <SettingsIcon className="w-7 h-7 sm:w-8 md:w-10 sm:h-8 md:h-10 mr-2 sm:mr-3 animate-pulse" />
                    <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-2xl">Settings</h1>
                    <SettingsIcon className="w-7 h-7 sm:w-8 md:w-10 sm:h-8 md:h-10 ml-2 sm:ml-3 animate-pulse" />
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-yellow-100 font-semibold mb-2">सेटिंग्स</p>
                  <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl mx-auto px-4">
                    Customize your spiritual experience
                  </p>
                </div>
              </div>
            </div>

            {/* Success Message */}
            {showSuccessMessage && (
              <div className="max-w-4xl mx-auto px-4 mb-6 animate-bounce">
                <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-6 py-4 rounded-2xl flex items-center gap-3 shadow-2xl">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Check className="w-6 h-6" />
                  </div>
                  <span className="font-medium text-lg">{showSuccessMessage}</span>
                </div>
              </div>
            )}

            <div className="max-w-4xl mx-auto px-4 space-y-6">
              
              {/* 1. Theme Settings - Modern Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-orange-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl shadow-lg">
                    <Palette className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Theme Mode</h2>
                    <p className="text-sm text-gray-500 font-light">
                      Choose your preferred display theme
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'light', icon: Sun, label: 'Light', color: 'from-yellow-400 to-orange-500' },
                    { value: 'dark', icon: Moon, label: 'Dark', color: 'from-indigo-500 to-purple-600' },
                    { value: 'auto', icon: Monitor, label: 'Auto', color: 'from-blue-500 to-cyan-500' }
                  ].map(({ value, icon: Icon, label, color }) => (
                    <button
                      key={value}
                      onClick={() => setTheme(value)}
                      className={`group relative p-6 rounded-2xl border-3 transition-all duration-300 overflow-hidden ${
                        theme === value 
                          ? 'shadow-2xl scale-105 border-orange-500' 
                          : 'border-gray-200 hover:border-orange-300 hover:shadow-lg'
                      }`}
                    >
                      {theme === value && (
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-yellow-100 opacity-50"></div>
                      )}
                      <div className="relative">
                        <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <p className={`text-base font-semibold ${theme === value ? 'text-orange-600' : 'text-gray-600'}`}>
                          {label}
                        </p>
                        {theme === value && (
                          <div className="absolute -top-2 -right-2 bg-orange-500 text-white rounded-full p-1.5 shadow-lg">
                            <Check className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Font Size Settings - Modern Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-orange-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 rounded-2xl shadow-lg">
                    <Type className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Text Size</h2>
                    <p className="text-sm text-gray-500 font-light">
                      Adjust reading comfort level
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { value: 'small', label: 'Small', preview: 'Aa', desc: 'Compact and space-efficient' },
                    { value: 'medium', label: 'Medium', preview: 'Aa', desc: 'Perfect balance and clarity' },
                    { value: 'large', label: 'Large', preview: 'Aa', desc: 'Enhanced visibility and comfort' }
                  ].map(option => (
                    <button
                      key={option.value}
                      onClick={() => setFontSize(option.value)}
                      className={`w-full p-5 rounded-2xl border-2 transition-all duration-300 text-left group ${
                        fontSize === option.value 
                          ? 'border-orange-500 shadow-xl scale-105 bg-gradient-to-r from-orange-50 to-yellow-50' 
                          : 'border-gray-200 hover:border-orange-300 hover:shadow-lg hover:scale-102'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br from-orange-400 to-yellow-500 flex items-center justify-center shadow-lg ${
                            option.value === 'small' ? 'text-2xl' : 
                            option.value === 'medium' ? 'text-3xl' : 
                            'text-4xl'
                          } text-white font-bold`}>
                            {option.preview}
                          </div>
                          <div>
                            <p className={`font-bold mb-1 ${fontSize === option.value ? 'text-orange-600' : 'text-gray-800'}`}>
                              {option.label}
                            </p>
                            <p className="text-sm text-gray-500 font-light">
                              {option.desc}
                            </p>
                          </div>
                        </div>
                        {fontSize === option.value && (
                          <div className="bg-orange-500 text-white rounded-full p-2 shadow-lg">
                            <Check className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Clear Favourites - Modern Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-orange-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-red-500 via-pink-500 to-rose-600 rounded-2xl shadow-lg">
                    <Trash2 className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Clear Data</h2>
                    <p className="text-sm text-gray-500 font-light">
                      Manage your saved content
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border-2 border-amber-300 rounded-2xl p-5 mb-5">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-amber-500 rounded-xl">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-amber-900 mb-1">
                        {totalFavourites} Favourite {totalFavourites === 1 ? 'Item' : 'Items'} Saved
                      </p>
                      <p className="text-sm text-amber-700 font-light">
                        Your collection of spiritual prayers and bhajans
                      </p>
                    </div>
                  </div>
                </div>

                {!showClearConfirm ? (
                  <button
                    onClick={() => setShowClearConfirm(true)}
                    disabled={totalFavourites === 0}
                    className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-3 ${
                      totalFavourites === 0
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:from-red-600 hover:to-pink-700 shadow-lg hover:shadow-2xl hover:scale-105'
                    }`}
                  >
                    <Trash2 className="w-6 h-6" />
                    Clear All Favourites
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-400 rounded-2xl p-5">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-500 rounded-xl">
                          <AlertCircle className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-red-800 mb-1 text-lg">Are you absolutely sure?</p>
                          <p className="text-sm text-red-700 font-light">
                            This will permanently delete all {totalFavourites} favourite items. This action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowClearConfirm(false)}
                        className="flex-1 py-4 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-700 rounded-2xl font-semibold hover:from-gray-300 hover:to-gray-400 transition-all duration-300 shadow-lg hover:shadow-xl"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleClearFavourites}
                        className="flex-1 py-4 bg-gradient-to-r from-red-600 to-pink-700 text-white rounded-2xl font-semibold hover:from-red-700 hover:to-pink-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl"
                      >
                        <Trash2 className="w-5 h-5" />
                        Yes, Delete All
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. About & App Info - Modern Card */}
              <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-orange-200 hover:shadow-2xl hover:scale-[1.02] transition-all duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-600 rounded-2xl shadow-lg">
                    <Info className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">About Namah</h2>
                    <p className="text-sm text-gray-500 font-light">
                      App details and information
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: 'App Name', value: 'Namah : Sanatan Bhajan Chalisa' },
                    { label: 'Version', value: '1.0.0' },
                    { label: 'Total Favourites', value: `${totalFavourites} items` },
                    { label: 'Developed By', value: 'Pranav Dubey' },
{ label: 'Company', value: 'VSTech Solutions' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 transition-all duration-300">
                      <span className="font-semibold text-gray-700">{item.label}</span>
                      <span className="font-bold text-orange-600 text-lg">{item.value}</span>
                    </div>
                  ))}

                  <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white shadow-xl">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Sparkles className="w-6 h-6" />
                      <p className="text-center font-bold text-xl">
                        ॐ सर्वे भवन्तु सुखिनः ॐ
                      </p>
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <p className="text-center text-sm text-white/90 italic font-light">
                      "May all beings be happy and free from suffering"
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modern Footer */}
            <div className="text-center py-10 px-4 mt-8">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-orange-500 fill-current" />
                <p className="text-sm font-medium text-gray-600">
                  Made with devotion for spiritual seekers
                </p>
                <Heart className="w-5 h-5 text-orange-500 fill-current" />
              </div>
              <p className="text-xs text-gray-500 font-light">
                © 2026 Namah. All rights reserved.
              </p>
            </div>
          </div>
        );
      };

      export default Settings;