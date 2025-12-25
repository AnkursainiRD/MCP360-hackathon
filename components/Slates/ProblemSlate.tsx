import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, GitMerge, Unplug, XCircle } from 'lucide-react';

interface ProblemSlateProps {
  isActive: boolean;
}

export const ProblemSlate: React.FC<ProblemSlateProps> = ({ isActive }) => {
  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-between px-6 lg:px-20 pt-10">
      
      {/* Left Text Content */}
      <div className="w-full md:w-1/2 flex flex-col gap-6 z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-rose-500 mb-4 font-bold tracking-widest uppercase text-sm">
            <AlertTriangle size={16} />
            <span>The Current Challenge</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The Multi-MCP <br/>
            <span className="text-rose-500">Nightmare</span>
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed max-w-lg">
            Trying to chain multiple Model Context Protocols in a single flow often leads to fragmentation. Without a unified orchestrator, developers face:
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 mt-6">
          {[
            { title: "Context Fragmentation", desc: "Each MCP isolates memory, losing the 'thread' of the conversation." },
            { title: "Authentication Hell", desc: "Managing distinct auth tokens for every micro-agent is unscalable." },
            { title: "Latency Compounding", desc: "Daisy-chaining requests sequentially kills the user experience." }
          ].map((item, i) => (
             <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={isActive ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + (i * 0.2), duration: 0.5 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-rose-500/5 border border-rose-500/10"
            >
              <div className="mt-1 text-rose-400">
                <XCircle size={20} />
              </div>
              <div>
                <h4 className="font-bold text-white">{item.title}</h4>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right Visual Animation (Chaos to Order hint, or just Chaos) */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-full flex items-center justify-center relative mt-10 md:mt-0">
        
        {/* Central confused node */}
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isActive ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-rose-600 rounded-full flex items-center justify-center z-20 shadow-[0_0_50px_rgba(225,29,72,0.4)]"
        >
            <Unplug size={40} className="text-white" />
        </motion.div>

        {/* Orbiting chaotic nodes */}
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute"
                initial={{ opacity: 0 }}
                animate={isActive ? { 
                    opacity: 1,
                    x: [0, (Math.random() - 0.5) * 400],
                    y: [0, (Math.random() - 0.5) * 400],
                } : {}}
                transition={{ 
                    duration: 3, 
                    delay: 0.2,
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "easeInOut" 
                }}
            >
                {/* Connecting Line */}
                <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-30">
                    <line x1="50%" y1="50%" x2="50%" y2="50%" stroke="#e11d48" strokeWidth="2" strokeDasharray="5,5" />
                </svg>
                
                <div className="w-16 h-16 glass-panel border-rose-500/30 rounded-xl flex items-center justify-center text-xs font-mono text-rose-300">
                    MCP #{i+1}
                </div>
            </motion.div>
        ))}

        {/* Background Chaos Lines */}
        <div className="absolute inset-0 z-0">
             <svg className="w-full h-full opacity-20">
                <motion.path 
                    d="M50,50 Q200,400 350,50 T650,50"
                    fill="none" 
                    stroke="#e11d48" 
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={isActive ? { pathLength: 1, pathOffset: [0, 1] } : {}}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
                 <motion.path 
                    d="M600,600 Q400,200 100,600 T50,100"
                    fill="none" 
                    stroke="#e11d48" 
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    animate={isActive ? { pathLength: 1, pathOffset: [1, 0] } : {}}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />
             </svg>
        </div>

      </div>
    </div>
  );
};