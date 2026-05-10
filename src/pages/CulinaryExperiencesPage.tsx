import { motion } from 'framer-motion';
import { courseRegistrationSchema } from '../lib/validationSchemas';
import { submitCourseRegistration } from '../services/supabaseService';
import InquiryForm from '../components/forms/InquiryForm';

export default function CulinaryExperiencesPage() {
  const courseFields = [
    { name: 'name', label: 'Full Name', type: 'text' as const, placeholder: 'Your name', required: true },
    { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'your@email.com', required: true },
    { name: 'phone', label: 'Phone', type: 'phone' as const, placeholder: '+255 123 456 789', required: true },
    { name: 'course_name', label: 'Course Interest', type: 'select' as const, options: [
      { value: 'fundamentals', label: 'Culinary Fundamentals' },
      { value: 'advanced', label: 'Advanced Techniques' },
      { value: 'tanzanian', label: 'Tanzanian Cuisine Masterclass' },
      { value: 'pastry', label: 'Pastry & Desserts' },
      { value: 'plating', label: 'Plating & Presentation' },
      { value: 'wine', label: 'Wine & Food Pairing' },
    ], required: true },
    { name: 'experience_level', label: 'Experience Level', type: 'select' as const, options: [
      { value: 'beginner', label: 'Beginner' },
      { value: 'intermediate', label: 'Intermediate' },
      { value: 'advanced', label: 'Advanced' },
      { value: 'professional', label: 'Professional' },
    ] },
    { name: 'dietary_restrictions', label: 'Dietary Restrictions', type: 'textarea' as const, placeholder: 'Any allergies or restrictions we should know?' },
    { name: 'guests', label: 'Number of Participants', type: 'number' as const },
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
            Culinary Masterclasses
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Learn from executive chefs in immersive culinary experiences
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
                Hands-On Learning
              </h2>
              <ul className="space-y-4">
                {[
                  'Expert chef instruction',
                  'Interactive cooking sessions',
                  'Premium ingredients provided',
                  'Small group sizes',
                  'Take-home recipes',
                  'Certificate of completion',
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
                src="https://images.unsplash.com/photo-1556910103-1c02411297e3?w=600&h=600&fit=crop"
                alt="Culinary Experience"
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
            title="Masterclass Registration"
            description="Reserve your spot in an exclusive culinary experience"
            schema={courseRegistrationSchema}
            fields={courseFields}
            submitButtonText="Register for Masterclass"
            onSubmit={submitCourseRegistration}
            successMessage="Thank you! We'll confirm your registration and course details soon."
          />
        </div>
      </section>
    </div>
  );
}
