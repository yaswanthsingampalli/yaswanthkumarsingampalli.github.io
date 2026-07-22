// src/components/Projects.jsx
import React, { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(x, [0, 1], [0, 100]);
  const glowY = useTransform(y, [0, 1], [0, 100]);
  const glowBackground = useTransform([glowX, glowY], ([gx, gy]) =>
    `radial-gradient(circle at ${gx}% ${gy}%, rgba(37,99,235,0.35), transparent 60%)`
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className="project-card group relative"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        whileHover={{ y: -10, scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glowBackground }}
        />

        <div className={`h-48 bg-gradient-to-r ${project.gradient} flex items-center justify-center`}>
          <i className={`fas ${project.icon} text-white text-5xl`}></i>
        </div>
        <div className="p-6 relative" style={{ transform: 'translateZ(30px)' }}>
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <span className={`bg-${project.tagColor}-100 dark:bg-${project.tagColor}-900/50 text-${project.tagColor}-800 dark:text-${project.tagColor}-200 text-xs px-2 py-1 rounded`}>
              {project.category}
            </span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, i) => (
              <span key={i} className="bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs px-2 py-1 rounded">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex justify-between">
            <a
              href={project.caseStudyUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              View Case Study
            </a>

            <div className="flex gap-3">
              <a
                href={project.githubUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-primary"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href={project.demoUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-primary"
              >
                <i className="fas fa-external-link-alt"></i>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Automated Audio Content Moderation System",
      category: "Data Science",
      description: "Developed an automated pipeline to transcribe YouTube videos using Whisper ASR and analyze speech content for toxicity via GPT-4, delivering interpretable risk scores with 90%+ accuracy.",
      tech: ["Python", "OpenAI GPT-4", "Whisper", "NLP"],
      gradient: "from-blue-400 to-purple-500",
      icon: "fa-headphones",
      tagColor: "blue",
      githubUrl: "https://github.com/yaswanthkumarsingampalli/Youtube_Rag_Application",
    },
    {
      title: "Real-Time 3D Game Development",
      category: "Software Engineering",
      description: "Developed 3D interactive simulations, including a single-player plane controller and a multiplayer car game with real-time networking.",
      tech: ["Unity", "C#", "Physics", "Networking"],
      gradient: "from-green-400 to-teal-500",
      icon: "fa-gamepad",
      tagColor: "green",
      githubUrl: "https://github.com/yaswanthkumarsingampalli/GameUnity",
    },
    {
      title: "AI-Powered YouTube Video Discovery Platform",
      category: "Full-Stack",
      description: "Built a full-stack React/FastAPI application with NLP-driven semantic search and recommendation engine delivering relevant video recommendations.",
      tech: ["React", "FastAPI", "NLP", "YouTube API"],
      gradient: "from-amber-400 to-orange-500",
      icon: "fa-youtube",
      tagColor: "amber",
      githubUrl: "https://github.com/yaswanthkumarsingampalli/Agents",
    }
  ];

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <section id="projects" className="py-20 bg-slate-100 dark:bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Innovative solutions showcasing my technical expertise and problem-solving capabilities.
          </p>
        </motion.div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.a
            href="#"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
