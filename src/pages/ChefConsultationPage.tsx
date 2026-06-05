import { motion } from 'framer-motion';
import ConsultationHero from '../components/chef-consultation/ConsultationHero';
import ConsultationAreaCard from '../components/chef-consultation/ConsultationAreaCard';
import ConsultationProcess from '../components/chef-consultation/ConsultationProcess';
import ConsultationCTA from '../components/chef-consultation/ConsultationCTA';
import aboutImage from '../assets/menu.jpg';

const consultationAreas = [
  {
    title: 'Menu Development',
    description: 'Strategic menu planning, culinary concept development, and dining experience design.',
  },
  {
    title: 'Event Culinary Planning',
    description: 'Professional guidance for premium events, galas, and special occasions.',
  },
  {
    title: 'Catering Consultation',
    description: 'Expert advice on catering operations, logistics, and culinary execution.',
  },
  {
    title: 'Hospitality Experience Advisory',
    description: 'Refined guidance on guest experience, service standards, and hospitality excellence.',
  },
  {
    title: 'Food Presentation Guidance',
    description: 'Professional consultation on plating aesthetics, visual storytelling, and culinary artistry.',
  },
  {
    title: 'Premium Dining Concepts',
    description: 'Strategic direction for luxury dining establishments and innovative culinary concepts.',
  },
];

export default function ChefConsultationPage() {
  return (
    <div className="bg-[#FFF8E7]">
      <ConsultationHero />

      {/* About Consultation Services */}
      <section className="bg-white py-16">
        <div className="section-container grid gap-12 lg:grid-cols-[1fr_0.95fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520]">What We Offer</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] leading-tight">
              Expert Culinary Consulting Services
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed text-[#4d3a23]">
              Valtrix Pro Chef provides strategic culinary consultation and hospitality expertise designed for discerning clients seeking professional guidance and premium culinary direction.
            </p>
            <ul className="space-y-3">
              {[
                'One-on-one executive chef sessions',
                'Custom menu development and curation',
                'Event culinary planning and execution guidance',
                'Hospitality experience optimization',
                'Food presentation and plating expertise',
                'Premium dining concept development',
              ].map((item, idx) => (
                <li key={idx} className="flex gap-3 items-start">
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
              alt="Professional chef consultation"
              className="h-full w-full object-cover min-h-[480px]"
            />
          </motion.div>
        </div>
      </section>

      {/* Consultation Areas */}
      <section id="consultation-areas" className="py-16">
        <div className="section-container">
          <div className="space-y-6 text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520]">Consultation Areas</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Areas of Expertise
            </h2>
            <p className="mx-auto max-w-2xl text-base text-[#4d3a23]">
              Comprehensive culinary consulting across multiple areas of hospitality and culinary excellence.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {consultationAreas.map((area) => (
              <ConsultationAreaCard key={area.title} title={area.title} description={area.description} />
            ))}
          </div>
        </div>
      </section>

      <ConsultationProcess />
      <ConsultationCTA />
    </div>
  );
}
