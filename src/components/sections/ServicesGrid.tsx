import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../../lib/constants';

const serviceLinks: Record<string, string> = {
  'private-chef-experiences': ROUTES.CATERING,
  'premium-catering': ROUTES.CATERING,
  'corporate-events': ROUTES.CORPORATE_EVENTS,
  'valtrix-fresh': ROUTES.MEAL_PREP,
  'culinary-experiences': ROUTES.CULINARY_EXPERIENCES,
  'chef-consultation': ROUTES.CHEF_CONSULTATION,
  'catering-partnerships': ROUTES.CONTACT,
};

const serviceImages: Record<string, string> = {
  'private-chef-experiences': 'https://images.unsplash.com/photo-1556910103-1c02411297e3?w=600&h=600&fit=crop',
  'premium-catering': 'https://images.unsplash.com/photo-1555939594-58d7cb561484?w=600&h=600&fit=crop',
  'corporate-events': 'https://images.unsplash.com/photo-1519167758993-41d2f9c991cc?w=600&h=600&fit=crop',
  'valtrix-fresh': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop',
  'culinary-experiences': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop',
  'chef-consultation': 'https://images.unsplash.com/photo-1507668077129-56e32842fcaf?w=600&h=600&fit=crop',
  'catering-partnerships': 'https://images.unsplash.com/photo-1552566626-52f8b29e6e80?w=600&h=600&fit=crop',
};

import { SERVICES } from '../../lib/constants';

export default function ServicesGrid() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {SERVICES.map((service) => (
        <motion.div key={service.id} variants={itemVariants}>
          <Link
            to={serviceLinks[service.slug] || ROUTES.CONTACT}
            className="group card cursor-pointer overflow-hidden h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <img
                src={serviceImages[service.slug] || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop'}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-playfair font-bold text-[#7A4A00] mb-3">
                {service.name}
              </h3>
              <p className="text-gray-700 mb-4">
                {service.shortDescription}
              </p>
              <p className="text-[#E6A520] font-semibold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                Learn More →
              </p>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
