import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../lib/constants';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        <p className="text-8xl font-playfair font-bold text-[#E6A520] mb-4">404</p>
        <h1 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          The page you are looking for does not exist. Let us take you back to the experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to={ROUTES.HOME} className="btn-primary px-8 py-3">
            Back to Home
          </Link>
          <Link to={ROUTES.CONTACT} className="btn-secondary px-8 py-3">
            Contact Us
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
