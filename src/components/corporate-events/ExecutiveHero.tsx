import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/constants';
import executiveEvent from '../../assets/event.jpg';

export default function ExecutiveHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${executiveEvent})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/40" />

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute top-20 left-20 w-96 h-96 border border-[#FFD77A] rounded-full" />
        <div className="absolute bottom-32 right-32 w-64 h-64 border border-[#E6A520] rounded-full" />
      </div>

      <div className="relative section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <div className="mb-8">
            <span className="inline-block px-6 py-3 border border-[#FFD77A]/30 bg-[#FFD77A]/5 text-[#FFD77A] text-sm uppercase tracking-[0.2em] font-medium">
              Corporate Hospitality
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl xl:text-8xl font-playfair font-black text-white leading-[0.9] tracking-[-0.02em] mb-8">
            Elevated Corporate
            <br />
            <span className="text-[#FFD77A]">Hospitality</span>
            <br />
            Experiences
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mb-12 font-inter">
            Professional luxury dining and executive event catering for modern businesses.
            Seamless hospitality solutions that elevate corporate gatherings and impress stakeholders.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <Link
              to="#inquiry"
              className="inline-flex items-center justify-center px-10 py-5 bg-[#E6A520] text-white font-semibold text-lg rounded-none border border-[#E6A520] hover:bg-[#7A4A00] hover:border-[#7A4A00] transition-all duration-300 shadow-2xl shadow-[#E6A520]/20"
            >
              Request Corporate Service
            </Link>
            <a
              href="#experiences"
              className="inline-flex items-center justify-center px-10 py-5 border border-white/30 bg-white/5 text-white font-semibold text-lg rounded-none hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-sm"
            >
              Explore Event Types
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-px h-16 bg-gradient-to-b from-white/50 to-transparent" />
        <div className="w-2 h-2 bg-white/50 rounded-full mx-auto mt-2 animate-bounce" />
      </motion.div>
    </section>
  );
}