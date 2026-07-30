import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ROUTES } from '../lib/constants';
import rentalImage from '../assets/hero.png';

const rentalItems = [
  {
    title: 'Event Catering Essentials',
    description: 'Chafing dishes, buffet setups, serving utensils, and beverage stations for polished food service.',
  },
  {
    title: 'Seating & Tables',
    description: 'High-quality tables, chairs, linens, and hospitality furniture to support event comfort and style.',
  },
  {
    title: 'Kitchen Equipment',
    description: 'Cooking stations, warmers, prep equipment, and portable appliances for on-site catering execution.',
  },
  {
    title: 'Accessories & Serviceware',
    description: 'Tableware, glassware, trays, heat lamps, and event accessories that complete the catering experience.',
  },
];

export default function EquipmentRentalPage() {
  return (
    <div className="bg-[#FFF8E7] text-[#1F1A12]">
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="relative py-20 bg-cover bg-center"
        style={{ backgroundImage: `url(${rentalImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative section-container text-white text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#FFD77A] mb-4">Equipment Rental</p>
          <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
            Premium event equipment for flawless catering and hospitality.
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed">
            Rent chafing dishes, buffet setups, tables, chairs, kitchen equipment, utensils, and event accessories that make every service effortless and elegant.
          </p>
          <Link
            to={ROUTES.CONTACT}
            className="inline-flex mt-10 rounded-full bg-[#E6A520] px-8 py-4 text-sm font-semibold text-[#4d3a23] shadow-xl transition hover:bg-[#ce9f1a]"
          >
            Request Rental Quote
          </Link>
        </div>
      </motion.section>

      <section className="section py-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520] mb-3">What We Rent</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Everything you need for professional event catering.
            </h2>
            <p className="mx-auto max-w-2xl text-base text-[#4d3a23] leading-relaxed">
              Our rental inventory is tailored for hospitality teams, event planners, and catering professionals seeking reliable equipment and polished presentation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {rentalItems.map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="rounded-[2rem] border border-[#E6A520]/20 bg-white p-8 shadow-[0_20px_60px_rgba(122,74,0,0.08)]"
              >
                <h3 className="text-xl font-semibold text-[#7A4A00] mb-4">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white py-16">
        <div className="section-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520] mb-4">Why Rent From Us?</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] leading-tight mb-6">
              Reliable equipment for every catering scale and setting.
            </h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3 items-start">
                <span className="text-[#E6A520] mt-1">✓</span>
                <span>High-quality catering and event equipment maintained to hospitality standards.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-[#E6A520] mt-1">✓</span>
                <span>Flexible rental terms for single events, multi-day activations, and ongoing operations.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-[#E6A520] mt-1">✓</span>
                <span>Delivered and set up for your venue with support from our hospitality team.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-[#E6A520] mt-1">✓</span>
                <span>Equipment options designed for seamless service, presentation, and guest satisfaction.</span>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-[2rem] shadow-[0_25px_60px_rgba(122,74,0,0.12)]">
            <img src={rentalImage} alt="Catering equipment rental" className="h-full w-full object-cover min-h-[460px]" />
          </div>
        </div>
      </section>

      <section className="section bg-[#7A4A00] text-white py-20">
        <div className="section-container text-center">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-6">Gear up for seamless catering execution.</h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed mb-8">
            Our equipment rental service supports your event with trusted, professional tools and hospitality-ready presentation.
          </p>
          <Link to={ROUTES.CONTACT} className="btn-secondary text-white border-white">
            Start Your Rental Request
          </Link>
        </div>
      </section>
    </div>
  );
}
