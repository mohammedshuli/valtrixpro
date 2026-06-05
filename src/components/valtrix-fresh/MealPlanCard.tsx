import { motion } from 'framer-motion';

interface MealPlanCardProps {
  title: string;
  duration: string;
  meals: string;
  goal: string;
  price: string;
  features: string[];
  popular?: boolean;
}

export default function MealPlanCard({ title, duration, meals, goal, price, features, popular }: MealPlanCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`relative overflow-hidden rounded-3xl border bg-white shadow-lg shadow-black/5 ${
        popular ? 'border-[#E6A520] ring-2 ring-[#E6A520]/20' : 'border-[#E6A520]/20'
      }`}
    >
      {popular && (
        <div className="absolute top-4 right-4 rounded-full bg-[#E6A520] px-3 py-1 text-xs font-semibold text-white">
          Most Popular
        </div>
      )}

      <div className="p-8">
        <h3 className="text-2xl font-playfair font-bold text-[#7A4A00] mb-2">{title}</h3>
        <div className="text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#E6A520]">⏱️</span>
            {duration}
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#E6A520]">🍽️</span>
            {meals}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#E6A520]">🎯</span>
            {goal}
          </div>
        </div>

        <ul className="space-y-2 mb-6">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-[#E6A520]">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        <div className="text-center">
          <div className="text-3xl font-bold font-playfair text-[#E6A520] mb-4">{price}</div>
          <button className={`w-full rounded-full py-3 font-semibold transition-colors ${
            popular
              ? 'bg-[#E6A520] text-white hover:bg-[#7A4A00]'
              : 'border-2 border-[#E6A520] text-[#E6A520] hover:bg-[#E6A520] hover:text-white'
          }`}>
            Subscribe Now
          </button>
        </div>
      </div>
    </motion.div>
  );
}