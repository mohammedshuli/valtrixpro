import { motion } from 'framer-motion';

interface PartnershipTypeCardProps {
  title: string;
  description: string;
}

export default function PartnershipTypeCard({ title, description }: PartnershipTypeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5 }}
      className="group rounded-[1.5rem] border border-[#E6A520]/25 bg-white p-8 shadow-[0_15px_50px_rgba(122,74,0,0.08)] transition-all duration-300 hover:shadow-[0_25px_70px_rgba(122,74,0,0.15)] hover:border-[#E6A520]/40"
    >
      <div className="space-y-4">
        <div className="h-12 w-12 rounded-lg bg-[#FFD77A]/20 flex items-center justify-center group-hover:bg-[#FFD77A]/40 transition-colors duration-300">
          <span className="text-2xl">→</span>
        </div>
        <h3 className="text-2xl font-playfair font-bold text-[#7A4A00]">{title}</h3>
        <p className="text-base leading-relaxed text-[#4d3a23]">{description}</p>
      </div>
    </motion.div>
  );
}
