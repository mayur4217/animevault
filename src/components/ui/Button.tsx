import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const variantStyles: Record<string, string> = {
  primary: `
    background: linear-gradient(135deg, #00f5a0, #00d9f5);
    color: #0a0a0f;
    border: none;
    font-weight: 700;
  `,
  secondary: `
    background: transparent;
    color: #00f5a0;
    border: 1px solid #00f5a0;
    font-weight: 600;
  `,
  ghost: `
    background: rgba(255,255,255,0.05);
    color: #e2e8f0;
    border: 1px solid rgba(255,255,255,0.1);
    font-weight: 500;
  `,
  danger: `
    background: linear-gradient(135deg, #ff4e6a, #ff2d55);
    color: white;
    border: none;
    font-weight: 700;
  `,
};

const sizeStyles: Record<string, string> = {
  sm: 'padding: 6px 14px; font-size: 12px; border-radius: 6px;',
  md: 'padding: 10px 22px; font-size: 14px; border-radius: 8px;',
  lg: 'padding: 14px 32px; font-size: 16px; border-radius: 10px;',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  style,
  ...props
}) => {
  return (
    <button
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: "'Outfit', sans-serif",
        letterSpacing: '0.02em',
        ...parseInlineStyle(variantStyles[variant]),
        ...parseInlineStyle(sizeStyles[size]),
        ...style,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 25px rgba(0,245,160,0.25)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = 'none';
      }}
      {...props}
    >
      {children}
    </button>
  );
};

function parseInlineStyle(styleStr: string): React.CSSProperties {
  const result: Record<string, string> = {};
  styleStr.split(';').forEach(rule => {
    const [prop, value] = rule.split(':').map(s => s.trim());
    if (prop && value) {
      const camelProp = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      result[camelProp] = value;
    }
  });
  return result as React.CSSProperties;
}
