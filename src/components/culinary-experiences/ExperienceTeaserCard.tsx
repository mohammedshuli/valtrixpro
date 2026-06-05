import { motion } from 'framer-motion';

interface ExperienceTeaserCardProps {
  title: string;
  description: string;
  image: string;
}

export default function ExperienceTeaserCard({ title, description, image }: ExperienceTeaserCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="group overflow-hidden rounded-[2rem] border border-[#D6B373]/30 bg-white shadow-[0_20px_60px_rgba(122,74,0,0.08)]"
    >
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#7A4A00]/40 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex rounded-full bg-[#FFF8E7]/95 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#7A4A00]">
          Coming Soon
        </span>
      </div>
      <div className="space-y-4 p-6">
        <h3 className="text-2xl font-playfair font-bold text-[#7A4A00]">{title}</h3>
        <p className="text-base leading-relaxed text-[#4d3a23]">{description}</p>
      </div>
    </motion.article>
  );
}
