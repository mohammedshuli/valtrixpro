import { motion } from 'framer-motion';
import heroImage from '../../assets/event.jpg';

export default function PartnershipHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(230,165,32,0.12),_transparent_35%),linear-gradient(180deg,rgba(255,215,122,0.08),transparent_70%)] pointer-events-none" />
      <div className="section-container relative min-h-[70vh] flex items-center py-16">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="space-y-8"
          >
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-playfair font-black text-[#7A4A00] leading-tight tracking-[-0.03em]">
              Strategic Culinary & Hospitality Partnerships
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-[#4d3a23] leading-relaxed">
              Premium catering operations and hospitality collaboration with hotels, venues, event planners, and luxury brands. Long-term partnership excellence.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#partnership-cta"
                className="btn-primary inline-flex items-center justify-center rounded-full bg-[#E6A520] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#E6A520]/30 transition-all duration-300 hover:bg-[#7A4A00]"
              >
                Become a Partner
              </a>
              <a
                href="#partnership-types"
                className="inline-flex items-center justify-center rounded-full border border-[#7A4A00] bg-white px-8 py-4 text-base font-semibold text-[#7A4A00] transition-all duration-300 hover:bg-[#FFF8E7]"
              >
                Explore Opportunities
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[1.5rem] shadow-[0_30px_80px_rgba(122,74,0,0.15)]"
          >
            <img
              src={heroImage}
              alt="Premium hospitality partnership collaboration"
              className="h-full w-full object-cover min-h-[480px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#7A4A00]/30 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
