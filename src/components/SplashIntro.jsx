import React, { useState, useEffect } from 'react';
import { PcbLogo } from './PcbLogo';

export function SplashIntro({ onFinish }) {
  const words = [
    { text: 'DETECTING...', subtitle: 'Scanning temporal leakage across Sector 7', color: '#00CED1' },
    { text: 'RESEARCHING...', subtitle: 'Cross-referencing unread tabs & second brains', color: '#E74C3C' },
    { text: 'INVESTIGATING...', subtitle: 'Subpoenaing morning procrastination alibis', color: '#D4AF37' },
    { text: 'INTERROGATING...', subtitle: 'Summoning suspects before the Grand Court', color: '#00CED1' },
    { text: 'PRODUCTIVITY CRIME BRANCH', subtitle: 'Police Bureau of Investigation // Court in Session', color: '#FFF2CD' },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // 3-second total lifecycle (divided across words)
    const wordInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < words.length - 1) {
          return prev + 1;
        } else {
          clearInterval(wordInterval);
          return prev;
        }
      });
    }, 600);

    const finishTimeout = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onFinish, 450);
    }, 3100);

    return () => {
      clearInterval(wordInterval);
      clearTimeout(finishTimeout);
    };
  }, [onFinish, words.length]);

  const currentWord = words[currentIndex];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'radial-gradient(circle at center, #0B1325 0%, #04070F 100%)',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      opacity: isFadingOut ? 0 : 1,
      transform: isFadingOut ? 'scale(1.05)' : 'scale(1)',
      transition: 'opacity 0.45s ease, transform 0.45s ease',
      pointerEvents: isFadingOut ? 'none' : 'auto',
    }}>
      {/* Background Animated Grid Lines */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(0, 206, 209, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 206, 209, 0.08) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        pointerEvents: 'none',
      }}></div>

      {/* Top Bureau Classification Header */}
      <div style={{
        fontFamily: 'var(--font-typewriter)',
        fontSize: '11px',
        letterSpacing: '3px',
        color: '#00CED1',
        marginBottom: '28px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        textTransform: 'uppercase',
      }}>
        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--red-stamp)', display: 'inline-block' }}></span>
        POLICE BUREAU OF INVESTIGATION // TEMPORAL CRIME DOCKET
      </div>

      {/* Official PCB Logo Emblem */}
      <div style={{
        position: 'relative',
        marginBottom: '24px',
        animation: 'pulseGold 2s infinite',
      }}>
        <PcbLogo size={110} glow={true} />
      </div>

      {/* Blinkit-Style Animated Action Word */}
      <div style={{
        minHeight: '80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}>
        <div
          key={currentWord.text}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(28px, 5.5vw, 52px)',
            fontWeight: 900,
            color: currentWord.color,
            letterSpacing: '3px',
            textShadow: '0 0 35px rgba(0, 206, 209, 0.4), 0 4px 15px rgba(0, 0, 0, 0.8)',
            animation: 'stepFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span>{currentWord.text}</span>
        </div>

        <div
          key={currentWord.subtitle}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(12px, 1.8vw, 15px)',
            color: '#CBD5E1',
            marginTop: '8px',
            animation: 'stepFadeIn 0.35s ease forwards',
            maxWidth: '540px',
          }}
        >
          {currentWord.subtitle}
        </div>
      </div>

      {/* 3-Second Loading Bar */}
      <div style={{
        width: '260px',
        height: '4px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '2px',
        overflow: 'hidden',
        marginTop: '36px',
        border: '1px solid rgba(0, 206, 209, 0.4)',
      }}>
        <div style={{
          width: `${((currentIndex + 1) / words.length) * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #008B8B, #00CED1, #FFF2CD)',
          transition: 'width 0.4s ease',
          boxShadow: '0 0 10px rgba(0, 206, 209, 0.8)',
        }}></div>
      </div>

      {/* Skip Intro Button */}
      <button
        onClick={() => {
          setIsFadingOut(true);
          setTimeout(onFinish, 200);
        }}
        style={{
          position: 'absolute',
          bottom: '24px',
          right: '28px',
          background: 'transparent',
          border: '1px solid rgba(0, 206, 209, 0.4)',
          color: '#00CED1',
          fontFamily: 'var(--font-typewriter)',
          fontSize: '11px',
          padding: '6px 14px',
          borderRadius: '4px',
          cursor: 'pointer',
          letterSpacing: '1px',
        }}
      >
        SKIP INTRO ⏭
      </button>
    </div>
  );
}
