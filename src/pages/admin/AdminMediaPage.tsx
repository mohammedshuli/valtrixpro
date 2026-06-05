import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../lib/constants';

export default function AdminMediaPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <div className="section-container py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-8"
        >
          <h1 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-3">Media</h1>
          <p className="text-gray-600 mb-6">
            Upload new images, manage gallery assets, and update site visuals for the homepage and galleries.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => navigate(ROUTES.ADMIN)}
              className="btn btn-secondary"
            >
              Back to dashboard
            </button>
            <button type="button" className="btn btn-primary">
              Update media library
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
