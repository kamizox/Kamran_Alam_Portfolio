import React from 'react';
import { Instagram, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050508] border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="text-gray-500 font-mono text-sm">
          Kamran Alam © 2026 · Built with React ⚡
        </div>
        
        <div className="flex items-center gap-4">
          <a href="#instagram" className="text-gray-500 hover:text-primary transition-colors">
            <Instagram size={18} />
          </a>
          <a href="#github" className="text-gray-500 hover:text-primary transition-colors">
            <Github size={18} />
          </a>
          <a href="#linkedin" className="text-gray-500 hover:text-primary transition-colors">
            <Linkedin size={18} />
          </a>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
