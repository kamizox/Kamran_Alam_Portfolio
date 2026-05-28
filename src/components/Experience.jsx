import React from 'react';
import { motion } from 'framer-motion';

const Experience = () => {
  const experiences = [
    {
      title: "Web Developer",
      company: "Fiverr (Freelance)",
      date: "Jan 2026 – Present",
      description: "Custom websites for international clients, responsive frontends."
    },
    {
      title: "Web Dev Team Member",
      company: "Ziraal",
      date: "Sep 2025 – Dec 2025",
      description: "Frontend development and UI implementation."
    },
    {
      title: "Freelance Graphic Designer",
      company: "Fiverr",
      date: "Jul 2022 – Apr 2026",
      description: "Social media graphics, branding, Canva designs."
    },
    {
      title: "Mathematics Tutor",
      company: "Self-Employed",
      date: "Oct 2021 – Apr 2026",
      description: "Matric-level mathematics teaching."
    }
  ];

  return (
    <section id="experience" className="py-24 bg-surface relative">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        <h2 className="text-4xl md:text-5xl font-syne font-bold mb-16 text-center">
          My <span className="text-primary">Experience</span>
        </h2>
        
        <div className="relative border-l-2 border-primary/30 pl-8 ml-4 md:ml-0 md:pl-0 md:border-none">
          {/* Desktop central line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 transform -translate-x-1/2" />
          
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center justify-between group ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Dot */}
                <div className="absolute left-[-41px] md:left-1/2 w-4 h-4 rounded-full bg-background border-4 border-primary transform md:-translate-x-1/2 z-10 group-hover:scale-150 transition-transform group-hover:shadow-[0_0_15px_#ff4d4d]" />
                
                <div className="w-full md:w-[45%] bg-background p-6 rounded-2xl border border-white/5 hover:border-primary/50 transition-colors relative overflow-hidden group-hover:glow-shadow">
                  <h3 className="text-xl font-syne font-bold text-white mb-1">{exp.title}</h3>
                  <div className="text-primary font-medium mb-3">{exp.company}</div>
                  <div className="text-sm font-mono text-gray-500 mb-4">{exp.date}</div>
                  <p className="text-gray-400">{exp.description}</p>
                </div>
                
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
