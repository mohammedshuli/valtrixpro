import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ROUTES } from '../lib/constants';
import logo from '../assets/logo3.png';

const serviceLinks = [
  { label: 'Private Chef', path: ROUTES.PRIVATE_CHEF, icon: '👨‍🍳' },
  { label: 'Premium Catering', path: ROUTES.CATERING, icon: '🍽️' },
  { label: 'Corporate Events', path: ROUTES.CORPORATE_EVENTS, icon: '🏢' },
  { label: 'Valtrix Fresh', path: ROUTES.MEAL_PREP, icon: '🥗' },
  { label: 'Culinary Experiences', path: ROUTES.CULINARY_EXPERIENCES, icon: '🎓' },
  { label: 'Chef Consultation', path: ROUTES.CHEF_CONSULTATION, icon: '🗓️' },
  { label: 'Partnerships', path: ROUTES.CATERING_PARTNERSHIPS, icon: '🤝' },
];

const mainNav = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'About', path: ROUTES.ABOUT },
  { label: 'Gallery', path: ROUTES.GALLERY },
  { label: 'Contact', path: ROUTES.CONTACT },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileServicesOpen(false);
  }, [location.pathname]);

  const isServiceActive = serviceLinks.some((s) => location.pathname === s.path);

  return (
    <header className="bg-[#FFF8E7] shadow-lg sticky top-0 z-50 border-b border-[#E6A520]/20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 lg:py-5 flex justify-between items-center min-h-[80px]">
        <Link to={ROUTES.HOME} className="flex items-center flex-shrink-0">
          <img
            src={logo}
            alt="Valtrix Pro Chef"
            className="h-[45px] sm:h-[50px] md:h-[60px] lg:h-[70px] w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <Link
            to={ROUTES.HOME}
            className={`font-inter font-medium text-sm lg:text-base transition-all duration-300 relative group
              ${location.pathname === ROUTES.HOME ? 'text-[#E6A520]' : 'text-gray-800 hover:text-[#E6A520]'}`}
          >
            Home
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#E6A520] transition-all duration-300
              ${location.pathname === ROUTES.HOME ? 'w-full' : 'w-0 group-hover:w-full'}`} />
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className={`flex items-center gap-1 font-inter font-medium text-sm lg:text-base transition-all duration-300 relative group
                ${isServiceActive ? 'text-[#E6A520]' : 'text-gray-800 hover:text-[#E6A520]'}`}
            >
              Services
              <motion.svg
                animate={{ rotate: isServicesOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#E6A520] transition-all duration-300
                ${isServiceActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
            </button>

            <AnimatePresence>
              {isServicesOpen && (
                <motion.div
                  key="services-dropdown"
                  initial={{ opacity: 0, y: 10, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-[#E6A520]/10 overflow-hidden z-50"
                >
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-xs font-semibold text-[#7A4A00] uppercase tracking-widest">Our Services</p>
                    </div>
                    {serviceLinks.map((service) => {
                      const isActive = location.pathname === service.path;
                      return (
                        <Link
                          key={service.path}
                          to={service.path}
                          onClick={() => setIsServicesOpen(false)}
                          className={`flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200
                            ${isActive
                              ? 'bg-[#FFF8E7] text-[#E6A520] font-semibold'
                              : 'text-gray-700 hover:bg-[#FFF8E7] hover:text-[#E6A520]'}`}
                        >
                          <span className="text-base">{service.icon}</span>
                          <span>{service.label}</span>
                          {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#E6A520]" />}
                        </Link>
                      );
                    })}
                    <div className="px-4 pt-2 pb-3 border-t border-gray-100 mt-1">
                      <Link
                        to={ROUTES.SERVICES}
                        onClick={() => setIsServicesOpen(false)}
                        className="block text-center text-xs font-semibold text-[#E6A520] hover:text-[#C68A1A] transition-colors"
                      >
                        View All Services →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {mainNav.slice(1).map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`font-inter font-medium text-sm lg:text-base transition-all duration-300 relative group
                  ${isActive ? 'text-[#E6A520]' : 'text-gray-800 hover:text-[#E6A520]'}`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#E6A520] transition-all duration-300
                  ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block flex-shrink-0">
          <Link
            to={ROUTES.CONTACT}
            className="btn-primary px-6 py-3 text-sm lg:text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
          >
            Get In Touch
          </Link>
        </div>

        <button
          className="md:hidden text-[#7A4A00] p-2 hover:bg-[#E6A520]/10 rounded-lg transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-[#E6A520]/20 shadow-lg overflow-hidden"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              <Link
                to={ROUTES.HOME}
                className={`flex items-center font-medium text-base py-3 px-4 rounded-lg transition-all duration-300
                  ${location.pathname === ROUTES.HOME
                    ? 'text-[#E6A520] bg-[#E6A520]/10 font-semibold'
                    : 'text-gray-800 hover:text-[#E6A520] hover:bg-[#E6A520]/5'}`}
              >
                Home
              </Link>

              <div>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className={`w-full flex items-center justify-between font-medium text-base py-3 px-4 rounded-lg transition-all duration-300
                    ${isServiceActive
                      ? 'text-[#E6A520] bg-[#E6A520]/10 font-semibold'
                      : 'text-gray-800 hover:text-[#E6A520] hover:bg-[#E6A520]/5'}`}
                >
                  Services
                  <motion.svg
                    animate={{ rotate: isMobileServicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <AnimatePresence>
                  {isMobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden ml-4 border-l-2 border-[#E6A520]/30"
                    >
                      {serviceLinks.map((service) => (
                        <Link
                          key={service.path}
                          to={service.path}
                          className={`flex items-center gap-3 py-2.5 px-4 text-sm transition-all
                            ${location.pathname === service.path
                              ? 'text-[#E6A520] font-semibold'
                              : 'text-gray-600 hover:text-[#E6A520]'}`}
                        >
                          <span>{service.icon}</span>
                          <span>{service.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {mainNav.slice(1).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center font-medium text-base py-3 px-4 rounded-lg transition-all duration-300
                    ${location.pathname === item.path
                      ? 'text-[#E6A520] bg-[#E6A520]/10 font-semibold'
                      : 'text-gray-800 hover:text-[#E6A520] hover:bg-[#E6A520]/5'}`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-3 pt-3 border-t border-gray-100">
                <Link
                  to={ROUTES.CONTACT}
                  className="btn-primary w-full text-center py-3 text-base font-semibold"
                >
                  Get In Touch
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
