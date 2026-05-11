import { motion } from 'framer-motion';

interface EventExperienceCardProps {
  title: string;
  description: string;
  image: string;
}

export default function EventExperienceCard({ title, description, image }: EventExperienceCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-[40px] border border-[#FFD77A]/20 bg-white/90 shadow-2xl shadow-black/5"
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <h3 className="text-2xl md:text-3xl font-playfair font-bold mb-3">{title}</h3>
          <p className="text-lg opacity-90 leading-relaxed">{description}</p>
        </div>
      </div>
    </motion.div>
  );
}