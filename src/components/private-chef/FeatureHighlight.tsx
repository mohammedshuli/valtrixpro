import { motion } from 'framer-motion';

interface FeatureHighlightProps {
  title: string;
  description: string;
  icon: string;
}

export default function FeatureHighlight({ title, description, icon }: FeatureHighlightProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group rounded-3xl border border-[#FFD77A]/15 bg-white/90 p-6 shadow-lg shadow-black/5"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0C4] text-2xl text-[#7A4A00] mb-5">
        {icon}
      </div>
      <h4 className="text-xl font-semibold text-[#7A4A00] mb-3">{title}</h4>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </motion.div>
  );
}
