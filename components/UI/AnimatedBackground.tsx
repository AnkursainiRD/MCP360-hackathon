import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-slate-950 overflow-hidden pointer-events-none">
      {/* Deep gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black" />

      {/* Animated glowing orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-900/20 rounded-full blur-[100px]"
      />

      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 100, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-900/20 rounded-full blur-[120px]"
      />

       <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[30%] left-[30%] w-[30vw] h-[30vw] bg-purple-900/10 rounded-full blur-[80px]"
      />

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  );
};