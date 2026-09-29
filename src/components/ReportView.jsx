import React, { useState } from 'react';
import { ArrowRight, UserX } from 'lucide-react';
import { PcbLogo } from './PcbLogo';

export function ReportView({ reportData, onGoToConspiracy, onGoToVerdict }) {
  const [revealedRedactions, setRevealedRedactions] = useState({});

  const toggleRedaction = (id) => {
    setRevealedRedactions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!reportData) return null;

  return (
    <div className="step-transition" style={{
      maxWidth: '1040px',
      margin: '0 auto',
      padding: '30px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top Classification Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#070C18',
        border: '1px solid var(--navy-border)',
        borderRadius: '6px',
        padding: '12px 20px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '10px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <PcbLogo size={24} />
          <span className="rubber-stamp rubber-stamp-red" style={{ fontSize: '11px', padding: '3px 8px' }}>
            TOP SECRET // EYES ONLY
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: 'var(--gold-light)',
            fontWeight: 700,
          }}>
            CASE FILE: {reportData.caseId}
          </span>
        </div>

        <div style={{
          fontFamily: 'var(--font-typewriter)',
          fontSize: '11px',
          color: '#8A99AD',
        }}>
          SUBJECT: <strong style={{ color: '#F7E7B4' }}>{reportData.subject}</strong> | CLEARANCE: {reportData.clearanceLevel}
        </div>
      </div>

      {/* Main Manila Paper Dossier Folder */}
      <div className="paper-dossier" style={{
        padding: '44px',
        position: 'relative',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6), 0 0 1px rgba(0, 0, 0, 0.4)',
      }}>
        {/* Paperclip visual element */}
        <div style={{
          position: 'absolute',
          top: '-14px',
          right: '80px',
          width: '26px',
          height: '60px',
          borderRadius: '13px',
          border: '4px solid #94A3B8',
          borderBottom: 'none',
          boxShadow: '2px 4px 6px rgba(0, 0, 0, 0.25)',
          zIndex: 10,
          pointerEvents: 'none',
        }}></div>

        {/* Dossier Header with Official PCB Emblem */}
        <div style={{
          borderBottom: '3px double #1E1A16',
          paddingBottom: '20px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <PcbLogo size={62} />
            <div>
              <div style={{
                fontFamily: 'var(--font-typewriter)',
                fontSize: '12px',
                color: '#655E53',
                letterSpacing: '2px',
                fontWeight: 700,
              }}>
                POLICE BUREAU OF INVESTIGATION (PCB) // DIVISION 09
              </div>
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '28px',
                color: '#151311',
                fontWeight: 900,
                letterSpacing: '1px',
                margin: '4px 0 4px',
              }}>
                OFFICIAL INVESTIGATION REPORT
              </h1>
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                color: '#4A433A',
              }}>
                SUBJECT: <strong>{reportData.subject}</strong> // PRIMARY OFFENSE: {reportData.primaryOffense}
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '8px',
          }}>
            <div className="rubber-stamp rubber-stamp-red" style={{
              fontSize: '14px',
              padding: '6px 12px',
              transform: 'rotate(-4deg)',
              fontWeight: 900,
            }}>
              EVIDENCE VERIFIED
            </div>
            <div style={{
              fontFamily: 'var(--font-typewriter)',
              fontSize: '11px',
              color: '#8A2500',
              fontWeight: 700,
            }}>
              {reportData.offenseCode}
            </div>
          </div>
        </div>

        {/* Suspect Identification & Temporal Losses (Sequential Appearance) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '36px',
        }}>
          {/* Suspect Profile Card - Stagger 1 */}
          <div className="card-stagger card-stagger-1" style={{
            border: '2px solid #3B342A',
            background: '#F0ECE1',
            padding: '20px',
            borderRadius: '2px',
          }}>
            <div style={{
              fontSize: '11px',
              fontFamily: 'var(--font-typewriter)',
              color: '#524B40',
              fontWeight: 700,
              marginBottom: '12px',
              borderBottom: '1px solid #D1C8B4',
              paddingBottom: '4px',
            }}>
              SUSPECT IDENTIFICATION PROFILE
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              {/* Silhouette with eye redact */}
              <div style={{
                width: '90px',
                height: '110px',
                background: '#2B251F',
                borderRadius: '2px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                flexShrink: 0,
                border: '1px solid #1E1A16',
              }}>
                <UserX size={44} color="#ECE5D8" />
                {/* Black censored eye bar */}
                <div style={{
                  position: 'absolute',
                  top: '38px',
                  width: '74px',
                  height: '14px',
                  background: '#000',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                }}></div>
                <div style={{
                  position: 'absolute',
                  bottom: '4px',
                  fontSize: '8px',
                  fontFamily: 'var(--font-mono)',
                  color: '#A0988A',
                }}>
                  SEIZED RECORD
                </div>
              </div>

              {/* Suspect details */}
              <div style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: '#2E2820',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}>
                <div><strong>NAME/TITLE:</strong> {reportData.subject}</div>
                <div><strong>PRIMARY SYNDICATE:</strong> {reportData.primarySuspect}</div>
                <div><strong>RECOVERY TIME:</strong> {reportData.timeLostDisplay}</div>
                <div><strong>RISK LEVEL:</strong> <span style={{ color: '#8B2500', fontWeight: 700 }}>HIGH TEMPORAL HEIST</span></div>
              </div>
            </div>
          </div>

          {/* Temporal Loss Calculations Card - Stagger 2 */}
          <div className="card-stagger card-stagger-2" style={{
            border: '2px solid #8B2500',
            background: '#FDFBF7',
            padding: '20px',
            borderRadius: '2px',
            position: 'relative',
          }}>
            <div style={{
              fontSize: '11px',
              fontFamily: 'var(--font-typewriter)',
              color: '#8B2500',
              fontWeight: 800,
              marginBottom: '12px',
              borderBottom: '1px solid #F0D9D1',
              paddingBottom: '4px',
              display: 'flex',
              justifyContent: 'space-between',
            }}>
              <span>FORENSIC TIME HEIST CALCULATION</span>
              <span>CONFISCATED METRICS</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px',
            }}>
              <div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#665E52' }}>
                  EXACT TIME LOST
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '26px',
                  fontWeight: 900,
                  color: '#8B2500',
                }}>
                  {reportData.timeLostDisplay}
                </div>
                <div style={{ fontSize: '10px', color: '#7A7264', fontFamily: 'var(--font-mono)' }}>
                  ≈ {reportData.annualHoursLost} hrs/yr ({reportData.totalDaysEquivalent} days)
                </div>
              </div>

              <div>
                <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#665E52' }}>
                  ECONOMIC POTENTIAL FORFEITED
                </div>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '24px',
                  fontWeight: 900,
                  color: '#8B2500',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '4px',
                }}>
                  <span>₹{(reportData.dailyEconomicDamageINR !== undefined ? reportData.dailyEconomicDamageINR : (reportData.wastedHours * 3600 + reportData.wastedMinutes * 60)).toLocaleString()} Rs.</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#665E52' }}>/ day</span>
                </div>
                <div style={{ fontSize: '10px', color: '#7A7264', fontFamily: 'var(--font-mono)' }}>
                  at ₹1/sec lost (₹3,600/hr) • ₹{(reportData.annualEconomicDamageINR !== undefined ? reportData.annualEconomicDamageINR : ((reportData.wastedHours * 3600 + reportData.wastedMinutes * 60) * 365)).toLocaleString()} Rs./yr
                </div>
              </div>
            </div>

            <div style={{
              marginTop: '12px',
              paddingTop: '8px',
              borderTop: '1px dotted #D1C8B4',
              fontSize: '11px',
              fontFamily: 'var(--font-typewriter)',
              color: '#524B40',
            }}>
              <strong>EQUIVALENT LOST MILESTONES:</strong>
              <div>✦ {reportData.booksNotRead} full-length books unread</div>
              <div>✦ {reportData.marathonsNotRun} physical marathons uncompleted</div>
            </div>
          </div>
        </div>

        {/* Dynamic Evidence Exhibits - Stagger 3, 4, 5 */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '16px',
            fontWeight: 800,
            color: '#181512',
            letterSpacing: '1px',
            borderBottom: '2px solid #2B2824',
            paddingBottom: '8px',
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <span>SEIZED PHYSICAL & DIGITAL EXHIBITS</span>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-typewriter)', color: '#8B2500' }}>
              EXHIBITS A THROUGH E [SEQUENTIAL LOG]
            </span>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            {reportData.evidenceList.map((item, idx) => (
              <div
                key={idx}
                className={`card-stagger card-stagger-${idx + 2}`}
                style={{
                  background: '#F4EFE3',
                  border: '1px solid #D6CEBE',
                  padding: '14px 18px',
                  borderRadius: '3px',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '4px',
                }}>
                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '14px',
                    fontWeight: 800,
                    color: '#26221D',
                  }}>
                    EXHIBIT 0{idx + 1}: {item.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontFamily: 'var(--font-typewriter)',
                      fontSize: '10px',
                      background: '#E2D9C8',
                      color: '#473F35',
                      padding: '1px 6px',
                      borderRadius: '2px',
                      fontWeight: 700,
                    }}>
                      SUSPECT: {item.suspect}
                    </span>
                    <span style={{
                      fontFamily: 'var(--font-typewriter)',
                      fontSize: '10px',
                      color: '#8B2500',
                      border: '1px solid #8B2500',
                      padding: '1px 6px',
                      fontWeight: 700,
                    }}>
                      {item.exhibitCode}
                    </span>
                  </div>
                </div>

                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '12px',
                  color: '#423A30',
                  lineHeight: '1.4',
                }}>
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Intercepted Dialogue & Redacted Sworn Testimony */}
        <div className="card-stagger card-stagger-6" style={{
          background: '#ECE4D2',
          border: '1px solid #C8BEA8',
          padding: '20px',
          borderRadius: '4px',
          marginBottom: '36px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}>
            <div style={{
              fontFamily: 'var(--font-typewriter)',
              fontSize: '11px',
              color: '#8B2500',
              fontWeight: 800,
              letterSpacing: '1px',
            }}>
              [INTERCEPTED INTERNAL MONOLOGUE // WIRETAP 88]
            </div>
            <div style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              color: '#716859',
            }}>
              (Click highlighted bars to declassify)
            </div>
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '13px',
            color: '#29241E',
            lineHeight: '1.8',
          }}>
            "Suspect opened VS Code at 13:58. At 14:02, subject declared:{' '}
            <span
              onClick={() => toggleRedaction('m1')}
              className={`redacted-bar ${revealedRedactions['m1'] ? 'revealed' : ''}`}
            >
              {revealedRedactions['m1'] ? 'I must first configure the ergonomic arm and watch one YouTube essay.' : '██████████████████████████████████████████████████'}
            </span>{' '}
            Keystroke telemetry confirms zero lines of functional software were drafted. Instead, suspect opened{' '}
            <span
              onClick={() => toggleRedaction('m2')}
              className={`redacted-bar ${revealedRedactions['m2'] ? 'revealed' : ''}`}
            >
              {revealedRedactions['m2'] ? 'Instagram reels for 47 uninterrupted minutes in a comfortable chair.' : '████████████████████████████████████████████████'}
            </span>{' '}
            resulting in total temporal abandonment."
          </div>
        </div>

        {/* Dossier Footer Actions */}
        <div style={{
          borderTop: '2px solid #2B2824',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '14px',
        }}>
          <div style={{
            fontFamily: 'var(--font-typewriter)',
            fontSize: '11px',
            color: '#655E53',
          }}>
            INVESTIGATOR SIGNATURE: <em>Special Agent Sterling (Temporal Division)</em>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              id="btn-goto-conspiracy"
              onClick={onGoToConspiracy}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#2B2824',
                color: '#F4EFE3',
                border: 'none',
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: 700,
                padding: '12px 20px',
                borderRadius: '3px',
                cursor: 'pointer',
                letterSpacing: '1px',
              }}
            >
              <span>EXAMINE CONSPIRACY NETWORK</span>
              <ArrowRight size={16} />
            </button>

            <button
              id="btn-goto-verdict"
              onClick={onGoToVerdict}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#8B2500',
                color: '#FFF',
                border: 'none',
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: 800,
                padding: '12px 24px',
                borderRadius: '3px',
                cursor: 'pointer',
                letterSpacing: '1px',
                boxShadow: '0 4px 14px rgba(139, 37, 0, 0.35)',
              }}
            >
              <span>PROCEED TO FINAL VERDICT</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
