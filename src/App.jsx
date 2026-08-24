import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home/Home";
import Tips from "./pages/Farmer/Tips/Tips";
import Dealers from "./pages/Farmer/Dealers/Dealers";
import Contact from "./pages/Contact/Contact";
import Dashboard from "./pages/Farmer/Dashboard/Dashboard";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ProductFullDetails from "./pages/ProductFullDetails/ProductFullDetails";
import Login from "./authentication/login/Login";
import SignUp from "./authentication/sign_up/SignUp";
import Profile from "./pages/Profile/Profile";
import CropManagement from "./pages/Farmer/CropManagement/CropManagement";
import Marketplace from "./pages/MarketPlace/MarketPlace";
import CommunityForum from "./pages/Farmer/CommunityForum/CommunityForum";
import WeatherForeCast from "./pages/Farmer/WeatherForeCast/WeatherForeCast";
import IrrigationManagement from "./pages/Farmer/IrrigationManagement/IrrigationManagement";
import TankMotorControl from "./pages/Farmer/TankMotorControl/TankMotorControl";
import CropRotationPlanner from "./pages/Farmer/CropRotation/CropRotation";
import Sidebar from "./components/layout/Sidebar";
import FarmerLogin from "./pages/Farmer/AgriculturalJob/AgriculturalJob";
import './index.css'
import ProtectedRoute from "./utils/ProtectedRoute";
import Delivery from "./pages/Farmer/Delivery/Delivery";
import MarketPrice from "./pages/Farmer/MarketPrice/MarketPrice";
import FarmerProducts from "./pages/Farmer/FarmerProducts/FarmerProducts";
import FarmerOrders from "./pages/Farmer/FarmerOrders/FarmerOrders";
import FarmerWallet from "./pages/Farmer/FarmerWallet/FarmerWallet";
import FarmerAnalytics from "./pages/Farmer/FarmerAnalytics/FarmerAnalytics";
import FarmerDelivery from "./pages/Farmer/FarmerDelivery/FarmerDelivery";
import FarmerSubscription from "./pages/Farmer/FarmerSubscription/FarmerSubscription";
import CustomerHome from "./pages/Customer/CustomerHome/CustomerHome";
import Cart from "./pages/Customer/Cart/Cart";
import Checkout from "./pages/Customer/Checkout/Checkout";
import Orders from "./pages/Customer/Orders/Orders";
import LiveTracking from "./pages/Customer/LiveTracking/LiveTracking";
import Subscriptions from "./pages/Customer/Subscriptions/Subscriptions";
import DeliveryDashboard from "./pages/DeliveryPartner/DeliveryDashboard/DeliveryDashboard";
import DeliveryOrders from "./pages/DeliveryPartner/DeliveryOrders/DeliveryOrders";
import DeliveryTracking from "./pages/DeliveryPartner/DeliveryTracking/DeliveryTracking";
import DeliveryWallet from "./pages/DeliveryPartner/DeliveryWallet/DeliveryWallet";
import ApartmentDelivery from "./pages/CustomerDelivery/ApartmentDelivery/ApartmentDelivery";
import ColdStorageSearch from "./pages/DeliveryPartner/ColdStorageSearch/ColdStorageSearch";
import FarmerLiveShop from "./pages/Farmer/FarmerLiveShop/FarmerLiveShop";
import SubscriptionDelivery from "./pages/CustomerDelivery/SubscriptionDelivery/SubscriptionDelivery";
import DailyTips from "./pages/Farmer/AgriculturalTips/DailyTips/DailyTips";
import SeasonalTips from "./pages/Farmer/AgriculturalTips/SeasonalTips/SeasonalTips";
import VideoTips from "./pages/Farmer/AgriculturalTips/VideoTips/VideoTips";
import CropTips from "./pages/Farmer/AgriculturalTips/CropTips/CropTips";
import WeatherTips from "./pages/Farmer/AgriculturalTips/WeatherTips/WeatherTips";
import OrganicFarming from "./pages/Farmer/AgriculturalTips/OrganicFarming/OrganicFarming";
import GovernmentSchemes from "./pages/Farmer/AgriculturalTips/GovernmentSchemes/GovernmentSchemes";
import AIRecommendations from "./pages/Farmer/AgriculturalTips/AIRecommendations/AIRecommendations";
import ExpertAdvice from "./pages/Farmer/AgriculturalTips/ExpertAdvice/ExpertAdvice";
import PestControl from "./pages/Farmer/AgriculturalTips/PestControl/PestControl";
import AIAssistant from "./pages/AIAssistant/AIAssistant";
import FloatingAIAssistant from "./components/FloatingAIAssistant";

const HashScroller = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = document.querySelector(hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [hash, pathname]);

  return null;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const hideHeaderFooter = ["/", "/signup"].includes(location.pathname);
  const removeFooterGap = location.pathname === "/dashboard";

  return (
    <div className="min-h-screen bg-(--fe-bg) text-(--fe-text)">
      <div className="flex min-h-screen min-w-0 flex-col">
        {!hideHeaderFooter && <Header />}
        <main className="flex-1">
          {children}
        </main>
        {!hideHeaderFooter && (
          <div className="fixed inset-x-0 bottom-4 z-40 px-3 sm:px-5">
            <div className="mx-auto flex w-fit max-w-full items-end gap-3">
              <Sidebar />
            </div>
          </div>
        )}
        {!hideHeaderFooter && <FloatingAIAssistant />}
        {!hideHeaderFooter && <Footer />}
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <HashScroller />
      <Layout>
        <div className="flex min-w-0">
          <main className="min-w-0 flex-1">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/product/:id" element={<ProductFullDetails />} />
                <Route path="/tips" element={<Tips />} />
                <Route path="/agricultural-tips/daily" element={<DailyTips />} />
                <Route path="/agricultural-tips/seasonal" element={<SeasonalTips />} />
                <Route path="/agricultural-tips/video" element={<VideoTips />} />
                <Route path="/agricultural-tips/crop" element={<CropTips />} />
                <Route path="/agricultural-tips/weather" element={<WeatherTips />} />
                <Route path="/agricultural-tips/organic" element={<OrganicFarming />} />
                <Route path="/agricultural-tips/schemes" element={<GovernmentSchemes />} />
                <Route path="/agricultural-tips/ai" element={<AIRecommendations />} />
                <Route path="/agricultural-tips/expert" element={<ExpertAdvice />} />
                <Route path="/agricultural-tips/pest-control" element={<PestControl />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                <Route path="/dealers" element={<Dealers />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/cropManagement" element={<CropManagement />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/communityForum" element={<CommunityForum />} />
                <Route path="/weatherForeCast" element={<WeatherForeCast />} />
                <Route path="/irrigation" element={<IrrigationManagement />} />
                <Route path="/tankMotor" element={<TankMotorControl />} />
                <Route path="/delivery" element={<Delivery />} />
                <Route path="/marketprice" element={<MarketPrice />} />
                <Route path="/cropRotation" element={<CropRotationPlanner />} />
                <Route path="/agricultureJob" element={<FarmerLogin />} />
                <Route path="/farmer/products" element={<FarmerProducts />} />
                <Route path="/farmer/orders" element={<FarmerOrders />} />
                <Route path="/farmer/wallet" element={<FarmerWallet />} />
                <Route path="/farmer/analytics" element={<FarmerAnalytics />} />
                <Route path="/farmer/delivery" element={<FarmerDelivery />} />
                <Route path="/farmer/subscription" element={<FarmerSubscription />} />
                <Route path="/customer/home" element={<CustomerHome />} />
                <Route path="/customer/cart" element={<Cart />} />
                <Route path="/customer/checkout" element={<Checkout />} />
                <Route path="/customer/orders" element={<Orders />} />
                <Route path="/customer/live-tracking" element={<LiveTracking />} />
                <Route path="/customer/subscriptions" element={<Subscriptions />} />
                <Route path="/delivery-partner/dashboard" element={<DeliveryDashboard />} />
                <Route path="/delivery-partner/orders" element={<DeliveryOrders />} />
                <Route path="/delivery-partner/tracking" element={<DeliveryTracking />} />
                <Route path="/delivery-partner/wallet" element={<DeliveryWallet />} />
                <Route path="/apartment-delivery" element={<ApartmentDelivery />} />
                <Route path="/cold-storage-search" element={<ColdStorageSearch />} />
                <Route path="/farmer-live-shop" element={<FarmerLiveShop />} />
                <Route path="/subscription-delivery" element={<SubscriptionDelivery />} />
              </Route>
            </Routes>
          </main>
        </div>
      </Layout>
    </Router>
  );
}

export default App;
