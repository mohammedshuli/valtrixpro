import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import gallery1 from '../../assets/event.jpg';
import gallery2 from '../../assets/menu.jpg';
import gallery3 from '../../assets/hero-hero.jpg';
import gallery4 from '../../assets/hero.png';

const galleryImages = [gallery1, gallery2, gallery3, gallery4];

export default function CorporateGalleryStrip() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 bg-[#7A4A00] overflow-hidden">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6">
            Corporate
            <br />
            <span className="text-[#FFD77A]">Moments</span>
          </h2>
          <div className="w-24 h-px bg-[#FFD77A] mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Capturing the essence of premium corporate hospitality
            and executive dining experiences.
          </p>
        </motion.div>

        {/* Gallery Slider */}
        <div className="relative">
          <motion.div
            className="flex"
            animate={{ x: `-${currentIndex * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="relative overflow-hidden rounded-none shadow-2xl"
                >
                  <img
                    src={image}
                    alt={`Corporate event ${index + 1}`}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </motion.div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#FFD77A] scale-125'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center"
        >
          <div>
            <div className="text-4xl font-bold text-[#FFD77A] mb-2">500+</div>
            <div className="text-white/80 uppercase text-sm tracking-wide">Events Served</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#FFD77A] mb-2">50+</div>
            <div className="text-white/80 uppercase text-sm tracking-wide">Corporate Clients</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#FFD77A] mb-2">4.9/5</div>
            <div className="text-white/80 uppercase text-sm tracking-wide">Client Rating</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#FFD77A] mb-2">24/7</div>
            <div className="text-white/80 uppercase text-sm tracking-wide">Support</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}