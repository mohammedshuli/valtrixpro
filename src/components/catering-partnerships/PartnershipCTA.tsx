import { motion } from 'framer-motion';
import InquiryForm from '../forms/InquiryForm';
import { cateringInquirySchema } from '../../lib/validationSchemas';
import { submitCateringInquiry } from '../../services/supabaseService';

export default function PartnershipCTA() {
  const partnershipFields = [
    { name: 'name', label: 'Contact Name', type: 'text' as const, placeholder: 'Your name', required: true },
    { name: 'email', label: 'Email Address', type: 'email' as const, placeholder: 'your@company.com', required: true },
    { name: 'phone', label: 'Phone Number', type: 'phone' as const, placeholder: '+255 123 456 789', required: true },
    {
      name: 'catering_style',
      label: 'Partnership Type',
      type: 'select' as const,
      options: [
        { value: 'venue_partnership', label: 'Event Venue Partnership' },
        { value: 'corporate_hospitality', label: 'Corporate Hospitality' },
        { value: 'wedding_planner', label: 'Wedding Planner Collaboration' },
        { value: 'hotel_resort', label: 'Hotel & Resort Partnership' },
        { value: 'business_events', label: 'Business Event Support' },
        { value: 'luxury_brand', label: 'Luxury Brand Collaboration' },
      ],
      required: true,
    },
    {
      name: 'requirements',
      label: 'Partnership Details',
      type: 'textarea' as const,
      placeholder: 'Tell us about your organization, partnership goals, and collaboration opportunities',
    },
  ];

  return (
    <section id="partnership-cta" className="bg-[#FFF8E7] py-16">
      <div className="section-container grid gap-12 lg:grid-cols-[1fr_0.95fr] items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520]">Get Started</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] leading-tight">
            Request a Partnership Discussion
          </h2>
          <p className="max-w-2xl text-base text-[#4d3a23] leading-relaxed">
            Share your partnership interest and operational requirements. Our partnerships team will schedule a consultation to explore collaboration opportunities.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="https://wa.me/255655734453?text=Hello%20Valtrix%20Pro%20Chef%2C%20I%27m%20interested%20in%20catering%20partnership%20opportunities."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#7A4A00] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#5f3f00]"
            >
              WhatsApp Business Inquiry
            </a>
            <a
              href="mailto:valtrixprofchef@gmail.com?subject=Catering%20Partnership%20Inquiry"
              className="inline-flex items-center justify-center rounded-full border border-[#7A4A00] bg-white px-8 py-4 text-base font-semibold text-[#7A4A00] transition-all duration-300 hover:bg-[#FFF8E7]"
            >
              Email Inquiry
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <InquiryForm
            title="Partnership Inquiry"
            description="Professional hospitality collaboration request"
            schema={cateringInquirySchema}
            fields={partnershipFields}
            submitButtonText="Request Partnership Discussion"
            onSubmit={submitCateringInquiry}
            successMessage="Thank you for your inquiry. Our partnerships team will reach out shortly."
          />
        </motion.div>
      </div>
    </section>
  );
}
