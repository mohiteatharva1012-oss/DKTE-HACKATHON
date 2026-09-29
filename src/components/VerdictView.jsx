import React, { useState, useEffect } from 'react';
import { Gavel, Award, ArrowRight, RotateCcw, AlertTriangle, Users, Clock, Sparkles, ShieldAlert, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SENTENCES_CATALOG } from '../data/caseData';
import { PcbLogo } from './PcbLogo';

export function VerdictView({ reportData, onGoToCaseFile, onRestart }) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(true);

  useEffect(() => {
    const shakeTimer = setTimeout(() => {
      setIsShaking(false);
    }, 600);

    try {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#00CED1', '#D4AF37', '#B22222', '#F7E7B4', '#E74C3C'],
      });
    } catch (e) {
      // ignore
    }

    return () => clearTimeout(shakeTimer);
  }, []);

  if (!reportData) return null;

  const currentSentence = currentSentenceIndex === 0
    ? (reportData.courtSentence || SENTENCES_CATALOG[0])
    : SENTENCES_CATALOG[currentSentenceIndex % SENTENCES_CATALOG.length];

  const handleRerollSentence = () => {
    setCurrentSentenceIndex((prev) => prev + 1);
  };

  return (
    <div className={`step-transition ${isShaking ? 'screen-shake' : ''}`} style={{
      maxWidth: '960px',
      margin: '0 auto',
      padding: '30px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* High Court Inquest Banner */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(16, 27, 52, 0.9)',
        border: '1px solid var(--gold-primary)',
        padding: '6px 16px',
        borderRadius: '20px',
        marginBottom: '24px',
      }}>
        <PcbLogo size={18} />
        <span style={{
          fontFamily: 'var(--font-typewriter)',
          fontSize: '11px',
          color: 'var(--gold-light)',
          letterSpacing: '1.5px',
          fontWeight: 700,
        }}>
          HIGH COURT OF TEMPORAL JUSTICE // POLICE BUREAU OF INVESTIGATION
        </span>
      </div>

      {/* Slammed Verdict Stamp Card */}
      <div style={{
        width: '100%',
        background: '#0B1325',
        border: '2px solid var(--gold-primary)',
        boxShadow: '0 0 50px rgba(0, 206, 209, 0.25), 0 20px 50px rgba(0, 0, 0, 0.8)',
        borderRadius: '8px',
        overflow: 'hidden',
        position: 'relative',
        marginBottom: '32px',
      }}>
        {/* Top Court Header */}
        <div style={{
          background: 'linear-gradient(90deg, #162444 0%, #0A1122 100%)',
          borderBottom: '1px solid var(--navy-border)',
          padding: '16px 28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <PcbLogo size={36} />
            <div>
              <div style={{
                fontFamily: 'var(--font-typewriter)',
                fontSize: '11px',
                color: 'var(--gold-muted)',
                letterSpacing: '1px',
              }}>
                OFFICIAL JUDICIAL DECREE // CASE {reportData.caseId}
              </div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '16px',
                fontWeight: 800,
                color: '#F7E7B4',
              }}>
                SUMMARY JUDGMENT // SUBJECT: {reportData.subject}
              </div>
            </div>
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: '#8A99AD',
          }}>
            PRESIDING: Magistrate Archibald Vance
          </div>
        </div>

        {/* Dramatic Slammed Big Rubber Stamp Header */}
        <div style={{
          padding: '44px 30px',
          textAlign: 'center',
          background: 'radial-gradient(ellipse at center, rgba(178, 34, 34, 0.18) 0%, transparent 75%)',
          borderBottom: '1px solid var(--navy-border)',
        }}>
          <div className="rubber-stamp rubber-stamp-red animate-stamp-dramatic" style={{
            fontSize: 'clamp(22px, 4.5vw, 40px)',
            padding: '14px 32px',
            fontWeight: 900,
            letterSpacing: '2px',
            marginBottom: '18px',
            boxShadow: '0 0 30px rgba(178, 34, 34, 0.5), inset 0 0 10px rgba(178, 34, 34, 0.4)',
          }}>
            {reportData.verdictTitle}
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '14px',
            color: '#E2E8F0',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            The High Court finds <strong>{reportData.subject}</strong> in direct violation of the <em>Temporal Anti-Heist Act</em>. 
            All claims of "I'll do it later", "waiting for the right vibe", and "reading one more article" are hereby struck down.
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1px',
          background: 'var(--navy-border)',
          borderBottom: '1px solid var(--navy-border)',
        }}>
          <div style={{ background: '#0B1325', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-typewriter)', color: 'var(--gold-primary)', marginBottom: '4px' }}>
              TIME LOST
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: 900, color: '#FF6B6B' }}>
              {reportData.timeLostDisplay}
            </div>
            <div style={{ fontSize: '11px', color: '#718096', fontFamily: 'var(--font-mono)' }}>
              ({reportData.annualHoursLost} hrs/yr calculated)
            </div>
          </div>

          <div style={{ background: '#0B1325', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-typewriter)', color: 'var(--gold-primary)', marginBottom: '4px' }}>
              MAIN OFFENSE
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '14px', fontWeight: 800, color: '#FFF2CD', lineHeight: 1.3 }}>
              {reportData.primaryOffense}
            </div>
            <div style={{ fontSize: '11px', color: '#718096', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              {reportData.offenseCode}
            </div>
          </div>

          <div style={{ background: '#0B1325', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-typewriter)', color: 'var(--gold-primary)', marginBottom: '4px' }}>
              FORFEITED ECONOMIC CAPITAL (₹1 / SEC LOST)
            </div>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '26px', fontWeight: 900, color: '#F7E7B4' }}>
              ₹{(reportData.annualEconomicDamageINR !== undefined ? reportData.annualEconomicDamageINR : ((reportData.wastedHours * 3600 + reportData.wastedMinutes * 60) * 365)).toLocaleString()} Rs.
            </div>
            <div style={{ fontSize: '11px', color: '#718096', fontFamily: 'var(--font-mono)' }}>
              ₹{(reportData.dailyEconomicDamageINR !== undefined ? reportData.dailyEconomicDamageINR : (reportData.wastedHours * 3600 + reportData.wastedMinutes * 60)).toLocaleString()} Rs./day (₹3,600 / hr lost)
            </div>
          </div>
        </div>

        {/* Co-Conspirators named on the Warrant */}
        <div style={{ padding: '24px 30px', borderBottom: '1px solid var(--navy-border)' }}>
          <div style={{
            fontSize: '11px',
            fontFamily: 'var(--font-typewriter)',
            color: 'var(--gold-primary)',
            letterSpacing: '1px',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Users size={14} />
            <span>NAMED CO-CONSPIRATORS & INDICTED ACCESSORIES:</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '12px',
          }}>
            {reportData.coConspirators.map((c, i) => (
              <div key={i} style={{
                background: 'rgba(16, 27, 52, 0.6)',
                border: '1px solid var(--navy-border)',
                padding: '12px 14px',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--red-stamp)',
                }}></span>
                <div>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#E2E8F0',
                  }}>
                    {c.name}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    fontFamily: 'var(--font-mono)',
                    color: '#8A99AD',
                  }}>
                    {c.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Humorous Court-Mandated Sentence */}
        <div style={{
          padding: '30px',
          background: 'rgba(14, 22, 42, 0.7)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '14px',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-typewriter)',
              fontSize: '12px',
              color: 'var(--red-stamp)',
              fontWeight: 800,
              letterSpacing: '1px',
            }}>
              <AlertTriangle size={15} color="var(--red-stamp)" />
              <span>COURT-MANDATED REHABILITATIVE SENTENCE:</span>
            </div>

            <button
              onClick={handleRerollSentence}
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
              <RotateCcw size={12} />
              REROLL SENTENCE
            </button>
          </div>

          <div style={{
            background: 'var(--paper-manila)',
            color: 'var(--ink-primary)',
            padding: '24px 28px',
            borderRadius: '4px',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
            borderLeft: '5px solid #8B2500',
            position: 'relative',
          }}>
            <div style={{
              fontFamily: 'var(--font-typewriter)',
              fontSize: '10px',
              color: '#8B2500',
              fontWeight: 800,
              letterSpacing: '1px',
              marginBottom: '6px',
            }}>
              SENTENCE TYPE: {currentSentence.punishmentType}
            </div>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '16px',
              fontWeight: 700,
              lineHeight: 1.5,
              color: '#151311',
              marginBottom: '10px',
            }}>
              "{currentSentence.sentence}"
            </div>

            <div style={{
              fontFamily: 'var(--font-typewriter)',
              fontSize: '11px',
              color: '#655E53',
              textAlign: 'right',
            }}>
              SUPERVISING OFFICER: {currentSentence.officer}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          id="btn-goto-casefile"
          onClick={onGoToCaseFile}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            background: 'linear-gradient(135deg, #E2BF65 0%, #C49E37 100%)',
            color: '#070C18',
            fontFamily: 'var(--font-heading)',
            fontSize: '15px',
            fontWeight: 800,
            letterSpacing: '1px',
            padding: '16px 36px',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 0 25px rgba(212, 175, 55, 0.4), 0 8px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          <span>ARCHIVE & EXPORT OFFICIAL CASE FILE</span>
          <ArrowRight size={18} />
        </button>

        <button
          onClick={onRestart}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(16, 27, 52, 0.8)',
            border: '1px solid var(--navy-border)',
            color: '#CBD5E1',
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            padding: '14px 24px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          <RotateCcw size={16} />
          <span>RESET / NEW INVESTIGATION</span>
        </button>
      </div>
    </div>
  );
}
