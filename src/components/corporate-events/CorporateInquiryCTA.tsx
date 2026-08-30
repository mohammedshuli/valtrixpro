import { motion } from 'framer-motion';
import InquiryForm from '../forms/InquiryForm';
import { corporateEventSchema, type CorporateEvent } from '../../lib/validationSchemas';
import { submitCorporateEventInquiry } from '../../services/supabaseService';

const corporateFields = [
  { name: 'company_name', label: 'Company Name', type: 'text' as const, placeholder: 'Your company name', required: true },
  { name: 'contact_name', label: 'Contact Person', type: 'text' as const, placeholder: 'Your full name', required: true },
  { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'your@company.com', required: true },
  { name: 'phone', label: 'Phone', type: 'phone' as const, placeholder: '+255 123 456 789', required: true },
  { name: 'event_type', label: 'Event Type', type: 'select' as const, required: true, options: [
      { value: 'Executive Conference', label: 'Executive Conference' },
      { value: 'Corporate Networking', label: 'Corporate Networking' },
      { value: 'Product Launch', label: 'Product Launch' },
      { value: 'VIP Dinner', label: 'VIP Corporate Dinner' },
      { value: 'Team Building', label: 'Team Building Event' },
      { value: 'Awards Ceremony', label: 'Awards Ceremony' },
      { value: 'Board Meeting', label: 'Board Meeting' },
      { value: 'Other', label: 'Other' },
    ] },
  { name: 'guest_count', label: 'Expected Attendees', type: 'number' as const, placeholder: 'Number of guests', required: true },
  { name: 'event_date', label: 'Event Date', type: 'date' as const, required: true },
  { name: 'requirements', label: 'Special Requirements', type: 'textarea' as const, placeholder: 'Dietary requirements, venue details, theme preferences, or special requests', required: false },
];

export default function CorporateInquiryCTA() {
  return (
    <section id="inquiry" className="py-32 bg-[#FFF8E7]">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] leading-tight">
                Request Corporate
                <br />
                <span className="text-[#E6A520]">Hospitality Service</span>
              </h2>
              <div className="w-16 h-px bg-[#E6A520]" />
            </div>

            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Let's discuss your corporate event vision. Our executive hospitality team will
                create a tailored proposal that elevates your business occasion.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#E6A520] rounded-full" />
                  <span className="text-gray-700">Custom executive menu planning</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#E6A520] rounded-full" />
                  <span className="text-gray-700">Professional hospitality coordination</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#E6A520] rounded-full" />
                  <span className="text-gray-700">Premium service execution</span>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-[#25D366] text-white p-6 rounded-none shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">💬</div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Quick Consultation</h3>
                  <p className="text-sm opacity-90">Chat with our corporate hospitality experts</p>
                </div>
                <a
                  href="https://wa.me/255123456789?text=Hello%20Valtrix%20Pro%20Chef%20-%20I'd%20like%20to%20discuss%20corporate%20hospitality%20services"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto bg-white text-[#25D366] px-6 py-2 font-semibold hover:bg-gray-100 transition-colors"
                >
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            <InquiryForm<CorporateEvent>
              title="Corporate Event Inquiry"
              description="Tell us about your corporate event and we'll create a premium hospitality proposal."
              schema={corporateEventSchema}
              fields={corporateFields}
              submitButtonText="Request Corporate Proposal"
              onSubmit={async (data) => await submitCorporateEventInquiry(data)}
              successMessage="Thank you! Our corporate hospitality team will contact you within 24 hours with a tailored proposal."
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}