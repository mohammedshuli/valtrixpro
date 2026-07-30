import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../lib/constants';
import aboutImage from '../assets/menu.jpg';

const studioFeatures = [
  {
    title: 'Mobile Kitchen Events',
    description: 'Flexible on-site food sales, catering, and culinary training powered by our mobile kitchen units.',
  },
  {
    title: 'Cooking Competitions',
    description: 'University and street cooking competitions that showcase culinary skill, creativity, and community energy.',
  },
  {
    title: 'Workshops & Training',
    description: 'Hands-on cooking workshops and professional culinary training for teams, students, and enthusiasts.',
  },
  {
    title: 'Live Chef Experiences',
    description: 'Interactive chef demonstrations and immersive culinary activation moments for memorable events.',
  },
];

export default function ValtrixStudioPage() {
  return (
    <div className="bg-[#FFF8E7] text-[#1F1A12]">
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${aboutImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative section-container text-white text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#FFD77A] mb-4">Valtrix Studio</p>
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
            Mobile culinary experiences, competitions, and live training.
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed">
            Valtrix Studio brings the kitchen to your event with mobile cooking activations, university and street cooking competitions, culinary workshops, and interactive chef demonstrations.
          </p>
          <Link
            to={ROUTES.CONTACT}
            className="inline-flex mt-10 rounded-full bg-[#E6A520] px-8 py-4 text-sm font-semibold text-[#4d3a23] shadow-xl transition hover:bg-[#ce9f1a]"
          >
            Inquire About Studio Events
          </Link>
        </div>
      </motion.section>

      <section className="section py-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520] mb-3">Studio Services</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              A full-service culinary studio for live events and education.
            </h2>
            <p className="mx-auto max-w-2xl text-base text-[#4d3a23] leading-relaxed">
              Our mobile kitchen and chef-led experiences are designed to engage guests, support competitive culinary formats, and elevate training with premium hospitality.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {studioFeatures.map((feature) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-[2rem] border border-[#E6A520]/20 bg-white p-8 shadow-[0_20px_60px_rgba(122,74,0,0.08)]"
              >
                <h3 className="text-xl font-semibold text-[#7A4A00] mb-4">{feature.title}</h3>
                <p className="text-gray-700 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white py-16">
        <div className="section-container grid gap-12 lg:grid-cols-[1fr_0.95fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520] mb-4">What We Provide</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] leading-tight mb-6">
              A turnkey experience for hosts, campuses, and event producers.
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3 items-start">
                <span className="text-[#E6A520] mt-1">✓</span>
                <span>Fully managed mobile kitchen set-ups with on-site chef staff.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-[#E6A520] mt-1">✓</span>
                <span>Competition curation, staging, judging, and culinary branding support.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-[#E6A520] mt-1">✓</span>
                <span>Hands-on cooking workshops, culinary team training, and skill-building sessions.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-[#E6A520] mt-1">✓</span>
                <span>Live demonstrations designed to engage guests with interactive tasting and storytelling.</span>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-[2rem] shadow-[0_25px_60px_rgba(122,74,0,0.12)]">
            <img src={aboutImage} alt="Live chef demonstration" className="h-full w-full object-cover min-h-[460px]" />
          </div>
        </div>
      </section>

      <section className="section bg-[#7A4A00] text-white py-20">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Let's bring culinary energy to your next event.</h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed mb-8">
            From university competitions to public cooking activations, Valtrix Studio delivers memorable, professionally executed culinary moments.
          </p>
          <Link to={ROUTES.CONTACT} className="btn-secondary text-white border-white">
            Request Studio Services
          </Link>
        </div>
      </section>
    </div>
  );
}
