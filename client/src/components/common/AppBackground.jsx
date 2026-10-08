import React from 'react';

export default function AppBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" style={{ background: 'linear-gradient(to bottom right, var(--bg-start), var(--bg-end))' }}>
      <div 
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] opacity-40 mix-blend-screen"
        style={{ background: 'var(--glow-1)', top: '-20%', left: '-10%' }}
      />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-40 mix-blend-screen"
        style={{ background: 'var(--glow-2)', bottom: '-10%', right: '-10%' }}
      />
    </div>
  );
}
