import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, Video, Heart, Settings, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, theme, fontSize } = useTheme();

  // Determine active state based on current route
  const getActiveKey = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    if (path === "/videos") return "videos";
    if (path === "/favourites") return "favourites";
    if (path === "/settings") return "settings";
    return "home";
  };

  const [active, setActive] = useState(getActiveKey());

  // Update active state when route changes
  useEffect(() => {
    setActive(getActiveKey());
  }, [location.pathname]);

  const menuItems = [
    { 
      name: "Home", 
      icon: Home, 
      key: "home",
      route: "/",
    },
    {
      name: "Videos",
      icon: Video,
      key: "videos",
      route: "/videos",
    },
    {
      name: "Favourites",
      icon: Heart,
      key: "favourites",
      route: "/favourites",
    },
    {
      name: "Settings",
      icon: Settings,
      key: "settings",
      route: "/settings",
    }
  ];

  const handleNavigation = (item) => {
    setActive(item.key);
    navigate(item.route);
  };
  
  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile (md:flex) */}
      <div className={`hidden md:flex w-72 rounded-2xl sm:rounded-3xl shadow-xl border-2 overflow-hidden h-screen flex-col transition-all duration-500 ${
        isDarkMode 
          ? 'bg-slate-800 border-purple-500/30' 
          : 'bg-white border-orange-200'
      }`}>
        {/* Logo Section - Modern Glassmorphism */}
        <div className={`m-4 p-6 flex flex-col items-center space-y-3 border-2 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
          isDarkMode
            ? 'border-purple-500/40 bg-gradient-to-br from-slate-700 to-slate-800'
            : 'border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50'
        }`}>
          <div className="relative">
            {/* Animated glow effect */}
            <div className={`absolute inset-0 rounded-full blur-lg opacity-40 animate-pulse ${
              isDarkMode
                ? 'bg-gradient-to-br from-purple-500 to-pink-500'
                : 'bg-gradient-to-br from-orange-400 to-yellow-400'
            }`}></div>
            
            <div className={`relative w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg transform hover:scale-110 transition-transform duration-300 ${
              isDarkMode
                ? 'bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600'
                : 'bg-gradient-to-br from-orange-500 via-orange-600 to-yellow-500'
            }`}>
              ॐ
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Sparkles className={`w-5 h-5 ${isDarkMode ? 'text-purple-400' : 'text-orange-500'}`} />
            <span className={`text-2xl font-bold ${
              isDarkMode
                ? 'bg-gradient-to-r from-purple-400 via-purple-300 to-pink-400 bg-clip-text text-transparent'
                : 'bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent'
            }`}>
              Namah
            </span>
            <Sparkles className={`w-5 h-5 ${isDarkMode ? 'text-pink-400' : 'text-yellow-500'}`} />
          </div>
          
          <p className={`text-xs font-semibold ${isDarkMode ? 'text-purple-300' : 'text-orange-600'}`}>
            🙏 आपका आध्यात्मिक साथी
          </p>
        </div>
        
        {/* Navigation Menu */}
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = active === item.key;
              
              return (
                <li
                  key={item.key}
                  onClick={() => handleNavigation(item)}
                  className={`group relative flex items-center space-x-3 p-4 rounded-xl cursor-pointer transition-all duration-300 ease-out ${
                    isActive
                      ? isDarkMode
                        ? "bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white shadow-lg scale-105"
                        : "bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 text-white shadow-lg scale-105"
                      : isDarkMode
                      ? "hover:bg-slate-700 hover:scale-102 text-gray-300"
                      : "hover:bg-orange-50 hover:scale-102 text-gray-700"
                  }`}
                >
                  {/* Active indicator bar */}
                  {isActive && (
                    <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full ${
                      isDarkMode ? 'bg-pink-400' : 'bg-yellow-300'
                    }`}></div>
                  )}
                  
                  {/* Icon with background */}
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? "bg-white/20" 
                      : isDarkMode
                      ? "bg-slate-600 group-hover:bg-slate-500"
                      : "bg-orange-100 group-hover:bg-orange-200"
                  }`}>
                    <IconComponent className={`w-5 h-5 ${
                      isActive 
                        ? "text-white" 
                        : isDarkMode
                        ? "text-white"
                        : "text-orange-600"
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <span className={`font-semibold text-base ${
                      isActive 
                        ? "text-white" 
                        : isDarkMode
                        ? "text-gray-200 group-hover:text-purple-300"
                        : "text-gray-800 group-hover:text-orange-600"
                    }`}>
                      {item.name}
                    </span>
                  </div>
                  
                  {/* Emoji indicator on hover */}
                  {!isActive && (
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg">
                      {item.emoji}
                    </span>
                  )}
                  
                  {/* Active checkmark */}
                  {isActive && (
                    <div className="flex items-center justify-center w-6 h-6 bg-white/20 rounded-full">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer - Modern Design */}
        <div className={`p-4 m-4 text-center rounded-2xl shadow-md border transition-all duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-r from-slate-700 to-slate-800 border-purple-500/30'
            : 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200'
        }`}>
          <div className="flex items-center justify-center gap-2 mb-1">
            <Heart className={`w-4 h-4 fill-current ${isDarkMode ? 'text-purple-400' : 'text-orange-500'}`} />
            <p className={`text-sm font-semibold ${isDarkMode ? 'text-purple-300' : 'text-orange-600'}`}>
              Made with devotion
            </p>
          </div>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            © 2025 Namah
          </p>
        </div>
      </div>

      {/* Mobile Bottom Navigation - Visible only on mobile (md:hidden) */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 backdrop-blur-lg border-t-2 shadow-2xl z-50 transition-all duration-500 ${
        isDarkMode
          ? 'bg-slate-800/95 border-purple-500/30'
          : 'bg-white/95 border-orange-200'
      }`}>
        <nav className="px-2 py-2 safe-area-inset-bottom">
          <ul className="flex justify-around items-center">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = active === item.key;
              
              return (
                <li
                  key={item.key}
                  onClick={() => handleNavigation(item)}
                  className="flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ease-out min-w-[70px]"
                >
                  {/* Icon Container with Animation */}
                  <div className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? isDarkMode
                        ? "bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 shadow-lg scale-110 -translate-y-1"
                        : "bg-gradient-to-r from-orange-500 via-orange-600 to-yellow-500 shadow-lg scale-110 -translate-y-1"
                      : "bg-transparent"
                  }`}>
                    {/* Glow effect for active state */}
                    {isActive && (
                      <div className={`absolute inset-0 rounded-2xl blur-md opacity-50 animate-pulse ${
                        isDarkMode
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                          : 'bg-gradient-to-r from-orange-400 to-yellow-400'
                      }`}></div>
                    )}
                    
                    <IconComponent className={`relative w-6 h-6 transition-all duration-300 ${
                      isActive 
                        ? "text-white" 
                        : isDarkMode
                        ? "text-white"
                        : "text-gray-500"
                    }`} />
                    
                    {/* Active dot indicator */}
                    {isActive && (
                      <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 shadow-lg animate-pulse ${
                        isDarkMode
                          ? 'bg-pink-400 border-slate-800'
                          : 'bg-yellow-300 border-white'
                      }`}></div>
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={`text-xs mt-1.5 font-semibold transition-all duration-300 ${
                    isActive 
                      ? isDarkMode
                        ? "text-purple-300 scale-105"
                        : "text-orange-600 scale-105"
                      : isDarkMode
                      ? "text-white"
                      : "text-gray-500"
                  }`}>
                    {item.name}
                  </span>
                  
                  {/* Active indicator line */}
                  {isActive && (
                    <div className={`mt-1 w-8 h-0.5 rounded-full ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                        : 'bg-gradient-to-r from-orange-500 to-yellow-500'
                    }`}></div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;