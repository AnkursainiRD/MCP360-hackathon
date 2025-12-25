import React from 'react';
import { motion } from 'framer-motion';
import { Zap, CreditCard, ShoppingBag, Cloud, Github, Database, Mail, Hash, CloudLightning, LineChart } from 'lucide-react';

interface IntegrationSlateProps {
  isActive: boolean;
}

const integrations = [
  { id: 'zapier', name: 'Zapier', icon: Zap, color: '#f97316' }, // Orange
  { id: 'stripe', name: 'Stripe', icon: CreditCard, color: '#8b5cf6', featured: true }, // Purple (Featured)
  { id: 'slack', name: 'Slack', icon: Hash, color: '#e879f9' }, // Pink
  { id: 'shopify', name: 'Shopify', icon: ShoppingBag, color: '#10b981' }, // Emerald
  { id: 'salesforce', name: 'Salesforce', icon: Cloud, color: '#3b82f6' }, // Blue
  { id: 'github', name: 'GitHub', icon: Github, color: '#94a3b8' }, // Slate
  { id: 'aws', name: 'AWS', icon: CloudLightning, color: '#f59e0b' }, // Amber
  { id: 'mongodb', name: 'MongoDB', icon: Database, color: '#22c55e' }, // Green
  { id: 'mailchimp', name: 'Mailchimp', icon: Mail, color: '#eab308' }, // Yellow
  { id: 'analytics', name: 'Google Analytics', icon: LineChart, color: '#f97316' }, // Orange
];

const IntegrationCard = ({ item, index, isActive }: { item: typeof integrations[0], index: number, isActive: boolean }) => {
  const isFeatured = item.featured;
  
  // Randomized float animation parameters for organic feel
  const floatDuration = 3 + Math.random() * 2;
  const floatDelay = Math.random() * 2;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={isActive ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ 
        type: "spring", 
        stiffness: 60, 
        damping: 15, 
        delay: index * 0.08 
      }}
      className={`relative group h-32 md:h-40 cursor-pointer ${isFeatured ? 'col-span-1 md:col-span-1' : ''}`}
    >
      {/* Floating Wrapper */}
      <motion.div
        animate={isActive ? { y: [0, -8, 0] } : {}}
        transition={{ 
          duration: floatDuration, 
          delay: floatDelay,
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="h-full w-full"
      >
        <div className="relative h-full w-full transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-2">
            
            {/* Outer Glow (Brand Color) */}
            <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-xl"
                style={{ background: item.color }} 
            />
            
            {/* Main Card Container */}
            <div className={`
                relative h-full w-full rounded-2xl border flex flex-col items-center justify-center gap-3 overflow-hidden
                transition-all duration-300 shadow-xl
                ${isFeatured 
                    ? 'bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-900 border-white/20' 
                    : 'bg-[#0B1120] border-white/5 group-hover:border-white/20'
                }
            `}>
                
                {/* Background Ambient Mesh for Standard Cards */}
                 {!isFeatured && (
                    <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at 50% 100%, ${item.color}, transparent 70%)` }}
                    />
                 )}
                 
                 {/* Featured Card Animated Gradient Overlay */}
                 {isFeatured && (
                    <motion.div 
                        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                 )}

                 {/* Icon Container */}
                 <div 
                    className={`
                        relative z-10 p-3.5 rounded-xl transition-all duration-300
                        ${isFeatured ? 'bg-white/20 text-white backdrop-blur-md border border-white/20' : 'bg-slate-800/80 text-slate-400 group-hover:text-white group-hover:bg-slate-700 border border-slate-700/50'}
                    `}
                 >
                    {/* Icon Glow */}
                    <div 
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" 
                        style={{ backgroundColor: item.color, transform: 'scale(0.8)' }} 
                    />
                    
                    <div className="relative z-10">
                        <item.icon size={32} strokeWidth={1.5} />
                    </div>
                 </div>

                 <span className={`relative z-10 font-medium tracking-wide transition-colors duration-300 ${isFeatured ? 'text-white' : 'text-slate-400 group-hover:text-white'}`}>
                    {item.name}
                 </span>
                 
                 {/* Shine/Reflect Effect */}
                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-700" />
                 </div>

                 {/* Featured Particles */}
                 {isFeatured && (
                     <>
                        <motion.div 
                            className="absolute top-2 right-4 w-1 h-1 bg-white/80 rounded-full blur-[1px]"
                            animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                        />
                         <motion.div 
                            className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-purple-300/80 rounded-full blur-[1px]"
                            animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                        />
                     </>
                 )}
            </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const IntegrationSlate: React.FC<IntegrationSlateProps> = ({ isActive }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 lg:px-20 pt-20 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          <motion.div 
            className="absolute top-0 right-[20%] w-px h-[50vh] bg-gradient-to-b from-cyan-500/20 to-transparent" 
            animate={{ height: ['0%', '50%', '0%'], opacity: [0, 1, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
           <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="w-full max-w-6xl z-10 flex flex-col h-full justify-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={isActive ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
             <div className="h-8 w-1 bg-cyan-500 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
             <h2 className="text-4xl md:text-5xl font-bold text-white">Integrations</h2>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl">
            Connect your favorite tools and services to extend MCP360's capabilities. 
            <span className="text-cyan-400 block mt-1 font-medium">Over 50+ pre-built connectors available.</span>
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 perspective-1000">
          {integrations.map((item, index) => (
            <IntegrationCard 
              key={item.id} 
              item={item} 
              index={index} 
              isActive={isActive} 
            />
          ))}
        </div>

        {/* Bottom Call to Action / Info */}
        <motion.div 
             initial={{ opacity: 0 }}
             animate={isActive ? { opacity: 1 } : {}}
             transition={{ delay: 1, duration: 0.8 }}
             className="mt-12 flex flex-col sm:flex-row justify-between items-center border-t border-white/5 pt-6 text-xs text-slate-500 font-mono"
        >
             <div className="flex gap-4 mb-4 sm:mb-0">
                <span className="hover:text-slate-300 transition-colors cursor-default">SDK v2.1.0</span>
                <span>•</span>
                <span className="hover:text-slate-300 transition-colors cursor-default">REST API</span>
                <span>•</span>
                <span className="hover:text-slate-300 transition-colors cursor-default">GraphQL</span>
             </div>
             <div className="flex items-center gap-2 text-cyan-500 cursor-pointer hover:text-cyan-400 transition-colors group">
                <span className="underline underline-offset-4">View all 50+ integrations</span>
                <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
             </div>
        </motion.div>

      </div>
    </div>
  );
};