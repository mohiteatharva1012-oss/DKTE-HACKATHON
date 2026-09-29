import React, { useState, useEffect } from 'react';
import { Printer, Copy, RotateCcw, Check, Scale, Volume2, VolumeX, Bot, Square } from 'lucide-react';
import { PcbLogo } from './PcbLogo';

export function CaseFileCardView({ reportData, onRestart, onOpenJudgeMode }) {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!reportData) return null;

  // Local date parsing without timezone offset
  const parseLocalDate = (dateInput) => {
    if (!dateInput) return new Date(2026, 8, 29);
    if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput.trim())) {
      const parts = dateInput.trim().split('-').map(Number);
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    const d = new Date(dateInput);
    return isNaN(d.getTime()) ? new Date(2026, 8, 29) : d;
  };

  const crimeDateObj = parseLocalDate(reportData.rawDate || reportData.todayFriendly || reportData.stampDate);
  const crimeDateDisplay = crimeDateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const hours = Number(reportData.wastedHours !== undefined ? reportData.wastedHours : 4);
  const minutes = Number(reportData.wastedMinutes !== undefined ? reportData.wastedMinutes : 0);
  const timeGoneSpoken = hours > 0 && minutes > 0 
    ? `${hours} hours and ${minutes} minutes`
    : hours > 0 
    ? `${hours} hours` 
    : `${minutes} minutes`;

  const dailyRs = reportData.dailyEconomicDamageINR !== undefined 
    ? reportData.dailyEconomicDamageINR 
    : (hours * 3600 + minutes * 60);

  const annualRs = reportData.annualEconomicDamageINR !== undefined 
    ? reportData.annualEconomicDamageINR 
    : (dailyRs * 365);

  const suspectName = reportData.subject || 'Citizen Mohit';
  const crimeName = reportData.verdictTitle || reportData.primaryOffense || 'Guilty of Productive Procrastination';
  const courtPunishment = reportData.courtSentence?.sentence || 'Surrender temporal distractions and report for immediate reform.';

  // Exact speech script in requested sequence:
  // 1. Name of suspect
  // 2. Name of crime
  // 3. Date of crime
  // 4. Time gone
  // 5. Rupees lost per day and per year if your time remain same
  // 6. Punishment at the end
  const roboticSpeechScript = `Name of suspect: ${suspectName}. Name of crime: ${crimeName}. Date of crime: ${crimeDateDisplay}. Time gone: ${timeGoneSpoken}. Rupees lost per day: ${dailyRs.toLocaleString('en-IN')} rupees, and per year: ${annualRs.toLocaleString('en-IN')} rupees, if your time remains the same. Punishment: ${courtPunishment}`;

  // Sci-fi robotic audio beep synthesizer via Web Audio API
  const playRobotBeep = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      osc.frequency.setValueAtTime(440, ctx.currentTime + 0.09);
      osc.frequency.exponentialRampToValueAtTime(1040, ctx.currentTime + 0.16);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.18);
    } catch (e) {
      // AudioContext fallback
    }
  };

  const handleToggleRoboticVoice = () => {
    if (!('speechSynthesis' in window)) {
      window.alert("⚠️ [AUDIO NOTICE]\nSpeech Synthesis audio is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    playRobotBeep();

    const utterance = new SpeechSynthesisUtterance(roboticSpeechScript);
    utterance.rate = 0.92;
    utterance.pitch = 0.82;

    const voices = window.speechSynthesis.getVoices();
    const robotVoice = voices.find((v) =>
      v.name.toLowerCase().includes('bot') ||
      v.name.toLowerCase().includes('robot') ||
      v.name.toLowerCase().includes('david') ||
      v.name.toLowerCase().includes('george') ||
      v.name.toLowerCase().includes('male') ||
      (v.lang.startsWith('en') && !v.name.toLowerCase().includes('female'))
    ) || voices.find((v) => v.lang.startsWith('en')) || voices[0];

    if (robotVoice) {
      utterance.voice = robotVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleCopySummary = () => {
    const summaryText = `[POLICE BUREAU OF INVESTIGATION // PRODUCTIVITY CRIME BRANCH]
CASE NUMBER: ${reportData.caseId}
DEFENDANT: ${reportData.subject}
VERDICT: ${reportData.verdictTitle}
EXACT TIME STOLEN: ${reportData.timeLostDisplay} (${reportData.annualHoursLost} hrs/yr, ${reportData.totalDaysEquivalent} full days)
ECONOMIC LOSS: ₹${dailyRs.toLocaleString('en-IN')} Rs./day (₹${annualRs.toLocaleString('en-IN')} Rs./yr)
PRIMARY OFFENSE: ${reportData.primaryOffense} (${reportData.offenseCode})
COURT-MANDATED SENTENCE: "${reportData.courtSentence?.sentence}"
CLEARANCE LEVEL: ${reportData.clearanceLevel}
DOCKET DATE: ${reportData.stampDate}
--
Convicted by High Court of Temporal Justice.`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="step-transition" style={{
      maxWidth: '920px',
      margin: '0 auto',
      padding: '30px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      {/* Top Action Toolbar */}
      <div className="no-print" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleCopySummary}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: copied ? '#166534' : 'rgba(16, 27, 52, 0.8)',
              border: '1px solid var(--navy-border)',
              color: copied ? '#DCFCE7' : '#CBD5E1',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'DOSSIER COPIED TO CLIPBOARD' : 'COPY CASE SUMMARY'}</span>
          </button>

          <button
            onClick={handlePrint}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(16, 27, 52, 0.8)',
              border: '1px solid var(--navy-border)',
              color: '#CBD5E1',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <Printer size={14} />
            <span>PRINT / SAVE OFFICIAL PDF</span>
          </button>

          <button
            id="btn-toolbar-voice-bot"
            onClick={handleToggleRoboticVoice}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: isSpeaking ? 'rgba(0, 206, 209, 0.25)' : 'rgba(16, 27, 52, 0.8)',
              border: isSpeaking ? '1.5px solid #00CED1' : '1px solid var(--navy-border)',
              color: isSpeaking ? '#00CED1' : '#CBD5E1',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title="Read Date of Crime, Time Gone, and Rupees Lost via Robotic Voice"
          >
            {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
            <span>{isSpeaking ? 'STOP VOICE BOT' : '🔊 ROBOTIC VOICE'}</span>
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={onOpenJudgeMode}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'transparent',
              border: '1px solid var(--gold-muted)',
              color: 'var(--gold-light)',
              fontFamily: 'var(--font-heading)',
              fontSize: '12px',
              padding: '8px 14px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <Scale size={14} />
            <span>BENCH TRIAL PRESETS</span>
          </button>

          <button
            id="btn-restart-investigation"
            onClick={onRestart}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #C0392B 0%, #8B0000 100%)',
              border: 'none',
              color: '#FFF',
              fontFamily: 'var(--font-heading)',
              fontSize: '12px',
              fontWeight: 700,
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={14} />
            <span>FILE APPEAL (RESET)</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Paper Document */}
      <div id="case-file-document" className="paper-dossier" style={{
        width: '100%',
        padding: '50px 60px',
        border: '2px solid #2B2620',
        borderRadius: '6px',
        position: 'relative',
        background: '#FAF6ED',
        color: '#1C1917',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 1px rgba(0, 0, 0, 0.5)',
      }}>
        {/* Certificate Outer Border Frame */}
        <div style={{
          position: 'absolute',
          inset: '16px',
          border: '2px solid #8B2500',
          pointerEvents: 'none',
        }}></div>

        {/* Certificate Inner Double Line Frame */}
        <div style={{
          position: 'absolute',
          inset: '20px',
          border: '1px dashed #B8AB96',
          pointerEvents: 'none',
        }}></div>

        {/* Document Header & Official PCB Emblem */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '28px',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Official PCB Emblem */}
          <div style={{
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <PcbLogo size={68} />
          </div>

          <div style={{
            fontFamily: 'var(--font-typewriter)',
            fontSize: '11px',
            color: '#655E53',
            letterSpacing: '2.5px',
            fontWeight: 800,
          }}>
            POLICE BUREAU OF INVESTIGATION // GOVERNMENT OF LOST TIME
          </div>

          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '24px',
            fontWeight: 900,
            color: '#151311',
            letterSpacing: '2px',
            marginTop: '2px',
          }}>
            CERTIFICATE OF TEMPORAL FELONY & CASE DOSSIER
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            color: '#8B2500',
            fontWeight: 700,
            marginTop: '4px',
          }}>
            CASE REGISTRY ID: {reportData.caseId} // REGISTERED ARCHIVE
          </div>
        </div>

        {/* Two-Column Official Details */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Left Column: Indictment & Time Heist */}
          <div style={{
            background: '#F1ECE0',
            border: '1px solid #D6CEBE',
            padding: '20px',
            borderRadius: '4px',
          }}>
            <div style={{
              fontFamily: 'var(--font-typewriter)',
              fontSize: '11px',
              color: '#8B2500',
              fontWeight: 800,
              borderBottom: '1px solid #D6CEBE',
              paddingBottom: '4px',
              marginBottom: '10px',
            }}>
              SECTION I: CONVICTION RECORD
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: '1.6' }}>
              <div><strong>DEFENDANT:</strong> {reportData.subject}</div>
              <div><strong>CONVICTED OF:</strong> {reportData.verdictTitle}</div>
              <div><strong>STATUTE:</strong> {reportData.offenseCode}</div>
              <div><strong>LIFESPAN STOLEN:</strong> <span style={{ color: '#8B2500', fontWeight: 800 }}>{reportData.timeLostDisplay}</span> ({reportData.annualHoursLost} hrs/yr, {reportData.totalDaysEquivalent} full days)</div>
              <div><strong>ECONOMIC TOLL:</strong> ₹{(reportData.dailyEconomicDamageINR !== undefined ? reportData.dailyEconomicDamageINR : (reportData.wastedHours * 3600 + reportData.wastedMinutes * 60)).toLocaleString()} Rs./day (₹{(reportData.annualEconomicDamageINR !== undefined ? reportData.annualEconomicDamageINR : ((reportData.wastedHours * 3600 + reportData.wastedMinutes * 60) * 365)).toLocaleString()} Rs./yr at ₹1/sec • ₹3,600/hr)</div>
            </div>
          </div>

          {/* Right Column: Sentence & Officer Notes */}
          <div style={{
            background: '#F1ECE0',
            border: '1px solid #D6CEBE',
            padding: '20px',
            borderRadius: '4px',
          }}>
            <div style={{
              fontFamily: 'var(--font-typewriter)',
              fontSize: '11px',
              color: '#8B2500',
              fontWeight: 800,
              borderBottom: '1px solid #D6CEBE',
              paddingBottom: '4px',
              marginBottom: '10px',
            }}>
              SECTION II: COURT-ORDERED PENANCE
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', lineHeight: '1.6' }}>
              <div><strong>PUNISHMENT:</strong></div>
              <div style={{ fontStyle: 'italic', color: '#2B2620', marginTop: '4px', marginBottom: '8px' }}>
                "{reportData.courtSentence?.sentence}"
              </div>
              <div><strong>SUPERVISION:</strong> {reportData.courtSentence?.officer}</div>
              <div><strong>APPEAL STATUS:</strong> DENIED UNDER SEC. 404</div>
            </div>
          </div>
        </div>

        {/* Official Robotic Voice Bot Audio Sign Module */}
        <div className="robotic-audio-sign-panel" style={{
          background: 'linear-gradient(135deg, #151311 0%, #0A0908 100%)',
          border: isSpeaking ? '2px solid #00CED1' : '2px solid #8B2500',
          borderRadius: '8px',
          padding: '20px 24px',
          marginBottom: '28px',
          color: '#FAF6ED',
          position: 'relative',
          zIndex: 2,
          boxShadow: isSpeaking 
            ? '0 0 25px rgba(0, 206, 209, 0.4), 0 8px 24px rgba(0,0,0,0.5)' 
            : '0 6px 20px rgba(0,0,0,0.4)',
          transition: 'all 0.3s ease',
        }}>
          {/* Top Bar of Audio Sign */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '8px',
                background: isSpeaking ? 'rgba(0, 206, 209, 0.2)' : 'rgba(212, 175, 55, 0.15)',
                border: isSpeaking ? '1.5px solid #00CED1' : '1px solid #D4AF37',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isSpeaking ? '#00CED1' : 'var(--gold-primary)',
                boxShadow: isSpeaking ? '0 0 12px #00CED1' : 'none',
              }}>
                <Bot size={24} />
              </div>

              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '14px',
                  fontWeight: 900,
                  color: '#FAF6ED',
                  letterSpacing: '1px',
                }}>
                  <span>ROBOTIC VOICE BOT AUDIT</span>
                  <span style={{
                    fontSize: '9px',
                    fontFamily: 'var(--font-mono)',
                    background: isSpeaking ? '#00CED1' : '#2F1B05',
                    color: isSpeaking ? '#070C18' : '#D4AF37',
                    padding: '2px 6px',
                    borderRadius: '3px',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                  }}>
                    {isSpeaking ? '● TRANSMITTING' : 'AUDIO SIGN'}
                  </span>
                </div>
                <div style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  color: isSpeaking ? '#00CED1' : '#94A3B8',
                  marginTop: '2px',
                }}>
                  Statutory Audio Sign • Reads in Sequence: Suspect → Crime → Date → Time Gone → Rupees Lost (Day/Year If Time Remains Same) → Punishment
                </div>
              </div>
            </div>

            {/* Audio Sign Equalizer + Play / Stop Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              {/* Equalizer Waveform Audio Sign */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: '3px',
                height: '24px',
                padding: '2px 6px',
                background: 'rgba(0,0,0,0.5)',
                borderRadius: '4px',
                border: '1px solid rgba(255,255,255,0.1)',
              }} title="Robotic Audio Waveform Sign">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className={`pcb-audio-bar ${isSpeaking ? 'playing' : ''}`}
                    style={{
                      height: isSpeaking ? undefined : '5px',
                      background: isSpeaking ? '#00CED1' : '#64748B',
                    }}
                  />
                ))}
              </div>

              {/* Main Audio Toggle Button */}
              <button
                type="button"
                id="btn-play-robotic-voice"
                onClick={handleToggleRoboticVoice}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: isSpeaking 
                    ? 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)' 
                    : 'linear-gradient(135deg, #00CED1 0%, #008B8B 100%)',
                  color: '#070C18',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '12px',
                  fontWeight: 900,
                  padding: '10px 18px',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  boxShadow: isSpeaking 
                    ? '0 0 15px rgba(231, 76, 60, 0.5)' 
                    : '0 0 20px rgba(0, 206, 209, 0.4)',
                  transition: 'all 0.2s ease',
                }}
              >
                {isSpeaking ? (
                  <>
                    <Square size={14} fill="#070C18" />
                    <span>STOP VOICE BOT</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={16} />
                    <span>PLAY ROBOTIC VOICE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Six Telemetry Readout Grid in Exact Requested Sequence */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '10px',
            marginTop: '12px',
          }}>
            {/* 1. Name of Suspect */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: isSpeaking ? '1px solid rgba(212, 175, 55, 0.4)' : '1px solid rgba(212, 175, 55, 0.2)',
              borderRadius: '6px',
              padding: '10px 12px',
            }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--gold-primary)', fontWeight: 700 }}>
                1. NAME OF SUSPECT
              </div>
              <div style={{ fontSize: '13px', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#FFF', marginTop: '3px' }}>
                {suspectName}
              </div>
            </div>

            {/* 2. Name of Crime */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: isSpeaking ? '1px solid rgba(231, 76, 60, 0.4)' : '1px solid rgba(231, 76, 60, 0.2)',
              borderRadius: '6px',
              padding: '10px 12px',
            }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#FF8888', fontWeight: 700 }}>
                2. NAME OF CRIME
              </div>
              <div style={{ fontSize: '13px', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#FFAAAA', marginTop: '3px' }}>
                {crimeName}
              </div>
            </div>

            {/* 3. Date of Crime */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: isSpeaking ? '1px solid rgba(0, 206, 209, 0.4)' : '1px solid rgba(0, 206, 209, 0.2)',
              borderRadius: '6px',
              padding: '10px 12px',
            }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#00CED1', fontWeight: 700 }}>
                3. DATE OF CRIME
              </div>
              <div style={{ fontSize: '13px', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#FFF', marginTop: '3px' }}>
                {crimeDateDisplay}
              </div>
            </div>

            {/* 4. Time Gone */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: isSpeaking ? '1px solid rgba(0, 206, 209, 0.6)' : '1px solid rgba(0, 206, 209, 0.2)',
              borderRadius: '6px',
              padding: '10px 12px',
            }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#00CED1', fontWeight: 700 }}>
                4. TIME GONE
              </div>
              <div style={{ fontSize: '13px', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#FFF', marginTop: '3px' }}>
                {reportData.timeLostDisplay}
              </div>
            </div>

            {/* 5. Rupees Lost / Day & Year */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: isSpeaking ? '1px solid rgba(255, 107, 107, 0.6)' : '1px solid rgba(231, 76, 60, 0.35)',
              borderRadius: '6px',
              padding: '10px 12px',
            }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#FF6B6B', fontWeight: 700 }}>
                5. RUPEES LOST (DAY / YR IF TIME REMAINS SAME)
              </div>
              <div style={{ fontSize: '13px', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#FF8888', marginTop: '3px' }}>
                ₹{dailyRs.toLocaleString('en-IN')}/day • ₹{annualRs.toLocaleString('en-IN')}/yr
              </div>
            </div>

            {/* 6. Punishment at the End */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: isSpeaking ? '1px solid rgba(212, 175, 55, 0.6)' : '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '6px',
              padding: '10px 12px',
            }}>
              <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--gold-primary)', fontWeight: 700 }}>
                6. PUNISHMENT AT THE END
              </div>
              <div style={{ fontSize: '12px', fontStyle: 'italic', fontFamily: 'var(--font-ui)', color: '#F7E7B4', marginTop: '3px', lineHeight: 1.3 }}>
                "{courtPunishment}"
              </div>
            </div>
          </div>

          {/* Subtitle / Script Transcript readout */}
          <div style={{
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px dashed rgba(255, 255, 255, 0.1)',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: '#94A3B8',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <Volume2 size={13} color={isSpeaking ? '#00CED1' : '#94A3B8'} />
            <span>
              <strong>BOT SCRIPT (IN EXACT SEQUENCE):</strong> "{roboticSpeechScript}"
            </span>
          </div>
        </div>

        {/* Official Barcode, Fingerprint & Signatures Footer */}
        <div style={{
          borderTop: '2px solid #2B2620',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '20px',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Barcode Graphic */}
          <div>
            <div style={{
              display: 'flex',
              gap: '2px',
              height: '36px',
              alignItems: 'stretch',
              marginBottom: '4px',
            }}>
              {[4, 2, 6, 1, 3, 5, 2, 7, 2, 4, 1, 5, 3, 6, 2, 5, 1, 4, 6, 2, 3].map((w, i) => (
                <div key={i} style={{ width: `${w * 1.5}px`, background: '#1E1A16' }}></div>
              ))}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '10px', color: '#655E53' }}>
              *PCB-POLICE-INVESTIGATION-CERTIFIED*
            </div>
          </div>

          {/* Official Distressed Rubber Stamp */}
          <div style={{ transform: 'rotate(-5deg)' }}>
            <span className="rubber-stamp rubber-stamp-red" style={{
              fontSize: '18px',
              padding: '6px 16px',
              fontWeight: 900,
            }}>
              GUILTY & ARCHIVED
            </span>
          </div>

          {/* Signature Line */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: 'var(--font-typewriter)',
              fontSize: '13px',
              fontStyle: 'italic',
              color: '#8B2500',
              borderBottom: '1px solid #1E1A16',
              paddingBottom: '2px',
              width: '180px',
              textAlign: 'center',
            }}>
              Inspector Sterling
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#655E53',
              marginTop: '4px',
            }}>
              POLICE BUREAU CHIEF INVESTIGATOR
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
