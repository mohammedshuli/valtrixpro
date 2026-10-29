import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { fetchAllInquiries, updateInquiryStatus } from '../../services/supabaseService';
import { INQUIRY_STATUS_LABELS, ROUTES } from '../../lib/constants';
import type { InquiryStatus } from '../../types';
import { Link } from 'react-router-dom';
import type { InquiryTable } from '../../services/supabaseService';

type InquiryCategory = 'catering' | 'corporate' | 'meals' | 'consultations' | 'courses' | 'contact';
type InquiryFilter = 'all' | InquiryCategory;
type InquiryRecord = Record<string, unknown> & { id: string; status: InquiryStatus };
type InquiryPageData = Awaited<ReturnType<typeof fetchAllInquiries>>;

const categoryConfig: Record<InquiryCategory, { label: string; table: InquiryTable }> = {
  catering: { label: 'Catering', table: 'bookings' },
  corporate: { label: 'Corporate', table: 'corporate_events' },
  meals: { label: 'Meal prep', table: 'meal_inquiries' },
  consultations: { label: 'Consultations', table: 'consultations' },
  courses: { label: 'Masterclasses', table: 'course_registrations' },
  contact: { label: 'Contact', table: 'contact_messages' },
};

const categoryOrder = Object.keys(categoryConfig) as InquiryCategory[];
const statuses = Object.keys(INQUIRY_STATUS_LABELS) as InquiryStatus[];

function getRecordLabel(category: InquiryCategory, inquiry: InquiryRecord): string {
  const label = category === 'corporate'
    ? inquiry.company_name
    : category === 'contact'
      ? inquiry.subject || inquiry.name
      : inquiry.name;
  return typeof label === 'string' && label ? label : categoryConfig[category].label;
}

function getTimestamp(inquiry: InquiryRecord): number {
  if (typeof inquiry.created_at !== 'string') return 0;
  const timestamp = new Date(inquiry.created_at).valueOf();
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

export default function AdminInquiriesPage() {
  const [filter, setFilter] = useState<InquiryFilter>('all');
  const [page, setPage] = useState(1);
  const [inquiries, setInquiries] = useState<InquiryPageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  const loadInquiries = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      setInquiries(await fetchAllInquiries(page, 20));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to load inquiries.');
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void loadInquiries(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadInquiries]);

  const visibleInquiries = useMemo(() => {
    if (!inquiries) return [];
    const categories = filter === 'all' ? categoryOrder : [filter];
    return categories.flatMap((category) =>
      inquiries[category].data.map((item) => ({
        category,
        item: item as InquiryRecord,
      }))
    ).sort((a, b) => getTimestamp(b.item) - getTimestamp(a.item));
  }, [filter, inquiries]);

  const maxPage = useMemo(() => {
    if (!inquiries) return 1;
    const categories = filter === 'all' ? categoryOrder : [filter];
    return Math.max(1, ...categories.map((category) => inquiries[category].totalPages));
  }, [filter, inquiries]);

  const handleStatusChange = async (category: InquiryCategory, inquiry: InquiryRecord, status: InquiryStatus) => {
    setUpdatingId(`${category}-${inquiry.id}`);
    setUpdateError(null);
    try {
      await updateInquiryStatus(categoryConfig[category].table, inquiry.id, status);
      await loadInquiries();
    } catch (error) {
      setUpdateError(error instanceof Error ? error.message : 'Unable to update inquiry status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const changeFilter = (nextFilter: InquiryFilter) => {
    setFilter(nextFilter);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <div className="section-container py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-6 md:p-8"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-3">Inquiries</h1>
              <p className="text-gray-600">
                Review incoming requests, contact guests, and track each inquiry through its status.
              </p>
            </div>
            <Link to={ROUTES.ADMIN} className="btn btn-secondary shrink-0">Back to dashboard</Link>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <label className="block text-sm font-semibold text-[#7A4A00]">
              Inquiry type
              <select
                value={filter}
                onChange={(event) => changeFilter(event.target.value as InquiryFilter)}
                className="select-base mt-2 min-w-56"
              >
                <option value="all">All categories</option>
                {categoryOrder.map((category) => (
                  <option key={category} value={category}>{categoryConfig[category].label}</option>
                ))}
              </select>
            </label>
            <button type="button" onClick={() => void loadInquiries()} disabled={isLoading} className="btn btn-outline">
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {updateError && <p role="alert" className="mt-5 rounded bg-red-100 p-4 text-red-800">{updateError}</p>}

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[850px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#E6A520] text-[#7A4A00]">
                  <th scope="col" className="py-3 pr-4">Category</th>
                  <th scope="col" className="py-3 pr-4">Guest / company</th>
                  <th scope="col" className="py-3 pr-4">Email</th>
                  <th scope="col" className="py-3 pr-4">Received</th>
                  <th scope="col" className="py-3 pr-4">Status</th>
                  <th scope="col" className="py-3 pr-4">Details</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr><td colSpan={6} className="py-8 text-center text-gray-600">Loading inquiries...</td></tr>
                ) : errorMessage ? (
                  <tr><td colSpan={6} role="alert" className="py-8 text-center text-red-700">{errorMessage}</td></tr>
                ) : visibleInquiries.length === 0 ? (
                  <tr><td colSpan={6} className="py-8 text-center text-gray-600">No inquiries found in this category.</td></tr>
                ) : visibleInquiries.map(({ category, item }) => {
                  const recordKey = `${category}-${item.id}`;
                  const received = getTimestamp(item);
                  const email = typeof item.email === 'string' ? item.email : '—';
                  const detailFields = Object.entries(item).filter(([field, value]) =>
                    !['id', 'status', 'created_at', 'updated_at'].includes(field) && value !== null && value !== ''
                  );
                  return (
                    <Fragment key={recordKey}>
                      <tr className="border-b border-gray-100 align-middle">
                        <td className="py-4 pr-4 font-medium text-[#7A4A00]">{categoryConfig[category].label}</td>
                        <td className="py-4 pr-4">{getRecordLabel(category, item)}</td>
                        <td className="py-4 pr-4">
                          {email === '—' ? email : <a className="text-blue-700 underline" href={`mailto:${email}`}>{email}</a>}
                        </td>
                        <td className="py-4 pr-4">{received ? new Date(received).toLocaleString() : 'Unknown'}</td>
                        <td className="py-4 pr-4">
                          <label className="sr-only" htmlFor={`status-${recordKey}`}>Status for {getRecordLabel(category, item)}</label>
                          <select
                            id={`status-${recordKey}`}
                            value={item.status}
                            disabled={updatingId === recordKey}
                            onChange={(event) => void handleStatusChange(category, item, event.target.value as InquiryStatus)}
                            className="select-base min-w-36 py-2 disabled:opacity-60"
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>{INQUIRY_STATUS_LABELS[status]}</option>
                            ))}
                          </select>
                        </td>
                        <td className="py-4 pr-4">
                          <details>
                            <summary className="cursor-pointer font-semibold text-[#7A4A00]">View details</summary>
                            <dl className="mt-2 max-h-80 min-w-64 overflow-auto rounded-lg border bg-white p-4 shadow-xl">
                              {detailFields.map(([field, value]) => (
                                <div key={field} className="mb-3 last:mb-0">
                                  <dt className="font-semibold capitalize text-[#7A4A00]">{field.replaceAll('_', ' ')}</dt>
                                  <dd className="break-words text-gray-700">{String(value)}</dd>
                                </div>
                              ))}
                            </dl>
                          </details>
                        </td>
                      </tr>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <p className="text-sm text-gray-600">Page {page} of {maxPage}</p>
            <div className="flex gap-3">
              <button type="button" className="btn btn-secondary" disabled={page <= 1 || isLoading} onClick={() => setPage((current) => current - 1)}>
                Previous
              </button>
              <button type="button" className="btn btn-secondary" disabled={page >= maxPage || isLoading} onClick={() => setPage((current) => current + 1)}>
                Next
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
