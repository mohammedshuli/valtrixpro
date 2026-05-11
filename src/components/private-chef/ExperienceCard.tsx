import { motion } from 'framer-motion';

interface ExperienceCardProps {
  title: string;
  description: string;
  image: string;
}

export default function ExperienceCard({ title, description, image }: ExperienceCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group overflow-hidden rounded-[32px] border border-white/20 bg-white/80 shadow-xl shadow-black/5 backdrop-blur-xl"
    >
      <div className="relative h-72 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
      </div>
      <div className="p-6 md:p-8">
        <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520] mb-3">Signature Experience</p>
        <h3 className="text-2xl font-playfair font-bold text-[#7A4A00] mb-3">{title}</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>
    </motion.article>
  );
}
