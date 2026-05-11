import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ROUTES } from '../lib/constants';
import InquiryForm from '../components/forms/InquiryForm';
import ChefHero from '../components/private-chef/ChefHero';
import ExperienceCard from '../components/private-chef/ExperienceCard';
import FeatureHighlight from '../components/private-chef/FeatureHighlight';
import LuxuryGallery from '../components/private-chef/LuxuryGallery';
import TestimonialCard from '../components/private-chef/TestimonialCard';
import { privateChefInquirySchema, type PrivateChefInquiry } from '../lib/validationSchemas';
import { submitPrivateChefInquiry } from '../services/supabaseService';
import experienceOne from '../assets/event.jpg';
import experienceTwo from '../assets/menu.jpg';
import experienceThree from '../assets/hero-hero.jpg';
import experienceFour from '../assets/hero.png';

const signatureExperiences = [
  {
    title: 'Romantic Private Dinner',
    description: 'Intimate moments curated with fine wines, candlelit tables, and a personalized chef menu for two.',
    image: experienceOne,
  },
  {
    title: 'Executive Dining Experience',
    description: 'A discreet culinary setting designed for high-profile gatherings, strategic conversations and impeccable service.',
    image: experienceTwo,
  },
  {
    title: 'VIP Event Dining',
    description: 'Luxury hospitality brought to your venue with bespoke menus, staging, and white-glove presentation.',
    image: experienceThree,
  },
  {
    title: 'Luxury Family Gathering',
    description: 'Timeless family celebrations elevated through tailored dishes, seasonal ingredients, and elegant service.',
    image: experienceFour,
  },
  {
    title: 'Beachside Chef Experience',
    description: 'Fresh coastal cuisine served in an open-air dining moment, perfect for refined seaside celebrations.',
    image: experienceOne,
  },
  {
    title: 'Birthday Chef Experience',
    description: 'A signature private dinner designed for milestone celebrations with theatrical plating and effortless service.',
    image: experienceTwo,
  },
];

const featureHighlights = [
  {
    title: 'Personalized Menus',
    description: 'Menus crafted to your taste profile, dietary preferences, and refined culinary aspirations.',
    icon: '🍾',
  },
  {
    title: 'Professional Chef Service',
    description: 'Executive chefs and hospitality teams delivering elegance, precision, and thoughtful details.',
    icon: '👨‍🍳',
  },
  {
    title: 'Premium Ingredients',
    description: 'Rare produce, premium seafood and locally-sourced fine ingredients selected for each event.',
    icon: '🥂',
  },
  {
    title: 'Elegant Presentation',
    description: 'Artful plating and sophisticated table styling designed to impress every guest.',
    icon: '✨',
  },
  {
    title: 'Fine Dining Experience',
    description: 'A seamless private dining moment with cinematic ambiance and impeccable service flow.',
    icon: '🍽️',
  },
  {
    title: 'Luxury Hospitality',
    description: 'White-glove attention, thoughtful details, and full-service hospitality at every stage.',
    icon: '🌿',
  },
];

const testimonials = [
  {
    quote: 'Valtrix transformed our anniversary dinner into a world-class culinary experience. Every detail felt effortless and luxurious.',
    name: 'Amina J.',
    role: 'Private Dining Guest',
  },
  {
    quote: 'The chef crafted a bespoke menu that perfectly matched our tastes. The evening felt both intimate and impeccably managed.',
    name: 'James K.',
    role: 'Executive Host',
  },
  {
    quote: 'From the service to the presentation, the experience surpassed every expectation. This is premium hospitality at its finest.',
    name: 'Maya S.',
    role: 'Luxury Event Planner',
  },
];

const bookingFields = [
  { name: 'name', label: 'Name', type: 'text' as const, placeholder: 'Your full name', required: true },
  { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'your@email.com', required: true },
  { name: 'phone', label: 'Phone', type: 'phone' as const, placeholder: '+255 123 456 789', required: true },
  { name: 'event_type', label: 'Event Type', type: 'select' as const, required: true, options: [
      { value: 'Romantic Private Dinner', label: 'Romantic Private Dinner' },
      { value: 'Executive Dining Experience', label: 'Executive Dining Experience' },
      { value: 'VIP Event Dining', label: 'VIP Event Dining' },
      { value: 'Luxury Family Gathering', label: 'Luxury Family Gathering' },
      { value: 'Beachside Chef Experience', label: 'Beachside Chef Experience' },
      { value: 'Birthday Chef Experience', label: 'Birthday Chef Experience' },
    ] },
  { name: 'guest_count', label: 'Guest Count', type: 'number' as const, placeholder: 'Number of guests', required: true },
  { name: 'preferred_date', label: 'Preferred Date', type: 'date' as const, required: true },
  { name: 'location', label: 'Location', type: 'text' as const, placeholder: 'City, venue or private residence', required: true },
  { name: 'special_requests', label: 'Special Requests', type: 'textarea' as const, placeholder: 'Dietary preferences, celebrations or ambiance notes', required: false },
];

export default function PrivateChefPage() {
  return (
    <div className="bg-[#FFF8E7] text-[#1F1A12]">
      <ChefHero />

      <section className="section">
        <div className="section-container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#FFD77A] mb-4">What is the Valtrix Private Chef Experience?</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] max-w-2xl leading-tight mb-6">
              A personalized luxury dining journey created for your most meaningful moments.
            </h2>
            <p className="text-lg leading-9 text-gray-700 mb-6 max-w-2xl">
              Valtrix brings executive private chef service to exceptional homes, venues, and events. We combine tailored menus, elegant hospitality and cinematic presentation so every experience feels intimate, luxurious and unforgettable.
            </p>
            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3 items-start">
                <span className="mt-1 text-[#E6A520]">•</span>
                <span>Curated private menus shaped by your taste, occasion and setting.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1 text-[#E6A520]">•</span>
                <span>Chef-led dining that blends hospitality, storytelling and impeccable service.</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="mt-1 text-[#E6A520]">•</span>
                <span>Immersive ambiance with refined plating, premium ingredients and polished team execution.</span>
              </li>
            </ul>
          </div>
          <div className="overflow-hidden rounded-[36px] border border-[#7A4A00]/10 shadow-2xl shadow-black/5">
            <img src={experienceThree} alt="Chef preparing luxury dining" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section id="signature-experiences" className="section bg-[#F6E4C1]/80 py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520] mb-3">Signature Experiences</p>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Discover the moments we design for exceptional private dining.
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {signatureExperiences.map((item) => (
              <ExperienceCard key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#FFD77A] mb-3">Why Choose Valtrix</p>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Luxury hospitality and culinary mastery you can trust.
            </h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {featureHighlights.map((feature) => (
              <FeatureHighlight key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[#7A4A00] text-white py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#FFD77A] mb-3">Luxury Gallery</p>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold">
              Every detail is crafted to feel cinematic and unforgettable.
            </h3>
          </div>
          <LuxuryGallery />
        </div>
      </section>

      <section className="section">
        <div className="section-container">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520] mb-3">Testimonials</p>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Guests praise the artful atmosphere and flawless service.
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((item) => (
              <TestimonialCard key={item.name} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section id="booking" className="section bg-[#FFF8E7] py-20">
        <div className="section-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-[#FFD77A] mb-4">Request Your Experience</p>
            <h3 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] mb-6">
              Book a private chef experience tailored to your occasion.
            </h3>
            <p className="text-lg leading-8 text-gray-700">
              Share your event details and our team will craft a refined proposal for your luxury dining moment.
            </p>
          </div>
          <InquiryForm<PrivateChefInquiry>
            title="Request Private Chef Experience"
            description="Complete the booking request and our concierge team will follow up with a custom proposal."
            schema={privateChefInquirySchema}
            fields={bookingFields}
            submitButtonText="Request Private Chef Experience"
            onSubmit={async (data) => await submitPrivateChefInquiry(data)}
            successMessage="Thank you! Our concierge team will contact you shortly to plan your private chef experience."
          />
        </div>
      </section>
    </div>
  );
}
