import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchAllInquiries } from '../../services/supabaseService';
import { UI_CONSTANTS } from '../../lib/constants';
import type { PaginatedInquiryResult } from '../../services/supabaseService';
import type { CateringBooking, CorporateEvent, MealInquiry, InquiryStatus } from '../../types';

type InquiryCategoryKey = 'catering' | 'corporate' | 'meals' | 'consultations' | 'courses' | 'contact';

type CategoryPageState = Record<InquiryCategoryKey, number>;

type InquiryResults = Record<InquiryCategoryKey, PaginatedInquiryResult<unknown>>;

const defaultPageState: CategoryPageState = {
  catering: 1,
  corporate: 1,
  meals: 1,
  consultations: 1,
  courses: 1,
  contact: 1,
};

const statusClasses: Record<InquiryStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  contacted: 'bg-blue-100 text-blue-800',
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-gray-100 text-gray-800',
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('inquiries');
  const [pages, setPages] = useState<CategoryPageState>(defaultPageState);
  const [inquiries, setInquiries] = useState<InquiryResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadInquiries = async () => {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const data = await fetchAllInquiries(pages, UI_CONSTANTS.ADMIN_PAGE_SIZE);
        setInquiries(data);
      } catch (error) {
        console.error('Error loading inquiries:', error);
        setErrorMessage('Unable to load inquiries. Please refresh the page.');
      } finally {
        setIsLoading(false);
      }
    };

    loadInquiries();
  }, [pages]);

  const totalInquiries = inquiries
    ? Object.values(inquiries).reduce((sum, result) => sum + result.totalCount, 0)
    : 0;

  const getPaginatedResults = <T extends object>(category: InquiryCategoryKey) =>
    inquiries?.[category] as PaginatedInquiryResult<T> | undefined;

  const changePage = (category: InquiryCategoryKey, nextPage: number) => {
    setPages((current) => ({ ...current, [category]: nextPage }));
  };

  const tabs = [
    { id: 'inquiries', label: '📧 Inquiries', count: totalInquiries },
    { id: 'content', label: '📝 Content' },
    { id: 'media', label: '🖼️ Media' },
    { id: 'analytics', label: '📈 Analytics' },
  ];

  return (
    <div className="p-8 bg-[#FFF8E7]">
      <div className="mb-8">
        <h1 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-700">Manage your Valtrix Pro Chef platform</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === tab.id
                ? 'bg-[#E6A520] text-white shadow-lg'
                : 'bg-white text-[#7A4A00] border-2 border-[#E6A520] hover:bg-[#FFF8E7]'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {tab.label}
            {tab.count && tab.count > 0 && <span className="ml-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{tab.count}</span>}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        {/* Inquiries Tab */}
        {activeTab === 'inquiries' && (
          <div>
            <h2 className="text-2xl font-playfair font-bold text-[#7A4A00] mb-6">
              All Inquiries
            </h2>

            {isLoading ? (
              <p className="text-gray-600">Loading inquiries...</p>
            ) : errorMessage ? (
              <p className="text-red-600">{errorMessage}</p>
            ) : !inquiries ? (
              <p className="text-gray-600">Error loading inquiries</p>
            ) : (
              <div className="space-y-8">
                {/* Catering */}
                <div>
                  {(() => {
                    const result = getPaginatedResults<CateringBooking>('catering');
                    const items = result?.data ?? [];

                    return (
                      <>
                        <h3 className="text-xl font-semibold text-[#E6A520] mb-4">
                          Catering Inquiries ({result?.totalCount ?? 0})
                        </h3>

                        {items.length > 0 ? (
                          <>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b-2 border-[#E6A520]">
                                    <th className="text-left py-3">Name</th>
                                    <th className="text-left py-3">Email</th>
                                    <th className="text-left py-3">Date</th>
                                    <th className="text-left py-3">Guests</th>
                                    <th className="text-left py-3">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {items.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50">
                                      <td className="py-3">{item.name}</td>
                                      <td className="py-3">{item.email}</td>
                                      <td className="py-3">{item.event_date}</td>
                                      <td className="py-3">{item.guest_count}</td>
                                      <td className="py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[item.status] ?? statusClasses.completed}`}>
                                          {item.status}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="mt-4 flex items-center justify-between gap-3 text-sm text-gray-700">
                              <button
                                type="button"
                                className="rounded-lg border border-[#E6A520] px-4 py-2 hover:bg-[#FFF8E7]"
                                onClick={() => changePage('catering', Math.max(1, pages.catering - 1))}
                                disabled={pages.catering <= 1}
                              >
                                Previous
                              </button>
                              <span>Page {pages.catering} of {Math.max(1, Math.ceil((result?.totalCount ?? 0) / UI_CONSTANTS.ADMIN_PAGE_SIZE))}</span>
                              <button
                                type="button"
                                className="rounded-lg border border-[#E6A520] px-4 py-2 hover:bg-[#FFF8E7]"
                                onClick={() => changePage('catering', pages.catering + 1)}
                                disabled={items.length < UI_CONSTANTS.ADMIN_PAGE_SIZE}
                              >
                                Next
                              </button>
                            </div>
                          </>
                        ) : (
                          <p className="text-gray-600">No catering inquiries yet</p>
                        )}
                      </>
                    );
                  })()}
                </div>

                {/* Corporate Events */}
                <div>
                  {(() => {
                    const result = getPaginatedResults<CorporateEvent>('corporate');
                    const items = result?.data ?? [];

                    return (
                      <>
                        <h3 className="text-xl font-semibold text-[#E6A520] mb-4">
                          Corporate Events ({result?.totalCount ?? 0})
                        </h3>

                        {items.length > 0 ? (
                          <>
                            <div className="overflow-x-auto">
                              <table className="w-full text-sm">
                                <thead>
                                  <tr className="border-b-2 border-[#E6A520]">
                                    <th className="text-left py-3">Company</th>
                                    <th className="text-left py-3">Contact</th>
                                    <th className="text-left py-3">Date</th>
                                    <th className="text-left py-3">Type</th>
                                    <th className="text-left py-3">Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {items.map((item) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50">
                                      <td className="py-3">{item.company_name}</td>
                                      <td className="py-3">{item.contact_name}</td>
                                      <td className="py-3">{item.event_date}</td>
                                      <td className="py-3">{item.event_type}</td>
                                      <td className="py-3">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses[item.status] ?? statusClasses.completed}`}>
                                          {item.status}
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="mt-4 flex items-center justify-between gap-3 text-sm text-gray-700">
                              <button
                                type="button"
                                className="rounded-lg border border-[#E6A520] px-4 py-2 hover:bg-[#FFF8E7]"
                                onClick={() => changePage('corporate', Math.max(1, pages.corporate - 1))}
                                disabled={pages.corporate <= 1}
                              >
                                Previous
                              </button>
                              <span>Page {pages.corporate} of {Math.max(1, Math.ceil((result?.totalCount ?? 0) / UI_CONSTANTS.ADMIN_PAGE_SIZE))}</span>
                              <button
                                type="button"
                                className="rounded-lg border border-[#E6A520] px-4 py-2 hover:bg-[#FFF8E7]"
                                onClick={() => changePage('corporate', pages.corporate + 1)}
                                disabled={items.length < UI_CONSTANTS.ADMIN_PAGE_SIZE}
                              >
                                Next
                              </button>
                            </div>
                          </>
                        ) : (
                          <p className="text-gray-600">No corporate events yet</p>
                        )}
                      </>
                    );
                  })()}
                </div>

                {/* Meal Inquiries */}
                <div>
                  {(() => {
                    const result = getPaginatedResults<MealInquiry>('meals');
                    const count = result?.totalCount ?? 0;

                    return (
                      <>
                        <h3 className="text-xl font-semibold text-[#E6A520] mb-4">Meal Prep Inquiries ({count})</h3>
                        {count > 0 ? (
                          <p className="text-gray-600">{count} meal prep inquiries</p>
                        ) : (
                          <p className="text-gray-600">No meal prep inquiries yet</p>
                        )}
                      </>
                    );
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div>
            <h2 className="text-2xl font-playfair font-bold text-[#7A4A00] mb-6">
              Content Management
            </h2>
            <p className="text-gray-600 mb-6">Edit homepage content, services, and testimonials</p>
            
            <div className="space-y-4">
              <div className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold text-[#7A4A00]">Homepage Hero Section</h3>
                <p className="text-sm text-gray-600">Edit title, subtitle, and call-to-action</p>
              </div>
              <div className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold text-[#7A4A00]">Services</h3>
                <p className="text-sm text-gray-600">Manage service descriptions and details</p>
              </div>
              <div className="border border-gray-300 rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                <h3 className="font-semibold text-[#7A4A00]">Testimonials</h3>
                <p className="text-sm text-gray-600">Add, edit, or remove client testimonials</p>
              </div>
            </div>
          </div>
        )}

        {/* Media Tab */}
        {activeTab === 'media' && (
          <div>
            <h2 className="text-2xl font-playfair font-bold text-[#7A4A00] mb-6">
              Media Management
            </h2>
            <p className="text-gray-600 mb-6">Upload and manage gallery images and banners</p>
            
            <div className="border-2 border-dashed border-[#E6A520] rounded-lg p-12 text-center hover:bg-gray-50 cursor-pointer">
              <p className="text-gray-600 mb-4">📁 Drag and drop images here to upload</p>
              <button className="btn-primary">Choose Files</button>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-2xl font-playfair font-bold text-[#7A4A00] mb-6">
              Analytics Overview
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gradient-to-br from-[#FFD77A] to-[#E6A520] rounded-lg p-6 text-white">
                <div className="text-3xl font-bold">{getPaginatedResults('catering')?.totalCount ?? 0}</div>
                <p className="text-sm opacity-90">Catering Inquiries</p>
              </div>
              <div className="bg-gradient-to-br from-[#E6A520] to-[#C68A1A] rounded-lg p-6 text-white">
                <div className="text-3xl font-bold">{getPaginatedResults('corporate')?.totalCount ?? 0}</div>
                <p className="text-sm opacity-90">Corporate Events</p>
              </div>
              <div className="bg-gradient-to-br from-[#7A4A00] to-[#5A3A00] rounded-lg p-6 text-white">
                <div className="text-3xl font-bold">{getPaginatedResults('meals')?.totalCount ?? 0}</div>
                <p className="text-sm opacity-90">Meal Inquiries</p>
              </div>
              <div className="bg-gradient-to-br from-[#8B5A2B] to-[#6B4A1B] rounded-lg p-6 text-white">
                <div className="text-3xl font-bold">{getPaginatedResults('contact')?.totalCount ?? 0}</div>
                <p className="text-sm opacity-90">Contact Messages</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600">Monthly trends and detailed analytics coming soon</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
