import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Strategy } from '../App';
import DownloadIcon from './icons/DownloadIcon';
import ClipboardIcon from './icons/ClipboardIcon';
import TrashIcon from './icons/TrashIcon';
import ThumbsUpIcon from './icons/ThumbsUpIcon';
import ThumbsDownIcon from './icons/ThumbsDownIcon';

interface StrategyVaultProps {
    strategies: Strategy[];
    setStrategies: React.Dispatch<React.SetStateAction<Strategy[]>>;
    onUpdateStrategy: (strategy: Strategy) => void;
}

type SortOption = 'date-desc' | 'date-asc' | 'idea-asc' | 'idea-desc';

const StrategyItem: React.FC<{
    strategy: Strategy;
    onDelete: (id: string) => void;
    onUpdate: (strategy: Strategy) => void;
}> = ({ strategy, onDelete, onUpdate }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [rating, setRating] = useState<'up' | 'down' | null>(strategy.feedbackRating || null);
    const [comment, setComment] = useState(strategy.feedbackComment || '');
    
    const hasSubmittedFeedback = !!strategy.feedbackRating;

    const handleCopy = () => {
        navigator.clipboard.writeText(strategy.content);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([strategy.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${strategy.idea.slice(0, 20).replace(/ /g, '_')}_plan.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleSubmitFeedback = () => {
        if (!rating) {
            alert("Please select a rating (thumbs up or down) before submitting.");
            return;
        }
        onUpdate({
            ...strategy,
            feedbackRating: rating,
            feedbackComment: comment.trim(),
        });
    };
    
    return (
        <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800/70 border border-slate-700 rounded-lg mb-4 overflow-hidden"
        >
            <button onClick={() => setIsExpanded(!isExpanded)} className="w-full text-left p-4 flex justify-between items-center hover:bg-slate-700/50 transition-colors">
                <div>
                    <h3 className="font-semibold text-slate-200">{strategy.idea}</h3>
                    <p className="text-xs text-slate-400">{new Date(strategy.timestamp).toLocaleString()}</p>
                </div>
                <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
                    <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </motion.div>
            </button>
            <AnimatePresence>
            {isExpanded && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-4 pb-4 border-t border-slate-700"
                >
                    <div className="prose prose-invert prose-p:text-slate-300 prose-headings:text-slate-100 prose-strong:text-slate-100 prose-ul:text-slate-300 mt-4 whitespace-pre-wrap font-mono text-sm leading-relaxed">
                        {strategy.content}
                    </div>

                    {/* Feedback Section */}
                    <div className="mt-6 pt-4 border-t border-slate-700/50">
                        {hasSubmittedFeedback ? (
                            <div>
                                <h4 className="font-semibold text-slate-300 mb-2">Your Feedback:</h4>
                                <div className="flex items-center gap-2 p-3 bg-slate-900/50 rounded-lg">
                                    {strategy.feedbackRating === 'up' && <ThumbsUpIcon selected />}
                                    {strategy.feedbackRating === 'down' && <ThumbsDownIcon selected />}
                                    <span className="text-slate-300 font-medium">Thank you for your feedback!</span>
                                </div>
                                {strategy.feedbackComment && <p className="text-slate-400 mt-2 italic text-sm p-3 bg-slate-900/50 rounded-lg">"{strategy.feedbackComment}"</p>}
                            </div>
                        ) : (
                             <div>
                                <h4 className="font-semibold text-slate-300 mb-2">Rate this strategy:</h4>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => setRating('up')} className={`p-2 rounded-full transition-colors ${rating === 'up' ? 'bg-green-500/30' : 'bg-slate-700 hover:bg-slate-600'}`}><ThumbsUpIcon selected={rating === 'up'} /></button>
                                    <button onClick={() => setRating('down')} className={`p-2 rounded-full transition-colors ${rating === 'down' ? 'bg-red-500/30' : 'bg-slate-700 hover:bg-slate-600'}`}><ThumbsDownIcon selected={rating === 'down'} /></button>
                                </div>
                                <textarea
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Optional: Add a comment..."
                                    className="w-full mt-3 p-2 bg-slate-900 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none text-slate-200 placeholder-slate-500 text-sm"
                                    rows={2}
                                />
                                <button onClick={handleSubmitFeedback} className="mt-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm">
                                    Submit Feedback
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-700/50">
                        <button onClick={handleCopy} className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 text-sm">
                            <ClipboardIcon /> {isCopied ? 'Copied!' : 'Copy'}
                        </button>
                        <button onClick={handleDownload} className="flex items-center gap-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 text-sm">
                            <DownloadIcon /> Download
                        </button>
                        <button onClick={() => onDelete(strategy.id)} className="ml-auto flex items-center gap-2 bg-red-800/70 hover:bg-red-700 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 text-sm">
                            <TrashIcon /> Delete
                        </button>
                    </div>
                </motion.div>
            )}
            </AnimatePresence>
        </motion.div>
    );
};

const StrategyVault: React.FC<StrategyVaultProps> = ({ strategies, setStrategies, onUpdateStrategy }) => {
    const [sortOption, setSortOption] = useState<SortOption>('date-desc');
    
    const handleDelete = (idToDelete: string) => {
        setStrategies(strategies.filter(s => s.id !== idToDelete));
    };

    const sortedStrategies = useMemo(() => {
        const sorted = [...strategies];
        switch (sortOption) {
            case 'date-asc':
                return sorted.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
            case 'idea-asc':
                return sorted.sort((a, b) => a.idea.localeCompare(b.idea));
            case 'idea-desc':
                return sorted.sort((a, b) => b.idea.localeCompare(a.idea));
            case 'date-desc':
            default:
                return sorted.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
        }
    }, [strategies, sortOption]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 shadow-2xl">
                <h2 className="text-2xl font-bold text-slate-200 mb-4">Strategy Vault</h2>
                {strategies.length === 0 ? (
                    <p className="text-slate-400 text-center py-8">You haven't generated any strategies yet. Go to the Generator to create your first one!</p>
                ) : (
                    <>
                        <div className="flex justify-end items-center mb-4 gap-2">
                            <label htmlFor="sort-select" className="text-sm text-slate-400">Sort by:</label>
                            <select
                                id="sort-select"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as SortOption)}
                                className="bg-slate-900 border border-slate-600 rounded-md py-1 px-3 text-slate-300 text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                                aria-label="Sort strategies"
                            >
                                <option value="date-desc">Newest First</option>
                                <option value="date-asc">Oldest First</option>
                                <option value="idea-asc">Idea (A-Z)</option>
                                <option value="idea-desc">Idea (Z-A)</option>
                            </select>
                        </div>

                        <AnimatePresence>
                            {sortedStrategies.map(strategy => (
                                <StrategyItem key={strategy.id} strategy={strategy} onDelete={handleDelete} onUpdate={onUpdateStrategy} />
                            ))}
                        </AnimatePresence>
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default StrategyVault;