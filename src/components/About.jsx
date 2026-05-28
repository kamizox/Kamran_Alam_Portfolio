import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { Monitor, Smartphone, Cloud } from 'lucide-react';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="about" className="py-24 bg-background relative" ref={ref}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Services */}
          <motion.div 
            className="lg:col-span-4 relative pl-8 border-l-2 border-primary/30"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-10">
              <div className="relative group">
                <div className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-background border-4 border-primary group-hover:scale-125 transition-transform" />
                <h3 className="text-xl font-syne font-bold mb-2 flex items-center gap-3">
                  <Monitor className="text-primary" size={24} /> Website Development
                </h3>
                <p className="text-gray-400 text-sm">Building responsive, high-performance web applications with modern frameworks.</p>
              </div>

              <div className="relative group">
                <div className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-background border-4 border-primary group-hover:scale-125 transition-transform" />
                <h3 className="text-xl font-syne font-bold mb-2 flex items-center gap-3">
                  <Smartphone className="text-primary" size={24} /> App Development
                </h3>
                <p className="text-gray-400 text-sm">Creating seamless mobile experiences with cross-platform technologies.</p>
              </div>

              <div className="relative group">
                <div className="absolute -left-[43px] top-1 w-5 h-5 rounded-full bg-background border-4 border-primary group-hover:scale-125 transition-transform" />
                <h3 className="text-xl font-syne font-bold mb-2 flex items-center gap-3">
                  <Cloud className="text-primary" size={24} /> Web Hosting & Deployment
                </h3>
                <p className="text-gray-400 text-sm">Deploying and managing scalable applications on cloud infrastructure.</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - About Me & Stats */}
          <motion.div 
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-5xl font-syne font-bold mb-8">
              About <span className="text-primary">Me</span>
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
              I'm a Software Engineering student at SMIU with hands-on experience building responsive websites, REST APIs, and full-stack web applications. I started with graphic design and photography — that eye for detail now drives how I build software. Clean code, fast interfaces, real results.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                <div className="text-4xl font-syne font-bold text-primary mb-2">
                  {inView ? <CountUp end={15} duration={2.5} /> : '0'}+
                </div>
                <div className="text-gray-400 font-medium">Completed Projects</div>
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                <div className="text-4xl font-syne font-bold text-primary mb-2">
                  {inView ? <CountUp end={95} duration={2.5} /> : '0'}%
                </div>
                <div className="text-gray-400 font-medium">Client Satisfaction</div>
              </div>

              <div className="bg-surface p-6 rounded-2xl border border-white/5 hover:border-primary/30 transition-colors">
                <div className="text-4xl font-syne font-bold text-primary mb-2">
                  {inView ? <CountUp end={3} duration={2.5} /> : '0'}+
                </div>
                <div className="text-gray-400 font-medium">Years Experience</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
