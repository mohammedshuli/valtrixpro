import { motion } from 'framer-motion';
import { ROUTES } from '../lib/constants';
import { Link } from 'react-router-dom';
import musa from '../assets/musa.jpg';
import sule from '../assets/sule.png';
import mo from '../assets/mo.png';
import kassim from '../assets/kassim.png';
import shuli from '../assets/shuli.png';
import hemed from '../assets/hemed.png';

export default function AboutPage() {
  const teamMembers = [
    { name: 'Chef Mussa Abdalla', role: 'Founder and CEO', image: musa },
    { name: 'Chef Suleyman', role: 'Head of Events', image: sule },
    { name: 'Chef Mohammed Noty', role: 'Culinary Director', image: mo },
    { name: 'Kassim Abdallah', role: 'Executive Chef', image: kassim },
    { name: 'Mohammed Shuli', role: 'Sous Chef', image: shuli },
    { name: 'Ahmed Notty', role: 'Chef de Partie', image: hemed },
  ];

  return (
    <div className="bg-[#FFF8E7]">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white py-20"
      >
        <div className="section-container text-center">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-[#7A4A00] mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Valtrix Pro Chef is Tanzania's premier culinary and hospitality brand, crafted from a passion for excellence and a commitment to transforming culinary experiences into unforgettable moments.
          </p>
        </div>
      </motion.section>

      {/* Mission & Vision */}
      <section className="section">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-lg shadow-lg"
            >
              <h2 className="text-3xl font-playfair font-bold text-[#E6A520] mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 text-lg">
                To elevate culinary experiences across Tanzania by delivering world-class gastronomy, exceptional service, and memorable moments that reflect our commitment to excellence and innovation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white p-12 rounded-lg shadow-lg"
            >
              <h2 className="text-3xl font-playfair font-bold text-[#E6A520] mb-4">
                Our Vision
              </h2>
              <p className="text-gray-700 text-lg">
                To be recognized as Tanzania's most respected luxury culinary brand, setting international standards for hospitality, innovation, and culinary excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-white">
        <div className="section-container">
          <h2 className="text-4xl font-playfair font-bold text-[#7A4A00] text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Excellence', desc: 'Uncompromising quality in every detail' },
              { title: 'Innovation', desc: 'Constantly evolving culinary creativity' },
              { title: 'Integrity', desc: 'Transparent and authentic relationships' },
              { title: 'Sustainability', desc: 'Local sourcing and responsible practices' },
              { title: 'Hospitality', desc: 'Genuine care and service excellence' },
              { title: 'Passion', desc: 'Dedication to culinary artistry' },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#FFF8E7] p-8 rounded-lg text-center border-t-4 border-[#E6A520]"
              >
                <h3 className="text-2xl font-playfair font-bold text-[#7A4A00] mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-700">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section">
        <div className="section-container">
          <h2 className="text-4xl font-playfair font-bold text-[#7A4A00] text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden text-center"
              >
                <img src={member.image} alt={member.name} className="w-full h-60 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-playfair font-bold text-[#7A4A00] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#E6A520] font-semibold">
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[#7A4A00] text-white">
        <div className="section-container text-center">
          <h2 className="text-4xl font-playfair font-bold mb-6">
            Experience Our Excellence
          </h2>
          <Link to={ROUTES.CONTACT} className="btn-secondary text-white border-white">
            Get In Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
