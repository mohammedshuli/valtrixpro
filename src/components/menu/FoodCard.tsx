import { motion } from 'framer-motion';
import { Star, Award, ChefHat, ShoppingCart, MessageCircle } from 'lucide-react';
import { FOOD_MENU_ITEMS } from '../../lib/constants';

type FoodMenuItem = typeof FOOD_MENU_ITEMS[number];

interface FoodCardProps {
  item: FoodMenuItem;
  index: number;
  onAddToCart: (itemId: string) => void;
}

export default function FoodCard({ item, index, onAddToCart }: FoodCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello Valtrix Pro Chef, I would like to order ${item.name}.`;
    const whatsappUrl = `https://wa.me/255XXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
    >
      {/* Food Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.isBestSeller && (
            <div className="bg-[#E6A520] text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <Award className="w-3 h-3" />
              Best Seller
            </div>
          )}
          {item.isChefRecommended && (
            <div className="bg-[#7A4A00] text-white text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
              <ChefHat className="w-3 h-3" />
              Chef's Pick
            </div>
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="text-xs font-semibold text-gray-700">{item.rating}</span>
        </div>
      </div>

      {/* Food Content */}
      <div className="p-5">
        <div className="mb-3">
          <h3 className="text-lg font-playfair font-bold text-[#7A4A00] mb-1">
            {item.name}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-[#E6A520]">
            {formatPrice(item.price)}
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {item.category}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart(item.id)}
            className="flex-1 bg-[#E6A520] hover:bg-[#7A4A00] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <button
            onClick={handleWhatsAppOrder}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center text-sm"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}