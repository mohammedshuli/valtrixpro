import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES, SERVICES } from '../../lib/constants';
import { fetchServices } from '../../services/supabaseService';
import privateChefImage from '../../assets/privateChef.png';
import cateringImage from '../../assets/catering.jpg';
import corporateImage from '../../assets/coporate.jpg';
import freshImage from '../../assets/valtrixfresh.png';
import culinaryImage from '../../assets/culinaryExperience.png';
import consultationImage from '../../assets/consultation.png';
import partnershipImage from '../../assets/partnership.jpg';
import studioImage from '../../assets/event.jpg';
import rentalImage from '../../assets/hero.png';

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

type UiService = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description: string;
  imageUrl?: string;
};

const buildFallbackServices = (): UiService[] =>
  SERVICES.map((service) => ({
    id: service.id,
    name: service.name,
    slug: service.slug,
    shortDescription: service.shortDescription,
    description: service.description,
    imageUrl: undefined,
  }));

export default function ServicesGrid() {
  const [services, setServices] = useState<UiService[]>(buildFallbackServices());

  useEffect(() => {
    let isMounted = true;

    fetchServices()
      .then((data) => {
        if (!isMounted) return;

        const mappedServices = data
          .filter((service) => service.is_active !== false)
          .map((service) => ({
            id: service.id,
            name: service.name,
            slug: service.slug,
            shortDescription: service.short_description || '',
            description: service.description,
            imageUrl: service.image_url || undefined,
          }));

        if (mappedServices.length > 0) {
          setServices(mappedServices);
        }
      })
      .catch(() => {
        // Keep fallback services if fetching fails
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
      {services.map((service) => (
        <motion.div key={service.id} variants={itemVariants}>
          <Link
            to={serviceLinks[service.slug] || ROUTES.CONTACT}
            className="group card cursor-pointer overflow-hidden h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative h-48 overflow-hidden bg-gray-200">
              <img
                src={service.imageUrl || serviceImages[service.slug] || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop'}
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
