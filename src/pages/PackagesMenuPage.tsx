import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CATERING_PACKAGES, MENU_CATEGORIES, FOOD_MENU_ITEMS, FEATURED_FOODS } from '../lib/constants';
import PackageCard from '../components/menu/PackageCard';
import FoodCard from '../components/menu/FoodCard';
import FeaturedFoodCard from '../components/menu/FeaturedFoodCard';
import SearchBar from '../components/menu/SearchBar';
import CategoryTabs from '../components/menu/CategoryTabs';
import CartIcon from '../components/menu/CartIcon';

export default function PackagesMenuPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<string[]>([]);

  // Filter food items based on category and search
  const filteredFoodItems = useMemo(() => {
    return FOOD_MENU_ITEMS.filter(item => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Get featured food items
  const featuredFoodItems = useMemo(() => {
    return FOOD_MENU_ITEMS.filter(item => FEATURED_FOODS.includes(item.id as any));
  }, []);

  const addToCart = (itemId: string) => {
    setCartItems(prev => [...prev, itemId]);
  };

  const handleFoodClick = (foodId: string) => {
    navigate(`/menu/${foodId}`);
  };

  const handlePackageClick = (packageId: string) => {
    navigate(`/packages/${packageId}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="bg-[#FFF8E7] min-h-screen">
      {/* Cart Icon */}
      <CartIcon itemCount={cartItems.length} />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative py-16 md:py-24 bg-gradient-to-br from-[#FFF8E7] to-[#FFD77A]/20 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#E6A520] rounded-full"></div>
          <div className="absolute top-20 right-20 w-24 h-24 border border-[#7A4A00] rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-[#FFD77A] rounded-full"></div>
        </div>

        <div className="relative section-container text-center px-4">
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-bold text-[#7A4A00] mb-4 md:mb-6 leading-tight"
          >
            Curated Culinary
            <br />
            <span className="text-[#E6A520]">Experiences</span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed font-inter"
          >
            Luxury meals crafted for discerning palates. Premium catering packages for unforgettable events.
            Exceptional dining experiences that transcend the ordinary.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center"
          >
            <button
              onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-[#E6A520] hover:bg-[#7A4A00] text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-full transition-all duration-300 text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore Menu
            </button>
            <button
              onClick={() => document.getElementById('packages-section')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto border-2 border-[#7A4A00] text-[#7A4A00] hover:bg-[#7A4A00] hover:text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-full transition-all duration-300 text-base md:text-lg"
            >
              Explore Catering Packages
            </button>
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Items Section */}
      <section className="section bg-white py-16 md:py-20">
        <div className="section-container px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-3 md:mb-4 text-[#7A4A00]">
              Signature Creations
            </motion.h2>
            <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
              Chef-curated masterpieces showcasing the finest in Tanzanian and international cuisine.
              Each dish tells a story of passion, tradition, and innovation.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
          >
            {featuredFoodItems.map((item, index) => (
              <FeaturedFoodCard
                key={item.id}
                item={item}
                index={index}
                onAddToCart={addToCart}
                onClick={() => handleFoodClick(item.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Food Categories + Search */}
      <section id="menu-section" className="section bg-[#FFF8E7] py-16 md:py-20">
        <div className="section-container px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-12"
          >
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-3 md:mb-4 text-[#7A4A00]">
              Our Culinary Collection
            </motion.h2>
            <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto mb-6 md:mb-8">
              Discover our comprehensive menu featuring breakfast, lunch, dinner, and specialty items
              crafted with premium ingredients and culinary expertise.
            </motion.p>

            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search for exquisite dishes..."
            />
          </motion.div>

          {/* Category Tabs */}
          <CategoryTabs
            categories={MENU_CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </section>

      {/* Food Menu Grid */}
      <section className="section bg-white py-16 md:py-20">
        <div className="section-container px-4">
          {filteredFoodItems.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            >
              {filteredFoodItems.map((item, index) => (
                <FoodCard
                  key={item.id}
                  item={item}
                  index={index}
                  onAddToCart={addToCart}
                  onClick={() => handleFoodClick(item.id)}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 md:py-16"
            >
              <p className="text-gray-500 text-base md:text-lg">No items found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-4 text-[#E6A520] hover:text-[#7A4A00] font-semibold transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Catering Packages Grid */}
      <section id="packages-section" className="section bg-[#FFF8E7] py-16 md:py-20">
        <div className="section-container px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-playfair font-bold mb-3 md:mb-4 text-[#7A4A00]">
              Premium Catering Packages
            </motion.h2>
            <motion.p variants={itemVariants} className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
              Elevate your events with our expertly crafted catering packages,
              designed for weddings, corporate functions, and special celebrations.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
          >
            {CATERING_PACKAGES.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                index={index}
                onClick={() => handlePackageClick(pkg.id)}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}