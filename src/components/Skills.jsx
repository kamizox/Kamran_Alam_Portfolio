import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Text, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const skillsList = [
  { name: 'JavaScript', color: '#f7df1e' },
  { name: 'React', color: '#61dafb' },
  { name: 'Node.js', color: '#339933' },
  { name: 'CSS3', color: '#1572b6' },
  { name: 'HTML5', color: '#e34f26' },
  { name: 'MongoDB', color: '#47a248' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'Git', color: '#f05032' },
  { name: 'Java', color: '#007396' },
  { name: 'C++', color: '#00599c' },
];

const Sphere = ({ position, name, color }) => {
  const meshRef = useRef();
  const textRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { viewport, mouse } = useThree();
  
  // Random orbit parameters
  const [random] = useState(() => ({
    speed: Math.random() * 0.5 + 0.1,
    radius: Math.random() * 2 + 1.5,
    offset: Math.random() * Math.PI * 2,
    yOffset: (Math.random() - 0.5) * 4
  }));

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Orbital movement
    const t = state.clock.getElapsedTime();
    const x = Math.sin(t * random.speed + random.offset) * random.radius;
    const z = Math.cos(t * random.speed + random.offset) * random.radius;
    
    // Mouse repel logic
    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    
    const dx = meshRef.current.position.x - mouseX;
    const dy = meshRef.current.position.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    let targetX = x;
    let targetY = random.yOffset + Math.sin(t * 1.5 + random.offset) * 0.5;
    let targetZ = z;

    if (distance < 2) {
      const repelStrength = (2 - distance) * 0.5;
      targetX += (dx / distance) * repelStrength;
      targetY += (dy / distance) * repelStrength;
    }

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.05);
    
    // Scale on hover
    const targetScale = hovered ? 1.2 : 1;
    meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.1));
    
    if (textRef.current) {
      textRef.current.position.copy(meshRef.current.position);
      textRef.current.position.y += 0.8;
      // text always faces camera
      textRef.current.quaternion.copy(state.camera.quaternion);
      textRef.current.visible = hovered;
    }
  });

  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh 
          ref={meshRef} 
          position={position}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial 
            color={hovered ? color : '#2a2a35'} 
            roughness={0.2}
            metalness={0.1}
            emissive={hovered ? color : '#000000'}
            emissiveIntensity={hovered ? 0.4 : 0}
          />
        </mesh>
      </Float>
      <Text
        ref={textRef}
        fontSize={0.3}
        color="white"
        outlineWidth={0.02}
        outlineColor="#000"
        visible={false}
      >
        {name}
      </Text>
    </group>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-syne font-bold mb-16 text-center">
          My Tech <span className="text-primary">Stack</span>
        </h2>
        
        {/* 3D Canvas */}
        <div className="w-full h-[60vh] rounded-3xl overflow-hidden border border-white/5 bg-surface mb-16 relative">
          <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff4d4d" />
            
            <group>
              {skillsList.map((skill, i) => (
                <Sphere 
                  key={skill.name}
                  name={skill.name}
                  color={skill.color}
                  position={[(Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4]}
                />
              ))}
            </group>
            
            <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4} />
            <Environment preset="city" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
          
          <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            INTERACTIVE 3D SPACE
          </div>
        </div>

        {/* Flat Skill Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="text-xl font-syne font-bold mb-4 text-white">Frontend</h4>
            <div className="flex flex-wrap gap-2">
              {['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design'].map(s => (
                <span key={s} className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-300 border border-white/10 hover:border-primary/50 transition-colors">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-syne font-bold mb-4 text-white">Backend</h4>
            <div className="flex flex-wrap gap-2">
              {['Node.js', 'REST APIs', 'PostgreSQL', 'MongoDB'].map(s => (
                <span key={s} className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-300 border border-white/10 hover:border-primary/50 transition-colors">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-syne font-bold mb-4 text-white">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {['Java', 'C', 'C++', 'C#', 'Go'].map(s => (
                <span key={s} className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-300 border border-white/10 hover:border-primary/50 transition-colors">{s}</span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xl font-syne font-bold mb-4 text-white">Tools</h4>
            <div className="flex flex-wrap gap-2">
              {['Git', 'GitHub', 'VS Code', 'WordPress', 'Canva'].map(s => (
                <span key={s} className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-300 border border-white/10 hover:border-primary/50 transition-colors">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
