import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import HomePage from '../pages/HomePage';
import AboutPage from '../pages/AboutPage';
import ServicesPage from '../pages/ServicesPage';
import PackagesMenuPage from '../pages/PackagesMenuPage';
import CateringPage from '../pages/CateringPage';
import CorporateEventsPage from '../pages/CorporateEventsPage';
import MealPrepPage from '../pages/MealPrepPage';
import CulinaryExperiencesPage from '../pages/CulinaryExperiencesPage';
import PrivateChefPage from '../pages/PrivateChefPage';
import ChefConsultationPage from '../pages/ChefConsultationPage';
import GalleryPage from '../pages/GalleryPage';
import ContactPage from '../pages/ContactPage';
import FoodDetailPage from '../pages/menu/FoodDetailPage';
import PackageDetailPage from '../pages/packages/PackageDetailPage';
import AdminLoginPage from '../pages/admin/AdminLoginPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import '../index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10,   // 10 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/packages-menu" element={<PackagesMenuPage />} />
            <Route path="/menu/:foodId" element={<FoodDetailPage />} />
            <Route path="/packages/:packageId" element={<PackageDetailPage />} />
            <Route path="/catering" element={<CateringPage />} />
            <Route path="/corporate-events" element={<CorporateEventsPage />} />
            <Route path="/valtrix-fresh" element={<MealPrepPage />} />
            <Route path="/private-chef-experiences" element={<PrivateChefPage />} />
            <Route path="/culinary-experiences" element={<CulinaryExperiencesPage />} />
            <Route path="/chef-consultation" element={<ChefConsultationPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
