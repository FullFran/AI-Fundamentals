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
    <div className="collapsible-section">
      <button 
        className="collapsible-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        type="button"
      >
        <span className="collapsible-icon">{icon}</span>
        <span className="collapsible-title">{title}</span>
        <span 
          className="collapsible-arrow"
          style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
        >
          ▶
        </span>
      </button>
      {isOpen && (
        <div className="collapsible-inner">
          {children}
        </div>
      )}
    </div>
  );
}

