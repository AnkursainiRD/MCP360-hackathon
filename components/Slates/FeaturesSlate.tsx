import React from 'react';
import { motion } from 'framer-motion';
import { Network, MessageSquareCode, Blocks, ArrowRight, Sparkles } from 'lucide-react';

interface FeaturesSlateProps {
  isActive: boolean;
}

const FeatureCard = ({ title, description, icon, children, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{ duration: 0.5, delay }}
    whileHover={{ y: -5 }}
    className="group relative overflow-hidden rounded-3xl bg-slate-900/40 border border-white/10 p-1 hover:border-cyan-500/50 transition-all duration-500 h-full flex flex-col shadow-lg hover:shadow-cyan-500/10"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    <div className="relative z-10 p-6 flex flex-col h-full bg-slate-950/40 rounded-[20px] backdrop-blur-md">
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500 text-cyan-400 group-hover:text-black transition-all duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-100 transition-colors">{title}</h3>
        </div>
        <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed group-hover:text-slate-300 transition-colors">{description}</p>
        
        {/* Visual Container */}
        <div className="w-full h-48 rounded-xl bg-black/40 border border-white/5 overflow-hidden relative group-hover:border-cyan-500/30 transition-all duration-500 shadow-inner">
            {children}
        </div>
    </div>
  </motion.div>
);

// Enhanced Workflow Visual
const WorkflowVisual = () => (
    <div className="absolute inset-0 flex items-center justify-center">
        <svg className="w-full h-full px-4 py-2" viewBox="0 0 300 150">
            <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#334155" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#22d3ee" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#334155" stopOpacity="0.2" />
                </linearGradient>
            </defs>
            
            {/* Paths */}
            <path d="M 30 75 L 90 75 L 140 30 L 210 30 L 270 75" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 90 75 L 140 120 L 210 120 L 270 75" fill="none" stroke="url(#lineGrad)" strokeWidth="2" strokeDasharray="4 4" />

            {/* Nodes */}
            <motion.circle cx="30" cy="75" r="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" whileHover={{ scale: 1.5 }} />
            <motion.circle cx="90" cy="75" r="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" whileHover={{ scale: 1.5 }} />
            
            <motion.rect x="125" y="15" width="30" height="30" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="2" whileHover={{ scale: 1.1, x: -2, y: -2 }} />
            <motion.rect x="125" y="105" width="30" height="30" rx="6" fill="#0f172a" stroke="#ec4899" strokeWidth="2" whileHover={{ scale: 1.1, x: -2, y: -2 }} />
            
            <motion.circle cx="270" cy="75" r="6" fill="#0f172a" stroke="#22d3ee" strokeWidth="2" whileHover={{ scale: 1.5 }} />

            {/* Moving Packets (using pure CSS/SVG animation for smooth infinite loops) */}
            <circle r="4" fill="#22d3ee" filter="drop-shadow(0 0 4px #22d3ee)">
                <animateMotion 
                    dur="3s" 
                    repeatCount="indefinite"
                    path="M 30 75 L 90 75 L 140 30 L 210 30 L 270 75"
                    calcMode="linear"
                />
            </circle>
            
            <circle r="4" fill="#ec4899" filter="drop-shadow(0 0 4px #ec4899)">
                <animateMotion 
                    dur="4s" 
                    begin="1s"
                    repeatCount="indefinite"
                    path="M 30 75 L 90 75 L 140 120 L 210 120 L 270 75"
                    calcMode="linear"
                />
            </circle>
        </svg>
    </div>
);

// Enhanced Chat Visual
const ChatVisual = () => (
    <div className="absolute inset-0 p-5 flex flex-col justify-center gap-3 font-mono text-[10px]">
        {/* Bot Message */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 5, repeatType: "reverse" }}
            className="self-start bg-slate-800/80 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] border border-slate-700"
        >
            <div className="flex gap-1.5 mb-1">
                <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-400" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
                <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-400" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, delay: 0.1, repeat: Infinity }} />
                <motion.div className="w-1.5 h-1.5 rounded-full bg-cyan-400" animate={{ y: [0, -3, 0] }} transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }} />
            </div>
        </motion.div>

         {/* User Message */}
        <motion.div 
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: [0, 1, 1, 0], x: [20, 0, 0, 20] }}
            transition={{ duration: 4, delay: 1, repeat: Infinity, repeatDelay: 1 }}
            className="self-end bg-cyan-900/40 border border-cyan-500/30 rounded-2xl rounded-tr-sm px-4 py-3 max-w-[80%]"
        >
            <div className="w-24 h-2 bg-cyan-400/20 rounded-full" />
        </motion.div>
        
         {/* Bot Response Action */}
         <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: [0, 1, 1, 0], y: [10, 0, 0, 10] }}
            transition={{ duration: 4, delay: 2.5, repeat: Infinity, repeatDelay: 1 }}
            className="self-start bg-slate-800/80 rounded-2xl rounded-tl-sm px-4 py-3 w-full border border-purple-500/30"
        >
             <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded bg-purple-500/20 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse" />
                </div>
                <span className="text-purple-300">Executing tool...</span>
             </div>
             <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                <motion.div className="h-full bg-purple-500" animate={{ width: ["0%", "100%"] }} transition={{ duration: 1.5 }} />
             </div>
        </motion.div>
    </div>
);

// Enhanced Integrations Visual
const IntegrationsVisual = () => (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {/* Background Grids */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* Orbit Rings */}
        <motion.div 
           className="absolute w-32 h-32 rounded-full border border-slate-700/50 border-dashed opacity-50"
           animate={{ rotate: 360 }}
           transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
           className="absolute w-56 h-56 rounded-full border border-slate-700/30 border-dashed opacity-30"
           animate={{ rotate: -360 }}
           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        {/* Central Hub */}
        <motion.div 
            animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 20px rgba(6,182,212,0.3)", "0 0 0px rgba(6,182,212,0)"] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="relative z-10 w-14 h-14 rounded-2xl bg-slate-900 border border-cyan-500/50 flex items-center justify-center"
        >
            <div className="absolute inset-0 bg-cyan-500/10 rounded-2xl animate-pulse" />
            <Blocks size={28} className="text-cyan-400 relative z-10" />
        </motion.div>

        {/* Floating Icons */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
            <motion.div
                key={i}
                className="absolute w-full h-full pointer-events-none"
                initial={{ rotate: deg }}
                animate={{ rotate: deg + 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            >
                 <motion.div 
                    className="absolute top-10 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-800/90 rounded-lg border border-slate-600 flex items-center justify-center shadow-lg backdrop-blur-sm"
                    style={{ transform: `rotate(-${deg}deg)` }} 
                    animate={{ rotate: -(deg + 360) }} 
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                 >
                    <div className={`w-2.5 h-2.5 rounded ${['bg-orange-500', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-yellow-500'][i]}`} />
                 </motion.div>
            </motion.div>
        ))}
        
        {/* Outer Orbit Icons */}
         {[0, 90, 180, 270].map((deg, i) => (
            <motion.div
                key={i + 10}
                className="absolute w-full h-full pointer-events-none"
                initial={{ rotate: deg + 45 }}
                animate={{ rotate: deg + 45 - 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
                 <motion.div 
                    className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-slate-800/50 rounded-full border border-slate-700 flex items-center justify-center"
                    animate={{ rotate: -(deg + 45 - 360) }} 
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 >
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                 </motion.div>
            </motion.div>
        ))}
    </div>
);


export const FeaturesSlate: React.FC<FeaturesSlateProps> = ({ isActive }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 lg:px-20 pt-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <motion.div 
          className="inline-flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-[0.2em] mb-3 border border-cyan-500/20 bg-cyan-950/30 px-3 py-1 rounded-full"
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
        >
          <Sparkles size={12} />
          <span>RELEASE 2.1</span>
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 pb-2">
           New Features
        </h2>
        <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
            Empowering developers with visual tools and seamless integrations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl mb-12 h-[450px] md:h-auto">
        <FeatureCard 
            title="Workflow Editor" 
            description="Drag-and-drop orchestration. Chain MCPs visually with logic gates and error handling."
            icon={<Network size={20} />}
            delay={0.2}
        >
            <WorkflowVisual />
        </FeatureCard>
        
        <FeatureCard 
            title="Chat Playground" 
            description="Real-time agent testing. Debug context injection and inspect tool calls instantly."
            icon={<MessageSquareCode size={20} />}
            delay={0.4}
        >
            <ChatVisual />
        </FeatureCard>
        
        <FeatureCard 
            title="Integrations Hub" 
            description="50+ pre-built connectors for Slack, GitHub, and Postgres ready to use."
            icon={<Blocks size={20} />}
            delay={0.6}
        >
            <IntegrationsVisual />
        </FeatureCard>
      </div>
      
       <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
     
      </motion.div>
    </div>
  );
};