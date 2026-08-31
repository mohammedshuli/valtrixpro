import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import AdminSidebar from '../components/admin/AdminSidebar';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  const verifyAdminAccess = async (session: { user: { email?: string | null } } | null) => {
    if (!session?.user?.email) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('admins')
        .select('id')
        .ilike('email', session.user.email)
        .maybeSingle();

      if (error || !data) {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true);
    } catch {
      await supabase.auth.signOut();
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      await verifyAdminAccess(session);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await verifyAdminAccess(session);
    });

    return () => subscription?.unsubscribe();
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#7A4A00] text-2xl font-playfair">Loading...</div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-[#FFF8E7] flex">
        <AdminSidebar />
        <main className="flex-grow">
          <Outlet />
        </main>
      </div>
    </ErrorBoundary>
  );
}
