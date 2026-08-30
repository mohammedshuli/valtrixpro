import { Link } from 'react-router-dom';
import { ROUTES, SERVICES } from '../lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const serviceLinks: Record<string, string> = {
    'private-chef-experiences': ROUTES.PRIVATE_CHEF,
    'premium-catering': ROUTES.CATERING,
    'corporate-events': ROUTES.CORPORATE_EVENTS,
    'valtrix-fresh': ROUTES.MEAL_PREP,
    'culinary-experiences': ROUTES.CULINARY_EXPERIENCES,
    'chef-consultation': ROUTES.CHEF_CONSULTATION,
    'catering-partnerships': ROUTES.CATERING_PARTNERSHIPS,
  };

  return (
    <footer className="bg-[#7A4A00] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-4">Valtrix Pro Chef</h3>
            <p className="text-[#FFD77A] text-sm">
              Tanzania's premium culinary and hospitality platform, crafting unforgettable experiences through exceptional gastronomy.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {SERVICES.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link
                    to={serviceLinks[service.slug] || ROUTES.SERVICES}
                    className="text-[#FFD77A] hover:text-white transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to={ROUTES.ABOUT} className="text-[#FFD77A] hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={ROUTES.GALLERY} className="text-[#FFD77A] hover:text-white transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="text-[#FFD77A] hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-playfair text-lg font-semibold mb-4">Contact</h4>
            <p className="text-[#FFD77A] text-sm mb-2">Dar es Salaam, Tanzania</p>
            <p className="text-[#FFD77A] text-sm mb-2">
              <a href="mailto:valtrixprofchef@gmail.com" className="hover:text-white transition-colors">
                valtrixprofchef@gmail.com
              </a>
            </p>
            <p className="text-[#FFD77A] text-sm">
              <a href="tel:+255655734453" className="hover:text-white transition-colors">
                +255 655 734 453
              </a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#FFD77A] opacity-30 py-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[#FFD77A] text-sm">
          <p>&copy; {currentYear} Valtrix Pro Chef. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
