import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../lib/constants';
import heroImage from '../../assets/event.jpg';

export default function ChefHero() {
  return (
    <section
      className="relative min-h-[85vh] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />
      <div className="relative section-container flex min-h-[85vh] items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center rounded-full border border-[#FFD77A]/30 bg-[#FFF8E7]/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-[#FFD77A] mb-6">
            Private Chef Experience
          </span>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-playfair font-black text-white leading-tight tracking-[-0.03em] max-w-3xl">
            An Exclusive Culinary Experience Crafted Around You
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl text-[#F7E9CD] opacity-90 leading-relaxed">
            A personalized private dining journey that blends fine dining, luxury hospitality, and bespoke menus designed for unforgettable moments.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              to={ROUTES.CONTACT}
              className="btn-primary inline-flex items-center justify-center rounded-full bg-[#E6A520] px-8 py-4 text-base font-semibold text-white shadow-2xl shadow-[#E6A520]/20 hover:bg-[#7A4A00] transition-colors"
            >
              Book Private Experience
            </Link>
            <a
              href="#signature-experiences"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 py-4 text-base font-semibold text-white transition hover:border-[#FFD77A] hover:text-[#FFD77A]"
            >
              Explore Signature Dining
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
