import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Instagram, Github, Linkedin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-surface relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-syne font-bold mb-16 text-center">
          Let's Work <span className="text-primary">Together</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-syne font-bold mb-6">Get In Touch</h3>
            <p className="text-gray-400 mb-10 text-lg">
              I'm currently available for freelance work or full-time opportunities. 
              If you have a project that you want to get started, think you need my help 
              with something or just fancy saying hey, then get in touch.
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-background border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-mono mb-1">Email</div>
                  <a href="mailto:kamranalam4555@gmail.com" className="text-lg font-medium hover:text-primary transition-colors">kamranalam4555@gmail.com</a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-background border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500 font-mono mb-1">Location</div>
                  <div className="text-lg font-medium">Karachi, Pakistan</div>
                </div>
              </div>
            </div>
            
            <div className="mb-10">
              <div className="text-sm text-gray-500 font-mono mb-4">Follow Me</div>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/kami0368/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-background border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:glow-shadow transition-all">
                  <Instagram size={20} />
                </a>
                <a href="https://github.com/kamizox" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-background border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:glow-shadow transition-all">
                  <Github size={20} />
                </a>
                <a href="https://www.linkedin.com/in/kamran-alam-6023bb225/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-background border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary hover:glow-shadow transition-all">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-background p-8 rounded-3xl border border-white/5"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="name" className="block text-sm font-mono text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:glow-shadow transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-mono text-gray-400 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:glow-shadow transition-all"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-mono text-gray-400 mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:glow-shadow transition-all resize-none"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors glow-shadow"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
        
        {/* Large CV Button centered below */}
        <motion.div 
          className="mt-20 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a href="Kamran_Alam_CV.pdf" download="Kamran_Alam_CV.pdf" className="group relative inline-flex items-center justify-center px-12 py-5 text-xl font-bold text-white bg-transparent border-2 border-primary rounded-full overflow-hidden transition-all hover:scale-105">
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
            <span className="absolute inset-0 w-full h-full border-2 border-primary rounded-full"></span>
            <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
            <span className="relative z-10 flex items-center gap-3 group-hover:text-white mix-blend-normal">
              Download Full Resume
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
