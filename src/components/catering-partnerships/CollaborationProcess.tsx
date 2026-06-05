import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Partnership Inquiry',
    description: 'Share your hospitality goals, venue requirements, and partnership vision.',
  },
  {
    number: '02',
    title: 'Consultation Meeting',
    description: 'Meet with our partnerships team to explore collaboration opportunities and alignment.',
  },
  {
    number: '03',
    title: 'Collaboration Planning',
    description: 'Develop a comprehensive partnership strategy and operational framework.',
  },
  {
    number: '04',
    title: 'Partnership Execution',
    description: 'Launch the partnership with ongoing support, excellence, and continuous optimization.',
  },
];

export default function CollaborationProcess() {
  return (
    <section className="bg-white py-16">
      <div className="section-container">
        <div className="space-y-6 text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520]">Our Approach</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
            Partnership Collaboration Process
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#4d3a23]">
            A structured, professional approach to building lasting hospitality partnerships.
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
