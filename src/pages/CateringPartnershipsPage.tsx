import { motion } from 'framer-motion';
import PartnershipHero from '../components/catering-partnerships/PartnershipHero';
import PartnershipTypeCard from '../components/catering-partnerships/PartnershipTypeCard';
import WhyPartnerSection from '../components/catering-partnerships/WhyPartnerSection';
import CollaborationProcess from '../components/catering-partnerships/CollaborationProcess';
import PartnershipCTA from '../components/catering-partnerships/PartnershipCTA';
import aboutImage from '../assets/menu.jpg';

const partnershipTypes = [
  {
    title: 'Event Venue Partnerships',
    description: 'Premium catering operations for established event venues and wedding locations.',
  },
  {
    title: 'Corporate Hospitality Partnerships',
    description: 'Strategic catering support for corporate events, conferences, and business hospitality.',
  },
  {
    title: 'Wedding Planner Collaborations',
    description: 'Trusted culinary partner for wedding planners and event design professionals.',
  },
  {
    title: 'Hotel & Resort Partnerships',
    description: 'F&B operations and culinary support for luxury hotels and premium resort locations.',
  },
  {
    title: 'Business Event Support',
    description: 'Comprehensive catering services for executive events and professional gatherings.',
  },
  {
    title: 'Luxury Brand Collaborations',
    description: 'Premium culinary experiences aligned with luxury brand positioning and events.',
  },
];

export default function CateringPartnershipsPage() {
  return (
    <div className="bg-[#FFF8E7]">
      <PartnershipHero />

      {/* Partnership Overview */}
      <section className="bg-white py-16">
        <div className="section-container grid gap-12 lg:grid-cols-[1fr_0.95fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520]">About Partnerships</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] leading-tight">
              What Are Valtrix Catering Partnerships?
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[#4d3a23]">
              Valtrix Pro Chef partners with hotels, venues, event planners, and luxury brands to provide premium culinary operations and hospitality support. Our partnership model is built on reliability, excellence, and long-term collaborative success.
            </p>
            <ul className="space-y-3">
              {[
                'Long-term operational collaboration',
                'Premium culinary service delivery',
                'Venue-specific catering solutions',
                'Seamless event coordination',
                'Dedicated hospitality support',
                'Professional staff and expertise',
              ].map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-[#E6A520] mt-1">✓</span>
                  <span className="text-[#4d3a23]">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden rounded-[1.5rem] shadow-[0_25px_70px_rgba(122,74,0,0.12)]"
          >
            <img
              src={aboutImage}
              alt="Professional hospitality partnership"
              className="h-full w-full object-cover min-h-[480px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Partnership Types */}
      <section id="partnership-types" className="py-16">
        <div className="section-container">
          <div className="space-y-6 text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520]">Partnership Opportunities</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Partnership Types
            </h2>
            <p className="mx-auto max-w-2xl text-base text-[#4d3a23]">
              Tailored partnership models designed for different hospitality sectors and collaboration needs.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {partnershipTypes.map((partnership) => (
              <PartnershipTypeCard key={partnership.title} title={partnership.title} description={partnership.description} />
            ))}
          </div>
        </div>
      </section>

      <WhyPartnerSection />
      <CollaborationProcess />
      <PartnershipCTA />
    </div>
  );
}
