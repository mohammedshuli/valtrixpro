import { motion } from 'framer-motion';
import galleryOne from '../../assets/event.jpg';
import galleryTwo from '../../assets/menu.jpg';
import galleryThree from '../../assets/hero-hero.jpg';
import galleryFour from '../../assets/hero.png';

const images = [
  { src: galleryOne, alt: 'Chef plating a refined dish' },
  { src: galleryTwo, alt: 'Warm culinary studio atmosphere' },
  { src: galleryThree, alt: 'Gourmet ingredient selection' },
  { src: galleryFour, alt: 'Creative food artistry moment' },
];

export default function CulinaryGallery() {
  return (
    <section className="bg-[#FFF8E7] py-16">
      <div className="section-container">
        <div className="space-y-6 text-center mb-12">
          <p className="text-sm uppercase tracking-[0.35em] text-[#7A4A00]">Gallery Showcase</p>
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
            The art of the future culinary moment
          </h2>
          <p className="mx-auto max-w-2xl text-base text-[#4d3a23]">An intimate collection of chef preparation, ingredient artistry, and refined plating inspiration.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((image) => (
            <motion.div
              key={image.alt}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-[2rem] shadow-[0_20px_60px_rgba(122,74,0,0.12)]"
            >
              <img src={image.src} alt={image.alt} className="h-72 w-full object-cover transition-transform duration-500 hover:scale-105" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
