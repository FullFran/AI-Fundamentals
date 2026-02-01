'use client';
import { ReactNode, useState } from 'react';

interface CollapsibleSectionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: string;
}

export default function CollapsibleSection({ 
  title, 
  children, 
  defaultOpen = false,
  icon = '📖'
}: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="my-6 overflow-hidden rounded-xl border border-[var(--border)] bg-white/[0.02] transition-all duration-300 hover:bg-white/[0.04]">
      <button 
        className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        type="button"
      >
        <div className="flex items-center gap-4">
          <span className="text-xl">{icon}</span>
          <span className="font-semibold text-[var(--text-primary)]">{title}</span>
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className={`text-[var(--text-secondary)] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[var(--border)] px-6 py-6 bg-black/20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
