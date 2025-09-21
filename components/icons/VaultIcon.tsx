import React from 'react';

const VaultIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="12" cy="12" r="2"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="8" y1="12" x2="12" y2="12"></line>
        <line x1="16" y1="12" x2="12" y2="12"></line>
    </svg>
);

export default VaultIcon;
