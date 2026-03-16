import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  maxWidth?: string;
  style?: React.CSSProperties;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  maxWidth = '1400px',
  style,
}) => {
  return (
    <div
      style={{
        width: '100%',
        maxWidth,
        margin: '0 auto',
        padding: '0 24px',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
