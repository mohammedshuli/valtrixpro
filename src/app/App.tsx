import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import PublicLayout from '../layouts/PublicLayout';
import AdminLayout from '../layouts/AdminLayout';
import NotFoundPage from '../pages/NotFoundPage';
import '../index.css';

const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ServicesPage = lazy(() => import('../pages/ServicesPage'));
const PackagesMenuPage = lazy(() => import('../pages/PackagesMenuPage'));
const CateringPage = lazy(() => import('../pages/CateringPage'));
const CateringPartnershipsPage = lazy(() => import('../pages/CateringPartnershipsPage'));
const CorporateEventsPage = lazy(() => import('../pages/CorporateEventsPage'));
const ValtrixFreshPage = lazy(() => import('../pages/ValtrixFreshPage'));
const CulinaryExperiencesPage = lazy(() => import('../pages/CulinaryExperiencesPage'));
const PrivateChefPage = lazy(() => import('../pages/PrivateChefPage'));
const ChefConsultationPage = lazy(() => import('../pages/ChefConsultationPage'));
const ValtrixStudioPage = lazy(() => import('../pages/ValtrixStudioPage'));
const EquipmentRentalPage = lazy(() => import('../pages/EquipmentRentalPage'));
const GalleryPage = lazy(() => import('../pages/GalleryPage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const FoodDetailPage = lazy(() => import('../pages/menu/FoodDetailPage'));
const PackageDetailPage = lazy(() => import('../pages/packages/PackageDetailPage'));
const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'));
const AdminDashboard = lazy(() => import('../pages/admin/AdminDashboard'));
const AdminInquiriesPage = lazy(() => import('../pages/admin/AdminInquiriesPage'));
const AdminContentPage = lazy(() => import('../pages/admin/AdminContentPage'));
const AdminMediaPage = lazy(() => import('../pages/admin/AdminMediaPage'));
const AdminAnalyticsPage = lazy(() => import('../pages/admin/AdminAnalyticsPage'));

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
        <Suspense fallback={<div role="status" className="min-h-[40vh]" />}>
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
              <Route path="/catering-partnerships" element={<CateringPartnershipsPage />} />
              <Route path="/corporate-events" element={<CorporateEventsPage />} />
              <Route path="/valtrix-fresh" element={<ValtrixFreshPage />} />
              <Route path="/private-chef-experiences" element={<PrivateChefPage />} />
              <Route path="/culinary-experiences" element={<CulinaryExperiencesPage />} />
              <Route path="/chef-consultation" element={<ChefConsultationPage />} />
              <Route path="/valtrix-studio" element={<ValtrixStudioPage />} />
              <Route path="/equipment-rental" element={<EquipmentRentalPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="inquiries" element={<AdminInquiriesPage />} />
              <Route path="content" element={<AdminContentPage />} />
              <Route path="media" element={<AdminMediaPage />} />
              <Route path="analytics" element={<AdminAnalyticsPage />} />
            </Route>

            {/* Catch all */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
