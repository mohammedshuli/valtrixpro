import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../lib/constants';
import logo from '../assets/logo3.png';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'Services', path: ROUTES.SERVICES },
    { label: 'Packages/Menu', path: ROUTES.PACKAGES_MENU },
    { label: 'About', path: ROUTES.ABOUT },
    { label: 'Gallery', path: ROUTES.GALLERY },
    { label: 'Contact', path: ROUTES.CONTACT },
  ];

  return (
    <header className="bg-[#FFF8E7] shadow-lg sticky top-0 z-50 border-b border-[#E6A520]/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 lg:py-8 flex justify-between items-center min-h-[80px] lg:min-h-[100px]">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center flex-shrink-0 bg-[#FFF8E7]">
          <img
            src={logo}
            alt="Valtrix Pro Chef"
            className="h-[45px] sm:h-[50px] md:h-[60px] lg:h-[75px] xl:h-[90px] w-auto object-contain bg-[#FFF8E7]"
            style={{ backgroundColor: '#FFF8E7' }}
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="text-gray-800 hover:text-[#E6A520] font-inter font-medium text-sm lg:text-base transition-all duration-300 hover:scale-105"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block flex-shrink-0">
          <Link to={ROUTES.CONTACT} className="btn-primary px-6 py-3 text-sm lg:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300">
            Get In Touch
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-[#7A4A00] p-2 hover:bg-[#E6A520]/10 rounded-lg transition-colors"
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
          className="md:hidden bg-white/95 backdrop-blur-sm border-t border-[#E6A520]/20 shadow-lg"
        >
          <nav className="flex flex-col gap-2 px-6 py-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-800 hover:text-[#E6A520] font-medium text-base py-3 px-4 rounded-lg hover:bg-[#E6A520]/5 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                to={ROUTES.CONTACT}
                className="btn-primary w-full text-center py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get In Touch
              </Link>
            </div>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
