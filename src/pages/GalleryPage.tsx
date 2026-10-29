import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GALLERY_CATEGORIES } from '../lib/constants';
import { supabase } from '../lib/supabase';
import cateringImage from '../assets/catering.jpg';
import menuImage from '../assets/menu.jpg';
import culinaryImage from '../assets/culinaryExperience.png';
import privateChefImage from '../assets/privateChef.png';
import freshImage from '../assets/valtrixfresh.png';
import corporateImage from '../assets/coporate.jpg';
import eventImage from '../assets/event.jpg';
import consultationImage from '../assets/consultation.png';
import partnershipImage from '../assets/partnership.jpg';

type GalleryItem = {
  id: number | string;
  category: string;
  image: string;
  title: string;
};

const FALLBACK_GALLERY: GalleryItem[] = [
  { id: 1, category: 'Events', image: cateringImage, title: 'Catering Event' },
  { id: 2, category: 'Cuisine', image: menuImage, title: 'Fine Dining' },
  { id: 3, category: 'Masterclasses', image: culinaryImage, title: 'Cooking Class' },
  { id: 4, category: 'Team', image: privateChefImage, title: 'Chef Experience' },
  { id: 5, category: 'Valtrix Fresh', image: freshImage, title: 'Valtrix Fresh' },
  { id: 6, category: 'Events', image: corporateImage, title: 'Corporate Event' },
  { id: 7, category: 'Cuisine', image: eventImage, title: 'Culinary Experience' },
  { id: 8, category: 'Valtrix Fresh', image: consultationImage, title: 'Fresh Food' },
  { id: 9, category: 'Events', image: partnershipImage, title: 'Hospitality Partnership' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(FALLBACK_GALLERY);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .eq('is_active', true)
          .order('order', { ascending: true });
        if (error) {
          setErrorMessage('Live gallery images could not be loaded. Showing local preview images instead.');
        } else if (data && data.length > 0) {
          setGalleryItems(
            data.map((item) => ({
              id: item.id,
              category: item.category || 'Events',
              image: item.image_url || (
                typeof item.image_path === 'string' && /^https?:\/\//i.test(item.image_path)
                  ? item.image_path
                  : supabase.storage.from('gallery').getPublicUrl(item.image_path).data.publicUrl
              ),
              title: item.title || item.alt_text || 'Gallery Image',
            }))
          );
        }
      } catch (error) {
        setErrorMessage(error instanceof Error
          ? `Live gallery images could not be loaded: ${error.message}`
          : 'Live gallery images could not be loaded. Showing local preview images instead.');
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  const filteredItems = selectedCategory
    ? galleryItems.filter((item) => item.category === selectedCategory)
    : galleryItems;

  return (
    <div className="bg-[#FFF8E7]">
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white py-16 md:py-24"
      >
        <div className="section-container text-center">
          <h1 className="text-5xl md:text-6xl font-playfair font-bold text-[#7A4A00] mb-6">
            Our Gallery
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Visual stories of our culinary artistry and memorable events
          </p>
        </div>
      </motion.section>

      <section className="section">
        <div className="section-container">
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === null
                  ? 'bg-[#E6A520] text-white'
                  : 'bg-white text-[#7A4A00] border-2 border-[#E6A520] hover:bg-[#FFF8E7]'
              }`}
            >
              All
            </button>
            {GALLERY_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-[#E6A520] text-white'
                    : 'bg-white text-[#7A4A00] border-2 border-[#E6A520] hover:bg-[#FFF8E7]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {errorMessage && <p role="status" className="mb-6 rounded bg-amber-100 p-4 text-amber-900">{errorMessage}</p>}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
              ))}
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="group relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end">
                    <div className="translate-y-full group-hover:translate-y-0 transition-transform duration-300 w-full p-4 bg-gradient-to-t from-black to-transparent text-white">
                      <p className="font-playfair font-bold text-lg">{item.title}</p>
                      <p className="text-sm text-[#FFD77A]">{item.category}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
