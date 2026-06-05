import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Initial Inquiry',
    description: 'Share your culinary goals, challenges, and vision for the project.',
  },
  {
    number: '02',
    title: 'Consultation Discussion',
    description: 'Meet with our executive chef to explore your needs in depth.',
  },
  {
    number: '03',
    title: 'Strategy Planning',
    description: 'Develop a comprehensive culinary and hospitality strategy.',
  },
  {
    number: '04',
    title: 'Personalized Recommendations',
    description: 'Receive actionable guidance tailored to your specific requirements.',
  },
];

export default function ConsultationProcess() {
  return (
    <section className="bg-[#FFF8E7] py-16">
      <div className="section-container">
        <div className="space-y-6 text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520]">How It Works</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
            Our Consultation Process
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#4d3a23]">
            A straightforward, professional approach to understanding and elevating your culinary vision.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-1 bg-gradient-to-r from-[#E6A520]/30 to-transparent transform translate-x-1/2 -z-10" />
              )}

              <div className="space-y-4">
                <div className="h-16 w-16 rounded-full bg-[#E6A520] flex items-center justify-center">
                  <span className="text-2xl font-playfair font-bold text-white">{step.number}</span>
                </div>
                <h3 className="text-xl font-playfair font-bold text-[#7A4A00]">{step.title}</h3>
                <p className="text-base leading-relaxed text-[#4d3a23]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
