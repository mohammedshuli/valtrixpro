import { motion } from 'framer-motion';

interface Testimonial {
  id: string;
  clientName: string;
  clientTitle: string;
  message: string;
  rating: number;
  serviceType: string;
}

interface TestimonialsSectionProps {
  testimonials: readonly Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {testimonials.map((testimonial) => (
        <motion.div
          key={testimonial.id}
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg p-8 border-t-4 border-[#E6A520] hover:shadow-xl transition-shadow"
        >
          <div className="flex gap-1 mb-4">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <span key={i} className="text-[#FFD77A] text-lg">★</span>
            ))}
          </div>
          <p className="text-gray-700 mb-6 italic">"{testimonial.message}"</p>
          <div className="border-t pt-4">
            <p className="font-playfair font-bold text-[#7A4A00]">
              {testimonial.clientName}
            </p>
            <p className="text-sm text-gray-600">
              {testimonial.clientTitle}
            </p>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
