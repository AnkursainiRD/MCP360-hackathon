import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Paperclip, FileCode, Play, CheckCircle, Loader2, ArrowRight, ShieldCheck, Database, CreditCard, Mail } from 'lucide-react';

interface AgentWorkflowSlateProps {
  isActive: boolean;
}

const WorkflowNode = ({ icon: Icon, label, status, delay }: { icon: any, label: string, status: 'pending' | 'active' | 'completed', delay: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      className={`relative flex flex-col items-center gap-2 p-3 rounded-xl border ${
        status === 'active' ? 'bg-cyan-500/20 border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]' :
        status === 'completed' ? 'bg-emerald-500/10 border-emerald-500/30' :
        'bg-slate-800/50 border-slate-700'
      }`}
    >
      <div className={`${
        status === 'active' ? 'text-cyan-400 animate-pulse' :
        status === 'completed' ? 'text-emerald-400' :
        'text-slate-500'
      }`}>
        <Icon size={20} />
      </div>
      <span className={`text-[10px] font-mono font-medium ${
         status === 'active' ? 'text-cyan-300' :
         status === 'completed' ? 'text-emerald-300' :
         'text-slate-500'
      }`}>
        {label}
      </span>
      
      {status === 'active' && (
        <div className="absolute -top-1 -right-1">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
        </div>
      )}
      
      {status === 'completed' && (
        <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-emerald-500 text-black rounded-full p-0.5"
        >
            <CheckCircle size={8} />
        </motion.div>
      )}
    </motion.div>
  );
};

const ConnectionArrow = ({ active, delay }: { active: boolean, delay: number }) => (
    <div className="flex items-center justify-center w-8">
        <motion.div
            initial={{ opacity: 0.2 }}
            animate={active ? { opacity: 1, x: [0, 5, 0] } : { opacity: 0.2 }}
            transition={active ? { repeat: Infinity, duration: 1 } : {}}
            className={active ? "text-cyan-500" : "text-slate-700"}
        >
            <ArrowRight size={16} />
        </motion.div>
    </div>
);

export const AgentWorkflowSlate: React.FC<AgentWorkflowSlateProps> = ({ isActive }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setStep(0);
      return;
    }

    const sequence = [
      { s: 1, t: 1000 }, // Attach Workflow
      { s: 2, t: 2500 }, // Type Message
      { s: 3, t: 4000 }, // Send Message & Show User Bubble
      { s: 4, t: 5000 }, // Bot Thinking / Workflow Start
      { s: 5, t: 6500 }, // Node 1 Active
      { s: 6, t: 8000 }, // Node 2 Active
      { s: 7, t: 9500 }, // Node 3 Active
      { s: 8, t: 11000 }, // Node 4 Active
      { s: 9, t: 12500 }, // Completed & Final Text
    ];

    let timers: ReturnType<typeof setTimeout>[] = [];
    sequence.forEach(({ s, t }) => {
      timers.push(setTimeout(() => setStep(s), t));
    });

    return () => timers.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="w-full h-full flex flex-col md:flex-row items-center justify-center px-6 lg:px-20 pt-20 relative overflow-hidden">
      
      {/* Left Description */}
      <div className="w-full md:w-1/3 flex flex-col gap-6 relative z-30 mb-10 md:mb-0 order-2 md:order-1">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <Play size={12} />
            <span>Executables</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Run Workflows <br/>
            <span className="text-slate-400">in Context</span>
          </h2>
          
          <p className="text-lg text-slate-300 leading-relaxed">
            Don't just chat—orchestrate. Attach compiled `.flow` files directly to your conversation context. The agent parses the workflow logic and executes multi-step processes autonomously while keeping you in the loop.
          </p>

          <div className="mt-8 p-4 rounded-xl bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm">
            <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
                <FileCode size={16} className="text-cyan-400" />
                Supported Formats
            </h4>
            <div className="flex gap-2">
                {['.flow', '.json', '.yaml'].map(ext => (
                    <span key={ext} className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-xs font-mono">{ext}</span>
                ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right Visualization */}
      <div className="w-full md:w-2/3 h-full flex items-center justify-center relative order-1 md:order-2 pl-0 md:pl-20">
        
        <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={isActive ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="w-full max-w-2xl bg-[#020617] rounded-2xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[600px] relative"
        >
            {/* Window Header */}
            <div className="h-12 bg-slate-900/80 border-b border-slate-800 flex items-center px-4 justify-between backdrop-blur-md z-20">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                    <div className="w-3 h-3 rounded-full bg-slate-700" />
                </div>
                <div className="text-xs font-mono text-slate-500">Agent Interface v2.0</div>
                <div className="w-4" />
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden relative">
                
                {/* Background Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                {/* User Message Bubble */}
                <AnimatePresence>
                    {step >= 3 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20, x: 20 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            className="self-end max-w-[80%]"
                        >
                            <div className="flex flex-col items-end gap-1">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <span>You</span>
                                    <User size={12} />
                                </div>
                                <div className="bg-cyan-600 text-white p-3 rounded-2xl rounded-tr-sm shadow-lg">
                                    <p className="text-sm">Process refund for order <span className="font-mono bg-black/20 px-1 rounded">#8859</span></p>
                                    <div className="mt-2 flex items-center gap-2 px-2 py-1 bg-black/20 rounded text-xs text-cyan-100/80">
                                        <FileCode size={12} />
                                        <span>Refund_Policy_v2.flow</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Bot Response / Workflow Visual */}
                <AnimatePresence>
                    {step >= 4 && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20, x: -20 }}
                            animate={{ opacity: 1, y: 0, x: 0 }}
                            className="self-start w-full max-w-[90%]"
                        >
                            <div className="flex flex-col items-start gap-1">
                                <div className="flex items-center gap-2 text-xs text-slate-400">
                                    <Bot size={12} />
                                    <span>Agent</span>
                                </div>
                                
                                <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl rounded-tl-sm p-4 shadow-xl">
                                    <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
                                        <div className="flex items-center gap-2">
                                            <Play size={14} className="text-cyan-400" />
                                            <span className="text-sm font-semibold text-slate-200">Executing Workflow</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                             {step < 9 ? (
                                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-medium border border-amber-500/20">
                                                    <Loader2 size={10} className="animate-spin" />
                                                    RUNNING
                                                </div>
                                             ) : (
                                                 <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-medium border border-emerald-500/20">
                                                    <CheckCircle size={10} />
                                                    SUCCESS
                                                </div>
                                             )}
                                        </div>
                                    </div>

                                    {/* Workflow Visualization */}
                                    <div className="flex items-center justify-between relative py-2">
                                        {/* Connection Lines (Background) */}
                                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10" />

                                        <WorkflowNode 
                                            icon={ShieldCheck} 
                                            label="Auth" 
                                            status={step >= 5 ? (step > 5 ? 'completed' : 'active') : 'pending'} 
                                            delay={0}
                                        />
                                        
                                        <ConnectionArrow active={step >= 5} delay={0} />

                                        <WorkflowNode 
                                            icon={Database} 
                                            label="Lookup" 
                                            status={step >= 6 ? (step > 6 ? 'completed' : 'active') : 'pending'} 
                                            delay={0.1}
                                        />

                                        <ConnectionArrow active={step >= 6} delay={0.1} />

                                        <WorkflowNode 
                                            icon={CreditCard} 
                                            label="Refund" 
                                            status={step >= 7 ? (step > 7 ? 'completed' : 'active') : 'pending'} 
                                            delay={0.2}
                                        />

                                        <ConnectionArrow active={step >= 7} delay={0.2} />

                                        <WorkflowNode 
                                            icon={Mail} 
                                            label="Notify" 
                                            status={step >= 8 ? (step > 8 ? 'completed' : 'active') : 'pending'} 
                                            delay={0.3}
                                        />
                                    </div>

                                    {/* Console Output Log */}
                                    <div className="mt-4 bg-black/40 rounded-lg p-3 font-mono text-[10px] text-slate-400 h-24 overflow-hidden flex flex-col-reverse border border-white/5">
                                        {step >= 9 && <div className="text-emerald-400">> Workflow completed successfully. Refund ID: ref_99283</div>}
                                        {step >= 8 && <div className="text-slate-300">> Sending confirmation email to user...</div>}
                                        {step >= 7 && <div className="text-slate-300">> Processing Stripe refund ($49.99)...</div>}
                                        {step >= 6 && <div className="text-slate-300">> Order #8859 found. Status: Eligible.</div>}
                                        {step >= 5 && <div className="text-slate-300">> Authenticating agent privileges...</div>}
                                        {step >= 4 && <div className="text-slate-500">> Initializing runtime environment...</div>}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Input Bar (Demonstrates Attachment) */}
            <div className="h-20 bg-slate-900 border-t border-slate-800 p-4 flex items-center gap-3 z-20">
                <motion.button 
                    animate={step === 1 ? { scale: [1, 1.1, 1], color: '#22d3ee' } : {}}
                    className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 transition-colors relative"
                >
                    <Paperclip size={20} />
                    {step >= 1 && (
                         <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute -top-10 left-0 bg-slate-800 text-cyan-400 text-xs px-2 py-1 rounded border border-slate-700 whitespace-nowrap flex items-center gap-1"
                        >
                            <FileCode size={10} />
                            Refund_Policy_v2.flow
                        </motion.div>
                    )}
                </motion.button>
                <div className="flex-1 bg-slate-950 rounded-lg border border-slate-800 h-full flex items-center px-4 text-sm text-slate-500 relative overflow-hidden">
                     {step >= 2 && step < 3 && (
                         <motion.span 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            className="text-slate-200"
                        >
                            Process refund for order #8859
                        </motion.span>
                     )}
                     {step < 2 && <span className="opacity-50">Type your message...</span>}
                     {step >= 2 && step < 3 && (
                         <motion.div 
                            animate={{ opacity: [1, 0] }} 
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="w-0.5 h-4 bg-cyan-500 ml-0.5" 
                        />
                     )}
                </div>
                <div className={`p-2 rounded-lg ${step >= 3 ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                    <ArrowRight size={20} />
                </div>
            </div>
        </motion.div>

      </div>
    </div>
  );
};