import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, ExternalLink, Github } from 'lucide-react';

const projectsData = [
  {
    name: "LibraVault (Library Management System)",
    image: "project_img/library.png",
    technologies: ["React", "Firebase", "Cloudinary"],
    description: "A comprehensive and modern Library Management System featuring dynamic book filtering, availability status tracking (Available/Borrowed), and a clean administrative dashboard interface.",
    liveLink: "https://kamizox.github.io/",
    githubLink: "https://github.com/kamizox/Re_Engineering_OF_Library_Management"
  },
  {
    name: "Clicknic (Clinic Website)",
    image: "project_img/clicknic.png",
    technologies: ["React", "Responsive Design"],
    description: "A responsive healthcare and clinic management platform built to streamline appointment discovering, token management (QueueFlow), and doctor-patient connectivity.",
    liveLink: "https://kamizox.github.io/clinic-Website",
    githubLink: "https://github.com/kamizox/clinic-Website"
  },
  {
    name: "Positivus",
    image: "project_img/positivus.png",
    technologies: ["HTML5", "CSS3", "Tailwind CSS", "Frontend"],
    description: "A pixel-perfect, fully responsive landing page clone for a digital marketing agency built during a hackathon, emphasizing modern UI elements and smooth layout structures.",
    liveLink: "https://kamizox.github.io/Hackathon_Website/",
    githubLink: "https://github.com/kamizox/Positivus_website_1"
  },
  {
    name: "Airbnb Clone",
    image: "project_img/airbnb.png",
    technologies: ["HTML5", "CSS3", "Responsive Design", "Flexbox"],
    description: "A fully responsive web interface cloning Airbnb's main features, including dynamic search bars, experiences/services filters, and beautifully aligned property grid layouts.",
    liveLink: "https://kamizox.github.io/Airbnb_clone_Responsive/",
    githubLink: "https://github.com/kamizox/Airbnb_clone_Responsive"
  },
  {
    name: "Todo List App",
    image: "project_img/todo.png",
    technologies: ["JavaScript (ES6+)", "HTML5", "CSS3", "LocalStorage"],
    description: "A sleek and interactive task management application with options to add, edit, and delete daily tasks, featuring a color-coded priority interface.",
    liveLink: "https://kamizox.github.io/Todo-list-Js/",
    githubLink: "https://github.com/kamizox/Todo-list-Js"
  }
];

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
      className="group bg-surface rounded-2xl border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:glow-shadow-strong flex flex-col h-full"
    >
      {/* Top half: Image */}
      <div className="h-48 bg-background border-b border-white/5 flex items-center justify-center relative overflow-hidden">
        {project.image ? (
          <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onError={(e) => { e.target.onerror = null; e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
        ) : null}
        <div className="absolute inset-4 border-2 border-dashed border-gray-700 rounded-xl flex-col items-center justify-center text-gray-500 group-hover:border-primary/50 group-hover:text-primary transition-colors" style={{ display: project.image ? 'none' : 'flex' }}>
          <ImageIcon size={32} className="mb-2 opacity-50" />
          <span className="text-sm font-mono">Image Error</span>
        </div>
      </div>
      
      {/* Bottom half: Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-syne font-bold text-white mb-3 group-hover:text-primary transition-colors">{project.name}</h3>
        
        {/* Tech stack badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, i) => (
            <span key={i} className="text-xs font-mono px-2 py-1 bg-white/5 rounded text-gray-300 border border-white/10">{tech}</span>
          ))}
        </div>
        
        <p className="text-gray-400 text-sm mb-6 flex-grow">
          {project.description}
        </p>
        
        <div className="flex gap-4 mt-auto">
          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 border border-primary text-primary px-4 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors">
            <ExternalLink size={16} /> Live Demo
          </a>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 border border-gray-600 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors">
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
          {projectsData.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
