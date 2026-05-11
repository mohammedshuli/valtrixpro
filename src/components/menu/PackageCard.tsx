import { motion } from 'framer-motion';
import { Calendar, Star } from 'lucide-react';
import { CATERING_PACKAGES } from '../../lib/constants';

type CateringPackage = typeof CATERING_PACKAGES[number];

interface PackageCardProps {
  package: CateringPackage;
  index: number;
}

export default function PackageCard({ package: pkg, index }: PackageCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Package Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-playfair font-bold mb-1">
            {pkg.name}
          </h3>
          <p className="text-white/90 text-sm">
            Starting from {formatPrice(pkg.startingPrice)}
          </p>
        </div>
      </div>

      {/* Package Content */}
      <div className="p-6">
        <p className="text-gray-700 mb-4 leading-relaxed">
          {pkg.description}
        </p>

        {/* Features */}
        <div className="mb-6">
          <h4 className="font-semibold text-[#7A4A00] mb-3 flex items-center gap-2">
            <Star className="w-4 h-4 text-[#E6A520]" />
            Package Includes
          </h4>
          <ul className="space-y-2">
            {pkg.features.slice(0, 4).map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-[#E6A520] rounded-full mt-2 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <button className="w-full bg-[#E6A520] hover:bg-[#7A4A00] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg">
          <Calendar className="w-4 h-4" />
          Book Package
        </button>
      </div>
    </motion.div>
  );
}