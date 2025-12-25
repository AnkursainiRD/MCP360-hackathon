import React, { useState, useEffect } from 'react';
import { HeroSlate } from './components/Slates/HeroSlate';
import { HowItWorksSlate } from './components/Slates/HowItWorksSlate';
import { ProblemSlate } from './components/Slates/ProblemSlate';
import { WorkflowEditorSlate } from './components/Slates/WorkflowEditorSlate';
import { ChatPlaygroundSlate } from './components/Slates/ChatPlaygroundSlate';
import { AgentWorkflowSlate } from './components/Slates/AgentWorkflowSlate';
import { FeaturesSlate } from './components/Slates/FeaturesSlate';
import { IntegrationSlate } from './components/Slates/IntegrationSlate';
import { AnimatedBackground } from './components/UI/AnimatedBackground';
import { Navigation } from './components/UI/Navigation';
import { AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeSlate, setActiveSlate] = useState(0);

  // Simple scroll spy logic to update navigation
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      // Use round to find closest slide
      const index = Math.round(scrollPosition / windowHeight);
      setActiveSlate(index);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlate = (index: number) => {
    window.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full text-white selection:bg-cyan-500/30 selection:text-cyan-200">
      <AnimatedBackground />
      
      <main className="relative z-10">
        <section className="h-screen w-full snap-start relative overflow-hidden">
          <HeroSlate isActive={activeSlate === 0} />
        </section>

        <section className="h-screen w-full snap-start relative overflow-hidden">
          <HowItWorksSlate isActive={activeSlate === 1} />
        </section>

        <section className="h-screen w-full snap-start relative overflow-hidden">
          <ProblemSlate isActive={activeSlate === 2} />
        </section>

        <section className="h-screen w-full snap-start relative overflow-hidden">
          <FeaturesSlate isActive={activeSlate === 3} />
        </section>

        <section className="h-screen w-full snap-start relative overflow-hidden">
          <WorkflowEditorSlate isActive={activeSlate === 4} />
        </section>

        <section className="h-screen w-full snap-start relative overflow-hidden">
          <ChatPlaygroundSlate isActive={activeSlate === 5} />
        </section>

        <section className="h-screen w-full snap-start relative overflow-hidden">
          <AgentWorkflowSlate isActive={activeSlate === 6} />
        </section>

        <section className="h-screen w-full snap-start relative overflow-hidden">
          <IntegrationSlate isActive={activeSlate === 7} />
        </section>
      </main>

      <Navigation 
        totalSlates={8} 
        activeSlate={activeSlate} 
        onNavigate={scrollToSlate} 
      />
    </div>
  );
};

export default App;