import { motion } from 'framer-motion';
import { mealInquirySchema } from '../lib/validationSchemas';
import { submitMealInquiry } from '../services/supabaseService';
import InquiryForm from '../components/forms/InquiryForm';

export default function MealPrepPage() {
  const mealFields = [
    { name: 'name', label: 'Full Name', type: 'text' as const, placeholder: 'Your name', required: true },
    { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'your@email.com', required: true },
    { name: 'phone', label: 'Phone', type: 'phone' as const, placeholder: '+255 123 456 789', required: true },
    { name: 'meal_type', label: 'Meal Type', type: 'select' as const, options: [
      { value: 'salads', label: 'Salads & Vegetables' },
      { value: 'juices', label: 'Cold-Pressed Juices' },
      { value: 'proteins', label: 'Protein Bowls' },
      { value: 'mixed', label: 'Mixed Weekly Menu' },
      { value: 'custom', label: 'Custom Plan' },
    ], required: true },
    { name: 'delivery_frequency', label: 'Delivery Frequency', type: 'select' as const, options: [
      { value: 'daily', label: 'Daily' },
      { value: '3x_week', label: '3x per week' },
      { value: '2x_week', label: '2x per week' },
      { value: 'weekly', label: 'Weekly' },
      { value: 'custom', label: 'Custom' },
    ] },
    { name: 'dietary_requirements', label: 'Dietary Requirements', type: 'textarea' as const, placeholder: 'Allergies, restrictions, preferences...' },
    { name: 'quantity', label: 'Portions per Delivery', type: 'number' as const },
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
            Valtrix Fresh
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Premium nutrition delivered daily. Fresh, nutritious, sustainably prepared meals
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
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=600&fit=crop"
                alt="Valtrix Fresh"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-6">
                Wellness Meal Prep
              </h2>
              <ul className="space-y-4">
                {[
                  'Fresh local ingredients daily',
                  'Nutrient-balanced recipes',
                  'Customizable dietary plans',
                  'Cold-pressed juices',
                  'Direct delivery to your door',
                  'Flexible scheduling',
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
            title="Valtrix Fresh Inquiry"
            description="Start your wellness journey with premium meal prep"
            schema={mealInquirySchema}
            fields={mealFields}
            submitButtonText="Customize Your Meal Plan"
            onSubmit={submitMealInquiry}
            successMessage="Thank you! We'll design your perfect meal plan and contact you soon."
          />
        </div>
      </section>
    </div>
  );
}
