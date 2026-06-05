import { motion } from 'framer-motion';

interface ProductCardProps {
  title: string;
  description: string;
  image: string;
  calories: string;
  price: string;
  nutrition: string[];
}

export default function ProductCard({ title, description, image, calories, price, nutrition }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative overflow-hidden rounded-3xl border border-[#E6A520]/20 bg-white shadow-xl shadow-black/5"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-[#7A4A00] shadow-sm">
          {calories}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-playfair font-bold text-[#7A4A00] mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">{description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {nutrition.map((item, idx) => (
            <span
              key={idx}
              className="inline-block rounded-full bg-[#E8F5E8] px-2 py-1 text-xs text-[#7A4A00] font-medium"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold font-playfair text-[#E6A520]">{price}</span>
          <div className="flex gap-2">
            <button className="rounded-full bg-[#E6A520] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#7A4A00] transition-colors">
              Add to Cart
            </button>
            <button className="rounded-full border border-[#E6A520] px-4 py-2 text-sm font-semibold text-[#E6A520] hover:bg-[#E6A520] hover:text-white transition-colors">
              WhatsApp
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}