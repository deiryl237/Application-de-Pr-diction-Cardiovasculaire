import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
  id?: string | number;
}

export function PageTransition({ children, className = '', id }: PageTransitionProps) {
  // Simple CSS-based entry animation on mount. Using `key` on wrapper ensures animation
  // restarts when App changes the screen key.
  return (
    <div key={id} className={`w-full h-full animate-page-enter ${className}`} style={{ willChange: 'opacity, transform' }}>
      {children}
    </div>
  );
}

export default PageTransition;
