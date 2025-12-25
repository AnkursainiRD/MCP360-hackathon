import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Sliders, MessageSquare, Search, ChevronDown, Zap, Sparkles, Send } from 'lucide-react';

interface ChatPlaygroundSlateProps {
  isActive: boolean;
}

const TypingIndicator = () => (
  <div className="flex gap-1 p-2 bg-slate-800 rounded-lg w-fit">
    <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity }} />
    <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, delay: 0.1, repeat: Infinity }} />
    <motion.div className="w-1.5 h-1.5 bg-slate-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, delay: 0.2, repeat: Infinity }} />
  </div>
);

const Message = ({ role, content, type = 'text', delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.4 }}
    className={`flex w-full mb-4 ${role === 'user' ? 'justify-end' : 'justify-start'}`}
  >
    <div className={`max-w-[80%] ${role === 'user' ? 'bg-purple-600 text-white rounded-2xl rounded-tr-none' : 'bg-slate-800 text-slate-200 rounded-2xl rounded-tl-none'} p-3 shadow-lg border border-white/5`}>
      {type === 'tool-call' ? (
        <div className="font-mono text-xs">
          <div className="flex items-center gap-2 text-purple-300 mb-2 border-b border-white/10 pb-1">
            <Terminal size={12} />
            <span>tool_execution</span>
          </div>
          <div className="text-emerald-400">
            <span className="text-purple-400">function</span> <span className="text-yellow-300">search_web</span>(query: <span className="text-orange-300">"{content}"</span>)
          </div>
        </div>
      ) : (
        <p className="text-sm leading-relaxed">{content}</p>
      )}
    </div>
  </motion.div>
);

export const ChatPlaygroundSlate: React.FC<ChatPlaygroundSlateProps> = ({ isActive }) => {
  const [conversationStep, setConversationStep] = useState(0);

  // Animation sequencer
  useEffect(() => {
    if (!isActive) {
        setConversationStep(0);
        return;
    }

    const sequence = [
        { step: 1, delay: 1000 }, // User message
        { step: 2, delay: 2000 }, // Thinking
        { step: 3, delay: 3500 }, // Tool Call
        { step: 4, delay: 5000 }, // Tool Result (implicit/thinking)
        { step: 5, delay: 6500 }, // Final Response
    ];

    let timeouts: ReturnType<typeof setTimeout>[] = [];

    sequence.forEach(({ step, delay }) => {
        const timeout = setTimeout(() => setConversationStep(step), delay);
        timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [isActive]);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 pt-20 overflow-hidden relative">
      
      {/* Left Content */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6 relative z-30 mb-10 lg:mb-0 order-2 lg:order-1">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/30 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <MessageSquare size={12} />
            <span>Interactive Sandbox</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
             Native Chat <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Playground</span>
          </h2>
          
          <p className="text-lg text-slate-300 leading-relaxed">
            Debug your agents in real-time. Our advanced playground allows you to inspect raw tool calls, inject mock context, and fine-tune model parameters like temperature and token limits on the fly.
          </p>

          <ul className="mt-8 space-y-4">
            {[
                "Live tool execution logs",
                "Hot-swappable LLM models",
                "Session state inspection"
            ].map((item, i) => (
                <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isActive ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="flex items-center gap-3 text-slate-400"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    {item}
                </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Right Visual - The Chat UI Mockup */}
      <div className="w-full lg:w-2/3 h-[65vh] lg:h-full relative flex items-center justify-center scale-90 lg:scale-100 origin-center lg:origin-right order-1 lg:order-2">
        
        <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isActive ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-[900px] h-[600px] bg-[#09090b] rounded-xl border border-white/10 shadow-2xl flex overflow-hidden ring-1 ring-white/5"
        >
             {/* Left: Chat Area */}
             <div className="flex-1 flex flex-col relative">
                {/* Header */}
                <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-[#09090b]">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-xs">
                            AI
                        </div>
                        <div>
                            <div className="text-sm font-medium text-white">AI Copilot</div>
                            <div className="text-[10px] text-slate-500">Discover and execute MCP tools</div>
                        </div>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 p-6 overflow-hidden flex flex-col justify-end pb-20 relative">
                     {/* Placeholder/Empty State - Fades out */}
                     <AnimatePresence>
                        {conversationStep === 0 && (
                             <motion.div 
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center text-slate-600 flex-col gap-4"
                             >
                                <Sparkles size={40} className="text-purple-500/20" />
                                <p>Ready to help...</p>
                             </motion.div>
                        )}
                     </AnimatePresence>

                     <AnimatePresence>
                        {conversationStep >= 1 && (
                            <Message role="user" content="Find the latest stock price for Apple" />
                        )}
                        {conversationStep === 2 && (
                            <div className="flex justify-start mb-4">
                                <TypingIndicator />
                            </div>
                        )}
                        {conversationStep >= 3 && (
                            <Message role="assistant" type="tool-call" content="Apple Inc stock price" />
                        )}
                         {conversationStep === 4 && (
                            <div className="flex justify-start mb-4">
                                <TypingIndicator />
                            </div>
                        )}
                        {conversationStep >= 5 && (
                            <Message role="assistant" content="Based on the latest market data, Apple Inc (AAPL) is trading at $185.92, up 1.2% today." />
                        )}
                     </AnimatePresence>
                </div>

                {/* Input Area */}
                <div className="absolute bottom-4 left-4 right-4 h-14 bg-slate-900/50 border border-white/10 rounded-lg flex items-center px-4 gap-3 backdrop-blur-sm">
                    <input 
                        type="text" 
                        placeholder="Ask about MCP tools..." 
                        className="flex-1 bg-transparent border-none outline-none text-sm text-slate-300 placeholder-slate-600"
                        disabled
                    />
                    <div className="w-8 h-8 rounded bg-purple-600 flex items-center justify-center text-white">
                        <Send size={14} />
                    </div>
                </div>
             </div>

             {/* Right: Configuration Sidebar */}
             <div className="w-72 border-l border-white/5 bg-[#0c0c0e] flex flex-col">
                <div className="h-14 border-b border-white/5 flex items-center px-4 justify-between">
                    <span className="text-xs font-medium text-slate-300">Configuration</span>
                    <Sliders size={14} className="text-slate-500" />
                </div>
                
                <div className="p-4 flex flex-col gap-6">
                    {/* Model Select */}
                    <div>
                        <label className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-2 block">Model</label>
                        <div className="h-9 bg-slate-900 border border-white/10 rounded flex items-center justify-between px-3 text-xs text-white">
                            <span>Grok 4.1 Fast</span>
                            <ChevronDown size={12} className="text-slate-500" />
                        </div>
                    </div>

                    {/* Temperature */}
                    <div>
                         <div className="flex justify-between mb-2">
                             <label className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Temperature</label>
                             <span className="text-[10px] text-purple-400">0.2</span>
                         </div>
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-purple-600" 
                                initial={{ width: "20%" }}
                                animate={isActive ? { width: ["20%", "40%", "20%"] } : {}}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </div>

                    {/* Max Tokens */}
                    <div>
                        <label className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-2 block">Max Tokens</label>
                        <div className="h-9 bg-slate-900 border border-white/10 rounded flex items-center px-3 text-xs text-slate-400">
                            1000
                        </div>
                    </div>

                    {/* Tools List */}
                    <div className="flex-1">
                        <label className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider mb-2 block">Active Tools</label>
                        <div className="flex flex-col gap-2">
                            <motion.div 
                                className="p-2 rounded bg-slate-900 border border-purple-500/30 flex items-center gap-2"
                                animate={conversationStep >= 3 && conversationStep < 5 ? { borderColor: "rgba(168,85,247,0.8)", backgroundColor: "rgba(168,85,247,0.1)" } : {}}
                            >
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-xs text-slate-300">google_search</span>
                                {conversationStep >= 3 && conversationStep < 5 && <Zap size={10} className="ml-auto text-purple-400 animate-pulse" />}
                            </motion.div>
                            
                            <div className="p-2 rounded bg-slate-900 border border-white/5 flex items-center gap-2 opacity-50">
                                <div className="w-2 h-2 rounded-full bg-slate-600" />
                                <span className="text-xs text-slate-300">file_system</span>
                            </div>
                        </div>
                    </div>
                </div>
             </div>

        </motion.div>

      </div>
    </div>
  );
};