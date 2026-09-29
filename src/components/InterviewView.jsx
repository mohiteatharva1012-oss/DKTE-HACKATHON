import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, Sparkles, Check, Clock, Plus, Minus } from 'lucide-react';
import { INTERVIEW_QUESTIONS } from '../data/caseData';

export function InterviewView({ answers, onSelectAnswer, onCompleteInterview, onCancel }) {
  // Step index: 0-4 for questions, 5 for Exact Time Confession
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [recentRecordedOption, setRecentRecordedOption] = useState(null);

  // Wasted hours and minutes state
  const wastedHours = answers.wasted_hours !== undefined ? Number(answers.wasted_hours) : 4;
  const wastedMinutes = answers.wasted_minutes !== undefined ? Number(answers.wasted_minutes) : 30;

  const totalSteps = INTERVIEW_QUESTIONS.length + 1; // 5 questions + 1 exact time confession = 6
  const isTimeConfessionStep = currentStepIndex === INTERVIEW_QUESTIONS.length;

  const currentQ = !isTimeConfessionStep ? INTERVIEW_QUESTIONS[currentStepIndex] : null;
  const selectedOptionId = currentQ ? answers[currentQ.id] : null;

  const handleSelectOption = (optionId) => {
    onSelectAnswer(currentQ.id, optionId);
    setRecentRecordedOption(optionId);
    setTimeout(() => {
      setRecentRecordedOption(null);
    }, 1800);
  };

  const setTimeConfession = (h, m) => {
    onSelectAnswer('wasted_hours', Math.max(0, Math.min(24, h)));
    onSelectAnswer('wasted_minutes', Math.max(0, Math.min(59, m)));
  };

  const handleNext = () => {
    if (!isTimeConfessionStep && !selectedOptionId) return;
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      onCompleteInterview();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleFastFill = () => {
    if (!isTimeConfessionStep) {
      const randomOpt = currentQ.options[Math.floor(Math.random() * currentQ.options.length)];
      handleSelectOption(randomOpt.id);
    } else {
      setTimeConfession(5, 30);
    }
  };

  return (
    <div className="step-transition" style={{
      maxWidth: '920px',
      margin: '0 auto',
      padding: '30px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Tape Recorder Bar */}
      <div style={{
        background: '#090E1B',
        border: '1px solid var(--navy-border)',
        borderRadius: '6px',
        padding: '10px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '24px',
        fontFamily: 'var(--font-mono)',
        fontSize: '12px',
        color: '#A0AEC0',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--red-stamp)',
            fontWeight: 700,
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--red-stamp)',
              animation: 'pulseGold 1.5s infinite',
            }}></span>
            REC [SWORN AUDIO LOG]
          </div>
          <span style={{ color: 'var(--navy-border)' }}>|</span>
          <span>INTERROGATION CHAMBER 4-B</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={handleFastFill}
            style={{
              background: 'rgba(212, 175, 55, 0.1)',
              border: '1px solid var(--gold-muted)',
              color: 'var(--gold-light)',
              fontSize: '11px',
              fontFamily: 'var(--font-typewriter)',
              padding: '3px 10px',
              borderRadius: '3px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <Sparkles size={12} color="var(--gold-primary)" />
            AUTO-SELECT
          </button>
          <span style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>
            STATUTE {currentStepIndex + 1} OF {totalSteps}
          </span>
        </div>
      </div>

      {/* Manila Folder Progress Tabs */}
      <div style={{
        display: 'flex',
        gap: '4px',
        marginBottom: '-1px',
        zIndex: 2,
        paddingLeft: '12px',
        overflowX: 'auto',
      }}>
        {INTERVIEW_QUESTIONS.map((q, idx) => {
          const isAnswered = !!answers[q.id];
          const isCurrent = idx === currentStepIndex;
          return (
            <div
              key={q.id}
              onClick={() => setCurrentStepIndex(idx)}
              style={{
                fontFamily: 'var(--font-typewriter)',
                fontSize: '11px',
                padding: '8px 14px',
                borderRadius: '6px 6px 0 0',
                cursor: 'pointer',
                background: isCurrent ? 'var(--paper-manila)' : (isAnswered ? '#142242' : '#0B1325'),
                color: isCurrent ? 'var(--ink-primary)' : (isAnswered ? 'var(--gold-light)' : '#718096'),
                border: isCurrent ? '1px solid #D6CEBE' : '1px solid var(--navy-border)',
                borderBottom: isCurrent ? 'none' : undefined,
                fontWeight: isCurrent ? 800 : 600,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              {isAnswered && <CheckCircle2 size={12} color={isCurrent ? '#166534' : 'var(--gold-primary)'} />}
              <span>{`STATUTE 0${idx + 1}`}</span>
            </div>
          );
        })}

        {/* Tab 6: Exact Hours Confession */}
        <div
          onClick={() => setCurrentStepIndex(5)}
          style={{
            fontFamily: 'var(--font-typewriter)',
            fontSize: '11px',
            padding: '8px 14px',
            borderRadius: '6px 6px 0 0',
            cursor: 'pointer',
            background: isTimeConfessionStep ? 'var(--paper-manila)' : '#142242',
            color: isTimeConfessionStep ? 'var(--ink-primary)' : 'var(--gold-light)',
            border: isTimeConfessionStep ? '1px solid #D6CEBE' : '1px solid var(--navy-border)',
            borderBottom: isTimeConfessionStep ? 'none' : undefined,
            fontWeight: isTimeConfessionStep ? 800 : 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
          }}
        >
          <Clock size={12} color={isTimeConfessionStep ? '#8B2500' : 'var(--gold-primary)'} />
          <span>STATUTE 06: CONFESSED HOURS</span>
        </div>
      </div>

      {/* Manila Folder Docket Case Paper */}
      <div className="paper-dossier" style={{
        padding: '36px 40px',
        marginBottom: '28px',
        border: '1px solid #D6CEBE',
        minHeight: '440px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
      }}>
        {/* Main Content Area */}
        <div>
          {/* Top Paper Metadata */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: '2px solid #2B2824',
            paddingBottom: '16px',
            marginBottom: '24px',
          }}>
            <div>
              <div style={{
                fontFamily: 'var(--font-typewriter)',
                fontSize: '12px',
                color: '#6B655B',
                letterSpacing: '1.5px',
                fontWeight: 700,
              }}>
                FEDERAL BUREAU OF TEMPORAL INTEGRITY // SWORN INQUEST
              </div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '20px',
                fontWeight: 800,
                color: '#1A1815',
                letterSpacing: '1px',
                marginTop: '4px',
              }}>
                {isTimeConfessionStep ? 'STATUTE 06 / CONFESSION: EXACT TIME WASTED' : currentQ.title}
              </div>
            </div>

            <div style={{
              border: '2px dashed var(--red-stamp)',
              padding: '4px 10px',
              transform: 'rotate(2deg)',
              color: 'var(--red-stamp)',
              fontFamily: 'var(--font-typewriter)',
              fontWeight: 700,
              fontSize: '11px',
              letterSpacing: '1px',
            }}>
              SECTION {isTimeConfessionStep ? 'TIME-06' : currentQ.code}
            </div>
          </div>

          {/* Step 1-5: Question Prompt */}
          {!isTimeConfessionStep && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '22px',
                  color: '#181512',
                  fontWeight: 700,
                  lineHeight: 1.3,
                  marginBottom: '6px',
                }}>
                  "{currentQ.question}"
                </h2>
                <p style={{
                  fontFamily: 'var(--font-typewriter)',
                  fontSize: '13px',
                  color: '#60584C',
                  fontStyle: 'italic',
                }}>
                  {currentQ.subtitle}
                </p>
              </div>

              {/* 4 Multi-Choice Deposition Options */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: '12px',
                marginBottom: '24px',
              }}>
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOptionId === opt.id;
                  const isJustRecorded = recentRecordedOption === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      style={{
                        background: isSelected ? '#EAE3D2' : '#F9F7F1',
                        border: isSelected ? '2px solid #8B2500' : '1px solid #D6CEBE',
                        borderRadius: '4px',
                        padding: '14px 18px',
                        cursor: 'pointer',
                        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                        position: 'relative',
                        boxShadow: isSelected ? '0 4px 12px rgba(139, 37, 0, 0.15)' : 'none',
                        transform: isSelected ? 'translateX(4px)' : 'none',
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
                          fontSize: '15px',
                          fontWeight: 700,
                          color: isSelected ? '#8B2500' : '#1C1917',
                        }}>
                          {opt.label}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {/* Animated Evidence Recorded Stamp Badge */}
                          {isSelected && (
                            <div className={isJustRecorded ? "animate-evidence-pop" : ""} style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              background: '#8B2500',
                              color: '#FFF',
                              padding: '2px 8px',
                              borderRadius: '2px',
                              fontFamily: 'var(--font-typewriter)',
                              fontSize: '10px',
                              fontWeight: 800,
                              letterSpacing: '1px',
                              boxShadow: '0 2px 6px rgba(139, 37, 0, 0.3)',
                            }}>
                              <Check size={11} strokeWidth={3} />
                              <span>EVIDENCE RECORDED</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <p style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '12px',
                        color: '#473F35',
                        lineHeight: 1.45,
                        marginBottom: '6px',
                      }}>
                        {opt.description}
                      </p>

                      <div style={{
                        fontFamily: 'var(--font-typewriter)',
                        fontSize: '11px',
                        color: '#7D7365',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '6px',
                        borderTop: '1px dotted #D6CEBE',
                        paddingTop: '6px',
                      }}>
                        <div>
                          <span style={{ color: '#8B2500', fontWeight: 700 }}>EVIDENCE: </span>
                          <span>{opt.evidence}</span>
                        </div>
                        <div style={{
                          color: '#1E1A16',
                          fontWeight: 700,
                          background: '#DDD6C6',
                          padding: '1px 6px',
                          borderRadius: '2px',
                          whiteSpace: 'nowrap',
                          fontSize: '10px',
                        }}>
                          SUSPECT: {opt.suspect}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Step 6: Exact Hours / Minutes Confession Form */}
          {isTimeConfessionStep && (
            <div style={{ padding: '10px 0' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '22px',
                  color: '#181512',
                  fontWeight: 800,
                  marginBottom: '8px',
                }}>
                  "Specify under oath: Exactly how much time did you waste?"
                </h2>
                <p style={{
                  fontFamily: 'var(--font-typewriter)',
                  fontSize: '13px',
                  color: '#60584C',
                }}>
                  No random estimations will be used. Your exact entered hours and minutes will determine your final indictment.
                </p>
              </div>

              {/* Exact Time Input Board */}
              <div style={{
                background: '#EAE4D4',
                border: '2px solid #8B2500',
                borderRadius: '6px',
                padding: '28px 24px',
                marginBottom: '24px',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.1)',
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '28px',
                  marginBottom: '24px',
                  flexWrap: 'wrap',
                }}>
                  {/* Hours Selector */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'var(--font-typewriter)',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#8B2500',
                      marginBottom: '8px',
                      letterSpacing: '1px',
                    }}>
                      HOURS WASTED
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setTimeConfession(wastedHours - 1, wastedMinutes)}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '4px',
                          border: '1px solid #A89B86',
                          background: '#DFD8C7',
                          color: '#2B2620',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Minus size={16} />
                      </button>

                      <input
                        type="number"
                        min="0"
                        max="24"
                        value={wastedHours}
                        onChange={(e) => setTimeConfession(parseInt(e.target.value) || 0, wastedMinutes)}
                        style={{
                          width: '90px',
                          height: '56px',
                          background: '#FFF',
                          border: '2px solid #2B2620',
                          borderRadius: '4px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '32px',
                          fontWeight: 900,
                          color: '#8B2500',
                          outline: 'none',
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => setTimeConfession(wastedHours + 1, wastedMinutes)}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '4px',
                          border: '1px solid #A89B86',
                          background: '#DFD8C7',
                          color: '#2B2620',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '36px',
                    fontWeight: 900,
                    color: '#8B2500',
                    marginTop: '20px',
                  }}>
                    :
                  </div>

                  {/* Minutes Selector */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: 'var(--font-typewriter)',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: '#8B2500',
                      marginBottom: '8px',
                      letterSpacing: '1px',
                    }}>
                      MINUTES WASTED
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => setTimeConfession(wastedHours, wastedMinutes - 5)}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '4px',
                          border: '1px solid #A89B86',
                          background: '#DFD8C7',
                          color: '#2B2620',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Minus size={16} />
                      </button>

                      <input
                        type="number"
                        min="0"
                        max="59"
                        value={wastedMinutes}
                        onChange={(e) => setTimeConfession(wastedHours, parseInt(e.target.value) || 0)}
                        style={{
                          width: '90px',
                          height: '56px',
                          background: '#FFF',
                          border: '2px solid #2B2620',
                          borderRadius: '4px',
                          textAlign: 'center',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '32px',
                          fontWeight: 900,
                          color: '#8B2500',
                          outline: 'none',
                        }}
                      />

                      <button
                        type="button"
                        onClick={() => setTimeConfession(wastedHours, wastedMinutes + 5)}
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '4px',
                          border: '1px solid #A89B86',
                          background: '#DFD8C7',
                          color: '#2B2620',
                          fontWeight: 'bold',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Quick Selection Preset Chips */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '8px',
                  flexWrap: 'wrap',
                  borderTop: '1px dashed #C8BEAC',
                  paddingTop: '16px',
                }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-typewriter)', color: '#685F52' }}>
                    COMMON ESTIMATIONS:
                  </span>
                  {[
                    { label: '1h 30m', h: 1, m: 30 },
                    { label: '2h 45m', h: 2, m: 45 },
                    { label: '4h 15m', h: 4, m: 15 },
                    { label: '6h 42m (Bench Trial)', h: 6, m: 42 },
                    { label: '8h 00m (Full Workday)', h: 8, m: 0 },
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTimeConfession(chip.h, chip.m)}
                      style={{
                        background: (wastedHours === chip.h && wastedMinutes === chip.m) ? '#8B2500' : '#DED5C2',
                        color: (wastedHours === chip.h && wastedMinutes === chip.m) ? '#FFF' : '#2B2620',
                        border: '1px solid #B5AA95',
                        borderRadius: '3px',
                        fontSize: '11px',
                        fontFamily: 'var(--font-mono)',
                        padding: '4px 10px',
                        cursor: 'pointer',
                        fontWeight: 700,
                      }}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sworn Statement Card */}
              <div style={{
                background: '#FAF8F3',
                border: '1px solid #C8BEAC',
                padding: '14px 18px',
                borderRadius: '4px',
                fontFamily: 'var(--font-typewriter)',
                fontSize: '12px',
                color: '#383229',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <Check size={18} color="#8B2500" strokeWidth={3} />
                <span>
                  CONFESSION LOGGED: Subject declares forfeiture of exactly{' '}
                  <strong style={{ color: '#8B2500', fontSize: '14px' }}>
                    {wastedHours} HOURS AND {wastedMinutes} MINUTES
                  </strong>.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Paper Navigation Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: '1px solid #D6CEBE',
          paddingTop: '16px',
          marginTop: '12px',
        }}>
          <button
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: '1px solid #8A8172',
              color: currentStepIndex === 0 ? '#B0A898' : '#2D2822',
              fontFamily: 'var(--font-typewriter)',
              fontSize: '12px',
              fontWeight: 700,
              padding: '8px 16px',
              borderRadius: '3px',
              cursor: currentStepIndex === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <ChevronLeft size={16} />
            PREVIOUS
          </button>

          <div style={{
            fontSize: '11px',
            fontFamily: 'var(--font-typewriter)',
            color: '#6B655B',
          }}>
            {!isTimeConfessionStep && !selectedOptionId 
              ? '⚠ Please select an alibi above to proceed.' 
              : '✓ Deposition verified in federal registry.'}
          </div>

          <button
            id="btn-next-question"
            onClick={handleNext}
            disabled={!isTimeConfessionStep && !selectedOptionId}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: (!isTimeConfessionStep && !selectedOptionId) ? '#B0A898' : '#8B2500',
              color: '#FFF',
              border: 'none',
              fontFamily: 'var(--font-heading)',
              fontSize: '13px',
              fontWeight: 800,
              padding: '10px 22px',
              borderRadius: '3px',
              cursor: (!isTimeConfessionStep && !selectedOptionId) ? 'not-allowed' : 'pointer',
              letterSpacing: '1px',
              boxShadow: (!isTimeConfessionStep && !selectedOptionId) ? 'none' : '0 4px 12px rgba(139, 37, 0, 0.3)',
            }}
          >
            <span>{isTimeConfessionStep ? 'TRANSMIT TO CRIME LAB' : 'NEXT STATUTE'}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
