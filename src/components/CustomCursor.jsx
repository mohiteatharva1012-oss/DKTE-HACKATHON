import React, { useEffect, useRef } from 'react';
import cursorImg from '../assets/custom-cursor.png';

export function CustomCursor() {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  // Position & animation loop references to completely eliminate React re-renders during mouse movement
  const lastSpawnPos = useRef({ x: -100, y: -100 });
  const particles = useRef([]);
  const animFrameId = useRef(null);
  const isLoopRunning = useRef(false);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    // Only enable on fine pointer desktop devices (never on mobile or touchscreens)
    const isTouch = 
      typeof window === 'undefined' ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
      window.innerWidth <= 768;

    if (isTouch) {
      return;
    }

    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;
    const ctx = canvas.getContext('2d', { alpha: true });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation Loop for Smoke Particles — only runs while particles are alive
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (particles.current.length === 0) {
        isLoopRunning.current = false;
        return; // Idles completely when no particles exist (0% CPU)
      }

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.life++;

        // Physics: drift and drag
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.angle += p.spin;

        const progress = p.life / p.maxLife;
        const currentSize = p.size + (p.maxSize - p.size) * Math.sin((progress * Math.PI) / 2);
        const currentAlpha = p.opacity * (1 - progress);

        if (progress >= 1 || currentAlpha <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        // Draw soft volumetric smoke puff
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize);
        gradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha})`);
        gradient.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${currentAlpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(0, 0, currentSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameId.current = requestAnimationFrame(animate);
    };

    const startAnimationLoop = () => {
      if (!isLoopRunning.current) {
        isLoopRunning.current = true;
        animFrameId.current = requestAnimationFrame(animate);
      }
    };

    // Add smoke particle
    const spawnSmoke = (x, y, count = 1, isClickBurst = false) => {
      for (let i = 0; i < count; i++) {
        const offsetX = (Math.random() - 0.5) * 6;
        const offsetY = (Math.random() - 0.5) * 6;
        
        const speedMultiplier = isClickBurst ? 1.5 : 1;
        const vx = ((Math.random() - 0.5) * 0.8) * speedMultiplier;
        const vy = (-(Math.random() * 0.6 + 0.3)) * speedMultiplier;

        const isCyanHaze = Math.random() > 0.6;
        const color = isCyanHaze ? { r: 0, g: 206, b: 209 } : { r: 215, g: 228, b: 242 };

        particles.current.push({
          x: x + offsetX,
          y: y + offsetY,
          vx,
          vy,
          size: Math.random() * 5 + (isClickBurst ? 8 : 6),
          maxSize: Math.random() * 16 + (isClickBurst ? 28 : 22),
          opacity: Math.random() * 0.35 + 0.25,
          life: 0,
          maxLife: Math.random() * 25 + (isClickBurst ? 45 : 35),
          color,
          angle: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.04,
        });
      }

      if (particles.current.length > 50) {
        particles.current.splice(0, particles.current.length - 50);
      }

      startAnimationLoop();
    };

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Direct GPU transform: 0 React re-renders
      cursor.style.opacity = '1';
      cursor.style.transform = `translate3d(${x - 14}px, ${y - 14}px, 0)`;

      const dx = x - lastSpawnPos.current.x;
      const dy = y - lastSpawnPos.current.y;
      if (dx * dx + dy * dy > 64) {
        spawnSmoke(x, y, 1);
        lastSpawnPos.current = { x, y };
      }

      // Check hover state via direct DOM class manipulation
      const target = e.target;
      const clickable = target && (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.getAttribute('role') === 'button' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList?.contains('clickable') ||
        window.getComputedStyle(target).cursor === 'pointer'
      );

      const isHoverNow = Boolean(clickable);
      if (isHoverNow !== isHoveredRef.current) {
        isHoveredRef.current = isHoverNow;
        if (isHoverNow) {
          cursor.classList.add('cursor-is-hovered');
        } else {
          cursor.classList.remove('cursor-is-hovered');
        }
      }
    };

    const handleMouseDown = (e) => {
      cursor.classList.add('cursor-is-clicking');
      spawnSmoke(e.clientX, e.clientY, 4, true);
    };

    const handleMouseUp = () => {
      cursor.classList.remove('cursor-is-clicking');
    };

    const handleMouseLeave = () => {
      cursor.style.opacity = '0';
    };

    const handleMouseEnter = () => {
      cursor.style.opacity = '1';
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    document.body.classList.add('custom-cursor-enabled');

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-enabled');
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Return nothing on touch / mobile screens to ensure 100% smooth mobile performance
  if (typeof window !== 'undefined') {
    const isMobileOrTouch = 
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) ||
      window.innerWidth <= 768;
    if (isMobileOrTouch) return null;
  }

  return (
    <>
      {/* Smoke Canvas Trail */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 999980,
        }}
      />

      {/* Magnifying Glass Cursor */}
      <div
        ref={cursorRef}
        className="custom-cursor-element"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 999990,
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0)',
          willChange: 'transform',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="cursor-inner-wrapper">
          <img
            src={cursorImg}
            alt="Forensic Magnifying Glass Cursor"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />

          {/* Laser Scan Glow Dot at center of lens */}
          <div style={{
            position: 'absolute',
            top: '36%',
            left: '36%',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#FFFFFF',
            boxShadow: '0 0 8px #00CED1, 0 0 12px #00CED1',
            pointerEvents: 'none',
            animation: 'pulse 1.5s infinite',
          }} />
        </div>
      </div>
    </>
  );
}
