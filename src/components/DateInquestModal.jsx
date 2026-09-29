import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ShieldCheck, UserCheck, ArrowRight, Sparkles } from 'lucide-react';
import { PcbLogo } from './PcbLogo';

export function DateInquestModal({ isOpen, userProfile, defaultDate, onConfirmDate }) {
  const [selectedDate, setSelectedDate] = useState(() => {
    return userProfile?.investigationDate || defaultDate || '2026-09-29';
  });

  useEffect(() => {
    if (isOpen) {
      setSelectedDate(userProfile?.investigationDate || defaultDate || '2026-09-29');
    }
  }, [isOpen, userProfile?.investigationDate, defaultDate]);

  if (!isOpen) return null;

  const parseLocalDate = (dateInput) => {
    if (!dateInput) return new Date(2026, 8, 29);
    if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput.trim())) {
      const parts = dateInput.trim().split('-').map(Number);
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    const d = new Date(dateInput);
    return isNaN(d.getTime()) ? new Date(2026, 8, 29) : d;
  };

  const formatFriendly = (isoStr) => {
    if (!isoStr) return '';
    const d = parseLocalDate(isoStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirmDate(selectedDate || '2026-09-29');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 200,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(3, 6, 14, 0.88)',
      backdropFilter: 'blur(8px)',
      padding: '20px',
    }}>
      <div style={{
        background: 'linear-gradient(145deg, #0D1629 0%, #070B16 100%)',
        border: '2px solid var(--gold-primary)',
        borderRadius: '10px',
        width: '100%',
        maxWidth: '520px',
        boxShadow: '0 0 40px rgba(212, 175, 55, 0.3), 0 20px 50px rgba(0, 0, 0, 0.9)',
        overflow: 'hidden',
        animation: 'modalSlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        {/* Modal Top Ribbon */}
        <div style={{
          background: 'linear-gradient(90deg, #1A284A 0%, #0D1629 100%)',
          borderBottom: '1px solid var(--navy-border)',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <PcbLogo size={36} glow={true} />
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '15px',
              fontWeight: 900,
              color: '#F7E7B4',
              letterSpacing: '1px',
            }}>
              RECORD OFFICIAL INVESTIGATION DATE
            </div>
            <div style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              color: '#00CED1',
              letterSpacing: '0.8px',
            }}>
              STATUTORY INQUEST PROTOCOL // HIGH COURT DATABASE
            </div>
          </div>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          <div style={{
            background: 'rgba(16, 27, 52, 0.6)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            borderRadius: '6px',
            padding: '12px 16px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <UserCheck size={18} color="var(--gold-primary)" />
              <div>
                <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
                  CITIZEN UNDER DEPOSITION:
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#FFF', fontFamily: 'var(--font-heading)' }}>
                  {userProfile?.name || 'Mohit'}
                  <span style={{ fontSize: '11px', color: 'var(--gold-primary)', marginLeft: '6px', fontFamily: 'var(--font-mono)', fontWeight: 500 }}>
                    ({userProfile?.alias || 'The Chronos Fugitive'})
                  </span>
                </div>
              </div>
            </div>

            <div style={{
              background: '#070C18',
              border: '1px solid #1E2D4A',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              color: '#48BB78',
              fontWeight: 700,
            }}>
              ● PCB DATABASE SYNC READY
            </div>
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              color: '#F7E7B4',
              marginBottom: '8px',
              letterSpacing: '0.5px',
            }}>
              <Calendar size={14} color="var(--gold-primary)" />
              <span>CONFIRM DATE OF TEMPORAL LOSS / INVESTIGATION:</span>
            </label>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              required
              style={{
                width: '100%',
                background: '#070C18',
                border: '1.5px solid var(--gold-primary)',
                color: '#FFF2CD',
                fontSize: '16px',
                fontFamily: 'var(--font-mono)',
                padding: '12px 16px',
                borderRadius: '6px',
                outline: 'none',
                boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.6)',
              }}
            />
          </div>

          {/* Quick Preset Buttons */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: '#8A99AD', marginBottom: '8px' }}>
              QUICK CALIBRATION PRESETS:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
              <button
                type="button"
                id="btn-preset-date-today"
                onClick={() => setSelectedDate('2026-09-29')}
                style={{
                  background: selectedDate === '2026-09-29' ? 'rgba(0, 206, 209, 0.25)' : '#070C18',
                  border: selectedDate === '2026-09-29' ? '1.5px solid #00CED1' : '1px solid var(--navy-border)',
                  color: selectedDate === '2026-09-29' ? '#00CED1' : '#94A3B8',
                  padding: '9px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  fontWeight: selectedDate === '2026-09-29' ? 700 : 500,
                  transition: 'all 0.15s ease',
                }}
              >
                Today (29 Sep)
              </button>

              <button
                type="button"
                id="btn-preset-date-tomorrow"
                onClick={() => setSelectedDate('2026-09-30')}
                style={{
                  background: selectedDate === '2026-09-30' ? 'rgba(212, 175, 55, 0.25)' : '#070C18',
                  border: selectedDate === '2026-09-30' ? '1.5px solid var(--gold-primary)' : '1px solid var(--navy-border)',
                  color: selectedDate === '2026-09-30' ? '#FFF2CD' : '#94A3B8',
                  padding: '9px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  fontWeight: selectedDate === '2026-09-30' ? 700 : 500,
                  transition: 'all 0.15s ease',
                }}
              >
                Tomorrow (30 Sep) ★
              </button>

              <button
                type="button"
                id="btn-preset-date-yesterday"
                onClick={() => setSelectedDate('2026-09-28')}
                style={{
                  background: selectedDate === '2026-09-28' ? 'rgba(212, 175, 55, 0.25)' : '#070C18',
                  border: selectedDate === '2026-09-28' ? '1.5px solid var(--gold-primary)' : '1px solid var(--navy-border)',
                  color: selectedDate === '2026-09-28' ? '#FFF2CD' : '#94A3B8',
                  padding: '9px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  fontWeight: selectedDate === '2026-09-28' ? 700 : 500,
                  transition: 'all 0.15s ease',
                }}
              >
                Yesterday (28 Sep)
              </button>
            </div>
          </div>

          {/* Database Synchronization Notice */}
          <div style={{
            background: 'rgba(5, 8, 17, 0.8)',
            borderLeft: '3px solid #00CED1',
            padding: '10px 14px',
            fontSize: '11px',
            color: '#94A3B8',
            fontFamily: 'var(--font-mono)',
            marginBottom: '24px',
            lineHeight: 1.5,
          }}>
            <div style={{ color: '#00CED1', fontWeight: 700, marginBottom: '2px' }}>
              DATABASE COMMIT INSTRUCTIONS:
            </div>
            This date will be written to your Citizen Login Profile database. It establishes <strong>TODAY</strong> and calculates <strong>TOMORROW</strong> across the Conspiracy Network and appears on your PCB Recognized profile header.
          </div>

          {/* Submit Button */}
          <button
            id="btn-affirm-investigation-date"
            type="submit"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #E2BF65 0%, #C49E37 100%)',
              color: '#070C18',
              border: 'none',
              fontFamily: 'var(--font-heading)',
              fontSize: '14px',
              fontWeight: 900,
              padding: '14px',
              borderRadius: '6px',
              cursor: 'pointer',
              letterSpacing: '1px',
              boxShadow: '0 4px 20px rgba(212, 175, 55, 0.4)',
            }}
          >
            <span>AFFIRM DATE & SEAL INVESTIGATION DOSSIER</span>
            <ArrowRight size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
