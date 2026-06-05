import { motion } from 'framer-motion';

interface FreshCategoryCardProps {
  title: string;
  description: string;
  image: string;
  icon: string;
}

export default function FreshCategoryCard({ title, description, image, icon }: FreshCategoryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-3xl border border-[#E6A520]/20 bg-white/90 shadow-lg shadow-black/5 backdrop-blur-sm"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 text-3xl">{icon}</div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-playfair font-bold text-[#7A4A00] mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}