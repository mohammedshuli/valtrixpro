import { motion } from 'framer-motion';
import CulinaryHero from '../components/culinary-experiences/CulinaryHero';
import ExperienceTeaserCard from '../components/culinary-experiences/ExperienceTeaserCard';
import CulinaryGallery from '../components/culinary-experiences/CulinaryGallery';
import FutureLaunchCTA from '../components/culinary-experiences/FutureLaunchCTA';
import aboutImage from '../assets/event.jpg';
import teaserOne from '../assets/hero-hero.jpg';
import teaserTwo from '../assets/menu.jpg';
import teaserThree from '../assets/hero.png';

const experienceCards = [
  {
    title: 'Private Cooking Sessions',
    description: 'Intimate chef experiences designed for small groups and immersive kitchen storytelling.',
    image: teaserOne,
  },
  {
    title: 'Chef Masterclasses',
    description: 'A preview of guided techniques, elevated mise en place, and refined culinary ritual.',
    image: teaserTwo,
  },
  {
    title: 'Gourmet Plating Workshops',
    description: 'Explore elegant presentation, textural contrast, and modern plating philosophy.',
    image: teaserThree,
  },
  {
    title: 'Cultural Cuisine Experiences',
    description: 'Discover meaningful food stories grounded in premium global ingredients.',
    image: aboutImage,
  },
  {
    title: 'Executive Culinary Experiences',
    description: 'Sophisticated chef-led gatherings for discerning guests and private tastings.',
    image: teaserOne,
  },
  {
    title: 'Team Cooking Events',
    description: 'Creative culinary collaboration for small teams and hospitality-minded groups.',
    image: teaserTwo,
  },
];

export default function CulinaryExperiencesPage() {
  return (
    <div className="bg-[#FFF8E7] text-[#4d3a23]">
      <CulinaryHero />

      <section className="py-16">
        <div className="section-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520]">The Vision</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] leading-tight">
              Culinary storytelling for a new generation of premium chef experiences.
            </h2>
            <p className="max-w-2xl text-lg leading-relaxed">
              Valtrix Pro Chef is shaping an intimate studio of future culinary moments — where cuisine becomes exploration, skillful hospitality, and thoughtful artistry.
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                'Crafted chef-led studio sessions',
                'Warm cinematic kitchen atmospheres',
                'Minimal, premium experience curation',
                'Future-focused culinary storytelling',
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-[#E6A520]/20 bg-white/80 p-6 shadow-[0_20px_40px_rgba(122,74,0,0.08)]">
                  <p className="text-sm uppercase tracking-[0.25em] text-[#7A4A00] mb-3">{item.split(' ')[0]}</p>
                  <p className="text-base text-[#4d3a23]">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="overflow-hidden rounded-[2rem] shadow-[0_40px_90px_rgba(122,74,0,0.14)]"
          >
            <img
              src={aboutImage}
              alt="Warm culinary atmosphere"
              className="h-full w-full object-cover min-h-[520px]"
            />
          </motion.div>
        </div>
      </section>

      <section id="experience-types" className="py-16">
        <div className="section-container">
          <div className="space-y-6 text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520]">Upcoming Experience Types</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              A quiet glimpse at what’s coming next.
            </h2>
            <p className="mx-auto max-w-2xl text-base text-[#4d3a23] leading-relaxed">
              These experiences are being crafted as elegant culinary journeys, not a full platform — designed to inspire curiosity and invite future discovery.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {experienceCards.map((experience) => (
              <ExperienceTeaserCard
                key={experience.title}
                title={experience.title}
                description={experience.description}
                image={experience.image}
              />
            ))}
          </div>
        </div>
      </section>

      <CulinaryGallery />
      <FutureLaunchCTA />
    </div>
  );
}
