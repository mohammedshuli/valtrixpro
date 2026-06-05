import { motion } from 'framer-motion';
import InquiryForm from '../components/forms/InquiryForm';
import CateringHero from '../components/catering/CateringHero';
import CateringCategoryCard from '../components/catering/CateringCategoryCard';
import EventExperienceCard from '../components/catering/EventExperienceCard';
import CateringGallery from '../components/catering/CateringGallery';
import ProcessTimeline from '../components/catering/ProcessTimeline';
import TestimonialCard from '../components/catering/TestimonialCard';
import { cateringInquirySchema } from '../lib/validationSchemas';
import { submitCateringInquiry } from '../services/supabaseService';
import experienceOne from '../assets/event.jpg';
import experienceTwo from '../assets/menu.jpg';
import experienceThree from '../assets/hero-hero.jpg';
import experienceFour from '../assets/hero.png';

const cateringCategories = [
  {
    title: 'Wedding Catering',
    description: 'Elegant wedding receptions with bespoke menus, premium presentation, and exceptional service for your special day.',
    image: experienceOne,
  },
  {
    title: 'Corporate Catering',
    description: 'Professional corporate dining for meetings, conferences, and business events with sophisticated presentation.',
    image: experienceTwo,
  },
  {
    title: 'VIP Events',
    description: 'Exclusive VIP catering with world-class cuisine, private service, and luxury amenities for distinguished gatherings.',
    image: experienceThree,
  },
  {
    title: 'Birthday Celebrations',
    description: 'Themed birthday catering with custom cakes, decorative displays, and memorable culinary experiences.',
    image: experienceFour,
  },
  {
    title: 'Private Parties',
    description: 'Intimate private party catering with personalized menus and elegant atmosphere for special occasions.',
    image: experienceOne,
  },
  {
    title: 'Outdoor Catering',
    description: 'Premium outdoor event catering with fresh ingredients, portable elegance, and seamless execution.',
    image: experienceTwo,
  },
  {
    title: 'Executive Dining',
    description: 'Sophisticated executive dining for high-profile gatherings, strategic conversations, and impeccable service.',
    image: experienceThree,
  },
  {
    title: 'Luxury Family Events',
    description: 'Elegant family celebration catering with timeless dishes, premium presentation, and joyful hospitality.',
    image: experienceFour,
  },
];

const signatureExperiences = [
  {
    title: 'Luxury Wedding Reception',
    description: 'A grand celebration with multi-course menus, elegant table settings, and white-glove service.',
    image: experienceOne,
  },
  {
    title: 'Executive Corporate Gala',
    description: 'Sophisticated corporate dining with premium ingredients and professional hospitality.',
    image: experienceTwo,
  },
  {
    title: 'Beachside Catering Experience',
    description: 'Fresh coastal cuisine served in an open-air setting with refined presentation.',
    image: experienceThree,
  },
  {
    title: 'VIP Celebration Dinner',
    description: 'Exclusive private dining with bespoke menus and luxury service execution.',
    image: experienceFour,
  },
  {
    title: 'Premium Outdoor Event',
    description: 'Elegant outdoor catering with portable luxury and seamless event coordination.',
    image: experienceOne,
  },
  {
    title: 'Elegant Family Banquet',
    description: 'Timeless family celebrations elevated through sophisticated culinary artistry.',
    image: experienceTwo,
  },
];

const featureHighlights = [
  {
    title: 'Professional Hospitality Team',
    description: 'Experienced service professionals delivering impeccable execution and attention to detail.',
    icon: '👥',
  },
  {
    title: 'Personalized Catering Menus',
    description: 'Custom menus crafted to your event theme, dietary preferences, and culinary aspirations.',
    icon: '📋',
  },
  {
    title: 'Premium Ingredients',
    description: 'Rare produce, premium seafood, and locally-sourced fine ingredients for exceptional quality.',
    icon: '🥂',
  },
  {
    title: 'Elegant Food Presentation',
    description: 'Artful plating and sophisticated presentation designed to impress every guest.',
    icon: '✨',
  },
  {
    title: 'Event Coordination Support',
    description: 'Full-service coordination including setup, staffing, and seamless event execution.',
    icon: '🎯',
  },
  {
    title: 'Luxury Dining Setup',
    description: 'Premium tableware, elegant linens, and sophisticated ambiance for memorable events.',
    icon: '🍽️',
  },
  {
    title: 'Reliable Event Execution',
    description: 'Proven track record of flawless execution across hundreds of premium events.',
    icon: '⭐',
  },
  {
    title: 'High-End Culinary Standards',
    description: 'Executive chef oversight ensuring every dish meets the highest culinary excellence.',
    icon: '👨‍🍳',
  },
];

const testimonials = [
  {
    quote: 'Valtrix transformed our corporate gala into a world-class dining experience. Every detail was executed flawlessly.',
    name: 'Sarah M.',
    role: 'Event Director',
    eventType: 'Corporate Gala - 200 guests',
  },
  {
    quote: 'The wedding catering exceeded our expectations. The presentation was stunning and the service impeccable.',
    name: 'David K.',
    role: 'Bridegroom',
    eventType: 'Luxury Wedding Reception',
  },
  {
    quote: 'From the initial consultation to the final course, Valtrix delivered premium hospitality that made our event unforgettable.',
    name: 'Maria L.',
    role: 'Event Planner',
    eventType: 'VIP Private Dinner',
  },
];

export default function CateringPage() {
  const cateringFields = [
    { name: 'name', label: 'Name', type: 'text' as const, placeholder: 'Your full name', required: true },
    { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'your@email.com', required: true },
    { name: 'phone', label: 'Phone', type: 'phone' as const, placeholder: '+255 123 456 789', required: true },
    { name: 'event_type', label: 'Event Type', type: 'select' as const, required: true, options: [
        { value: 'Wedding', label: 'Wedding Reception' },
        { value: 'Corporate', label: 'Corporate Event' },
        { value: 'Birthday', label: 'Birthday Celebration' },
        { value: 'Private Party', label: 'Private Party' },
        { value: 'VIP Event', label: 'VIP Event' },
        { value: 'Family Event', label: 'Family Event' },
        { value: 'Other', label: 'Other' },
      ] },
    { name: 'guest_count', label: 'Guest Count', type: 'number' as const, placeholder: 'Number of guests', required: true },
    { name: 'event_date', label: 'Event Date', type: 'date' as const, required: true },
    { name: 'location', label: 'Venue/Location', type: 'text' as const, placeholder: 'Event venue or location', required: true },
    { name: 'catering_style', label: 'Catering Style', type: 'select' as const, required: false, options: [
        { value: 'Buffet', label: 'Buffet Service' },
        { value: 'Plated', label: 'Plated Service' },
        { value: 'Family Style', label: 'Family Style' },
        { value: 'Cocktail Reception', label: 'Cocktail Reception' },
        { value: 'Mixed', label: 'Mixed Service' },
      ] },
    { name: 'special_requirements', label: 'Special Requirements', type: 'textarea' as const, placeholder: 'Dietary restrictions, themes, ambiance preferences, or special requests', required: false },
  ];

  return (
    <div className="bg-[#FFF8E7] text-[#1F1A12]">
      <CateringHero />

      <section className="section">
        <div className="section-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#FFD77A] mb-4">Premium Catering Experience</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] max-w-2xl leading-tight mb-6">
              What makes Valtrix Premium Catering different?
            </h2>
            <p className="text-lg leading-9 text-gray-700 mb-6 max-w-2xl">
              Valtrix brings luxury hospitality to every event through premium ingredients, professional execution, and sophisticated presentation. We don't just cater events—we elevate them into unforgettable experiences.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3 items-start">
                <span className="mt-1 text-[#E6A520]">•</span>
                <span>Executive chef-crafted menus with premium, locally-sourced ingredients.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1 text-[#E6A520]">•</span>
                <span>Professional hospitality team delivering impeccable service and coordination.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1 text-[#E6A520]">•</span>
                <span>Elegant presentation and sophisticated ambiance for memorable events.</span>
              </li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-[36px] border border-[#7A4A00]/10 shadow-2xl shadow-black/5">
            <img src={experienceThree} alt="Premium catering presentation" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="section bg-[#F6E4C1]/80 py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520] mb-3">Catering Services</p>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Comprehensive catering solutions for every occasion.
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {cateringCategories.map((category) => (
              <CateringCategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </section>

      <section id="experiences" className="section">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#FFD77A] mb-3">Signature Experiences</p>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Discover the events we bring to life with premium hospitality.
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {signatureExperiences.map((experience) => (
              <EventExperienceCard key={experience.title} {...experience} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#7A4A00] text-white py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#FFD77A] mb-3">Why Choose Valtrix</p>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold">
              Luxury hospitality and culinary excellence you can trust.
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featureHighlights.map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="group rounded-3xl border border-[#FFD77A]/15 bg-white/10 p-6 shadow-lg shadow-black/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF0C4] text-2xl text-[#7A4A00] mb-5">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-white mb-3">{feature.title}</h4>
                <p className="text-[#F7E9CD] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520] mb-3">Premium Gallery</p>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Every event is crafted with elegance and sophistication.
            </h3>
          </div>
          <CateringGallery />
        </div>
      </section>

      <section className="section bg-[#F6E4C1]/80 py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#FFD77A] mb-3">Our Process</p>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              How we transform your vision into premium reality.
            </h3>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520] mb-3">Client Testimonials</p>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Events that speak for themselves through our clients' experiences.
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section id="inquiry" className="section bg-[#FFF8E7] py-20">
        <div className="section-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#FFD77A] mb-4">Request Premium Catering</p>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] mb-6">
              Let's create an unforgettable event together.
            </h3>
            <p className="text-lg leading-8 text-gray-700">
              Share your event details and our premium catering team will craft a sophisticated proposal tailored to your vision.
            </p>
          </div>
          <InquiryForm
            title="Premium Catering Inquiry"
            description="Complete the catering request form and our hospitality team will follow up with a custom event proposal."
            schema={cateringInquirySchema}
            fields={cateringFields}
            submitButtonText="Request Premium Catering"
            onSubmit={async (data) => await submitCateringInquiry(data)}
            successMessage="Thank you! Our premium catering team will contact you shortly to discuss your event vision."
          />
        </div>
      </section>
    </div>
  );
}
