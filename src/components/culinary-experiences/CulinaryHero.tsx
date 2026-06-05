import { motion } from 'framer-motion';
import heroImage from '../../assets/hero-hero.jpg';

export default function CulinaryHero() {
  return (
    <section className="relative overflow-hidden bg-[#FFF8E7]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(230,165,32,0.20),_transparent_28%),linear-gradient(180deg,rgba(255,215,122,0.20),transparent_65%)] pointer-events-none" />
      <div className="section-container relative min-h-[82vh] flex items-center py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <span className="inline-flex items-center rounded-full border border-[#E6A520]/40 bg-white/85 px-4 py-2 text-xs uppercase tracking-[0.28em] text-[#7A4A00] shadow-sm">
              Coming Soon
            </span>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-playfair font-black text-[#7A4A00] leading-tight tracking-[-0.03em]">
              Culinary Experiences Beyond the Kitchen
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-[#4d3a23] leading-relaxed tracking-tight">
              A premium preview of chef-led studio moments, creative kitchen journeys, and immersive culinary storytelling from Valtrix Pro Chef.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href="#experience-types"
                className="btn-primary inline-flex items-center justify-center rounded-full bg-[#E6A520] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#E6A520]/30 transition-all duration-300 hover:bg-[#7A4A00]"
              >
                Explore Experiences
              </a>
              <a
                href="#future-launch"
                className="inline-flex items-center justify-center rounded-full border border-[#7A4A00] bg-white px-8 py-4 text-base font-semibold text-[#7A4A00] transition-all duration-300 hover:bg-[#FFD77A]/80"
              >
                Join Future Updates
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[2rem] shadow-[0_40px_90px_rgba(122,74,0,0.18)]"
          >
            <img
              src={heroImage}
              alt="Chef preparing premium culinary experience"
              className="h-full w-full object-cover min-h-[520px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#7A4A00]/45 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 rounded-3xl border border-white/30 bg-white/75 px-5 py-4 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.28em] text-[#7A4A00]">Studio narrative</p>
              <p className="mt-2 text-xl font-playfair font-semibold text-[#7A4A00]">
                Chef-led creative kitchen moments
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
