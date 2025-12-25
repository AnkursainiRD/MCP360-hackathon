import React from 'react';
import { motion } from 'framer-motion';
import { Play, ShoppingCart, Split, Globe, Search, Settings, AlertCircle } from 'lucide-react';

interface WorkflowEditorSlateProps {
  isActive: boolean;
}

const Node = ({ 
  icon: Icon, 
  title, 
  subtitle, 
  color, 
  x, 
  y, 
  delay, 
  isActive 
}: { 
  icon: any, 
  title: string, 
  subtitle: string, 
  color: string, 
  x: string, 
  y: string, 
  delay: number,
  isActive: boolean 
}) => (
  <motion.div
    className={`absolute w-64 rounded-xl border border-slate-700 bg-slate-900/90 backdrop-blur-md shadow-2xl flex flex-col overflow-hidden z-20`}
    style={{ left: x, top: y }}
    initial={{ scale: 0, opacity: 0 }}
    animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
    transition={{ type: "spring", stiffness: 260, damping: 20, delay }}
  >
    {/* Header Line */}
    <div className={`h-1 w-full ${color}`} />
    
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
           <div className={`p-1.5 rounded-md bg-slate-800 text-slate-300`}>
             <Icon size={14} />
           </div>
           <span className="text-xs font-bold text-slate-200 tracking-wide uppercase">{subtitle}</span>
        </div>
        <Settings size={12} className="text-slate-600" />
      </div>
      
      <div className="text-sm font-medium text-white mb-1">{title}</div>
      <div className="text-[10px] text-slate-500 font-mono">service: {title.toLowerCase().replace(/ /g, '-')}</div>
      
      {/* Input/Output Ports */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1.5 w-3 h-3 bg-slate-800 border border-slate-600 rounded-full" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 w-3 h-3 bg-slate-800 border border-slate-600 rounded-full" />
    </div>
  </motion.div>
);

const Connection = ({ d, color, delay, isActive }: { d: string, color: string, delay: number, isActive: boolean }) => (
    <>
        {/* Background Line */}
        <path d={d} stroke="#1e293b" strokeWidth="2" fill="none" />
        
        {/* Animated Line */}
        <motion.path 
            d={d} 
            stroke={color} 
            strokeWidth="2" 
            fill="none"
            initial={{ pathLength: 0 }}
            animate={isActive ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1, delay, ease: "easeInOut" }}
        />

        {/* Moving Packet */}
        {isActive && (
            <circle r="4" fill={color} filter={`drop-shadow(0 0 6px ${color})`}>
                <animateMotion 
                    dur="3s" 
                    begin={`${delay + 1}s`}
                    repeatCount="indefinite"
                    path={d}
                    calcMode="linear"
                    keyPoints="0;1"
                    keyTimes="0;1"
                />
            </circle>
        )}
    </>
);

export const WorkflowEditorSlate: React.FC<WorkflowEditorSlateProps> = ({ isActive }) => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 pt-20 overflow-hidden relative">
      
      {/* Left Content */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6 relative z-30 mb-10 lg:mb-0">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/30 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-6">
            <Settings size={12} />
            <span>Visual Builder</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
             Build Complex Flows <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Visually</span>
          </h2>
          
          <p className="text-lg text-slate-300 leading-relaxed">
            Construct sophisticated agentic workflows with our intuitive drag-and-drop editor. Seamlessly chain disparate MCP servers—like Amazon Search and Web Scrapers—handling context passing, conditional logic, and error boundaries without writing a single line of glue code.
          </p>

          <ul className="mt-8 space-y-4">
            {[
                "Drag-and-drop MCP integration",
                "Conditional branching & loops",
                "Real-time execution debugging"
            ].map((item, i) => (
                <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isActive ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + (i * 0.1) }}
                    className="flex items-center gap-3 text-slate-400"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    {item}
                </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Right Visual - The Editor Mockup */}
      <div className="w-full lg:w-2/3 h-[60vh] lg:h-full relative flex items-center justify-center scale-75 md:scale-90 lg:scale-100 origin-center lg:origin-right">
        
        {/* Editor Window Frame */}
        <motion.div 
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            animate={isActive ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-[900px] h-[550px] bg-[#0B1120] rounded-xl border border-slate-800 shadow-2xl relative overflow-hidden"
            style={{ perspective: 1000 }}
        >
             {/* Toolbar */}
             <div className="absolute top-0 w-full h-12 border-b border-slate-800 bg-[#0F172A] flex items-center px-4 justify-between z-10">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                </div>
                <div className="text-xs text-slate-500 font-mono">ecommerce-price-comparison.flow</div>
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1 rounded bg-indigo-600 text-white text-xs font-medium flex items-center gap-1">
                        <Play size={10} fill="currentColor" /> Run
                    </div>
                </div>
             </div>

             {/* Canvas Grid */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] mt-12" />

             {/* Nodes Container */}
             <div className="absolute inset-0 mt-12">
                 
                 {/* SVG Lines Layer */}
                 <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                    {/* Trigger to Amazon */}
                    <Connection 
                        d="M 160 250 C 200 250, 200 200, 280 200" 
                        color="#6366f1" // Indigo
                        delay={0.8}
                        isActive={isActive}
                    />
                     {/* Amazon to Condition */}
                    <Connection 
                        d="M 536 200 C 580 200, 580 250, 620 250" 
                        color="#6366f1"
                        delay={1.2}
                        isActive={isActive}
                    />
                    {/* Condition to eBay (True) */}
                    <Connection 
                        d="M 760 250 C 780 250, 780 150, 820 150" 
                        color="#22c55e" // Green
                        delay={1.6}
                        isActive={isActive}
                    />
                     {/* Condition to Scraper (False) */}
                     <Connection 
                        d="M 760 250 C 780 250, 780 350, 820 350" 
                        color="#ef4444" // Red
                        delay={1.6}
                        isActive={isActive}
                    />
                 </svg>

                 {/* Nodes */}
                 <Node 
                    icon={Play} 
                    subtitle="Trigger" 
                    title="Start Workflow" 
                    color="bg-emerald-500"
                    x="20px" 
                    y="220px"
                    delay={0.6}
                    isActive={isActive}
                 />

                 <Node 
                    icon={ShoppingCart} 
                    subtitle="Tool" 
                    title="Amazon Search" 
                    color="bg-blue-500"
                    x="280px" 
                    y="170px"
                    delay={0.9}
                    isActive={isActive}
                 />

                 <Node 
                    icon={Split} 
                    subtitle="Logic" 
                    title="Check Price < $50" 
                    color="bg-orange-500"
                    x="620px" 
                    y="220px"
                    delay={1.3}
                    isActive={isActive}
                 />

                 <Node 
                    icon={ShoppingCart} 
                    subtitle="Marketplace" 
                    title="eBay Search" 
                    color="bg-blue-400"
                    x="820px" 
                    y="100px"
                    delay={1.7}
                    isActive={isActive}
                 />

                 <Node 
                    icon={Globe} 
                    subtitle="Scraper" 
                    title="Web Scraping" 
                    color="bg-purple-500"
                    x="820px" 
                    y="320px"
                    delay={1.7}
                    isActive={isActive}
                 />

                 {/* Tool Library Floating Panel (Decorative) */}
                 <motion.div 
                    initial={{ x: -100, opacity: 0 }}
                    animate={isActive ? { x: 0, opacity: 1 } : {}}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="absolute left-4 top-4 bottom-4 w-48 bg-[#0F172A]/90 backdrop-blur border border-slate-700 rounded-lg p-3 z-30 flex flex-col gap-2"
                 >
                    <div className="text-xs font-bold text-slate-400 uppercase mb-2">Tools Library</div>
                    <div className="h-8 bg-slate-800 rounded flex items-center px-2 gap-2 text-slate-400 text-xs border border-slate-700">
                        <Search size={12} /> Search...
                    </div>
                    {['Stripe Payment', 'Slack Notify', 'GitHub Issue', 'Postgres Query'].map((tool, i) => (
                        <div key={i} className="p-2 rounded bg-slate-800/50 border border-slate-700/50 hover:border-indigo-500/50 cursor-grab active:cursor-grabbing text-xs text-slate-300 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-500" />
                            {tool}
                        </div>
                    ))}
                 </motion.div>

             </div>
        </motion.div>

      </div>
    </div>
  );
};