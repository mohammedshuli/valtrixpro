import { motion } from 'framer-motion';
import { consultationSchema } from '../lib/validationSchemas';
import { submitConsultationRequest } from '../services/supabaseService';
import InquiryForm from '../components/forms/InquiryForm';

export default function ChefConsultationPage() {
  const consultationFields = [
    { name: 'name', label: 'Full Name', type: 'text' as const, placeholder: 'Your name', required: true },
    { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'your@email.com', required: true },
    { name: 'phone', label: 'Phone', type: 'phone' as const, placeholder: '+255 123 456 789', required: true },
    { name: 'consultation_type', label: 'Consultation Type', type: 'select' as const, options: [
      { value: 'menu_planning', label: 'Menu Planning' },
      { value: 'kitchen_design', label: 'Kitchen Design' },
      { value: 'staff_training', label: 'Staff Training' },
      { value: 'food_strategy', label: 'Food Strategy' },
      { value: 'restaurant_launch', label: 'Restaurant/Venue Launch' },
      { value: 'other', label: 'Other' },
    ], required: true },
    { name: 'available_dates', label: 'Available Meeting Dates', type: 'textarea' as const, placeholder: 'Your preferred dates and times for consultation' },
    { name: 'budget', label: 'Budget', type: 'text' as const, placeholder: 'Estimated consultation budget' },
    { name: 'requirements', label: 'Consultation Details', type: 'textarea' as const, placeholder: 'Tell us about your project, goals, and specific needs' },
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
            Chef Consultation
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Expert guidance for your culinary vision
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
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop"
                alt="Chef Consultation"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-6">
                Strategic Culinary Guidance
              </h2>
              <ul className="space-y-4">
                {[
                  'One-on-one executive chef sessions',
                  'Custom menu development',
                  'Kitchen design and optimization',
                  'Staff training programs',
                  'Food cost analysis',
                  'Long-term culinary strategy',
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
            title="Schedule a Consultation"
            description="Connect with our executive chef for expert culinary guidance"
            schema={consultationSchema}
            fields={consultationFields}
            submitButtonText="Request Consultation"
            onSubmit={submitConsultationRequest}
            successMessage="Thank you! We'll confirm your consultation date and details soon."
          />
        </div>
      </section>
    </div>
  );
}
