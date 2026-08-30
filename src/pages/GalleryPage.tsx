import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GALLERY_CATEGORIES } from '../lib/constants';
import { supabase } from '../lib/supabase';

type GalleryItem = {
  id: number | string;
  category: string;
  image: string;
  title: string;
};

const FALLBACK_GALLERY: GalleryItem[] = [
  { id: 1, category: 'Events', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561484?w=800&h=800&fit=crop', title: 'Gala Dinner' },
  { id: 2, category: 'Cuisine', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=800&fit=crop', title: 'Fine Dining Plate' },
  { id: 3, category: 'Masterclasses', image: 'https://images.unsplash.com/photo-1556910103-1c02411297e3?w=800&h=800&fit=crop', title: 'Cooking Class' },
  { id: 4, category: 'Team', image: 'https://images.unsplash.com/photo-1577611015e91-a360d90e6ab1?w=800&h=800&fit=crop', title: 'Our Team' },
  { id: 5, category: 'Valtrix Fresh', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=800&fit=crop', title: 'Fresh Salads' },
  { id: 6, category: 'Events', image: 'https://images.unsplash.com/photo-1519167758993-41d2f9c991cc?w=800&h=800&fit=crop', title: 'Corporate Event' },
  { id: 7, category: 'Cuisine', image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=800&fit=crop', title: 'Gourmet Dish' },
  { id: 8, category: 'Valtrix Fresh', image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&h=800&fit=crop', title: 'Fresh Juice' },
  { id: 9, category: 'Events', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=800&fit=crop', title: 'Private Dining' },
];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(FALLBACK_GALLERY);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const { data, error } = await supabase
          .from('gallery')
          .select('*')
          .order('order', { ascending: true });
        if (!error && data && data.length > 0) {
          setGalleryItems(
            data.map((item) => ({
              id: item.id,
              category: item.category || 'Events',
              image: item.image_url || item.image,
              title: item.title || item.alt_text || 'Gallery Image',
            }))
          );
        }
      } catch {
        // Keep fallback data
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
                  className="group relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer"
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
