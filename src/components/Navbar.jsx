import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Github, Linkedin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-3xl font-syne font-bold text-primary tracking-tighter">
          KA<span className="text-white">.</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Side (Socials + Resume) */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/kami0368/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary hover:glow-shadow transition-all rounded-full p-2">
              <Instagram size={20} />
            </a>
            <a href="https://github.com/kamizox" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary hover:glow-shadow transition-all rounded-full p-2">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/kamran-alam-6023bb225/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary hover:glow-shadow transition-all rounded-full p-2">
              <Linkedin size={20} />
            </a>
          </div>
          <a href="Kamran_Alam_CV.pdf" download="Kamran_Alam_CV.pdf" className="border border-primary text-primary px-6 py-2 rounded-full font-medium hover:bg-primary hover:text-white transition-all glow-shadow">
            Download CV
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 top-[72px] bg-background/95 backdrop-blur-md z-30 flex flex-col items-center pt-20"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-syne font-bold text-white mb-8 hover:text-primary transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a href="Kamran_Alam_CV.pdf" download="Kamran_Alam_CV.pdf" className="mt-8 border border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-all">
              Download CV
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
