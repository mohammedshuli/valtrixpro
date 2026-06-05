import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Heart, ShoppingCart, MessageCircle, Clock, Users, Award, Share2 } from 'lucide-react';
import { FOOD_MENU_ITEMS } from '../../lib/constants';

export default function FoodDetailPage() {
  const { foodId } = useParams<{ foodId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const foodItem = FOOD_MENU_ITEMS.find(item => item.id === foodId);

  if (!foodItem) {
    return (
      <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#7A4A00] mb-4">Food item not found</h1>
          <button
            onClick={() => navigate('/packages-menu')}
            className="bg-[#E6A520] text-white px-6 py-2 rounded-lg"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello Valtrix Pro Chef, I would like to order ${quantity}x ${foodItem.name}.`;
    const whatsappUrl = `https://wa.me/255XXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleAddToCart = () => {
    // Add to cart logic here
    alert(`Added ${quantity}x ${foodItem.name} to cart`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: foodItem.name,
        text: foodItem.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  // Mock related foods (you can implement proper logic)
  const relatedFoods = FOOD_MENU_ITEMS
    .filter(item => item.category === foodItem.category && item.id !== foodItem.id)
    .slice(0, 4);

  // Mock image gallery
  const imageGallery = [
    foodItem.image,
    foodItem.image, // You can add more images
    foodItem.image,
  ];

  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="section-container py-4">
          <button
            onClick={() => navigate('/packages-menu')}
            className="flex items-center gap-2 text-[#7A4A00] hover:text-[#E6A520] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Menu
          </button>
        </div>
      </div>

      <div className="section-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Main Image */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-white shadow-lg">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                src={imageGallery[selectedImage]}
                alt={foodItem.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 overflow-x-auto">
              {imageGallery.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-[#E6A520]' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-playfair font-bold text-[#7A4A00] mb-2">
                {foodItem.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold">{foodItem.rating}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{foodItem.category}</span>
                {foodItem.isBestSeller && (
                  <>
                    <span className="text-gray-500">•</span>
                    <div className="flex items-center gap-1 text-[#E6A520]">
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-semibold">Best Seller</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-[#E6A520]">
              {formatPrice(foodItem.price)}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-[#7A4A00] mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">{foodItem.description}</p>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-200">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#E6A520]" />
                <div>
                  <p className="text-sm text-gray-600">Prep Time</p>
                  <p className="font-semibold">15-20 mins</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#E6A520]" />
                <div>
                  <p className="text-sm text-gray-600">Serves</p>
                  <p className="font-semibold">1-2 people</p>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <h3 className="text-lg font-semibold text-[#7A4A00] mb-2">Key Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {['Premium Ingredients', 'Fresh Herbs', 'Quality Spices', 'Local Produce', 'Artisanal Seasonings'].map((ingredient: string) => (
                  <span
                    key={ingredient}
                    className="bg-[#FFD77A]/20 text-[#7A4A00] px-3 py-1 rounded-full text-sm"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div>
              <h3 className="text-lg font-semibold text-[#7A4A00] mb-2">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-[#7A4A00]"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-[#7A4A00]"
                  >
                    +
                  </button>
                </div>
                <span className="text-gray-600">Total: {formatPrice(foodItem.price * quantity)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-[#E6A520] hover:bg-[#7A4A00] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={handleWhatsAppOrder}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Order Now
                </button>
              </div>
              <button
                onClick={handleShare}
                className="w-full border border-gray-300 text-gray-700 hover:border-[#7A4A00] hover:text-[#7A4A00] font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </motion.div>
        </div>

        {/* Related Foods */}
        {relatedFoods.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-playfair font-bold text-[#7A4A00] mb-8 text-center">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedFoods.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                  onClick={() => navigate(`/menu/${item.id}`)}
                >
                  <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="font-semibold text-[#7A4A00] mb-1">{item.name}</h3>
                    <p className="text-[#E6A520] font-bold">{formatPrice(item.price)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}