import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/constants';
import freshHeroImage from '../../assets/menu.jpg';

export default function FreshHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-gradient-to-br from-[#FFF8E7] via-[#F0F8E7] to-[#FFF8E7]">
      <div className="absolute inset-0">
        <img
          src={freshHeroImage}
          alt="Fresh healthy lifestyle"
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-[#E8F5E8]/60" />
      </div>

      <div className="relative section-container flex min-h-[90vh] items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center rounded-full border border-[#E6A520]/30 bg-[#FFF8E7]/90 px-6 py-3 text-sm font-medium uppercase tracking-[0.15em] text-[#7A4A00] shadow-sm">
            <span className="mr-2 text-lg">🌱</span>
            Premium Fresh Experience
          </div>

          <h1 className="text-5xl md:text-6xl xl:text-7xl font-playfair font-bold text-[#7A4A00] leading-tight tracking-[-0.02em] max-w-4xl">
            Freshly Crafted for a
            <span className="block text-[#E6A520]">Healthier Lifestyle</span>
          </h1>

          <p className="mt-8 max-w-2xl text-xl md:text-2xl text-gray-700 leading-relaxed font-inter">
            Experience premium wellness through our carefully curated fresh juices, healthy meals, and nutrition-focused dining that nourishes your body and elevates your lifestyle.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row sm:items-center gap-6">
            <Link
              to="#products"
              className="btn-primary inline-flex items-center justify-center rounded-full bg-[#E6A520] px-10 py-5 text-lg font-semibold text-white shadow-xl shadow-[#E6A520]/30 hover:bg-[#7A4A00] transition-all duration-300 hover:shadow-2xl"
            >
              Explore Fresh Menu
            </Link>
            <a
              href="#plans"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#7A4A00]/20 bg-white/80 px-10 py-5 text-lg font-semibold text-[#7A4A00] transition-all duration-300 hover:border-[#E6A520] hover:bg-[#FFF8E7] hover:shadow-lg"
            >
              Start Healthy Living
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            {[
              { number: '100%', label: 'Fresh Daily' },
              { number: '50+', label: 'Healthy Options' },
              { number: '24/7', label: 'Fresh Delivery' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1, duration: 0.6 }}
                className="text-[#7A4A00]"
              >
                <div className="text-3xl md:text-4xl font-bold font-playfair">{stat.number}</div>
                <div className="text-sm uppercase tracking-[0.1em] text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}