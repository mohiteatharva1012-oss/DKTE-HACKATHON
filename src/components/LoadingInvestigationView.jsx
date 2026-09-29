import React, { useEffect, useState } from 'react';
import { Cpu, Terminal, ShieldAlert, FastForward, CheckCircle2, Fingerprint, Database, Check } from 'lucide-react';

export function LoadingInvestigationView({ onCompleteLoading }) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(8);

  const steps = [
    { label: 'INGESTING SWORN AUDIO DEPOSITION...', detail: 'De-noising microphone frequencies and isolating nervous gulps' },
    { label: 'CROSS-REFERENCING NATIONAL SLOTH DATABASE...', detail: 'Comparing browser metrics against 140M known procrastinators' },
    { label: 'RECONSTRUCTING CHROME TAB & YOUTUBE ARTIFACTS...', detail: 'Forensic recovery of 37 dormant tabs and video essay timestamps' },
    { label: 'CALIBRATING DEADLINE NEGOTIATOR & RESEARCH FRAUD...', detail: 'Mapping "I\'ll do it later" statements and unstarted project folders' },
    { label: 'CALCULATING TOTAL TEMPORAL THEFT...', detail: 'Translating wasted hours into forfeited human potential and wealth' },
    { label: 'DRAFTING INDICTMENT & APPLYING WAX STAMP...', detail: 'Filing formal charges with the High Court of Temporal Justice' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 98) {
          clearInterval(timer);
          setTimeout(onCompleteLoading, 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 7;
      });
    }, 420);

    return () => clearInterval(timer);
  }, [onCompleteLoading]);

  useEffect(() => {
    const stepInterval = Math.floor(100 / steps.length);
    const stepIdx = Math.min(Math.floor(progress / stepInterval), steps.length - 1);
    setCurrentStepIndex(stepIdx);
  }, [progress]);

  return (
    <div className="step-transition" style={{
      maxWidth: '840px',
      margin: '0 auto',
      padding: '40px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Crime Lab Header Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(16, 27, 52, 0.9)',
        border: '1px solid var(--gold-primary)',
        padding: '6px 16px',
        borderRadius: '20px',
        marginBottom: '28px',
      }}>
        <Cpu size={14} color="var(--gold-primary)" />
        <span style={{
          fontFamily: 'var(--font-typewriter)',
          fontSize: '11px',
          color: 'var(--gold-light)',
          letterSpacing: '1.5px',
          fontWeight: 700,
        }}>
          DIVISION OF FORENSIC COMPUTATION // TEMPORAL CRIME LAB
        </span>
      </div>

      {/* Main Terminal Frame */}
      <div style={{
        width: '100%',
        background: '#070C18',
        border: '2px solid var(--navy-border)',
        borderRadius: '6px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.1)',
        overflow: 'hidden',
        position: 'relative',
      }}>
        {/* Terminal Title Bar */}
        <div style={{
          background: '#0D162A',
          borderBottom: '1px solid var(--navy-border)',
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#EF4444' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#F59E0B' }}></div>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10B981' }}></div>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: '#94A3B8',
              marginLeft: '8px',
            }}>
              temporal_forensics_core.exe --scan-suspect-zero
            </span>
          </div>

          <button
            onClick={onCompleteLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: '1px solid var(--gold-muted)',
              color: 'var(--gold-light)',
              fontFamily: 'var(--font-typewriter)',
              fontSize: '11px',
              padding: '4px 10px',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
          >
            <FastForward size={12} />
            FAST-TRACK REPORT (SKIP)
          </button>
        </div>

        {/* Terminal Body */}
        <div style={{ padding: '36px 30px' }}>
          {/* Animated Radar Scanner Graphic */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '32px',
          }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '2px solid var(--gold-primary)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
            }}>
              <div style={{
                position: 'absolute',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                border: '1px dashed rgba(212, 175, 55, 0.5)',
              }}></div>
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '2px',
                background: 'var(--gold-primary)',
                opacity: 0.4,
              }}></div>
              <div style={{
                position: 'absolute',
                width: '2px',
                height: '100%',
                background: 'var(--gold-primary)',
                opacity: 0.4,
              }}></div>
              <Fingerprint size={48} color="var(--gold-primary)" />
            </div>
          </div>

          {/* Current Action Display */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '18px',
              fontWeight: 800,
              color: '#F7E7B4',
              letterSpacing: '1px',
              marginBottom: '6px',
            }}>
              {steps[currentStepIndex]?.label}
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#8A99AD',
            }}>
              {steps[currentStepIndex]?.detail}
            </div>
          </div>

          {/* Big Progress Bar */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-typewriter)',
              fontSize: '11px',
              color: 'var(--gold-muted)',
              marginBottom: '8px',
            }}>
              <span>FORENSIC CALIBRATION</span>
              <span>{progress}% COMPLETED</span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              background: '#131F38',
              borderRadius: '4px',
              overflow: 'hidden',
              border: '1px solid var(--navy-border)',
            }}>
              <div style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #9E833B 0%, #D4AF37 50%, #F7E7B4 100%)',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.6)',
                transition: 'width 0.3s ease',
              }}></div>
            </div>
          </div>

          {/* Animated Sequential Checklist Items */}
          <div style={{
            background: 'rgba(5, 8, 17, 0.7)',
            border: '1px solid var(--navy-border)',
            borderRadius: '6px',
            padding: '16px 20px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            {steps.map((st, i) => {
              const isDone = i < currentStepIndex || progress >= 100;
              const isCurrent = i === currentStepIndex && progress < 100;

              return (
                <div
                  key={i}
                  className={isCurrent ? 'checklist-active' : ''}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    border: isCurrent ? '1px solid var(--gold-primary)' : '1px solid transparent',
                    background: isDone ? 'rgba(27, 77, 62, 0.15)' : (isCurrent ? 'rgba(212, 175, 55, 0.1)' : 'transparent'),
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {isDone ? (
                      <div style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: '#166534',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <Check size={12} color="#DCFCE7" strokeWidth={3} />
                      </div>
                    ) : (
                      <span style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        background: isCurrent ? 'var(--gold-primary)' : '#4A5568',
                        boxShadow: isCurrent ? '0 0 8px var(--gold-primary)' : 'none',
                        marginLeft: '5px',
                        marginRight: '5px',
                      }}></span>
                    )}

                    <span style={{
                      fontWeight: isCurrent ? 700 : (isDone ? 600 : 400),
                      color: isDone ? '#48BB78' : (isCurrent ? '#F7E7B4' : '#64748B'),
                      letterSpacing: '0.5px',
                    }}>
                      {st.label}
                    </span>
                  </div>

                  <span style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-typewriter)',
                    color: isDone ? '#48BB78' : (isCurrent ? 'var(--gold-primary)' : '#475569'),
                    fontWeight: 700,
                  }}>
                    {isDone ? '[VERIFIED]' : (isCurrent ? '[ANALYZING...]' : '[PENDING]')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
