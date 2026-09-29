import React, { useEffect, useState, memo } from 'react';

// Isolated tiny time component so the heavy background never re-renders
const CctvLiveTime = memo(function CctvLiveTime() {
  const [timeStr, setTimeStr] = useState(() => new Date().toTimeString().split(' ')[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeStr(new Date().toTimeString().split(' ')[0]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return <span>CAM-04 // SECTOR-07 EVIDENCE WALL // 2026-09-29 {timeStr} [REC]</span>;
});

export const LostTimeEvidenceWall = memo(function LostTimeEvidenceWall() {
  return (
    <div
      className="lost-time-evidence-wall"
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        minHeight: '600px',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* CCTV Timestamp & Camera Header */}
      <div style={{
        position: 'absolute',
        top: '12px',
        left: '16px',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: 'rgba(212, 175, 55, 0.45)',
        letterSpacing: '1.5px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        zIndex: 2,
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#E74C3C',
          display: 'inline-block',
          boxShadow: '0 0 6px #E74C3C',
          animation: 'pulse 2s infinite',
        }} />
        <CctvLiveTime />
      </div>

      <div className="evidence-wall-desktop-only" style={{
        position: 'absolute',
        top: '12px',
        right: '24px',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        color: 'rgba(0, 206, 209, 0.4)',
        letterSpacing: '1px',
        zIndex: 2,
      }}>
        FORENSIC DOSSIER INDEX // SEC-ID #DLOT-0927
      </div>

      {/* Main SVG Background Canvas (Clock, Evidence Yarn, Pins, Fingerprint Arc, Coordinates) */}
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="yarnGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#E74C3C" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. Faint Clock Face Behind Hero */}
        <g transform="translate(720, 310)" opacity="0.08">
          <circle r="340" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3,3" />
          <circle r="325" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
          <circle r="305" fill="none" stroke="#00CED1" strokeWidth="0.8" />
          <circle r="220" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="8,8" />
          <circle r="120" fill="none" stroke="#00CED1" strokeWidth="0.8" strokeDasharray="2,4" />
          <circle r="12" fill="#D4AF37" />

          {/* 60 Minute Ticks */}
          {Array.from({ length: 60 }).map((_, i) => {
            const angle = (i * 6 * Math.PI) / 180;
            const isMajor = i % 5 === 0;
            const r1 = isMajor ? 300 : 315;
            const r2 = 325;
            const x1 = Math.sin(angle) * r1;
            const y1 = -Math.cos(angle) * r1;
            const x2 = Math.sin(angle) * r2;
            const y2 = -Math.cos(angle) * r2;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={isMajor ? '#D4AF37' : 'rgba(212, 175, 55, 0.4)'}
                strokeWidth={isMajor ? 2 : 1}
              />
            );
          })}

          <text x="0" y="-270" fill="#D4AF37" fontSize="22" fontFamily="Cinzel, serif" fontWeight="700" textAnchor="middle">XII</text>
          <text x="280" y="8" fill="#D4AF37" fontSize="22" fontFamily="Cinzel, serif" fontWeight="700" textAnchor="middle">III</text>
          <text x="0" y="290" fill="#D4AF37" fontSize="22" fontFamily="Cinzel, serif" fontWeight="700" textAnchor="middle">VI</text>
          <text x="-280" y="8" fill="#D4AF37" fontSize="22" fontFamily="Cinzel, serif" fontWeight="700" textAnchor="middle">IX</text>

          {/* Clock Hands pointing to 2:04 */}
          <line x1="0" y1="0" x2="110" y2="40" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round" />
          <line x1="0" y1="0" x2="35" y2="-210" stroke="#F7E7B4" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="-30" y1="20" x2="160" y2="-120" stroke="#E74C3C" strokeWidth="1" />
        </g>

        {/* 2. Forensic Fingerprint Whorl Arcs */}
        <g transform="translate(1120, 240)" opacity="0.05" stroke="#00CED1" fill="none" strokeWidth="1.2">
          <ellipse cx="0" cy="0" rx="90" ry="130" strokeDasharray="12,4" />
          <ellipse cx="0" cy="5" rx="75" ry="110" strokeDasharray="18,6" />
          <ellipse cx="-4" cy="10" rx="60" ry="90" />
          <ellipse cx="-2" cy="15" rx="45" ry="70" />
          <ellipse cx="0" cy="18" rx="30" ry="50" />
          <ellipse cx="0" cy="20" rx="15" ry="30" />
          <circle cx="0" cy="0" r="140" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="4,8" />
        </g>

        {/* 3. Thin Red Evidence Lines */}
        <g opacity="0.4" filter="url(#yarnGlow)">
          <path d="M 180,220 Q 300,165 420,150" fill="none" stroke="#C0392B" strokeWidth="1.4" strokeDasharray="5,3" />
          <path d="M 420,150 Q 730,90 1040,160" fill="none" stroke="#C0392B" strokeWidth="1.4" strokeDasharray="6,4" />
          <path d="M 1040,160 Q 1180,260 1260,380" fill="none" stroke="#C0392B" strokeWidth="1.4" strokeDasharray="5,3" />
          <path d="M 420,150 Q 320,380 260,490" fill="none" stroke="rgba(212, 175, 55, 0.35)" strokeWidth="1" strokeDasharray="3,3" />
        </g>

        {/* Push Pins at Evidence Junctions */}
        {[
          { x: 180, y: 220, color: '#FF4D4F' },
          { x: 420, y: 150, color: '#D4AF37' },
          { x: 1040, y: 160, color: '#D4AF37' },
          { x: 1260, y: 380, color: '#48BB78' },
          { x: 260, y: 490, color: '#00CED1' },
        ].map((pin, idx) => (
          <g key={idx} transform={`translate(${pin.x}, ${pin.y})`} opacity="0.75">
            <circle r="5" fill={pin.color} />
            <circle r="7" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />
            <circle r="1" fill="#FFFFFF" />
          </g>
        ))}
      </svg>

      {/* 4. Desktop-only Evidence Markers (Hidden on mobile to prevent overflow) */}
      <div className="evidence-wall-desktop-only">
        {/* Node 1: YOU / CITIZEN */}
        <div style={{
          position: 'absolute',
          top: '190px',
          left: '95px',
          background: 'rgba(8, 14, 28, 0.7)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: '3px',
          padding: '5px 9px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: '#CBD5E1',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)',
          opacity: 0.55,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
            <span style={{
              background: '#D4AF37',
              color: '#070C18',
              fontWeight: 900,
              fontSize: '8px',
              padding: '1px 3px',
              borderRadius: '2px',
            }}>
              E-01
            </span>
            <strong style={{ color: '#F7E7B4' }}>DEFENDANT [YOU]</strong>
          </div>
          <div style={{ color: '#8A99AD', fontSize: '8px' }}>TARGET OF INQUEST</div>
        </div>

        {/* Node 2: PHONE */}
        <div style={{
          position: 'absolute',
          top: '120px',
          left: '425px',
          background: 'rgba(8, 14, 28, 0.7)',
          border: '1px solid rgba(231, 76, 60, 0.3)',
          borderRadius: '3px',
          padding: '5px 9px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: '#CBD5E1',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)',
          opacity: 0.55,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
            <span style={{
              background: '#D4AF37',
              color: '#070C18',
              fontWeight: 900,
              fontSize: '8px',
              padding: '1px 3px',
              borderRadius: '2px',
            }}>
              E-02
            </span>
            <strong style={{ color: '#FF7875' }}>PHONE / DEVICE</strong>
          </div>
          <div style={{ color: '#8A99AD', fontSize: '8px' }}>THEFT INSTRUMENT</div>
        </div>

        {/* Node 3: “5 MINUTES” */}
        <div style={{
          position: 'absolute',
          top: '130px',
          right: '340px',
          background: 'rgba(8, 14, 28, 0.7)',
          border: '1px solid rgba(212, 175, 55, 0.25)',
          borderRadius: '3px',
          padding: '5px 9px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: '#CBD5E1',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)',
          opacity: 0.55,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
            <span style={{ color: '#F7E7B4', fontWeight: 800 }}>"5 MINUTES"</span>
          </div>
          <div style={{ color: '#8A99AD', fontSize: '8px' }}>FABRICATED TIMEFRAME</div>
        </div>

        {/* Node 4: TOMORROW */}
        <div style={{
          position: 'absolute',
          top: '350px',
          right: '110px',
          background: 'rgba(8, 14, 28, 0.7)',
          border: '1px solid rgba(72, 187, 120, 0.3)',
          borderRadius: '3px',
          padding: '5px 9px',
          fontFamily: 'var(--font-mono)',
          fontSize: '9px',
          color: '#CBD5E1',
          boxShadow: '0 4px 14px rgba(0, 0, 0, 0.5)',
          opacity: 0.55,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
            <span style={{
              background: '#D4AF37',
              color: '#070C18',
              fontWeight: 900,
              fontSize: '8px',
              padding: '1px 3px',
              borderRadius: '2px',
            }}>
              E-03
            </span>
            <strong style={{ color: '#9AE6B4' }}>TOMORROW</strong>
          </div>
          <div style={{ color: '#8A99AD', fontSize: '8px' }}>THE PURGATORY REALM</div>
        </div>
      </div>

      {/* 5. Detecting Scanner Line (Hardware-accelerated with will-change) */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          height: '18px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 206, 209, 0.08) 60%, rgba(0, 206, 209, 0.3) 96%, #00CED1 100%)',
          boxShadow: '0 2px 10px rgba(0, 206, 209, 0.4)',
          opacity: 0.45,
          animation: 'forensicLaserScanPrimary 9s linear infinite',
          pointerEvents: 'none',
          willChange: 'transform, top',
        }}
      />

      {/* 6. High-Contrast Center Vignette Mask */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 38%, rgba(5, 8, 17, 0.45) 0%, rgba(5, 8, 17, 0.8) 60%, #050811 100%)',
          pointerEvents: 'none',
        }}
      />

      <style>{`
        @media (max-width: 768px) {
          .evidence-wall-desktop-only {
            display: none !important;
          }
        }
        @keyframes forensicLaserScanPrimary {
          0% {
            top: -5%;
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            top: 105%;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
});
