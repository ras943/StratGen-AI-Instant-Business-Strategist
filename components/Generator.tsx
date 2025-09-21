import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { generateStrategy } from '../services/geminiService';
import LoadingSpinner from './LoadingSpinner';
import RocketIcon from './icons/RocketIcon';

interface GeneratorProps {
    onStrategyGenerated: (idea: string, content: string) => void;
}

const Generator: React.FC<GeneratorProps> = ({ onStrategyGenerated }) => {
    const [userInput, setUserInput] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateClick = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        if (!userInput.trim()) {
            setError('Please enter a business idea.');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const result = await generateStrategy(userInput);
            onStrategyGenerated(userInput, result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred.');
            setIsLoading(false);
        }
    }, [userInput, onStrategyGenerated]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-2xl">
                <form onSubmit={handleGenerateClick}>
                    <label htmlFor="business-idea" className="block text-lg font-semibold text-slate-300 mb-2">
                        Enter your business idea:
                    </label>
                    <textarea
                        id="business-idea"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="e.g., A subscription box service for rare indoor plants."
                        className="w-full h-36 p-3 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none text-slate-200 placeholder-slate-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50"
                        disabled={isLoading}
                    >
                        <RocketIcon />
                        {isLoading ? 'Generating...' : 'Generate Strategy'}
                    </button>
                </form>
            </div>
            <div className="mt-8">
                {isLoading && (
                    <div className="flex flex-col items-center justify-center bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                        <LoadingSpinner />
                        <p className="mt-4 text-slate-400 animate-pulse">AI is crafting your strategy...</p>
                    </div>
                )}
                {error && <div className="bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">{error}</div>}
            </div>
        </motion.div>
    );
};

export default Generator;
