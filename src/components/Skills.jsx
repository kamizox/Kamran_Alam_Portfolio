import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, ContactShadows, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const skillsList = [
  { name: 'JavaScript', color: '#f7df1e', logo: 'logos/js.png' },
  { name: 'React',      color: '#61dafb', logo: 'logos/react.png' },
  { name: 'Node.js',    color: '#339933', logo: 'logos/nodejs.png' },
  { name: 'CSS3',       color: '#1572b6', logo: 'logos/css3.png' },
  { name: 'HTML5',      color: '#e34f26', logo: 'logos/html5.png' },
  { name: 'MongoDB',    color: '#47a248', logo: 'logos/mongodb.png' },
  { name: 'PostgreSQL', color: '#336791', logo: 'logos/postgresql.png' },
  { name: 'Git',        color: '#f05032', logo: 'logos/git.png' },
  { name: 'Java',       color: '#007396', logo: 'logos/java.png' },
  { name: 'C++',        color: '#00599c', logo: 'logos/cpp.png' },
];

// Single Sphere — useTexture handles base path automatically
const Sphere = ({ initialPosition, skill, size = 0.55 }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const { viewport, mouse } = useThree();

  // useTexture respects Vite's base path automatically
  const logoTexture = useTexture(skill.logo);

  // Make texture look good on sphere
  useEffect(() => {
    if (logoTexture) {
      logoTexture.colorSpace = THREE.SRGBColorSpace;
      logoTexture.needsUpdate = true;
    }
  }, [logoTexture]);

  const orbitParams = useRef({
    speed:    Math.random() * 0.3 + 0.1,
    radiusX:  Math.random() * 2.5 + 1.5,
    radiusZ:  Math.random() * 2.5 + 1.5,
    offset:   Math.random() * Math.PI * 2,
    yBase:    (Math.random() - 0.5) * 3,
    yAmp:     Math.random() * 0.6 + 0.2,
    rotSpeed: (Math.random() - 0.5) * 0.02,
  });

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    const p = orbitParams.current;

    const tx = Math.sin(t * p.speed + p.offset) * p.radiusX;
    const ty = p.yBase + Math.sin(t * 1.2 + p.offset) * p.yAmp;
    const tz = Math.cos(t * p.speed + p.offset) * p.radiusZ;

    const mouseX = (mouse.x * viewport.width) / 2;
    const mouseY = (mouse.y * viewport.height) / 2;
    const dx = meshRef.current.position.x - mouseX;
    const dy = meshRef.current.position.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    let fx = tx, fy = ty, fz = tz;
    if (dist < 2.5 && dist > 0) {
      const str = (2.5 - dist) * 0.8;
      fx += (dx / dist) * str;
      fy += (dy / dist) * str;
    }

    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, fx, 0.06);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, fy, 0.06);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, fz, 0.06);
    meshRef.current.rotation.y += p.rotSpeed;
    meshRef.current.rotation.x += p.rotSpeed * 0.3;

    const targetScale = hovered ? 1.3 : 1;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.12)
    );
  });

  return (
    <mesh
      ref={meshRef}
      position={initialPosition}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
    >
      <sphereGeometry args={[size, 64, 64]} />
      <meshStandardMaterial
        map={logoTexture}
        roughness={0.1}
        metalness={0.05}
        color="#ffffff"
        emissive={hovered ? new THREE.Color(skill.color) : new THREE.Color('#000000')}
        emissiveIntensity={hovered ? 0.4 : 0}
        envMapIntensity={1.2}
      />
    </mesh>
  );
};

// Glowing cursor orb
const CursorOrb = () => {
  const meshRef = useRef();
  const { viewport, mouse } = useThree();

  useFrame(() => {
    if (!meshRef.current) return;
    const tx = (mouse.x * viewport.width) / 2;
    const ty = (mouse.y * viewport.height) / 2;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, tx, 0.1);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, ty, 0.1);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <sphereGeometry args={[0.18, 32, 32]} />
      <meshStandardMaterial color="#ff4d4d" emissive="#ff4d4d" emissiveIntensity={2} transparent opacity={0.85} />
    </mesh>
  );
};

// Scene wrapper — useTexture must be called inside Canvas
const Scene = ({ initialPositions, sizes }) => {
  return (
    <>
      <color attach="background" args={['#060608']} />
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 5]} intensity={2.5} color="#ffffff" />
      <directionalLight position={[-5, -5, -5]} intensity={0.8} color="#e0e0ff" />
      <pointLight position={[0, 5, 0]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, -5, 3]} intensity={0.6} color="#ff4d4d" />

      {skillsList.map((skill, i) => (
        <Sphere
          key={skill.name}
          skill={skill}
          initialPosition={initialPositions[i]}
          size={sizes[i]}
        />
      ))}

      <CursorOrb />
      <ContactShadows position={[0, -3.5, 0]} opacity={0.3} scale={20} blur={2.5} far={5} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
    </>
  );
};

const Skills = () => {
  const initialPositions = useRef(
    skillsList.map(() => [
      (Math.random() - 0.5) * 6,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 3,
    ])
  ).current;

  const sizes = useRef(
    skillsList.map(() => Math.random() * 0.25 + 0.42)
  ).current;

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <h2 className="text-4xl md:text-5xl font-syne font-bold mb-16 text-center">
          My Tech <span className="text-primary">Stack</span>
        </h2>

        <div className="w-full h-[65vh] rounded-3xl overflow-hidden border border-white/5 bg-[#060608] mb-16 relative">
          <Canvas
            camera={{ position: [0, 0, 9], fov: 50 }}
            gl={{ antialias: true, alpha: false }}
          >
            <Scene initialPositions={initialPositions} sizes={sizes} />
          </Canvas>

          <div className="absolute bottom-4 right-4 text-xs text-gray-500 font-mono flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            INTERACTIVE 3D SPACE
          </div>
          <div className="absolute top-4 left-4 text-xs text-gray-400 font-mono pointer-events-none">
            Move cursor to repel · Hover sphere to glow
          </div>
        </div>

        {/* Flat Skill Pills */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: 'Frontend',  items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design'] },
            { title: 'Backend',   items: ['Node.js', 'REST APIs', 'PostgreSQL', 'MongoDB'] },
            { title: 'Languages', items: ['Java', 'C', 'C++', 'C#', 'Go'] },
            { title: 'Tools',     items: ['Git', 'GitHub', 'VS Code', 'WordPress', 'Canva'] },
          ].map(({ title, items }) => (
            <div key={title}>
              <h4 className="text-xl font-syne font-bold mb-4 text-white">{title}</h4>
              <div className="flex flex-wrap gap-2">
                {items.map(s => (
                  <span key={s} className="px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-gray-300 border border-white/10 hover:border-primary/50 transition-colors cursor-default">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
