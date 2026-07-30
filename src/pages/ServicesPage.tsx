import { motion } from 'framer-motion';
import { ROUTES } from '../lib/constants';
import { Link } from 'react-router-dom';
import ServicesGrid from '../components/sections/ServicesGrid';

export default function ServicesPage() {
  return (
    <div className="bg-[#FFF8E7]">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative py-16 md:py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/event.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative section-container text-center text-white">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6">
            Our Services
          </h1>
          <p className="text-xl text-white max-w-2xl mx-auto">
            Nine premium culinary and hospitality services designed to exceed expectations
          </p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <section className="section">
        <div className="section-container">
          <ServicesGrid />
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-white">
        <div className="section-container">
          <h2 className="text-4xl font-playfair font-bold text-[#7A4A00] text-center mb-12">
            Why Choose Valtrix Pro Chef
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title: 'Executive Chef Expertise', desc: 'Decades of professional culinary experience across fine dining and hospitality' },
              { title: 'Premium Sourcing', desc: 'Carefully curated local and international ingredients for optimal quality' },
              { title: 'Customization', desc: 'Every experience is tailored to your unique preferences and requirements' },
              { title: 'Professional Service', desc: 'Immaculate execution and attention to every detail' },
              { title: 'Innovation', desc: 'Contemporary techniques blended with classic culinary traditions' },
              { title: 'Reputation', desc: 'Trusted by leading organizations and discerning clients' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4"
              >
                <div className="text-[#E6A520] text-4xl">✓</div>
                <div>
                  <h3 className="text-xl font-playfair font-bold text-[#7A4A00] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-700">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[#7A4A00] text-white">
        <div className="section-container text-center">
          <h2 className="text-4xl font-playfair font-bold mb-6">
            Ready to Experience Our Services?
          </h2>
          <Link to={ROUTES.CONTACT} className="btn-secondary text-white border-white">
            Start Your Journey
          </Link>
        </div>
      </section>
    </div>
  );
}
