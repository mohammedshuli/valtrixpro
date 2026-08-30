import { motion } from 'framer-motion';
import { MOCK_TESTIMONIALS } from '../../lib/constants';

interface TestimonialItem {
  id: string;
  name?: string;
  role?: string;
  content?: string;
  clientName?: string;
  clientTitle?: string;
  message?: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  testimonials: readonly TestimonialItem[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const displayTestimonials = testimonials.length > 0 ? testimonials : MOCK_TESTIMONIALS;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {displayTestimonials.map((t) => {
        const name = t.clientName ?? t.name ?? 'Client';
        const title = t.clientTitle ?? t.role ?? '';
        const text = t.message ?? t.content ?? '';
        const rating = t.rating ?? 5;

        return (
          <motion.div
            key={t.id}
            variants={itemVariants}
            className="bg-white rounded-xl shadow-lg p-8 border-t-4 border-[#E6A520] hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: rating }).map((_, i) => (
                <span key={i} className="text-[#FFD77A] text-lg">★</span>
              ))}
            </div>
            <p className="text-gray-700 mb-6 italic leading-relaxed">"{text}"</p>
            <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E6A520]/20 flex items-center justify-center text-[#E6A520] font-bold font-playfair text-lg">
                {name.charAt(0)}
              </div>
              <div>
                <p className="font-playfair font-bold text-[#7A4A00]">{name}</p>
                {title && <p className="text-sm text-gray-500">{title}</p>}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
