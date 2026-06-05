import { motion } from 'framer-motion';
import conferenceImg from '../../assets/event.jpg';
import networkingImg from '../../assets/menu.jpg';
import productLaunchImg from '../../assets/hero-hero.jpg';
import vipDinnerImg from '../../assets/hero.png';

const eventTypes = [
  {
    title: 'Executive Conferences',
    description: 'Sophisticated catering for corporate conferences and board meetings with premium presentation.',
    image: conferenceImg,
  },
  {
    title: 'Business Networking',
    description: 'Elegant networking events with refined dining experiences and professional hospitality.',
    image: networkingImg,
  },
  {
    title: 'Product Launches',
    description: 'Memorable product launch events with innovative culinary presentations and VIP service.',
    image: productLaunchImg,
  },
  {
    title: 'VIP Corporate Dinners',
    description: 'Exclusive executive dining experiences for high-level business relationships and celebrations.',
    image: vipDinnerImg,
  },
];

export default function EventTypeShowcase() {
  return (
    <section id="experiences" className="py-32 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-[#7A4A00] mb-6">
            Corporate Event
            <br />
            <span className="text-[#E6A520]">Specializations</span>
          </h2>
          <div className="w-24 h-px bg-[#E6A520] mx-auto mb-8" />
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Tailored hospitality solutions for every corporate occasion,
            from intimate executive meetings to grand company celebrations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {eventTypes.map((event, index) => (
            <motion.div
              key={event.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden bg-gray-50"
            >
              <div className="relative h-80 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="text-2xl font-playfair font-bold mb-3">{event.title}</h3>
                  <p className="text-gray-200 leading-relaxed">{event.description}</p>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#E6A520]/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <div className="text-6xl mb-4">✨</div>
                  <p className="text-lg font-semibold">Learn More</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}