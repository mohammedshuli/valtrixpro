import { motion } from 'framer-motion';

const benefits = [
  {
    title: 'Professional Hospitality Standards',
    description: 'Consistently deliver premium culinary quality and service excellence aligned with luxury hospitality benchmarks.',
  },
  {
    title: 'Reliable Event Execution',
    description: 'Proven operational expertise with seamless coordination, flawless execution, and comprehensive event management.',
  },
  {
    title: 'Premium Culinary Service',
    description: 'Expert culinary teams, custom menu development, and refined presentation that elevate every dining experience.',
  },
  {
    title: 'Flexible Collaboration Models',
    description: 'Scalable partnership structures designed to align with your business goals and operational requirements.',
  },
  {
    title: 'Modern Brand Presentation',
    description: 'Contemporary hospitality branding and refined aesthetics that enhance your venue or event presence.',
  },
  {
    title: 'Experienced Hospitality Team',
    description: 'Dedicated professional staff with extensive luxury hospitality experience and unwavering commitment to excellence.',
  },
];

export default function WhyPartnerSection() {
  return (
    <section className="bg-[#FFF8E7] py-16">
      <div className="section-container">
        <div className="space-y-6 text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-[#E6A520]">Partnership Benefits</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
            Why Partner With Valtrix Pro Chef
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#4d3a23]">
            A trusted hospitality partner dedicated to operational excellence and long-term collaborative success.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, idx) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="rounded-[1.5rem] border border-[#E6A520]/20 bg-white p-8 shadow-[0_15px_50px_rgba(122,74,0,0.06)]"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="h-10 w-10 rounded-full bg-[#E6A520]/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-[#E6A520]">✓</span>
                </div>
                <h3 className="text-xl font-playfair font-bold text-[#7A4A00]">{benefit.title}</h3>
              </div>
              <p className="text-base leading-relaxed text-[#4d3a23]">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
