import { Outlet, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import AdminSidebar from '../components/admin/AdminSidebar';
import { ErrorBoundary } from '../components/ErrorBoundary';

export default function AdminLayout() {
  const [authState, setAuthState] = useState<'loading' | 'authorized' | 'denied' | 'error'>('loading');

  const verifyAdminAccess = async (session: { user: { email?: string | null } } | null) => {
    if (!session?.user?.email) {
      setAuthState('denied');
      return;
    }

    const { data, error } = await supabase
      .from('admins')
      .select('id')
      .ilike('email', session.user.email)
      .eq('role', 'admin')
      .maybeSingle();

    if (error) {
      setAuthState('error');
      return;
    }
    setAuthState(data ? 'authorized' : 'denied');
  };

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (!isMounted) return;
      if (error) {
        setAuthState('error');
        return;
      }
      await verifyAdminAccess(session);
    };

    void checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      window.setTimeout(() => {
        if (isMounted) void verifyAdminAccess(session);
      }, 0);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (authState === 'loading') {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <div className="text-center">
          <div className="text-[#7A4A00] text-2xl font-playfair">Loading...</div>
        </div>
      </div>
    );
  }

  if (authState === 'denied') {
    return <Navigate to="/admin/login" replace />;
  }

  if (authState === 'error') {
    return (
      <div role="alert" className="min-h-screen bg-[#FFF8E7] flex items-center justify-center p-6">
        <p className="max-w-xl text-center text-red-700">
          Admin access could not be verified. Check the Supabase connection and Row Level Security settings, then refresh.
        </p>
      </div>
    );
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
