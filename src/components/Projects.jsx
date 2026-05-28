import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, ExternalLink, Github } from 'lucide-react';

const ProjectCard = ({ index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group bg-surface rounded-2xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:glow-shadow-strong"
    >
      {/* Top half: Image placeholder */}
      <div className="h-48 bg-background border-b border-white/5 flex items-center justify-center relative overflow-hidden">
        {/* TODO: Replace with your project image. Example: <img src="/project1.jpg" alt="Project 1" className="w-full h-full object-cover" /> */}
        <div className="absolute inset-4 border-2 border-dashed border-gray-700 rounded-xl flex flex-col items-center justify-center text-gray-500 group-hover:border-primary/50 group-hover:text-primary transition-colors">
          <ImageIcon size={32} className="mb-2 opacity-50" />
          <span className="text-sm font-mono">Add Image</span>
        </div>
      </div>
      
      {/* Bottom half: Content */}
      <div className="p-6">
        {/* TODO: Replace with your project title */}
        <h3 className="text-xl font-syne font-bold text-white mb-3 group-hover:text-primary transition-colors">Project {index + 1} Name</h3>
        
        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs font-mono px-2 py-1 bg-white/5 rounded text-gray-300 border border-white/10">React</span>
          <span className="text-xs font-mono px-2 py-1 bg-white/5 rounded text-gray-300 border border-white/10">Node.js</span>
          <span className="text-xs font-mono px-2 py-1 bg-white/5 rounded text-gray-300 border border-white/10">Tailwind</span>
        </div>
        
        {/* TODO: Replace with your project description */}
        <p className="text-gray-400 text-sm mb-6 line-clamp-3">
          Project description goes here. This is a placeholder for a short explanation of what the project does, the problem it solves, and its key features.
        </p>
        
        <div className="flex gap-4">
          {/* TODO: Replace "#" with your live demo URL */}
          <a href="#" className="flex-1 flex items-center justify-center gap-2 border border-primary text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors">
            <ExternalLink size={16} /> Live Demo
          </a>
          {/* TODO: Replace "#" with your source code URL */}
          <a href="#" className="flex-1 flex items-center justify-center gap-2 border border-gray-600 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors">
            <Github size={16} /> Source Code
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-syne font-bold mb-16 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <ProjectCard key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
