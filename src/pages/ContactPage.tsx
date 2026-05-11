import { motion } from 'framer-motion';
import { contactMessageSchema } from '../lib/validationSchemas';
import { submitContactMessage } from '../services/supabaseService';
import InquiryForm from '../components/forms/InquiryForm';

export default function ContactPage() {
  const contactFields = [
    { name: 'name', label: 'Full Name', type: 'text' as const, placeholder: 'Your name', required: true },
    { name: 'email', label: 'Email Address', type: 'email' as const, placeholder: 'your@email.com', required: true },
    { name: 'phone', label: 'Phone Number', type: 'phone' as const, placeholder: '+255 123 456 789' },
    { name: 'subject', label: 'Subject', type: 'text' as const, placeholder: 'What is this about?' },
    { name: 'message', label: 'Message', type: 'textarea' as const, placeholder: 'Tell us more...', required: true },
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
            Get In Touch
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Let's create something extraordinary together.
          </p>
        </div>
      </motion.section>

      {/* Contact Info + Form */}
      <section className="section">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-playfair font-bold text-[#7A4A00] mb-8">
                  Contact Information
                </h2>

                <div className="space-y-8">
                  {/* Address */}
                  <div>
                    <h3 className="text-lg font-playfair font-bold text-[#E6A520] mb-2">
                      📍Location
                    </h3>
                    <p className="text-gray-700">
                      Dar es Salaam<br />
                      Tanzania
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <h3 className="text-lg font-playfair font-bold text-[#E6A520] mb-2">
                      ✉️ Email
                    </h3>
                    <a href="mailto:valtrixprofchef@gmail.com" className="text-[#E6A520] hover:text-[#C68A1A] font-semibold">
                      valtrixprofchef@gmail.com
                    </a>
                  </div>

                  {/* Phone */}
                  <div>
                    <h3 className="text-lg font-playfair font-bold text-[#E6A520] mb-2">
                      📞 Phone
                    </h3>
                    <a href="tel:+255655734453" className="text-[#E6A520] hover:text-[#C68A1A] font-semibold">
                      +255 655 734 453
                    </a>
                  </div>

                  {/* Hours */}
                  <div>
                    <h3 className="text-lg font-playfair font-bold text-[#E6A520] mb-2">
                      🕒 Hours
                    </h3>
                    <p className="text-gray-700">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 8:00 AM - 4:00 PM<br />
                      Sunday: By appointment
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <InquiryForm
                title="Send us a Message"
                description="We typically respond within 24 hours"
                schema={contactMessageSchema}
                fields={contactFields}
                submitButtonText="Send Message"
                onSubmit={submitContactMessage}
                successMessage="Thank you for reaching out! We'll get back to you soon."
              />
            </motion.div>
          </div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-300 rounded-lg overflow-hidden h-96 shadow-lg"
          >
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.2670901905567!2d39.2036353!3d-6.8019685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4c4e7e9e9e9e9%3A0x1234567890!2sDar%20es%20Salaam%2C%20Tanzania!5e0!3m2!1sen!2sus!4v1234567890"
            ></iframe>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
