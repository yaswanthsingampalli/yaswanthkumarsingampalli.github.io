import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// Import the random function correctly
import { inSphere } from 'maath/random/dist/maath-random.esm';

// 3D Particle Background Component
function ParticleBackground() {
  const pointsRef = useRef();
  const groupRef = useRef();
  // Generate the sphere positions array directly
  const spherePositions = inSphere(new Float32Array(5000 * 3), { radius: 1.5 });

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta / 10;
      pointsRef.current.rotation.y -= delta / 15;
    }
    if (groupRef.current) {
      // Subtle cursor-reactive parallax: the field gently tilts toward the pointer
      const targetX = state.pointer.y * 0.15;
      const targetY = state.pointer.x * 0.15;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef} rotation={[0, 0, Math.PI / 4]}>
      <Points ref={pointsRef} positions={spherePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#2563eb" // Matches your primary color
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

const Hero = () => {
  const [text, setText] = useState('');
  const fullText = 'Yaswanth Kumar Singampalli';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="pt-24 pb-16 relative overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0 h-[calc(100vh-64px)]"> {/* Ensure canvas has a defined height */}
        <Canvas camera={{ position: [0, 0, 1] }}>
          <ParticleBackground />
        </Canvas>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Hi, I'm <span className="text-primary typing-animation">{text}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 mb-8">
              Microsoft-Certified Senior Data Engineer
            </p>
            <p className="text-lg text-slate-700 dark:text-slate-400 mb-8 max-w-2xl">
              4+ years of experience designing and optimizing scalable data pipelines and ETL workflows. Proven success in migrating legacy systems to cloud solutions, resulting in 30% cost reductions and 40% improved pipeline reliability.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="#projects"
                className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.a>
              <motion.a
                href="#contact"
                className="border-2 border-primary text-primary dark:text-white px-6 py-3 rounded-lg hover:bg-primary/10 transition-colors font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.a>
              <motion.a
                href={`${process.env.PUBLIC_URL}/Yaswanth_Kumar_Singampalli_DE.pdf`}
                download
                className="flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:text-primary transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className="fas fa-download"></i> Download Resume
              </motion.a>
            </div>
          </motion.div>
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                <img
                  src={`${process.env.PUBLIC_URL}/Profile_Photo.jpeg`}
                  className="w-full h-full object-cover"
                  alt="Yaswanth Kumar Singampalli"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white dark:bg-slate-800 rounded-full p-4 shadow-lg">
                <i className="fas fa-chart-line text-primary text-2xl"></i>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
