import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { fetchAllInquiries } from '../../services/supabaseService';
import { ROUTES } from '../../lib/constants';
import type { InquiryStatus } from '../../types';

type PaginatedInquiryResult<T> = {
  data: T[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
};

type InquiryCategoryKey = 'catering' | 'corporate' | 'meals' | 'consultations' | 'courses' | 'contact';

type InquiryResults = Record<InquiryCategoryKey, PaginatedInquiryResult<unknown>>;

type DashboardInquiry = {
  id: string;
  category: InquiryCategoryKey;
  label: string;
  email: string;
  date: string;
  status: InquiryStatus;
};

const categoryConfig: Record<InquiryCategoryKey, { label: string; icon: string; accent: string }> = {
  catering: { label: 'Catering', icon: '🍽️', accent: 'from-[#FFD77A] to-[#E6A520]' },
  corporate: { label: 'Corporate', icon: '🏢', accent: 'from-[#E6A520] to-[#C68A1A]' },
  meals: { label: 'Meal Prep', icon: '🥗', accent: 'from-[#7A4A00] to-[#5A3A00]' },
  consultations: { label: 'Consultations', icon: '🗓️', accent: 'from-[#C68A1A] to-[#A36010]' },
  courses: { label: 'Masterclasses', icon: '🎓', accent: 'from-[#8B5A2B] to-[#6B4A1B]' },
  contact: { label: 'Contact', icon: '✉️', accent: 'from-[#7A4A00] to-[#9A6C28]' },
};

const statusClasses: Record<InquiryStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  contacted: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
};

const normalizeInquiry = (category: InquiryCategoryKey, item: Record<string, unknown>): DashboardInquiry => {
  const baseDate = typeof item.created_at === 'string' ? item.created_at : '';
  const date = baseDate ? new Date(baseDate).toLocaleDateString() : 'Unknown';
  const status = (item.status as InquiryStatus) || 'pending';

  const common = {
    id: `${category}-${item.id ?? Math.random().toString(36).slice(2)}`,
    category,
    email: (item.email as string) || '—',
    date,
    status,
  };

  switch (category) {
    case 'catering':
      return {
        ...common,
        label: (item.name as string) || 'Catering inquiry',
      };
    case 'corporate':
      return {
        ...common,
        label: (item.company_name as string) || 'Corporate inquiry',
      };
    case 'meals':
      return {
        ...common,
        label: (item.name as string) || 'Meal prep inquiry',
      };
    case 'consultations':
      return {
        ...common,
        label: (item.name as string) || 'Consultation inquiry',
      };
    case 'courses':
      return {
        ...common,
        label: (item.name as string) || 'Course registration',
      };
    case 'contact':
      return {
        ...common,
        label: (item.subject as string) || (item.name as string) || 'Contact message',
      };
    default:
      return {
        ...common,
        label: 'Inquiry',
      };
  }
};

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<InquiryResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadInquiries = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await fetchAllInquiries();
        setInquiries(data);
      } catch (error) {
        console.error('Error loading inquiries:', error);
        setErrorMessage('Unable to load inquiries. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    loadInquiries();
  }, []);

  const totals = useMemo(() => {
    const byCategory = Object.fromEntries(
      (Object.keys(categoryConfig) as InquiryCategoryKey[]).map((category) => [
        category,
        inquiries?.[category]?.totalCount ?? 0,
      ])
    ) as Record<InquiryCategoryKey, number>;

    const total = Object.values(byCategory).reduce((sum, value) => sum + value, 0);
    const pending = Object.values(inquiries ?? {}).reduce((sum, result) => {
      const items = result?.data ?? [];
      return sum + items.filter((item) => (item as { status?: string }).status === 'pending').length;
    }, 0);

    return { byCategory, total, pending };
  }, [inquiries]);

  const latestInquiries = useMemo(() => {
    if (!inquiries) return [];

    return (Object.entries(inquiries) as [InquiryCategoryKey, PaginatedInquiryResult<unknown>][]) 
      .flatMap(([category, result]) =>
        (result.data as Record<string, unknown>[]).map((item) => normalizeInquiry(category, item))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 6);
  }, [inquiries]);

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <div className="section-container py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-2">Admin Dashboard</h1>
          <p className="text-gray-700 max-w-2xl">
            A concise overview of all incoming requests, pending activity, and quick access to the admin tools.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3 mb-8">
          <div className="card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[#7A4A00]">Total Inquiries</p>
            <p className="mt-4 text-5xl font-bold text-[#E6A520]">{totals.total}</p>
            <p className="mt-2 text-sm text-gray-600">Total inbound requests across all admin categories.</p>
          </div>

          <div className="card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[#7A4A00]">Pending</p>
            <p className="mt-4 text-5xl font-bold text-[#7A4A00]">{totals.pending}</p>
            <p className="mt-2 text-sm text-gray-600">Requests still waiting for response or follow-up.</p>
          </div>

          <div className="card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-[#7A4A00]">Quick Actions</p>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>Use the sidebar to manage inquiries, content, media, and analytics.</p>
              <p className="font-medium text-[#7A4A00]">Last updated: {isLoading ? 'Loading...' : 'Current data'}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-4 mb-10">
          {(Object.keys(categoryConfig) as InquiryCategoryKey[]).map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={`rounded-3xl p-6 text-white bg-gradient-to-br ${categoryConfig[category].accent}`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em]">
                    {categoryConfig[category].label}
                  </p>
                  <p className="mt-4 text-4xl font-bold">{totals.byCategory[category]}</p>
                </div>
                <span className="text-4xl">{categoryConfig[category].icon}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <section className="card p-8 lg:col-span-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-playfair font-bold text-[#7A4A00]">Latest Inquiries</h2>
                <p className="text-gray-600">Review the most recent guest requests at a glance.</p>
              </div>
              <button
                type="button"
                onClick={() => navigate(ROUTES.ADMIN_INQUIRIES)}
                className="btn btn-outline"
              >
                View all inquiries
              </button>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#E6A520]">
                    <th className="text-left py-3">Category</th>
                    <th className="text-left py-3">Name</th>
                    <th className="text-left py-3">Email</th>
                    <th className="text-left py-3">Received</th>
                    <th className="text-left py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-600">Loading latest inquiries...</td>
                    </tr>
                  ) : errorMessage ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-red-600">{errorMessage}</td>
                    </tr>
                  ) : latestInquiries.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-6 text-center text-gray-600">No inquiries available yet.</td>
                    </tr>
                  ) : (
                    latestInquiries.map((item) => (
                      <tr key={item.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 text-sm font-medium text-[#7A4A00]">{categoryConfig[item.category as InquiryCategoryKey].label}</td>
                        <td className="py-3">{item.label}</td>
                        <td className="py-3">{item.email}</td>
                        <td className="py-3">{item.date}</td>
                        <td className="py-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[item.status as InquiryStatus]}`}>{item.status}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-playfair font-bold text-[#7A4A00] mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => navigate(ROUTES.ADMIN_INQUIRIES)}
                className="btn btn-primary w-full"
              >
                Manage inquiries
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.ADMIN_CONTENT)}
                className="btn btn-secondary w-full"
              >
                Edit content
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.ADMIN_MEDIA)}
                className="btn btn-secondary w-full"
              >
                Update media
              </button>
              <button
                type="button"
                onClick={() => navigate(ROUTES.ADMIN_ANALYTICS)}
                className="btn btn-secondary w-full"
              >
                View analytics
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
