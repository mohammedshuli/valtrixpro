import { motion } from 'framer-motion';

const benefits = [
  {
    icon: '🌱',
    title: 'Fresh Daily Ingredients',
    description: 'Sourced fresh every morning from local farms and suppliers for maximum nutrition and flavor.',
  },
  {
    icon: '⚡',
    title: 'Energy Boosting Meals',
    description: 'Nutritionally balanced meals designed to sustain energy levels throughout your day.',
  },
  {
    icon: '🧼',
    title: 'Hygienic Preparation',
    description: 'Prepared in certified hygienic facilities with strict quality control and food safety standards.',
  },
  {
    icon: '🥗',
    title: 'Natural Nutrition',
    description: 'No artificial additives, preservatives, or chemicals - just pure, natural wholesome food.',
  },
  {
    icon: '💪',
    title: 'Wellness-Focused Recipes',
    description: 'Developed by nutritionists and chefs to support healthy lifestyle goals and dietary needs.',
  },
  {
    icon: '🚚',
    title: 'Healthy Lifestyle Support',
    description: 'Comprehensive support for your wellness journey with personalized nutrition guidance.',
  },
];

export default function WellnessBenefits() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {benefits.map((benefit, idx) => (
        <motion.div
          key={benefit.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.6 }}
          whileHover={{ y: -4 }}
          className="group text-center p-6 rounded-2xl border border-[#E6A520]/20 bg-white/80 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div className="text-5xl mb-4">{benefit.icon}</div>
          <h3 className="text-xl font-playfair font-bold text-[#7A4A00] mb-3">{benefit.title}</h3>
          <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
        </motion.div>
      ))}
    </div>
  );
}