import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES, MOCK_TESTIMONIALS } from '../lib/constants';
import ServicesGrid from '../components/sections/ServicesGrid';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import heroBackground from '../assets/hero-hero.jpg';

export default function HomePage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="bg-[#FFF8E7]">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative h-[70vh] md:h-[90vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${heroBackground})`,
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/55"></div>
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-playfair font-bold mb-6 leading-tight text-white drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)]"
          >
            Experience Culinary Excellence
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-xl md:text-2xl font-inter mb-8 opacity-90 text-white"
          >
            Valtrix Pro Chef brings world-class gastronomy to Tanzania
          </motion.p>
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to={ROUTES.CONTACT} className="btn-primary text-lg">
              Inquire Now
            </Link>
            <Link to={ROUTES.SERVICES} className="btn-secondary text-lg bg-white/20 border-white text-white hover:bg-white/30">
              Explore Services
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Overview */}
      <section className="section bg-[#FFF8E7]">
        <div className="section-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              Our Premium Services
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 max-w-2xl mx-auto">
              From intimate culinary journeys to grand corporate events, we craft bespoke experiences that elevate every occasion.
            </motion.p>
          </motion.div>
          <ServicesGrid />
        </div>
      </section>

      {/* Signature Experience */}
      <section className="section bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=600&fit=crop"
                alt="Signature Experience"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-6">
                The Valtrix Experience
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Each culinary journey is thoughtfully crafted to create memorable moments. We blend traditional Tanzanian flavors with contemporary techniques.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Custom menu design',
                  'Premium local sourcing',
                  'Interactive chef experiences',
                  'Flawless execution',
                ].map((point, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <span className="text-[#E6A520] text-2xl">✓</span>
                    <span className="text-gray-700 text-lg">{point}</span>
                  </li>
                ))}
              </ul>
              <Link to={ROUTES.ABOUT} className="btn-primary">
                Learn Our Story
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Focus */}
      <section className="section bg-[#FFF8E7]">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-xl p-12 md:p-16 text-center"
          >
            <h2 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-6">
              Elevate Your Corporate Events
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8">
              Make lasting impressions with sophisticated culinary excellence. Our corporate catering service is designed for leaders who demand premium quality.
            </p>
            <Link to={ROUTES.CORPORATE_EVENTS} className="btn-primary">
              Explore Corporate Services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Valtrix Fresh Highlight */}
      <section className="section bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-6">
                Valtrix Fresh
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Premium nutrition delivered daily. Fresh salads, cold-pressed juices, and balanced meals prepared with local ingredients.
              </p>
              <Link to={ROUTES.MEAL_PREP} className="btn-primary">
                Explore Valtrix Fresh
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=600&fit=crop"
                alt="Valtrix Fresh"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-[#FFF8E7]">
        <div className="section-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              What Our Clients Say
            </motion.h2>
          </motion.div>
          <TestimonialsSection testimonials={MOCK_TESTIMONIALS} />
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="section bg-white">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-6">
              Experience Gallery
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-12">
              Glimpses of our culinary artistry and memorable events
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={`https://images.unsplash.com/photo-${1559521713 + i}?w=400&h=400&fit=crop`}
                  alt={`Gallery ${i}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to={ROUTES.GALLERY} className="btn-secondary">
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section bg-[#7A4A00] text-white">
        <div className="section-container text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-playfair font-bold mb-6"
          >
            Ready to Experience Excellence?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl mb-8 max-w-2xl mx-auto"
          >
            Let's create something extraordinary together
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link to={ROUTES.CONTACT} className="btn-secondary text-white border-white hover:bg-white hover:text-[#7A4A00]">
              Start Your Journey
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
