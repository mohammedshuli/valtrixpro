// Brand Colors
export const BRAND_COLORS = {
  bg: '#FFF8E7',
  highlight: '#FFD77A',
  accent: '#E6A520',
  heading: '#7A4A00',
} as const;

// Services
export const SERVICES = [
  {
    id: 'private-chef',
    name: 'Private Chef Experiences',
    slug: 'private-chef-experiences',
    shortDescription: 'Personalized culinary journeys in your space',
    description: 'Experience bespoke dining tailored to your preferences, dietary needs, and atmosphere. Our executive chefs create unforgettable moments through intimate culinary artistry.',
  },
  {
    id: 'catering',
    name: 'Premium Catering',
    slug: 'premium-catering',
    shortDescription: 'Elevated dining for every occasion',
    description: 'From intimate gatherings to grand celebrations, our catering transforms your events with meticulous attention to cuisine, presentation, and service excellence.',
  },
  {
    id: 'corporate-events',
    name: 'Corporate Events',
    slug: 'corporate-events',
    shortDescription: 'Sophisticated culinary solutions for business',
    description: 'Impress clients and motivate teams with our premium corporate catering and event production, crafted to reflect your brand\'s prestige.',
  },
  {
    id: 'meal-prep',
    name: 'Valtrix Fresh',
    slug: 'valtrix-fresh',
    shortDescription: 'Nutrient-rich meal prep delivered',
    description: 'Premium, locally-sourced salads, cold-pressed juices, and nutritionally balanced meals prepared fresh daily for your wellness journey.',
  },
  {
    id: 'masterclasses',
    name: 'Culinary Experiences',
    slug: 'culinary-experiences',
    shortDescription: 'Learn from world-class chefs',
    description: 'Immersive cooking masterclasses and sensory experiences designed to elevate your culinary knowledge and appreciation for fine dining.',
  },
  {
    id: 'consultation',
    name: 'Chef Consultation',
    slug: 'chef-consultation',
    shortDescription: 'Expert guidance for your culinary vision',
    description: 'One-on-one consultations with our executive chefs for menu planning, kitchen design, culinary training, and bespoke food strategy.',
  },
  {
    id: 'partnerships',
    name: 'Catering Partnerships',
    slug: 'catering-partnerships',
    shortDescription: 'Strategic collaborations for hospitality',
    description: 'Long-term partnerships with hotels, venues, and establishments seeking premium culinary operations and F&B management.',
  },
] as const;

// Catering Packages
export const CATERING_PACKAGES = [
  {
    id: 'wedding',
    name: 'Wedding Package',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
    description: 'Elegant wedding catering with personalized menus, premium presentation, and exceptional service for your special day.',
    features: [
      'Customized wedding menu',
      'Premium table settings',
      'Professional service staff',
      'Cake cutting ceremony',
      'Dietary accommodations',
      'Photography-ready presentation'
    ],
    startingPrice: 150000,
  },
  {
    id: 'vip',
    name: 'VIP Package',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
    description: 'Exclusive VIP dining experience with world-class cuisine, private chef service, and luxury amenities.',
    features: [
      'Private chef consultation',
      'Premium ingredient sourcing',
      'Luxury tableware',
      'Personalized wine pairing',
      'Dedicated service team',
      'Custom dietary preferences'
    ],
    startingPrice: 200000,
  },
  {
    id: 'corporate',
    name: 'Corporate Package',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&h=400&fit=crop',
    description: 'Professional corporate catering for meetings, conferences, and business events with sophisticated presentation.',
    features: [
      'Business-appropriate menus',
      'Professional presentation',
      'Flexible serving options',
      'Dietary restriction handling',
      'On-site coordination',
      'Branded service elements'
    ],
    startingPrice: 75000,
  },
  {
    id: 'birthday',
    name: 'Birthday Package',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=400&fit=crop',
    description: 'Celebrate in style with themed birthday catering, custom cakes, and memorable culinary experiences.',
    features: [
      'Themed menu options',
      'Custom birthday cake',
      'Decorative food displays',
      'Party-appropriate portions',
      'Fun food presentations',
      'Celebration coordination'
    ],
    startingPrice: 50000,
  },
  {
    id: 'family',
    name: 'Family Package',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop',
    description: 'Warm family gatherings with comforting home-style dishes and flexible family-friendly catering options.',
    features: [
      'Family-style serving',
      'Kid-friendly options',
      'Comfort food selections',
      'Flexible portion sizes',
      'Home-style presentations',
      'Casual dining atmosphere'
    ],
    startingPrice: 35000,
  },
] as const;

// Food Menu Categories
export const MENU_CATEGORIES = [
  'All',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Fast Food',
  'BBQ',
  'Drinks',
  'Desserts',
] as const;

// Food Menu Items
export const FOOD_MENU_ITEMS = [
  {
    id: 'grilled-chicken',
    name: 'Grilled Chicken',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop',
    description: 'Tender grilled chicken marinated in herbs and spices, served with seasonal vegetables.',
    price: 25000,
    category: 'Lunch',
    rating: 4.8,
    isBestSeller: true,
    isChefRecommended: true,
  },
  {
    id: 'bbq-beef',
    name: 'BBQ Beef',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
    description: 'Slow-cooked beef ribs with our signature BBQ sauce, smoky and tender.',
    price: 35000,
    category: 'BBQ',
    rating: 4.9,
    isBestSeller: true,
    isChefRecommended: false,
  },
  {
    id: 'pilau',
    name: 'Pilau',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    description: 'Fragrant spiced rice with tender meat, onions, and aromatic spices.',
    price: 20000,
    category: 'Lunch',
    rating: 4.7,
    isBestSeller: true,
    isChefRecommended: false,
  },
  {
    id: 'chips-mayai',
    name: 'Chips Mayai',
    image: 'https://images.unsplash.com/photo-1541599468348-e96984315621?w=400&h=300&fit=crop',
    description: 'Crispy fries topped with perfectly fried eggs and our special seasoning.',
    price: 15000,
    category: 'Fast Food',
    rating: 4.5,
    isBestSeller: false,
    isChefRecommended: false,
  },
  {
    id: 'fried-rice',
    name: 'Fried Rice',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    description: 'Wok-tossed rice with vegetables, eggs, and premium seasonings.',
    price: 18000,
    category: 'Lunch',
    rating: 4.6,
    isBestSeller: false,
    isChefRecommended: true,
  },
  {
    id: 'burger',
    name: 'Signature Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    description: 'Premium beef patty with artisanal toppings and house-made sauces.',
    price: 22000,
    category: 'Fast Food',
    rating: 4.7,
    isBestSeller: true,
    isChefRecommended: false,
  },
  {
    id: 'pizza',
    name: 'Wood-Fired Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop',
    description: 'Thin crust pizza with fresh toppings and artisanal cheese.',
    price: 28000,
    category: 'Dinner',
    rating: 4.8,
    isBestSeller: false,
    isChefRecommended: true,
  },
  {
    id: 'fresh-juice',
    name: 'Fresh Juice',
    image: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400&h=300&fit=crop',
    description: 'Freshly squeezed tropical juices made from local seasonal fruits.',
    price: 8000,
    category: 'Drinks',
    rating: 4.4,
    isBestSeller: false,
    isChefRecommended: false,
  },
  {
    id: 'shawarma',
    name: 'Chicken Shawarma',
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop',
    description: 'Marinated chicken wrapped in pita with garlic sauce and fresh vegetables.',
    price: 20000,
    category: 'Fast Food',
    rating: 4.6,
    isBestSeller: true,
    isChefRecommended: false,
  },
  {
    id: 'seafood-platter',
    name: 'Seafood Platter',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=400&h=300&fit=crop',
    description: 'Assortment of fresh grilled seafood with lemon herb butter.',
    price: 45000,
    category: 'Dinner',
    rating: 4.9,
    isBestSeller: false,
    isChefRecommended: true,
  },
  {
    id: 'biryani',
    name: 'Chicken Biryani',
    image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop',
    description: 'Aromatic basmati rice with tender chicken and traditional spices.',
    price: 25000,
    category: 'Lunch',
    rating: 4.7,
    isBestSeller: false,
    isChefRecommended: true,
  },
  {
    id: 'mishkaki',
    name: 'Mishkaki',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
    description: 'Tender grilled beef skewers with onions and traditional spices.',
    price: 18000,
    category: 'BBQ',
    rating: 4.5,
    isBestSeller: false,
    isChefRecommended: false,
  },
  {
    id: 'breakfast-special',
    name: 'Breakfast Special',
    image: 'https://images.unsplash.com/photo-1551218377-a0a4c5a124e8?w=400&h=300&fit=crop',
    description: 'Complete breakfast with eggs, toast, fresh fruit, and coffee.',
    price: 15000,
    category: 'Breakfast',
    rating: 4.3,
    isBestSeller: false,
    isChefRecommended: false,
  },
  {
    id: 'tiramisu',
    name: 'Tiramisu',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone.',
    price: 12000,
    category: 'Desserts',
    rating: 4.8,
    isBestSeller: true,
    isChefRecommended: false,
  },
] as const;

// Featured Foods (subset of popular items)
export const FEATURED_FOODS = [
  'grilled-chicken',
  'bbq-beef',
  'seafood-platter',
  'pizza',
  'pilau',
  'chips-mayai',
  'fried-rice',
  'burger',
  'fresh-juice',
  'shawarma',
  'biryani',
  'mishkaki',
  'breakfast-special',
  'tiramisu',
] as const;
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  PACKAGES_MENU: '/packages-menu',
  CATERING: '/catering',
  CATERING_PARTNERSHIPS: '/catering-partnerships',
  PRIVATE_CHEF: '/private-chef-experiences',
  CORPORATE_EVENTS: '/corporate-events',
  MEAL_PREP: '/valtrix-fresh',
  CULINARY_EXPERIENCES: '/culinary-experiences',
  CHEF_CONSULTATION: '/chef-consultation',
  GALLERY: '/gallery',
  CONTACT: '/contact',
  ADMIN: '/admin',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_INQUIRIES: '/admin/inquiries',
  ADMIN_CONTENT: '/admin/content',
  ADMIN_MEDIA: '/admin/media',
  ADMIN_ANALYTICS: '/admin/analytics',
} as const;

// Inquiry Status Labels
export const INQUIRY_STATUS_LABELS = {
  pending: 'Pending',
  contacted: 'Contacted',
  confirmed: 'Confirmed',
  completed: 'Completed',
} as const;

// Mock data for development
export const MOCK_TESTIMONIALS = [
  {
    id: '1',
    clientName: 'Sarah Kikwete',
    clientTitle: 'Event Director, Dar es Salaam Social Club',
    message: 'Valtrix Pro Chef elevated our gala dinner to an unforgettable culinary event. The attention to detail and innovation was exceptional.',
    rating: 5,
    serviceType: 'catering',
  },
  {
    id: '2',
    clientName: 'James Mwase',
    clientTitle: 'General Manager, Luxury Resort',
    message: 'Their masterclass transformed our kitchen staff. Professional, engaging, and deeply knowledgeable.',
    rating: 5,
    serviceType: 'masterclass',
  },
  {
    id: '3',
    clientName: 'Amara Hassan',
    clientTitle: 'Wellness Entrepreneur',
    message: 'Valtrix Fresh has been integral to my wellness lifestyle. Premium quality, nutritious, and beautifully prepared.',
    rating: 5,
    serviceType: 'meal_prep',
  },
] as const;

// Gallery Categories
export const GALLERY_CATEGORIES = ['Events', 'Cuisine', 'Masterclasses', 'Team', 'Valtrix Fresh'] as const;

// Form Field Lengths
export const FORM_CONSTRAINTS = {
  nameMin: 2,
  nameMax: 100,
  emailMin: 5,
  emailMax: 255,
  phoneMin: 10,
  phoneMax: 20,
  messageMin: 10,
  messageMax: 2000,
} as const;

export const UI_CONSTANTS = {
  ADMIN_PAGE_SIZE: 10,
  CAROUSEL_INTERVAL: 4000,
  FORM_SUBMISSION_TIMEOUT: 30000,
  SUCCESS_MESSAGE_TIMEOUT: 3000,
} as const;
