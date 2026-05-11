import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CATERING_PACKAGES, MENU_CATEGORIES, FOOD_MENU_ITEMS, FEATURED_FOODS } from '../lib/constants';
import PackageCard from '../components/menu/PackageCard';
import FoodCard from '../components/menu/FoodCard';
import FeaturedFoodCard from '../components/menu/FeaturedFoodCard';
import SearchBar from '../components/menu/SearchBar';
import CategoryTabs from '../components/menu/CategoryTabs';
import CartIcon from '../components/menu/CartIcon';

export default function PackagesMenuPage() {
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
        className="relative py-20 bg-gradient-to-br from-[#FFF8E7] to-[#FFD77A]/20"
      >
        <div className="section-container text-center">
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-6xl font-playfair font-bold text-[#7A4A00] mb-6"
          >
            Packages & Menu
          </motion.h1>
          <motion.p
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-xl text-gray-700 max-w-2xl mx-auto mb-8"
          >
            Discover our premium catering packages and curated menu selections,
            crafted to elevate every dining experience.
          </motion.p>
        </div>
      </motion.section>

      {/* Catering Packages Section */}
      <section className="section bg-white">
        <div className="section-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-[#7A4A00]">
              Catering Packages
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 max-w-2xl mx-auto">
              Elevate your events with our expertly crafted catering packages,
              designed for weddings, corporate functions, and special celebrations.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {CATERING_PACKAGES.map((pkg, index) => (
              <PackageCard key={pkg.id} package={pkg} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Foods Section */}
      <section className="section bg-[#FFF8E7]">
        <div className="section-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-[#7A4A00]">
              Featured Dishes
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 max-w-2xl mx-auto">
              Signature creations from our executive chefs, showcasing the finest in Tanzanian and international cuisine.
            </motion.p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredFoodItems.map((item, index) => (
              <FeaturedFoodCard
                key={item.id}
                item={item}
                index={index}
                onAddToCart={addToCart}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Food Menu Section */}
      <section className="section bg-white">
        <div className="section-container">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-playfair font-bold mb-4 text-[#7A4A00]">
              Our Menu
            </motion.h2>
            <motion.p variants={itemVariants} className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
              Explore our comprehensive menu featuring breakfast, lunch, dinner, and specialty items
              crafted with premium ingredients and culinary expertise.
            </motion.p>

            {/* Search Bar */}
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search for dishes..."
            />
          </motion.div>

          {/* Category Tabs */}
          <CategoryTabs
            categories={MENU_CATEGORIES}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {/* Food Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12"
          >
            {filteredFoodItems.map((item, index) => (
              <FoodCard
                key={item.id}
                item={item}
                index={index}
                onAddToCart={addToCart}
              />
            ))}
          </motion.div>

          {filteredFoodItems.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">No items found matching your search.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}