import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLocalStorage } from './hooks/useLocalStorage';
import Navbar from './components/Navbar';
import Generator from './components/Generator';
import StrategyVault from './components/StrategyVault';

export type Page = 'generator' | 'vault';

export interface Strategy {
  id: string;
  idea: string;
  content: string;
  timestamp: string;
  feedbackRating?: 'up' | 'down' | null;
  feedbackComment?: string;
}

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('generator');
  const [strategies, setStrategies] = useLocalStorage<Strategy[]>('stratgen-strategies', []);

  const handleStrategyGenerated = (idea: string, content: string) => {
    const newStrategy: Strategy = {
      id: crypto.randomUUID(),
      idea,
      content,
      timestamp: new Date().toISOString(),
    };
    setStrategies([newStrategy, ...strategies]);
    setPage('vault'); // Navigate to vault after generation
  };

  const handleUpdateStrategy = (updatedStrategy: Strategy) => {
    setStrategies(strategies.map(s => s.id === updatedStrategy.id ? updatedStrategy : s));
  };


  return (
    <div className="min-h-screen text-white font-sans flex flex-col items-center justify-start p-4">
      <div className="w-full max-w-3xl mx-auto">
        <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-sky-400 text-transparent bg-clip-text">
                💡 StratGen AI
            </h1>
            <p className="text-slate-400 mt-2 text-lg">Your Instant Business Strategist</p>
        </header>
        <Navbar currentPage={page} setPage={setPage} />
        <main className="mt-8">
            <AnimatePresence mode="wait">
                {page === 'generator' && <Generator key="generator" onStrategyGenerated={handleStrategyGenerated} />}
                {page === 'vault' && <StrategyVault key="vault" strategies={strategies} setStrategies={setStrategies} onUpdateStrategy={handleUpdateStrategy} />}
            </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default App;