import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Terminal, Box, Globe, Cpu } from 'lucide-react';

interface HeroSlateProps {
  isActive: boolean;
}

const FloatingBadge = ({ icon: Icon, label, color, x, y, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1, x, y }}
    transition={{ 
      type: "spring",
      stiffness: 100,
      damping: 20,
      delay 
    }}
    className="absolute flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-md shadow-xl z-20 pointer-events-none"
  >
    <Icon size={14} className={color} />
    <span className="text-xs font-medium text-slate-300">{label}</span>
  </motion.div>
);

export const HeroSlate: React.FC<HeroSlateProps> = ({ isActive }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 lg:px-20 pt-10 relative overflow-hidden">
      
      {/* Background radial gradient specifically for Hero to give depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-slate-950/50 to-slate-950 z-0 pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold tracking-wide"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          MCP360 PLATFORM
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
          animate={isActive ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 text-white"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400">
            Connect
          </span>{' '}
          Your<br />
          <span className="relative inline-block">
             Context
             {/* Underline decoration */}
             <motion.svg 
                className="absolute -bottom-2 left-0 w-full h-3 text-blue-500" 
                viewBox="0 0 100 10" 
                preserveAspectRatio="none"
                initial={{ pathLength: 0 }}
                animate={isActive ? { pathLength: 1 } : {}}
                transition={{ duration: 1, delay: 1 }}
             >
                <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="4" />
             </motion.svg>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          The universal open standard for connecting AI models to your data. 
          Secure, scalable, and built for the next generation of agents.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center gap-4 z-20"
        >
          <button className="px-8 py-3.5 rounded-full bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition-colors flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Start Building
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button className="px-8 py-3.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-medium text-sm hover:bg-slate-800 transition-colors flex items-center gap-2 hover:border-slate-600">
            <Github size={16} />
            Star on GitHub
          </button>
        </motion.div>
      </div>

      {/* Visual Ecosystem (The "360" feel) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none -z-10">
         {/* Rotating Rings */}
         <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border border-slate-800/60 border-dashed opacity-50"
         />
         <motion.div 
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-12 rounded-full border border-slate-800/40 border-dashed opacity-30"
         />
         <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute inset-32 rounded-full border border-slate-700/20 opacity-20"
         />

         {/* Central Glow */}
         <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
         
         {/* Floating Elements mimicking an ecosystem */}
         {isActive && (
             <>
                <FloatingBadge icon={Globe} label="Web Search" color="text-blue-400" x={-250} y={-100} delay={1.2} />
                <FloatingBadge icon={Terminal} label="Local File System" color="text-green-400" x={250} y={-120} delay={1.4} />
                <FloatingBadge icon={Box} label="Postgres" color="text-purple-400" x={-280} y={150} delay={1.6} />
                <FloatingBadge icon={Cpu} label="Slack API" color="text-orange-400" x={220} y={180} delay={1.8} />
                
                {/* Connecting Lines (Simulated) */}
                <svg className="absolute inset-0 w-full h-full opacity-20">
                    <motion.path d="M 400 400 L 150 300" stroke="url(#gradient-line)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.2, duration: 1 }} />
                    <motion.path d="M 400 400 L 650 280" stroke="url(#gradient-line)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.4, duration: 1 }} />
                    <motion.path d="M 400 400 L 120 550" stroke="url(#gradient-line)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.6, duration: 1 }} />
                    <motion.path d="M 400 400 L 620 580" stroke="url(#gradient-line)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.8, duration: 1 }} />
                    <defs>
                        <linearGradient id="gradient-line" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                </svg>
             </>
         )}
      </div>

      {/* Code Snippet Hint at Bottom */}
      <motion.div
         initial={{ opacity: 0, y: 50 }}
         animate={isActive ? { opacity: 1, y: 0 } : {}}
         transition={{ delay: 1.5, duration: 0.8 }}
         className="absolute bottom-10 px-6 py-3 rounded-xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-md shadow-2xl flex items-center gap-4 max-w-lg hidden md:flex"
      >
        <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
        </div>
        <code className="font-mono text-xs text-slate-400">
            <span className="text-purple-400">npx</span> create-mcp-server <span className="text-blue-400">@mcp360/latest</span>
        </code>
        <div className="ml-auto text-slate-600">
            <Terminal size={12} />
        </div>
      </motion.div>

    </div>
  );
};