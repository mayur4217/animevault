import React from 'react';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  fullPage?: boolean;
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size = 'md', fullPage = false, text }) => {
  const sizes = { sm: 24, md: 44, lg: 64 };
  const px = sizes[size];

  const spinner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <style>{`
        @keyframes spin-ring {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.6); }
        }
      `}</style>
      <div style={{ position: 'relative', width: px, height: px }}>
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: `${size === 'sm' ? 2 : 3}px solid rgba(0,245,160,0.15)`,
          borderTopColor: '#00f5a0',
          animation: 'spin-ring 0.8s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: size === 'sm' ? 4 : 8,
          borderRadius: '50%',
          border: `${size === 'sm' ? 1 : 2}px solid rgba(0,217,245,0.15)`,
          borderBottomColor: '#00d9f5',
          animation: 'spin-ring 1.2s linear infinite reverse',
        }} />
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: size === 'sm' ? 6 : 10,
          height: size === 'sm' ? 6 : 10,
          borderRadius: '50%',
          background: '#00f5a0',
          animation: 'pulse-dot 1s ease infinite',
          boxShadow: '0 0 10px #00f5a0',
        }} />
      </div>
      {text && (
        <p style={{
          color: '#94a3b8',
          fontFamily: "'Outfit', sans-serif",
          fontSize: '14px',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
        }}>{text}</p>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(10,10,15,0.8)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
      }}>
        {spinner}
      </div>
    );
  }

  return spinner;
};
