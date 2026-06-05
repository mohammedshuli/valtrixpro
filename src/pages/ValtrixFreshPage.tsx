import FreshHero from '../components/valtrix-fresh/FreshHero';
import FreshCategoryCard from '../components/valtrix-fresh/FreshCategoryCard';
import ProductCard from '../components/valtrix-fresh/ProductCard';
import FreshGallery from '../components/valtrix-fresh/FreshGallery';
import WellnessBenefits from '../components/valtrix-fresh/WellnessBenefits';
import InquiryForm from '../components/forms/InquiryForm';
import { freshInquirySchema } from '../lib/validationSchemas';
import { submitFreshInquiry } from '../services/supabaseService';
import freshOne from '../assets/menu.jpg';
import freshTwo from '../assets/event.jpg';
import freshThree from '../assets/hero-hero.jpg';
import freshFour from '../assets/hero.png';

const productCategories = [
  {
    title: 'Fresh Juices',
    description: 'Cold-pressed juices made from the finest seasonal fruits and vegetables.',
    image: freshOne,
    icon: '🧃',
  },
  {
    title: 'Healthy Salads',
    description: 'Nutritionally balanced salads with premium organic ingredients.',
    image: freshTwo,
    icon: '🥗',
  },
  {
    title: 'Detox Drinks',
    description: 'Natural detoxifying beverages to cleanse and rejuvenate your body.',
    image: freshThree,
    icon: '🥤',
  },
  {
    title: 'Protein Meals',
    description: 'High-protein meals designed for fitness and wellness goals.',
    image: freshFour,
    icon: '🍗',
  },
  {
    title: 'Healthy Breakfast',
    description: 'Energizing breakfast options to start your day with vitality.',
    image: freshOne,
    icon: '🥣',
  },
  {
    title: 'Fruit Bowls',
    description: 'Fresh seasonal fruit combinations for natural sweetness and nutrition.',
    image: freshTwo,
    icon: '🍓',
  },
  {
    title: 'Smoothies',
    description: 'Blended wellness drinks packed with nutrients and natural energy.',
    image: freshThree,
    icon: '🍹',
  },
  {
    title: 'Wellness Packages',
    description: 'Curated wellness packages combining juices, meals, and detox programs.',
    image: freshFour,
    icon: '📦',
  },
];

const signatureProducts = [
  {
    title: 'Tropical Detox Juice',
    description: 'A refreshing blend of pineapple, ginger, and turmeric for natural detoxification.',
    image: freshOne,
    calories: '120 cal',
    price: 'TSh 15,000',
    nutrition: ['Vitamin C', 'Antioxidants', 'Detox'],
  },
  {
    title: 'Green Energy Smoothie',
    description: 'Spinach, banana, and almond milk for sustained energy and vitality.',
    image: freshTwo,
    calories: '180 cal',
    price: 'TSh 18,000',
    nutrition: ['Protein', 'Iron', 'Energy'],
  },
  {
    title: 'Avocado Chicken Salad',
    description: 'Grilled chicken with fresh avocado, mixed greens, and citrus dressing.',
    image: freshThree,
    calories: '350 cal',
    price: 'TSh 25,000',
    nutrition: ['Protein', 'Healthy Fats', 'Fiber'],
  },
  {
    title: 'Citrus Fresh Juice',
    description: 'Orange, lemon, and lime cold-pressed for immune system support.',
    image: freshFour,
    calories: '90 cal',
    price: 'TSh 12,000',
    nutrition: ['Vitamin C', 'Immunity', 'Hydration'],
  },
  {
    title: 'Protein Power Bowl',
    description: 'Quinoa, chickpeas, roasted vegetables, and tahini dressing.',
    image: freshOne,
    calories: '420 cal',
    price: 'TSh 28,000',
    nutrition: ['Plant Protein', 'Complete Meal', 'Fiber'],
  },
  {
    title: 'Berry Antioxidant Smoothie',
    description: 'Mixed berries, Greek yogurt, and chia seeds for antioxidant power.',
    image: freshTwo,
    calories: '220 cal',
    price: 'TSh 20,000',
    nutrition: ['Antioxidants', 'Probiotics', 'Omega-3'],
  },
];

const freshFields = [
  { name: 'name', label: 'Name', type: 'text' as const, placeholder: 'Your full name', required: true },
  { name: 'phone', label: 'Phone', type: 'phone' as const, placeholder: '+255 123 456 789', required: true },
  { name: 'email', label: 'Email', type: 'email' as const, placeholder: 'your@email.com', required: true },
  { name: 'product_interest', label: 'Product Interest', type: 'select' as const, required: true, options: [
      { value: 'juices', label: 'Fresh Juices' },
      { value: 'salads', label: 'Healthy Salads' },
      { value: 'smoothies', label: 'Smoothies' },
      { value: 'meal-plans', label: 'Meal Plans' },
      { value: 'detox', label: 'Detox Programs' },
      { value: 'breakfast', label: 'Healthy Breakfast' },
    ] },
  { name: 'delivery_location', label: 'Delivery Location', type: 'text' as const, placeholder: 'Your location', required: true },
  { name: 'preferred_plan', label: 'Preferred Plan', type: 'select' as const, required: false, options: [
      { value: 'daily', label: 'Daily Fresh Delivery' },
      { value: 'weekly', label: 'Weekly Meal Plan' },
      { value: 'monthly', label: 'Monthly Subscription' },
      { value: 'office', label: 'Office Meal Plan' },
      { value: 'detox', label: 'Detox Program' },
    ] },
  { name: 'notes', label: 'Special Notes', type: 'textarea' as const, placeholder: 'Dietary requirements, allergies, or preferences', required: false },
];

export default function ValtrixFreshPage() {
  return (
    <div className="bg-gradient-to-br from-[#FFF8E7] via-[#F8FCE7] to-[#FFF8E7] text-[#1F1A12]">
      <FreshHero />

      <section className="section py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.15em] text-[#E6A520] mb-3">Fresh Categories</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Discover Our Fresh Range
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              From energizing juices to nourishing meals, explore our comprehensive selection of premium fresh foods.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {productCategories.map((category) => (
              <FreshCategoryCard key={category.title} {...category} />
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="section bg-white/50 py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.15em] text-[#E6A520] mb-3">Signature Products</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Premium Fresh Favorites
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our most popular fresh products, carefully crafted for optimal nutrition and taste.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {signatureProducts.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.15em] text-[#E6A520] mb-3">Wellness Benefits</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Why Choose Fresh Living
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the transformative power of fresh, nutritious food prepared with care.
            </p>
          </div>
          <WellnessBenefits />
        </div>
      </section>

      <section className="section py-20">
        <div className="section-container">
          <div className="text-center mb-16">
            <p className="text-sm uppercase tracking-[0.15em] text-[#E6A520] mb-3">Fresh Gallery</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00]">
              Freshness in Every Moment
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              See how we bring freshness and wellness to life through our premium preparation process.
            </p>
          </div>
          <FreshGallery />
        </div>
      </section>

      <section className="section bg-white/80 py-20">
        <div className="section-container grid gap-12 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.15em] text-[#E6A520] mb-4">Start Fresh</p>
            <h2 className="text-4xl md:text-5xl font-playfair font-bold text-[#7A4A00] mb-6">
              Request Your Fresh Menu
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Share your wellness goals and we’ll help tailor a premium fresh food plan that suits your lifestyle.
            </p>
          </div>

          <InquiryForm
            title="Fresh Food Inquiry"
            description="Complete this quick form to request premium fresh meals, juices, or wellness packages."
            schema={freshInquirySchema}
            fields={freshFields}
            submitButtonText="Request Fresh Service"
            onSubmit={async (data) => await submitFreshInquiry(data)}
            successMessage="Thank you! We’ll reach out shortly to confirm your fresh food request."
          />
        </div>
      </section>
    </div>
  );
}