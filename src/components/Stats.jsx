import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const icons = {
  "Years Experience": "fa-solid fa-calendar-check",
  "Cost Reduction": "fa-solid fa-sack-dollar",
  "Reliability Improvement": "fa-solid fa-gauge-high",
  "Projects Delivered": "fa-solid fa-diagram-project"
};

const StatCard = ({ end, label, delay }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // ms
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, end]);

  return (
    <motion.div
      ref={ref}
      className="stats-card"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -4 }}
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-3">
        <i className={icons[label]}></i>
      </div>
      <div className="text-4xl font-extrabold text-primary">
        {count}{label.includes('Years') || label.includes('Projects') ? '+' : '%'}
      </div>
      <p className="text-slate-600 dark:text-slate-300 mt-2">{label}</p>
    </motion.div>
  );
};

const Stats = () => {
  const stats = [
    { end: 4, label: "Years Experience", delay: 0.1 },
    { end: 30, label: "Cost Reduction", delay: 0.2 },
    { end: 40, label: "Reliability Improvement", delay: 0.3 },
    { end: 7, label: "Projects Delivered", delay: 0.4 }
  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              end={stat.end}
              label={stat.label}
              delay={stat.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
