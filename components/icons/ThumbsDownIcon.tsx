import React from 'react';

const ThumbsDownIcon: React.FC<{ selected?: boolean }> = ({ selected }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={`h-5 w-5 ${selected ? 'text-red-400' : 'text-slate-400'}`}
    >
        <path d="M7 14V2"></path>
        <path d="M18.88 13.12a2.89 2.89 0 0 1-4.24 1.28l-2.64-2.4V3H3.66a2 2 0 0 1-1.98 1.76l-.72 5.4a2 2 0 0 1 2 2.24H10"></path>
    </svg>
);

export default ThumbsDownIcon;