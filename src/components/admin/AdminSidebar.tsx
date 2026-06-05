import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { ROUTES } from '../../lib/constants';

export default function AdminSidebar() {
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = ROUTES.ADMIN_LOGIN;
  };

  const menuItems = [
    { label: 'Dashboard', icon: '📊', href: ROUTES.ADMIN },
    { label: 'Inquiries', icon: '📧', href: ROUTES.ADMIN_INQUIRIES },
    { label: 'Content', icon: '📝', href: ROUTES.ADMIN_CONTENT },
    { label: 'Media', icon: '🖼️', href: ROUTES.ADMIN_MEDIA },
    { label: 'Analytics', icon: '📈', href: ROUTES.ADMIN_ANALYTICS },
  ];

  const isActive = (href: string) =>
    location.pathname === href || location.pathname.startsWith(`${href}/`);

  return (
    <aside className="w-64 bg-[#7A4A00] text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-[#E6A520]">
        <h1 className="text-2xl font-playfair font-bold">Valtrix Admin</h1>
      </div>

      <nav className="flex-grow p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              isActive(item.href)
                ? 'bg-[#E6A520] text-white'
                : 'text-[#FFD77A] hover:bg-[#6A3A00]'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-[#E6A520]">
        <button
          onClick={handleLogout}
          className="w-full btn-secondary text-[#7A4A00] hover:bg-[#FFD77A]"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
