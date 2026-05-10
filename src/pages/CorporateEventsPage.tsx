import { motion } from 'framer-motion';
import { corporateEventSchema } from '../lib/validationSchemas';
import { submitCorporateEventInquiry } from '../services/supabaseService';
import InquiryForm from '../components/forms/InquiryForm';

export default function CorporateEventsPage() {
  const corporateFields = [
    { name: 'company_name', label: 'Company Name', type: 'text' as const, placeholder: 'Your company', required: true },
    { name: 'contact_name', label: 'Contact Person', type: 'text' as const, placeholder: 'Your name', required: true },
    { name: 'email', label: 'Email Address', type: 'email' as const, placeholder: 'your@company.com', required: true },
    { name: 'phone', label: 'Phone Number', type: 'phone' as const, placeholder: '+255 123 456 789', required: true },
    { name: 'event_type', label: 'Event Type', type: 'select' as const, options: [
      { value: 'conference', label: 'Conference' },
      { value: 'networking', label: 'Networking Event' },
      { value: 'product_launch', label: 'Product Launch' },
      { value: 'team_building', label: 'Team Building' },
      { value: 'awards', label: 'Awards Ceremony' },
      { value: 'other', label: 'Other' },
    ], required: true },
    { name: 'event_date', label: 'Event Date', type: 'date' as const, required: true },
    { name: 'guest_count', label: 'Expected Attendees', type: 'number' as const, required: true },
    { name: 'budget', label: 'Budget Range', type: 'text' as const, placeholder: 'e.g., 10,000,000 - 20,000,000 TSh' },
    { name: 'requirements', label: 'Special Requirements', type: 'textarea' as const, placeholder: 'Dietary requirements, theme, logistics...' },
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
            Corporate Events
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Impress stakeholders and motivate teams with sophisticated culinary excellence
          </p>
        </div>
      </motion.section>

      {/* Showcase */}
      <section className="section">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-6">
                B2B Culinary Solutions
              </h2>
              <ul className="space-y-4">
                {[
                  'Full event planning and coordination',
                  'Executive catering with premium service',
                  'Flexible menu curation',
                  'Professional table management',
                  'Seamless logistics execution',
                  'Memorable branded experiences',
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="text-[#E6A520] text-2xl">✓</span>
                    <span className="text-gray-700 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1519167758993-41d2f9c991cc?w=600&h=600&fit=crop"
                alt="Corporate Events"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="section bg-white">
        <div className="section-container">
          <InquiryForm
            title="Corporate Event Inquiry"
            description="Let's create an unforgettable corporate experience"
            schema={corporateEventSchema}
            fields={corporateFields}
            submitButtonText="Request Event Proposal"
            onSubmit={submitCorporateEventInquiry}
            successMessage="Thank you! Our team will review your event and propose a tailored solution."
          />
        </div>
      </section>
    </div>
  );
}
