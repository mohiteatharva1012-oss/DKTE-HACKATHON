import React from 'react';
import { Scale, X, Play, FastForward, CheckCircle2, FileSearch, Network, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { JUDGE_PRESETS, JUDGE_DEMO_DATA } from '../data/caseData';

export function JudgeModal({
  isOpen,
  onClose,
  onApplyPreset,
  onJumpToStep,
  onRunJudgeDemo,
  isAutoTouring,
}) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(3, 6, 12, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'var(--navy-elevated)',
        border: '2px solid var(--gold-primary)',
        boxShadow: '0 0 40px rgba(212, 175, 55, 0.35), 0 25px 50px -12px rgba(0, 0, 0, 0.8)',
        borderRadius: '8px',
        maxWidth: '720px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
      }}>
        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(90deg, #162444 0%, #0A1122 100%)',
          padding: '18px 24px',
          borderBottom: '1px solid var(--navy-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '4px',
              background: 'var(--gold-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#050811',
            }}>
              <Scale size={22} />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '18px',
                fontWeight: 800,
                color: '#F7E7B4',
                letterSpacing: '1px',
              }}>
                CHIEF MAGISTRATE DEMO CONSOLE
              </div>
              <div style={{
                fontSize: '11px',
                fontFamily: 'var(--font-typewriter)',
                color: 'var(--gold-muted)',
              }}>
                [HACKATHON EVALUATION MODE // FAST BYPASS PROTOCOL]
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#8A99AD',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          {/* Official Judge Demo Card Banner */}
          <div style={{
            background: 'radial-gradient(ellipse at top, rgba(212, 175, 55, 0.2) 0%, rgba(16, 27, 52, 0.8) 100%)',
            border: '2px solid var(--gold-primary)',
            padding: '18px 20px',
            borderRadius: '6px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '16px',
                  fontWeight: 800,
                  color: '#FFF2CD',
                }}>
                  <Sparkles size={18} color="var(--gold-primary)" />
                  OFFICIAL HACKATHON BENCH TRIAL DEMO
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#CBD5E1',
                  marginTop: '4px',
                  fontFamily: 'var(--font-mono)',
                  lineHeight: 1.5,
                }}>
                  <div>✦ <strong>Subject:</strong> {JUDGE_DEMO_DATA.subject}</div>
                  <div>✦ <strong>Case:</strong> {JUDGE_DEMO_DATA.caseId}</div>
                  <div>✦ <strong>Time Lost:</strong> {JUDGE_DEMO_DATA.timeLostDisplay}</div>
                  <div>✦ <strong>Verdict:</strong> {JUDGE_DEMO_DATA.verdictTitle}</div>
                  <div>✦ <strong>Sentence:</strong> "{JUDGE_DEMO_DATA.courtSentence.sentence}"</div>
                </div>
              </div>

              <button
                id="btn-run-official-judge-demo"
                onClick={() => {
                  onRunJudgeDemo();
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: isAutoTouring ? '#C0392B' : 'var(--gold-primary)',
                  color: '#050811',
                  border: 'none',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: '13px',
                  padding: '12px 22px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
                  letterSpacing: '1px',
                }}
              >
                <Play size={16} fill="#050811" />
                <span>{isAutoTouring ? 'DEMO RUNNING...' : 'AUTO-RUN JUDGE DEMO'}</span>
              </button>
            </div>
            <div style={{ fontSize: '11px', color: '#A0AEC0', fontStyle: 'italic' }}>
              Automatically: answers all questions → investigates → generates report → shows conspiracy → reveals verdict.
            </div>
          </div>

          {/* Archetype Quick-Load Presets */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{
              fontSize: '12px',
              fontFamily: 'var(--font-typewriter)',
              color: 'var(--gold-primary)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span>✦</span> OTHER SUSPECT ARCHETYPES:
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '12px',
            }}>
              {JUDGE_PRESETS.slice(1).map((preset, index) => (
                <div
                  key={index}
                  onClick={() => {
                    onApplyPreset(preset);
                    onClose();
                  }}
                  style={{
                    background: 'rgba(10, 17, 34, 0.8)',
                    border: '1px solid var(--navy-border)',
                    padding: '14px 16px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--gold-primary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--navy-border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#E2E8F0',
                    }}>
                      {preset.name}
                    </div>
                    <span style={{
                      fontSize: '9px',
                      fontFamily: 'var(--font-typewriter)',
                      padding: '2px 6px',
                      borderRadius: '2px',
                      background: 'rgba(192, 57, 43, 0.2)',
                      color: '#E74C3C',
                      border: '1px solid #C0392B',
                      fontWeight: 700,
                    }}>
                      {preset.badge}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: '#8A99AD',
                    lineHeight: '1.4',
                  }}>
                    {preset.subtitle}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Workflow Phase Teleportation */}
          <div>
            <div style={{
              fontSize: '12px',
              fontFamily: 'var(--font-typewriter)',
              color: 'var(--gold-primary)',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <span>✦</span> DIRECT STAGE TELEPORTATION:
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '8px',
            }}>
              {[
                { key: 'landing', label: '1. Landing Page', icon: Scale },
                { key: 'interview', label: '2. Interrogation Room', icon: FileSearch },
                { key: 'loading', label: '3. Crime Lab Forensics', icon: FastForward },
                { key: 'report', label: '4. Classified Dossier', icon: ShieldAlert },
                { key: 'conspiracy', label: '5. Conspiracy Board', icon: Network },
                { key: 'verdict', label: '6. High Court Verdict', icon: Award },
                { key: 'casefile', label: '7. Official Case File', icon: CheckCircle2 },
              ].map((step) => {
                const IconComponent = step.icon;
                return (
                  <button
                    key={step.key}
                    onClick={() => {
                      onJumpToStep(step.key);
                      onClose();
                    }}
                    style={{
                      background: 'rgba(16, 27, 52, 0.7)',
                      border: '1px solid var(--navy-border)',
                      padding: '10px 8px',
                      borderRadius: '4px',
                      color: '#CBD5E1',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      textAlign: 'center',
                      transition: 'all 0.15s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--gold-primary)';
                      e.currentTarget.style.color = '#F7E7B4';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--navy-border)';
                      e.currentTarget.style.color = '#CBD5E1';
                    }}
                  >
                    <IconComponent size={16} color="var(--gold-primary)" />
                    <span>{step.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{
          background: 'rgba(5, 8, 17, 0.95)',
          padding: '12px 24px',
          borderTop: '1px solid var(--navy-border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '11px',
          fontFamily: 'var(--font-typewriter)',
          color: '#718096',
        }}>
          <div>AUTHORITY: ARTICLE IV OF THE TEMPORAL HEIST CODE</div>
          <div style={{ color: 'var(--gold-muted)' }}>STATUS: SYSTEM READY</div>
        </div>
      </div>
    </div>
  );
}
