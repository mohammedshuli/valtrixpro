import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../lib/constants';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Services', path: ROUTES.SERVICES },
    { label: 'About', path: ROUTES.ABOUT },
    { label: 'Gallery', path: ROUTES.GALLERY },
    { label: 'Contact', path: ROUTES.CONTACT },
  ];

  return (
    <header className="bg-[#FFF8E7] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <div className="text-[#7A4A00] font-playfair text-2xl font-bold">
            Valtrix Pro Chef
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex gap-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-gray-700 hover:text-[#E6A520] font-inter font-medium transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link to={ROUTES.CONTACT} className="btn-primary">
            Get In Touch
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#7A4A00]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-white border-t border-gray-200 py-4"
        >
          <nav className="flex flex-col gap-4 px-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-700 hover:text-[#E6A520] font-medium transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to={ROUTES.CONTACT}
              className="btn-primary inline-block text-center mt-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get In Touch
            </Link>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
