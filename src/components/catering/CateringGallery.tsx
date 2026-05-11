import { motion } from 'framer-motion';
import dishOne from '../../assets/hero-hero.jpg';
import dishTwo from '../../assets/menu.jpg';
import dishThree from '../../assets/event.jpg';
import dishFour from '../../assets/hero.png';

const galleryImages = [dishOne, dishTwo, dishThree, dishFour];

export default function CateringGallery() {
  return (
    <div className="grid gap-6 lg:grid-cols-4 lg:grid-rows-[300px_200px]">
      {galleryImages.map((src, idx) => (
        <motion.div
          key={src}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className={`relative overflow-hidden rounded-[32px] bg-gray-100 shadow-2xl shadow-black/5 ${idx === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
        >
          <img src={src} alt={`Premium catering ${idx + 1}`} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      ))}
    </div>
  );
}