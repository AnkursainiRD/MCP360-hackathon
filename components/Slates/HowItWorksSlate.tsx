import React from 'react';
import { motion } from 'framer-motion';
import { User, Server, Cpu, Database, ArrowRight, Share2 } from 'lucide-react';

interface HowItWorksSlateProps {
  isActive: boolean;
}

// Reusable flow node component
const FlowNode: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  color: string; 
  delay: number;
  isActive: boolean;
}> = ({ icon, label, color, delay, isActive }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
    className={`relative flex flex-col items-center justify-center p-6 rounded-2xl glass-panel w-32 h-32 md:w-40 md:h-40 border-t ${color} z-10`}
  >
    <div className="mb-3 text-white/90">{icon}</div>
    <span className="text-sm font-semibold text-slate-300">{label}</span>
    
    {/* Pulse effect behind the node */}
    <div className={`absolute inset-0 rounded-2xl ${color.replace('border-', 'bg-')}/10 blur-xl -z-10`} />
  </motion.div>
);

const ConnectionLine: React.FC<{ delay: number; isActive: boolean; vertical?: boolean }> = ({ delay, isActive, vertical }) => (
  <div className={`flex items-center justify-center ${vertical ? 'h-24 w-full flex-col' : 'w-12 md:w-24 h-full'}`}>
     <motion.div
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isActive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay, ease: "easeInOut" }}
        className="relative w-full h-full flex items-center justify-center"
     >
       {vertical ? (
           <div className="w-[2px] h-full bg-slate-700 overflow-hidden relative">
             <motion.div 
               className="w-full h-1/2 bg-cyan-400 absolute top-0"
               animate={{ y: ['-100%', '200%'] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
             />
           </div>
       ) : (
           <div className="h-[2px] w-full bg-slate-700 overflow-hidden relative">
              <motion.div 
               className="h-full w-1/2 bg-cyan-400 absolute left-0"
               animate={{ x: ['-100%', '200%'] }}
               transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
             />
           </div>
       )}
     </motion.div>
  </div>
);


export const HowItWorksSlate: React.FC<HowItWorksSlateProps> = ({ isActive }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 lg:px-20 relative">
      
      <motion.div 
        className="absolute top-20 left-0 w-full text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={isActive ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">How MCP360 Works</h2>
        <p className="text-slate-400 max-w-xl mx-auto">Seamless orchestration from user intent to executed action across distributed contexts.</p>
      </motion.div>

      {/* Diagram Container */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-4 mt-10">
        
        {/* Step 1: User */}
        <FlowNode 
          icon={<User size={32} />} 
          label="User Query" 
          color="border-blue-500" 
          delay={0.2} 
          isActive={isActive} 
        />

        <ConnectionLine delay={0.4} isActive={isActive} />

        {/* Step 2: Protocol / Router */}
        <div className="relative">
             <FlowNode 
              icon={<Share2 size={32} />} 
              label="MCP Router" 
              color="border-cyan-500" 
              delay={0.6} 
              isActive={isActive} 
            />
             {/* Branching Lines visualization (decorative) */}
            <motion.div 
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-transparent to-cyan-500/50"
                initial={{ height: 0 }}
                animate={isActive ? { height: 48 } : { height: 0 }}
                transition={{ delay: 0.8 }}
            />
            <motion.div 
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-t from-transparent to-cyan-500/50"
                initial={{ height: 0 }}
                animate={isActive ? { height: 48 } : { height: 0 }}
                transition={{ delay: 0.8 }}
            />
        </div>

        <ConnectionLine delay={0.8} isActive={isActive} />

        {/* Step 3: Agent / Server */}
        <div className="flex flex-col gap-4">
            <FlowNode 
              icon={<Cpu size={32} />} 
              label="Specialist Agent" 
              color="border-purple-500" 
              delay={1.0} 
              isActive={isActive} 
            />
        </div>

        <ConnectionLine delay={1.2} isActive={isActive} />

        {/* Step 4: Database/Tool */}
        <FlowNode 
          icon={<Database size={32} />} 
          label="Tool Execution" 
          color="border-emerald-500" 
          delay={1.4} 
          isActive={isActive} 
        />
        
      </div>

      {/* Explanation Text */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl w-full">
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={isActive ? { opacity: 1, y: 0 } : {}}
           transition={{ delay: 1.6 }}
           className="text-center md:text-left"
         >
            <h4 className="font-bold text-white mb-2">1. Intent Analysis</h4>
            <p className="text-sm text-slate-400">The router intercepts the natural language query and determines which MCP server holds the required capability.</p>
         </motion.div>
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={isActive ? { opacity: 1, y: 0 } : {}}
           transition={{ delay: 1.8 }}
            className="text-center md:text-left"
         >
            <h4 className="font-bold text-white mb-2">2. Context Injection</h4>
            <p className="text-sm text-slate-400">Relevant context is bundled securely and passed to the specialist agent without exposing the entire history.</p>
         </motion.div>
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={isActive ? { opacity: 1, y: 0 } : {}}
           transition={{ delay: 2.0 }}
            className="text-center md:text-left"
         >
            <h4 className="font-bold text-white mb-2">3. Deterministic Action</h4>
            <p className="text-sm text-slate-400">The agent executes the specific tool or database query and returns structured data back to the user.</p>
         </motion.div>
      </div>

    </div>
  );
};