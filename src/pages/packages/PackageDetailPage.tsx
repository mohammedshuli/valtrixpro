import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Users, Star, CheckCircle, MessageCircle, Share2, ChevronDown, ChevronUp } from 'lucide-react';
import { CATERING_PACKAGES } from '../../lib/constants';

export default function PackageDetailPage() {
  const { packageId } = useParams<{ packageId: string }>();
  const navigate = useNavigate();
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const packageItem = CATERING_PACKAGES.find(pkg => pkg.id === packageId);

  if (!packageItem) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#7A4A00] mb-4">Package not found</h1>
          <button
            onClick={() => navigate('/packages-menu')}
            className="bg-[#E6A520] text-white px-6 py-2 rounded-lg"
          >
            Back to Packages
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppInquiry = () => {
    const message = `Hello Valtrix Pro Chef, I am interested in the ${packageItem.name}.`;
    const whatsappUrl = `https://wa.me/255655734453?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleBookPackage = () => {
    // Booking logic here
    alert(`Booking inquiry for ${packageItem.name} sent!`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: packageItem.name,
        text: packageItem.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Mock data for package details
  const packageDetails = {
    serves: '50-100',
    duration: '4-6 hours',
    setupTime: '2 hours',
    foods: [
      'Appetizers & Canapés',
      'Main Course Selection',
      'Side Dishes',
      'Desserts',
      'Beverages'
    ],
    drinks: [
      'Soft Drinks',
      'Fresh Juices',
      'Mineral Water',
      'Coffee & Tea'
    ],
    services: [
      'Professional Chef',
      'Servers & Staff',
      'Setup & Cleanup',
      'Event Coordination',
      'Dietary Accommodations'
    ]
  };

  const testimonials = [
    {
      name: 'Sarah Johnson',
      event: 'Wedding Reception',
      message: 'The wedding package exceeded our expectations. Every detail was perfect.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      event: 'Corporate Event',
      message: 'Professional service and outstanding cuisine. Highly recommended.',
      rating: 5
    }
  ];

  const faqs = [
    {
      question: 'What is included in the setup and cleanup?',
      answer: 'Our team handles complete setup including table settings, decorations, and equipment. We also provide full cleanup and waste removal after the event.'
    },
    {
      question: 'Can you accommodate dietary restrictions?',
      answer: 'Yes, we work with you to accommodate various dietary needs including vegetarian, vegan, gluten-free, and allergen-specific requirements.'
    },
    {
      question: 'How far in advance should I book?',
      answer: 'We recommend booking at least 2-4 weeks in advance for standard packages, and 4-6 weeks for larger events or custom requests.'
    },
    {
      question: 'Do you provide staff and serving?',
      answer: 'Yes, our packages include professional servers, chefs, and event staff to ensure smooth service throughout your event.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="section-container py-4">
          <button
            onClick={() => navigate('/packages-menu')}
            className="flex items-center gap-2 text-[#7A4A00] hover:text-[#E6A520] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Packages
          </button>
        </div>
      </div>

      <div className="section-container py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-12"
        >
          <div className="relative h-96 rounded-2xl overflow-hidden">
            <img
              src={packageItem.image}
              alt={packageItem.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">
                {packageItem.name}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl">
                {packageItem.description}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Package Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-playfair font-bold text-[#7A4A00] mb-6">Package Overview</h2>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <p className="text-gray-700 leading-relaxed mb-6">{packageItem.description}</p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Users className="w-8 h-8 text-[#E6A520] mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Serves</p>
                    <p className="font-semibold text-[#7A4A00]">{packageDetails.serves} guests</p>
                  </div>
                  <div className="text-center">
                    <Calendar className="w-8 h-8 text-[#E6A520] mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold text-[#7A4A00]">{packageDetails.duration}</p>
                  </div>
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 text-[#E6A520] mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Setup Time</p>
                    <p className="font-semibold text-[#7A4A00]">{packageDetails.setupTime}</p>
                  </div>
                  <div className="text-center">
                    <Star className="w-8 h-8 text-[#E6A520] mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Starting From</p>
                    <p className="font-semibold text-[#7A4A00]">{formatPrice(packageItem.startingPrice)}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* What's Included */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-playfair font-bold text-[#7A4A00] mb-6">What's Included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-[#7A4A00] mb-4">Culinary Selection</h3>
                  <ul className="space-y-3">
                    {packageDetails.foods.map((food, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{food}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-[#7A4A00] mb-4">Beverages & Service</h3>
                  <ul className="space-y-3">
                    {packageDetails.drinks.map((drink, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700">{drink}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg mt-6">
                <h3 className="text-xl font-semibold text-[#7A4A00] mb-4">Professional Services</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {packageDetails.services.map((service, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Testimonials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl font-playfair font-bold text-[#7A4A00] mb-6">Client Testimonials</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.message}"</p>
                    <div>
                      <p className="font-semibold text-[#7A4A00]">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="text-3xl font-playfair font-bold text-[#7A4A00] mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-[#7A4A00]">{faq.question}</h3>
                      {expandedFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-[#E6A520]" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-[#E6A520]" />
                      )}
                    </button>
                    {expandedFaq === index && (
                      <div className="px-6 pb-6">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl p-6 shadow-lg sticky top-6"
            >
              <h3 className="text-2xl font-playfair font-bold text-[#7A4A00] mb-4">Book This Package</h3>
              <div className="text-3xl font-bold text-[#E6A520] mb-6">
                {formatPrice(packageItem.startingPrice)}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Serves up to</span>
                  <span className="font-semibold">{packageDetails.serves} guests</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{packageDetails.duration}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="text-gray-600">Setup included</span>
                  <span className="font-semibold">Yes</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleBookPackage}
                  className="w-full bg-[#E6A520] hover:bg-[#7A4A00] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Reserve Package
                </button>
                <button
                  onClick={handleWhatsAppInquiry}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp Inquiry
                </button>
                <button
                  onClick={handleShare}
                  className="w-full border border-gray-300 text-gray-700 hover:border-[#7A4A00] hover:text-[#7A4A00] font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <Share2 className="w-5 h-5" />
                  Share Package
                </button>
              </div>
            </motion.div>

            {/* Package Features */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-[#7A4A00] mb-4">Package Features</h3>
              <ul className="space-y-3">
                {packageItem.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}