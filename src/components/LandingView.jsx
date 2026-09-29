import React from 'react';
import { Search, Scale, Clock, AlertOctagon, ArrowRight, Fingerprint, Play, Shield } from 'lucide-react';
import { JUDGE_PRESETS } from '../data/caseData';
import { PcbLogo } from './PcbLogo';
import { LostTimeEvidenceWall } from './LostTimeEvidenceWall';

export function LandingView({ userProfile, onStartInvestigation, onOpenJudgeMode, onApplyPreset, onRunJudgeDemo, onOpenProfilePortal }) {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      {/* Subtle Lost Time Evidence Wall Forensic Investigation Scene */}
      <LostTimeEvidenceWall />

      <div className="step-transition" style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 24px 80px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}>
      {/* Top Bureau Classification Banner */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(16, 27, 52, 0.9)',
        border: '1px solid var(--gold-muted)',
        padding: '6px 18px',
        borderRadius: '24px',
        marginBottom: '28px',
        boxShadow: '0 0 20px rgba(212, 175, 55, 0.15)',
      }}>
        <PcbLogo size={18} />
        <span style={{
          fontFamily: 'var(--font-typewriter)',
          fontSize: '11px',
          letterSpacing: '2px',
          color: 'var(--gold-light)',
          fontWeight: 700,
        }}>
          OFFICIAL INQUEST // POLICE BUREAU OF INVESTIGATION (PCB) // #DLOT-0927
        </span>
      </div>

      {/* Official PCB Emblem Hero */}
      <div style={{
        position: 'relative',
        marginBottom: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <PcbLogo size={130} glow={true} />
      </div>

      {/* Bureau Subtitle */}
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '14px',
        letterSpacing: '3px',
        color: '#00CED1',
        textTransform: 'uppercase',
        marginBottom: '12px',
        fontWeight: 800,
        textAlign: 'center',
      }}>
        POLICE BUREAU OF INVESTIGATION — GOVERNMENT OF LOST TIME
      </div>

      {/* Grand Hero Question */}
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'clamp(36px, 6vw, 68px)',
        fontWeight: 900,
        color: '#F9F5EC',
        textAlign: 'center',
        lineHeight: 1.1,
        letterSpacing: '2px',
        textShadow: '0 4px 25px rgba(0, 0, 0, 0.8), 0 0 30px rgba(212, 175, 55, 0.2)',
        maxWidth: '900px',
        marginBottom: '20px',
      }}>
        WHERE DID YOUR <span style={{
          color: 'var(--gold-primary)',
          position: 'relative',
          display: 'inline-block',
        }}>
          TIME GO?
          <svg style={{ position: 'absolute', bottom: '-8px', left: 0, width: '100%', height: '8px' }} viewBox="0 0 100 8" preserveAspectRatio="none">
            <path d="M0,5 Q50,0 100,5" stroke="var(--gold-primary)" strokeWidth="2.5" fill="none" />
          </svg>
        </span>
      </h1>

      {/* Explanatory Detective Pitch */}
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'clamp(14px, 1.8vw, 17px)',
        color: '#A2B3C9',
        textAlign: 'center',
        maxWidth: '740px',
        lineHeight: 1.7,
        marginBottom: '38px',
      }}>
        Citizen <strong style={{ color: '#F7E7B4' }}>{userProfile?.name || 'Mohit'}</strong>, billions of operational minutes have been stolen by the <strong style={{ color: '#00CED1' }}>Social Media Time Thief</strong>, 
        the <strong style={{ color: '#F7E7B4' }}>Attention Hijacker</strong>, and the <strong style={{ color: '#F7E7B4' }}>Deadline Negotiator</strong>. 
        You are now subpoenaed before the <strong style={{ color: '#F7E7B4' }}>Productivity Crime Branch</strong> for immediate interrogation.
      </p>

      {/* Primary Action Buttons */}
      <div className="landing-actions-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '18px',
        flexWrap: 'wrap',
        marginBottom: '60px',
      }}>
        <button
          id="btn-start-investigation"
          onClick={onStartInvestigation}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(135deg, #E2BF65 0%, #C49E37 100%)',
            color: '#070C18',
            fontFamily: 'var(--font-heading)',
            fontSize: '16px',
            fontWeight: 800,
            letterSpacing: '1.5px',
            padding: '16px 36px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 25px rgba(212, 175, 55, 0.4), 0 8px 20px rgba(0, 0, 0, 0.4)',
            transition: 'all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
            e.currentTarget.style.boxShadow = '0 0 35px rgba(212, 175, 55, 0.6), 0 12px 24px rgba(0, 0, 0, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.4), 0 8px 20px rgba(0, 0, 0, 0.4)';
          }}
        >
          <Search size={20} strokeWidth={2.5} />
          <span>START INVESTIGATION</span>
          <ArrowRight size={18} strokeWidth={2.5} />
        </button>

        <button
          id="btn-auto-judge-landing"
          onClick={onRunJudgeDemo}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(16, 27, 52, 0.8) 100%)',
            color: '#F7E7B4',
            fontFamily: 'var(--font-heading)',
            fontSize: '14px',
            fontWeight: 800,
            letterSpacing: '1.2px',
            padding: '15px 28px',
            borderRadius: '4px',
            border: '2px solid var(--gold-primary)',
            cursor: 'pointer',
            boxShadow: '0 0 18px rgba(212, 175, 55, 0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 25px rgba(212, 175, 55, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 18px rgba(212, 175, 55, 0.3)';
          }}
        >
          <Play size={16} fill="#F7E7B4" />
          <span>RUN AUTO JUDGE DEMO (#DLOT-0927)</span>
        </button>

        <button
          id="btn-pcb-portal-landing"
          onClick={onOpenProfilePortal}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(16, 27, 52, 0.85)',
            color: '#00CED1',
            fontFamily: 'var(--font-heading)',
            fontSize: '13px',
            fontWeight: 800,
            letterSpacing: '1px',
            padding: '15px 24px',
            borderRadius: '4px',
            border: '1.5px solid #00CED1',
            cursor: 'pointer',
            boxShadow: '0 0 16px rgba(0, 206, 209, 0.25)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 0 24px rgba(0, 206, 209, 0.45)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 16px rgba(0, 206, 209, 0.25)';
          }}
        >
          <PcbLogo size={18} />
          <span>PCB CITIZEN PROFILE (5★)</span>
        </button>
      </div>

      {/* Official Statistics Bar */}
      <div style={{
        width: '100%',
        maxWidth: '960px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '60px',
      }}>
        {[
          { label: 'ANNUAL LOSS REPORTED', val: '4,289,104 HRS', sub: 'Calculated across 84,000 sworn depositions', icon: Clock },
          { label: 'UNOPENED BROWSER TABS', val: '18.4 MILLION', sub: 'Preserved under false alibi of "reading later"', icon: AlertOctagon },
          { label: 'CONVICTION ACCURACY', val: '99.4%', sub: 'High Court of Temporal Justice precedent', icon: Shield },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} style={{
              background: 'rgba(14, 23, 44, 0.7)',
              border: '1px solid var(--navy-border)',
              padding: '18px 20px',
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              borderTop: '2px solid var(--gold-muted)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontFamily: 'var(--font-typewriter)',
                  fontSize: '11px',
                  color: 'var(--gold-primary)',
                  letterSpacing: '1px',
                }}>
                  {item.label}
                </span>
                <Icon size={16} color="var(--gold-muted)" />
              </div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '22px',
                fontWeight: 800,
                color: '#F9F5EC',
              }}>
                {item.val}
              </div>
              <div style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '11px',
                color: '#718096',
              }}>
                {item.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Suspect Archetype Cards */}
      <div style={{ width: '100%', maxWidth: '960px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
          borderBottom: '1px solid var(--navy-border)',
          paddingBottom: '8px',
        }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '13px',
            letterSpacing: '1.5px',
            color: 'var(--gold-primary)',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Fingerprint size={16} />
            SUSPECT DOSSIERS & INDICTMENTS (CLICK TO LOAD)
          </div>
          <div style={{
            fontSize: '11px',
            fontFamily: 'var(--font-typewriter)',
            color: '#718096',
          }}>
            1-CLICK BENCH TRIAL
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '12px',
        }}>
          {JUDGE_PRESETS.map((preset, idx) => (
            <div
              key={idx}
              onClick={() => onApplyPreset(preset)}
              style={{
                background: 'rgba(10, 16, 32, 0.85)',
                border: '1px solid var(--navy-border)',
                padding: '14px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--gold-primary)';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.background = 'rgba(16, 27, 52, 0.95)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--navy-border)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = 'rgba(10, 16, 32, 0.85)';
              }}
            >
              <div style={{
                fontSize: '9px',
                fontFamily: 'var(--font-typewriter)',
                color: 'var(--gold-muted)',
                marginBottom: '4px',
              }}>
                DOSSIER #{104 + idx} // {preset.badge}
              </div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                fontWeight: 700,
                color: '#E2E8F0',
                marginBottom: '4px',
              }}>
                {preset.name}
              </div>
              <div style={{
                fontSize: '11px',
                color: '#718096',
                lineHeight: 1.3,
              }}>
                {preset.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
