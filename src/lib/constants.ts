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

// Page Routes
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  SERVICES: '/services',
  CATERING: '/catering',
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
