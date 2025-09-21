import React from 'react';
import { Page } from '../App';
import RocketIcon from './icons/RocketIcon';
import VaultIcon from './icons/VaultIcon';

interface NavbarProps {
    currentPage: Page;
    setPage: (page: Page) => void;
}

const NavButton: React.FC<{
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}> = ({ isActive, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 font-semibold text-sm transition-all duration-300 rounded-lg border-2 ${
            isActive
                ? 'bg-purple-600/50 border-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:border-slate-500'
        }`}
        aria-current={isActive ? 'page' : undefined}
    >
        {icon}
        {label}
    </button>
);

const Navbar: React.FC<NavbarProps> = ({ currentPage, setPage }) => {
    return (
        <nav className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl p-2 shadow-2xl flex items-center justify-around gap-2">
            <NavButton
                isActive={currentPage === 'generator'}
                onClick={() => setPage('generator')}
                icon={<RocketIcon />}
                label="Generator"
            />
            <NavButton
                isActive={currentPage === 'vault'}
                onClick={() => setPage('vault')}
                icon={<VaultIcon />}
                label="Strategy Vault"
            />
        </nav>
    );
};

export default Navbar;
