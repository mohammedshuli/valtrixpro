import { motion } from 'framer-motion';

const processSteps = [
  {
    step: '01',
    title: 'Consultation',
    description: 'We discuss your vision, preferences, and event requirements to understand your unique needs.',
    icon: '💬',
  },
  {
    step: '02',
    title: 'Menu Planning',
    description: 'Our chefs craft personalized menus with premium ingredients tailored to your event theme.',
    icon: '📝',
  },
  {
    step: '03',
    title: 'Event Coordination',
    description: 'We coordinate logistics, staffing, and setup to ensure seamless execution.',
    icon: '🎯',
  },
  {
    step: '04',
    title: 'Culinary Preparation',
    description: 'Fresh preparation of premium ingredients with meticulous attention to quality and presentation.',
    icon: '👨‍🍳',
  },
  {
    step: '05',
    title: 'Elegant Service Execution',
    description: 'Professional hospitality team delivers impeccable service throughout your event.',
    icon: '✨',
  },
];

export default function ProcessTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#E6A520] to-[#FFD77A] opacity-30" />
      <div className="space-y-12">
        {processSteps.map((step, idx) => (
          <motion.div
            key={step.step}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
            className="relative flex gap-8 items-start"
          >
            <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#E6A520] flex items-center justify-center text-white font-bold text-lg shadow-lg">
              {step.step}
            </div>
            <div className="flex-1 pb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{step.icon}</span>
                <h3 className="text-2xl font-playfair font-bold text-[#7A4A00]">{step.title}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}