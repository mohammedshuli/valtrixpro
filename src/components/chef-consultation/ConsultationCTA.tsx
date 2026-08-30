import { motion } from 'framer-motion';
import { consultationSchema } from '../../lib/validationSchemas';
import { submitConsultationRequest } from '../../services/supabaseService';
import InquiryForm from '../forms/InquiryForm';

export default function ConsultationCTA() {
  const consultationFields = [
    { name: 'name', label: 'Full Name', type: 'text' as const, placeholder: 'Your name', required: true },
    { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'your@email.com', required: true },
    { name: 'phone', label: 'Phone', type: 'phone' as const, placeholder: '+255 123 456 789', required: true },
    {
      name: 'consultation_type',
      label: 'Consultation Focus',
      type: 'select' as const,
      options: [
        { value: 'menu_planning', label: 'Menu Development' },
        { value: 'catering_consultation', label: 'Catering Consultation' },
        { value: 'hospitality_advisory', label: 'Hospitality Experience Advisory' },
        { value: 'food_presentation', label: 'Food Presentation Guidance' },
        { value: 'dining_concepts', label: 'Premium Dining Concepts' },
        { value: 'other', label: 'Other Culinary Consulting' },
      ],
      required: true,
    },
    {
      name: 'requirements',
      label: 'Consultation Details',
      type: 'textarea' as const,
      placeholder: 'Tell us about your project, goals, and what culinary expertise you need',
    },
  ];

  return (
    <section id="consultation-cta" className="bg-white py-16">
      <div className="section-container grid gap-12 lg:grid-cols-[1fr_0.9fr] items-start">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520]">Get Started</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] leading-tight">
            Request Your Chef Consultation
          </h2>
          <p className="max-w-2xl text-base text-[#4d3a23] leading-relaxed">
            Share details about your culinary needs, and our executive chef team will reach out to schedule your consultation.
          </p>
          <div className="flex flex-col gap-4">
            <a
              href="https://wa.me/255655734453?text=Hello%20Valtrix%20Pro%20Chef%2C%20I%27m%20interested%20in%20chef%20consultation%20services."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-[#7A4A00] px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-[#5f3f00]"
            >
              WhatsApp Consultation
            </a>
            <a
              href="mailto:valtrixprofchef@gmail.com?subject=Chef%20Consultation%20Request"
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
            title="Consultation Request"
            description="Professional culinary guidance tailored to your needs"
            schema={consultationSchema}
            fields={consultationFields}
            submitButtonText="Request Consultation"
            onSubmit={submitConsultationRequest}
            successMessage="Thank you for your inquiry. Our chef team will be in touch soon."
          />
        </motion.div>
      </div>
    </section>
  );
}
