import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleBackground = () => {
  const ref = useRef();
  
  // Generate particles
  const [sphere] = React.useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ff4d4d" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
};

const Hero = () => {
  const name = "I'm Kamran Alam";
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Left Content */}
        <div className="flex flex-col items-start">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 mb-4"
          >
            <span className="text-gray-400 font-mono text-sm tracking-wider">Hello</span>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl font-syne font-bold mb-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {name.split('').map((char, index) => (
              <motion.span key={index} variants={childVariants} className={char === ' ' ? 'mr-4 inline-block' : 'inline-block'}>
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <div className="text-2xl md:text-4xl font-syne font-semibold text-primary mb-6 h-12">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'React Developer',
                2000,
                'Node.js Engineer',
                2000,
                'UI/UX Enthusiast',
                2000,
                'Problem Solver',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-gray-400 text-lg mb-8 max-w-lg"
          >
            Building pixel-perfect UIs & powerful backends from Karachi 🇵🇰
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="flex flex-wrap gap-4 mb-12"
          >
            <a href="#contact" className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-red-600 transition-colors glow-shadow">
              Got a project?
            </a>
            <a href="/Kamran_Alam_CV.pdf" download className="border border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-colors">
              Download CV
            </a>
          </motion.div>

          {/* Tech Strip */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 1.5 }}
             className="w-full overflow-hidden whitespace-nowrap"
          >
            <div className="flex space-x-4 animate-[scroll_20s_linear_infinite] text-gray-500 font-mono text-sm">
               <span>HTML5</span><span>·</span>
               <span>CSS3</span><span>·</span>
               <span>JavaScript</span><span>·</span>
               <span>React</span><span>·</span>
               <span>Node.js</span><span>·</span>
               <span>PostgreSQL</span><span>·</span>
               <span>MongoDB</span><span>·</span>
               <span>Git</span><span>·</span>
               <span>Java</span><span>·</span>
               <span>C++</span>
            </div>
          </motion.div>
        </div>

        {/* Right Content - Profile Image with decorations */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative hidden lg:flex justify-center items-center"
        >
          <div className="relative w-80 h-80 rounded-full border-2 border-primary/30 p-2 glow-shadow-strong">
            <div className="w-full h-full rounded-full overflow-hidden bg-surface relative flex items-center justify-center">
               {/* TODO: Add your photo to /public/profile.jpg */}
              <img src="/profile.jpg" alt="Kamran Alam" className="absolute w-full h-full object-cover z-10" onError={(e) => e.target.style.display = 'none'} />
              <div className="text-gray-500 z-0">Photo Here</div>
            </div>
            
            {/* Animated Brackets */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -left-8 top-1/3 text-4xl font-mono text-primary font-bold drop-shadow-lg"
            >
              &lt;
            </motion.div>
            <motion.div 
              animate={{ y: [10, -10, 10] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 bottom-1/3 text-4xl font-mono text-primary font-bold drop-shadow-lg"
            >
              /&gt;
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
};

export default Hero;
