import { motion } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  eventType?: string;
}

export default function TestimonialCard({ quote, name, role, eventType }: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="rounded-3xl border border-[#FFD77A]/20 bg-white/90 p-8 shadow-xl shadow-black/5"
    >
      <p className="text-lg italic leading-8 text-gray-700 mb-6">“{quote}”</p>
      <div>
        <p className="text-base font-semibold text-[#7A4A00]">{name}</p>
        <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520]">{role}</p>
        {eventType && (
          <p className="text-xs text-gray-500 mt-1">{eventType}</p>
        )}
      </div>
    </motion.div>
  );
}