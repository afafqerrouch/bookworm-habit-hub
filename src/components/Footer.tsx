
import { Link } from "react-router-dom";
import { Facebook, Instagram, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-book-purple-dark text-white pt-12 pb-8">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 font-serif">BookWorm</h3>
            <p className="text-sm text-book-purple-light">
              Your daily destination for book discovery, community, and rewards.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-book-purple-light hover:text-white transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-book-purple-light hover:text-white transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-book-purple-light hover:text-white transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-book-purple-light hover:text-white transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/fiction" className="text-book-purple-light hover:text-white transition-colors">Fiction</Link></li>
              <li><Link to="/category/non-fiction" className="text-book-purple-light hover:text-white transition-colors">Non-Fiction</Link></li>
              <li><Link to="/category/mystery" className="text-book-purple-light hover:text-white transition-colors">Mystery</Link></li>
              <li><Link to="/category/sci-fi" className="text-book-purple-light hover:text-white transition-colors">Science Fiction</Link></li>
              <li><Link to="/category/romance" className="text-book-purple-light hover:text-white transition-colors">Romance</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/deals" className="text-book-purple-light hover:text-white transition-colors">Daily Deals</Link></li>
              <li><Link to="/new-releases" className="text-book-purple-light hover:text-white transition-colors">New Releases</Link></li>
              <li><Link to="/community" className="text-book-purple-light hover:text-white transition-colors">Community</Link></li>
              <li><Link to="/loyalty" className="text-book-purple-light hover:text-white transition-colors">Loyalty Program</Link></li>
              <li><Link to="/faq" className="text-book-purple-light hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Newsletter</h4>
            <p className="text-sm text-book-purple-light mb-3">
              Subscribe for daily deals, personalized recommendations, and more.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 text-sm bg-white/10 border border-white/20 rounded-l-md focus:outline-none focus:ring-2 focus:ring-white/20 flex-grow"
              />
              <button className="bg-book-pink px-3 rounded-r-md hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-xs text-book-purple-light">
          <p>© 2025 BookWorm. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
