import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function PublicLayout() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#FFF8E7]">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
