import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../../lib/constants';
import privateChefImage from '../../assets/privateChef.png';
import cateringImage from '../../assets/catering.jpg';
import corporateImage from '../../assets/coporate.jpg';
import freshImage from '../../assets/valtrixfresh.png';
import culinaryImage from '../../assets/culinaryExperience.png';
import consultationImage from '../../assets/consultation.png';
import partnershipImage from '../../assets/partnership.jpg';
import studioImage from '../../assets/culinaryExperience.png';
import rentalImage from '../../assets/event.jpg';

const serviceLinks: Record<string, string> = {
  'private-chef-experiences': ROUTES.PRIVATE_CHEF,
  'premium-catering': ROUTES.CATERING,
  'corporate-events': ROUTES.CORPORATE_EVENTS,
  'valtrix-fresh': ROUTES.MEAL_PREP,
  'culinary-experiences': ROUTES.CULINARY_EXPERIENCES,
  'chef-consultation': ROUTES.CHEF_CONSULTATION,
  'catering-partnerships': ROUTES.CATERING_PARTNERSHIPS,
  'valtrix-studio': ROUTES.VALTRIX_STUDIO,
  'equipment-rental': ROUTES.EQUIPMENT_RENTAL,
};

const serviceImages: Record<string, string> = {
  'private-chef-experiences': privateChefImage,
  'premium-catering': cateringImage,
  'corporate-events': corporateImage,
  'valtrix-fresh': freshImage,
  'culinary-experiences': culinaryImage,
  'chef-consultation': consultationImage,
  'catering-partnerships': partnershipImage,
  'valtrix-studio': studioImage,
  'equipment-rental': rentalImage,
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
            to={serviceLinks[service.slug] ?? ROUTES.SERVICES}
            className="group card cursor-pointer overflow-hidden h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <img
                src={serviceImages[service.slug] ?? cateringImage}
                alt={service.name}
                loading="lazy"
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
