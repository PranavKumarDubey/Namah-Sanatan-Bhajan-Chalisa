import Display from "../components/Display";
import SquareCardsContent from '../pages/SquareCardsPage/SquareCardsContent';
import BhajanVideosPage from '../pages/BhajanVideosPage/BhajanVideosPage';
import Favourites from '../pages/FavouritesPage';
import Settings from '../pages/SettingsPage';
import PrayerDetailPage from "../pages/PrayerDetailPage";
import CircularCardsPage from '../pages/CircularCardsPage/CircularCardsPage'; // ✅ ADD THIS LINE

export const routes = [
  {
    path: "/",
    component: Display,
    label: "Home"
  },
  {
    path: '/deity/:deityName',
    component: CircularCardsPage  // ✅ NOW IT WILL WORK
  },
  {
    path: "/category/:categoryName",
    component: SquareCardsContent,
    label: "Category"
  },
  {
    path: "/videos",
    component: BhajanVideosPage,
    label: "Videos"
  },
  {
    path: "/favourites",
    component: Favourites,
    label: "Favourites"
  },
  {
    path: "/settings",
    component: Settings,
    label: "Settings"
  },
  {
    path: '/prayer/:prayerId/:category',    
    component: PrayerDetailPage
  }
];