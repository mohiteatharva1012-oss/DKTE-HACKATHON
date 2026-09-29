import React from 'react';
import logoImg from '../assets/pcb-logo.png';

export function PcbLogo({ size = 40, className = '', glow = false, style = {} }) {
  return (
    <img
      src={logoImg}
      alt="PCB - Police Bureau of Investigation"
      className={className}
      style={{
        width: `${size}px`,
        height: `${size * 1.2}px`,
        objectFit: 'contain',
        display: 'inline-block',
        filter: glow 
          ? 'drop-shadow(0 0 12px rgba(0, 206, 209, 0.45)) drop-shadow(0 4px 8px rgba(0,0,0,0.5))' 
          : 'drop-shadow(0 2px 5px rgba(0,0,0,0.4))',
        ...style,
      }}
    />
  );
}

export default PcbLogo;
