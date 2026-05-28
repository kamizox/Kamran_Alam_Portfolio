import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award } from 'lucide-react';

const Education = () => {
  const educations = [
    {
      degree: "BS Software Engineering",
      institution: "SMIU",
      date: "2023–2027 (Expected)"
    },
    {
      degree: "Modern Web & App Development",
      institution: "Saylani Mass IT Training (SMIT)",
      date: "Mar 2025"
    },
    {
      degree: "Intermediate Computer Science",
      institution: "Superior College",
      date: "2021–2023"
    }
  ];

  const certifications = [
    "NVQF Level 2 – Information Technology (Computer Operator)",
    "Complete HTML & CSS – Responsive Websites (Udemy)",
    "Social Media Graphics Design & Video Editing in Canva (Udemy)",
    "Mastering x86-64 Assembly Language | ASMCert+",
    "Effective Leadership"
  ];

  return (
    <section className="py-24 bg-background relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-syne font-bold mb-8 flex items-center gap-4">
              <span className="p-3 bg-primary/10 text-primary rounded-xl">
                <GraduationCap size={28} />
              </span>
              Education
            </h2>
            
            <div className="space-y-8 pl-4 border-l-2 border-white/10">
              {educations.map((edu, index) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-primary" />
                  <h3 className="text-xl font-bold text-white mb-1">{edu.degree}</h3>
                  <div className="text-gray-400 font-medium mb-1">{edu.institution}</div>
                  <div className="text-sm font-mono text-primary/80">{edu.date}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-syne font-bold mb-8 flex items-center gap-4">
              <span className="p-3 bg-primary/10 text-primary rounded-xl">
                <Award size={28} />
              </span>
              Certifications
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-surface p-5 rounded-xl border border-white/5 flex items-start gap-4 hover:border-primary/30 transition-colors">
                  <Award className="text-primary mt-1 shrink-0" size={20} />
                  <div className="text-gray-300 font-medium">{cert}</div>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default Education;
