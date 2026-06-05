import { motion } from 'framer-motion';

const features = [
  {
    title: 'Professional Hospitality Team',
    description: 'Experienced service professionals trained in corporate etiquette and premium service standards.',
    icon: '👥',
  },
  {
    title: 'Executive Dining Experience',
    description: 'Sophisticated menus crafted for business audiences with premium ingredients and elegant presentation.',
    icon: '🍽️',
  },
  {
    title: 'Seamless Event Coordination',
    description: 'End-to-end event management ensuring flawless execution and professional oversight.',
    icon: '⚡',
  },
  {
    title: 'VIP Guest Experience',
    description: 'Personalized attention and premium amenities for executive guests and key stakeholders.',
    icon: '⭐',
  },
  {
    title: 'Premium Menu Planning',
    description: 'Customizable executive menus with dietary accommodations and brand-aligned presentations.',
    icon: '📋',
  },
  {
    title: 'Reliable Logistics',
    description: 'Professional setup, breakdown, and coordination with attention to every detail.',
    icon: '🎯',
  },
];

export default function ExecutiveHospitalityFeatures() {
  return (
    <section className="py-32 bg-[#FAF7F0]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-[#7A4A00] mb-6">
            Executive Hospitality
            <br />
            <span className="text-[#E6A520]">Excellence</span>
          </h2>
          <div className="w-24 h-px bg-[#E6A520] mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every detail meticulously planned and executed to deliver
            unparalleled corporate hospitality experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="bg-white p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-xl font-playfair font-bold text-[#7A4A00] mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Subtle accent line */}
              <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#E6A520] group-hover:w-full transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}