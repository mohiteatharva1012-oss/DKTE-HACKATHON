import React from 'react';
import { Scale, Clock, User, RotateCcw, Play } from 'lucide-react';
import { PcbLogo } from './PcbLogo';

export function Header({ currentStep, userProfile, onOpenProfile, onLogout, onOpenJudgeMode, onGoHome, onRunJudgeDemo, isAutoTouring }) {
  const steps = [
    { key: 'landing', label: 'Entrance' },
    { key: 'interview', label: 'Deposition' },
    { key: 'loading', label: 'Crime Lab' },
    { key: 'report', label: 'Dossier' },
    { key: 'conspiracy', label: 'Conspiracy' },
    { key: 'verdict', label: 'Verdict' },
    { key: 'casefile', label: 'Archive' },
  ];

  const tickerItems = [
    `DOSSIER ACTIVE: Subject ${userProfile?.name || 'Mohit'} under preliminary inquest.`,
    'CASE #DLOT-0927: Subject claimed "I\'ll do it later tonight"; 6h 42m unrecovered.',
    'ALERT: Suspect Instagram Reels binge detected before getting out of bed.',
    'NOTICE: "I will start at 2:00 PM" defense officially declared invalid at 2:04 PM.',
    'WARRANT: Ergonomic chair identified as material accomplice in sedentary procrastination.',
  ];

  const isLoggedIn = userProfile?.isLoggedIn !== false;

  return (
    <header className="no-print" style={{
      borderBottom: '1px solid var(--navy-border)',
      background: 'rgba(5, 8, 17, 0.95)',
      backdropFilter: 'blur(10px)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* Top Classified Ticker */}
      <div style={{
        background: '#080E1C',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
        overflow: 'hidden',
        padding: '5px 0',
        fontSize: '11px',
        fontFamily: 'var(--font-typewriter)',
        color: 'var(--gold-primary)',
        letterSpacing: '1px',
        display: 'flex',
        alignItems: 'center',
      }}>
        <div style={{
          background: 'var(--red-stamp)',
          color: '#fff',
          padding: '2px 8px',
          fontWeight: 'bold',
          fontSize: '10px',
          marginRight: '12px',
          marginLeft: '12px',
          borderRadius: '2px',
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fff', display: 'inline-block' }}></span>
          DISPATCH WIRE
        </div>
        <div style={{ overflow: 'hidden', width: '100%' }}>
          <div className="ticker-track">
            {tickerItems.concat(tickerItems).map((item, idx) => (
              <span key={idx} style={{ marginRight: '48px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--red-stamp)' }}>✦</span> {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="header-main-bar" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '10px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        {/* Brand / Crest with Official PCB Logo */}
        <div 
          onClick={onGoHome}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            cursor: 'pointer',
          }}
        >
          <PcbLogo size={40} glow={true} />

          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '15px',
              fontWeight: 800,
              letterSpacing: '1.5px',
              color: '#F7E7B4',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              PRODUCTIVITY CRIME BRANCH
              <span style={{
                fontSize: '9px',
                fontFamily: 'var(--font-typewriter)',
                color: '#00CED1',
                border: '1px solid #00CED1',
                padding: '1px 5px',
                borderRadius: '2px',
                fontWeight: 700,
              }}>
                PCB-OFFICIAL
              </span>
            </div>
            <div className="header-subtitle" style={{
              fontSize: '11px',
              color: '#8A99AD',
              letterSpacing: '1.2px',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase',
            }}>
              Police Bureau of Investigation // Government of Lost Time
            </div>
          </div>
        </div>

        {/* Step Progress Pills (Visible if in investigation) */}
        {currentStep !== 'landing' && (
          <div className="header-steps-bar" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'rgba(16, 27, 52, 0.7)',
            padding: '4px 8px',
            borderRadius: '20px',
            border: '1px solid var(--navy-border)',
            overflowX: 'auto',
            maxWidth: '100%',
          }}>
            {steps.slice(1).map((s) => {
              const isActive = currentStep === s.key;
              return (
                <div
                  key={s.key}
                  style={{
                    fontSize: '11px',
                    fontFamily: 'var(--font-typewriter)',
                    padding: '3px 9px',
                    borderRadius: '12px',
                    background: isActive ? 'var(--gold-primary)' : 'transparent',
                    color: isActive ? '#050811' : '#6C7D93',
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '0.5px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {s.label}
                </div>
              );
            })}
          </div>
        )}

        {/* User Profile & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* PCB Login Profile Portal Button */}
          {isLoggedIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <button
                id="btn-login-profile-portal"
                onClick={onOpenProfile}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: currentStep === 'profile_portal' 
                    ? 'linear-gradient(135deg, rgba(0, 206, 209, 0.25), rgba(212, 175, 55, 0.2))' 
                    : 'rgba(16, 27, 52, 0.9)',
                  border: currentStep === 'profile_portal'
                    ? '1.5px solid #00CED1'
                    : '1px solid var(--gold-muted)',
                  borderRadius: '4px',
                  padding: '5px 12px',
                  color: '#F7E7B4',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  transition: 'all 0.2s ease',
                  boxShadow: currentStep === 'profile_portal' ? '0 0 12px rgba(0, 206, 209, 0.4)' : 'none',
                }}
                title="Open PCB Citizen Profile Portal"
              >
                <PcbLogo size={18} />
                <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800 }}>
                    <span>{userProfile?.name ? userProfile.name.toUpperCase() : 'MOHIT'}</span>
                    <span style={{
                      color: '#D4AF37',
                      fontSize: '9px',
                      background: '#2F1B05',
                      padding: '1px 4px',
                      borderRadius: '2px',
                      border: '1px solid #D4AF37',
                    }}>
                      5★
                    </span>
                  </div>
                  <div style={{ fontSize: '9px', color: '#00CED1', letterSpacing: '0.5px' }}>
                    LOGIN PORTAL
                  </div>
                </div>
              </button>
            </div>
          ) : (
            <button
              id="btn-login-profile-portal"
              onClick={onOpenProfile}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: 'rgba(231, 76, 60, 0.15)',
                border: '1.5px solid #E74C3C',
                borderRadius: '4px',
                padding: '5px 12px',
                color: '#FFAAAA',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                boxShadow: '0 0 10px rgba(231, 76, 60, 0.3)',
                transition: 'all 0.2s ease',
              }}
              title="Citizen Logged Out — Click to Login with Phone & OTP"
            >
              <PcbLogo size={18} />
              <div style={{ textAlign: 'left', lineHeight: 1.1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 800 }}>
                  <span>CITIZEN LOGIN</span>
                </div>
                <div style={{ fontSize: '9px', color: '#FF8888', letterSpacing: '0.5px' }}>
                  PHONE + OTP 🔑
                </div>
              </div>
            </button>
          )}

          {/* Quick Reset Button if not on landing */}
          {currentStep !== 'landing' && (
            <button
              onClick={onGoHome}
              title="Reset / New Investigation"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                background: 'rgba(16, 27, 52, 0.6)',
                border: '1px solid var(--navy-border)',
                color: '#CBD5E1',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                padding: '6px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={12} />
              <span>RESET</span>
            </button>
          )}

          {/* Direct Auto Judge Run Button */}
          <button
            id="btn-auto-judge-demo"
            onClick={onRunJudgeDemo}
            disabled={isAutoTouring}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: isAutoTouring 
                ? 'linear-gradient(135deg, #C0392B, #8B0000)' 
                : 'linear-gradient(135deg, #E2BF65 0%, #C49E37 100%)',
              color: '#070C18',
              fontFamily: 'var(--font-heading)',
              fontSize: '12px',
              fontWeight: 900,
              padding: '6px 14px',
              borderRadius: '4px',
              border: 'none',
              cursor: isAutoTouring ? 'wait' : 'pointer',
              letterSpacing: '1px',
              boxShadow: '0 0 14px rgba(212, 175, 55, 0.35)',
            }}
          >
            <Play size={13} fill="#070C18" />
            <span>{isAutoTouring ? 'DEMO RUNNING...' : 'AUTO JUDGE DEMO'}</span>
          </button>

          {/* Judge Mode Console Toggle */}
          <button
            id="judge-mode-toggle"
            onClick={onOpenJudgeMode}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: '1px solid var(--gold-primary)',
              color: '#F7E7B4',
              fontFamily: 'var(--font-heading)',
              fontSize: '12px',
              fontWeight: 700,
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <Scale size={14} />
            <span>CONSOLE</span>
          </button>
        </div>
      </div>
    </header>
  );
}
