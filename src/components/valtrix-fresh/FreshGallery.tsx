import { motion } from 'framer-motion';
import freshOne from '../../assets/menu.jpg';
import freshTwo from '../../assets/event.jpg';
import freshThree from '../../assets/hero-hero.jpg';
import freshFour from '../../assets/hero.png';

const galleryImages = [
  { src: freshOne, alt: 'Fresh juice preparation', span: 'col-span-1 row-span-2' },
  { src: freshTwo, alt: 'Healthy meal assembly', span: 'col-span-1 row-span-1' },
  { src: freshThree, alt: 'Fresh ingredients', span: 'col-span-1 row-span-1' },
  { src: freshFour, alt: 'Wellness food presentation', span: 'col-span-1 row-span-1' },
];

export default function FreshGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {galleryImages.map((image, idx) => (
        <motion.div
          key={image.src}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className={`relative overflow-hidden rounded-2xl bg-gray-100 ${image.span}`}
        >
          <img
            src={image.src}
            alt={image.alt}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      ))}
    </div>
  );
}