import React from 'react';
import { motion } from 'framer-motion';

interface NavigationProps {
  totalSlates: number;
  activeSlate: number;
  onNavigate: (index: number) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ totalSlates, activeSlate, onNavigate }) => {
  const labels = [
    'Improvements',
    'How it Works',
    'The Problem',
    'New Features',
    'Workflow Builder',
    'Playground',
    'Run Workflows',
    'Integrations'
  ];

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">
      {Array.from({ length: totalSlates }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          className="relative w-4 h-4 flex items-center justify-center group"
          aria-label={`Go to slide ${i + 1}`}
        >
          {/* Label on hover */}
          <span className="absolute right-8 text-xs font-medium text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap bg-black/50 px-2 py-1 rounded backdrop-blur-sm border border-cyan-500/20">
            {labels[i] || `Slide ${i + 1}`}
          </span>

          <motion.div
            initial={false}
            animate={{
              width: activeSlate === i ? 12 : 6,
              height: activeSlate === i ? 12 : 6,
              backgroundColor: activeSlate === i ? '#22d3ee' : '#475569', // cyan-400 vs slate-600
              boxShadow: activeSlate === i ? '0 0 10px #22d3ee' : 'none'
            }}
            className="rounded-full transition-all duration-300"
          />
          {activeSlate === i && (
            <motion.div
              layoutId="nav-ring"
              className="absolute w-6 h-6 border border-cyan-500/50 rounded-full"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
};