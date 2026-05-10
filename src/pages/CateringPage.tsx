import { motion } from 'framer-motion';
import { cateringInquirySchema } from '../lib/validationSchemas';
import { submitCateringInquiry } from '../services/supabaseService';
import InquiryForm from '../components/forms/InquiryForm';

export default function CateringPage() {
  const cateringFields = [
    { name: 'name', label: 'Full Name', type: 'text' as const, placeholder: 'Your name', required: true },
    { name: 'email', label: 'Email Address', type: 'email' as const, placeholder: 'your@email.com', required: true },
    { name: 'phone', label: 'Phone Number', type: 'phone' as const, placeholder: '+255 123 456 789', required: true },
    { name: 'event_date', label: 'Event Date', type: 'date' as const, required: true },
    { name: 'guest_count', label: 'Number of Guests', type: 'number' as const, required: true },
    { name: 'budget', label: 'Estimated Budget', type: 'text' as const, placeholder: 'e.g., 5,000,000 TSh' },
    { name: 'special_requirements', label: 'Special Requirements', type: 'textarea' as const, placeholder: 'Any dietary requirements, themes, or special requests?' },
  ];

  return (
    <div className="bg-[#FFF8E7]">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white py-16 md:py-24"
      >
        <div className="section-container text-center">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-[#7A4A00] mb-6">
            Premium Catering
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            From intimate gatherings to grand celebrations, transform your event with exceptional culinary artistry
          </p>
        </div>
      </motion.section>

      {/* Showcase */}
      <section className="section">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561484?w=600&h=600&fit=crop"
                alt="Premium Catering"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-6">
                Culinary Excellence for Every Occasion
              </h2>
              <ul className="space-y-4">
                {[
                  'Customizable multi-course menus',
                  'Full-service setup and breakdown',
                  'Professional catering staff',
                  'Dietary accommodation expertise',
                  'Premium locally-sourced ingredients',
                  'Seamless coordination and execution',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="text-[#E6A520] text-2xl">✓</span>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="section bg-white">
        <div className="section-container">
          <InquiryForm
            title="Catering Inquiry"
            description="Tell us about your event and we'll create the perfect culinary experience"
            schema={cateringInquirySchema}
            fields={cateringFields}
            submitButtonText="Request Catering Quote"
            onSubmit={submitCateringInquiry}
            successMessage="Thank you! We'll contact you soon with catering options."
          />
        </div>
      </section>
    </div>
  );
}
