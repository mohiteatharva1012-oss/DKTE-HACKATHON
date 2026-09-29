import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Calendar, MapPin, Award, Clock, Flame, Activity, Edit3, Save, LogOut, Phone, Key } from 'lucide-react';
import { PcbLogo } from './PcbLogo';

export function CodeChefProfilePage({ userProfile, onSaveProfile, onLoginWithPhone, onLogout, onBack, onStartInvestigation, reportData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userProfile?.name || 'Mohit');
  const [occupation, setOccupation] = useState(userProfile?.occupation || 'Software Engineer');
  const [alias, setAlias] = useState(userProfile?.alias || 'The Chronos Fugitive');
  const [phone, setPhone] = useState(userProfile?.phone || '9876543210');
  const [investigationDate, setInvestigationDate] = useState(() => {
    return userProfile?.investigationDate || '2026-09-29';
  });

  // Keep local state in sync whenever userProfile changes from outside (e.g. date inquest modal)
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || 'Mohit');
      setOccupation(userProfile.occupation || 'Software Engineer');
      setAlias(userProfile.alias || 'The Chronos Fugitive');
      setPhone(userProfile.phone || '9876543210');
      setInvestigationDate(userProfile.investigationDate || '2026-09-29');
    }
  }, [userProfile]);

  const isLoggedIn = userProfile?.isLoggedIn !== false;

  const parseLocalDate = (dateInput) => {
    if (!dateInput) return new Date(2026, 8, 29);
    if (typeof dateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateInput.trim())) {
      const parts = dateInput.trim().split('-').map(Number);
      return new Date(parts[0], parts[1] - 1, parts[2]);
    }
    const d = new Date(dateInput);
    return isNaN(d.getTime()) ? new Date(2026, 8, 29) : d;
  };

  const formatDateDisplay = (dateStr) => {
    const d = parseLocalDate(dateStr);
    return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatMonthYear = (dateStr) => {
    const d = parseLocalDate(dateStr);
    return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const updated = {
      ...userProfile,
      name: name.trim() || 'Mohit',
      occupation: occupation.trim() || 'Software Engineer',
      alias: alias.trim() || 'The Chronos Fugitive',
      phone: phone.trim() || '9876543210',
      investigationDate: investigationDate || '2026-09-29',
    };
    onSaveProfile(updated);
    setIsEditing(false);
  };

  // If citizen is logged out, render high-tech PCB Login Terminal
  if (!isLoggedIn) {
    return (
      <div className="step-transition" style={{
        maxWidth: '720px',
        margin: '0 auto',
        padding: '30px 16px 80px',
        fontFamily: 'var(--font-ui)',
      }}>
        {/* Back navigation */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: '#0D1424',
          border: '1px solid var(--navy-border)',
          borderRadius: '6px',
          padding: '12px 18px',
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '10px',
        }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              border: '1px solid var(--navy-border)',
              color: '#CBD5E1',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              padding: '6px 14px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={16} />
            <span>BACK TO INVESTIGATION</span>
          </button>

          <div style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: '#FF6B6B',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#E74C3C' }}></span>
            CITIZEN TERMINAL: LOCKED (LOGGED OUT)
          </div>
        </div>

        {/* Login Terminal Card */}
        <div style={{
          background: '#0A1122',
          border: '2px solid #00CED1',
          borderRadius: '10px',
          padding: '32px 24px',
          boxShadow: '0 0 40px rgba(0, 206, 209, 0.25), 0 20px 50px rgba(0,0,0,0.8)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #E74C3C 0%, #00CED1 50%, #D4AF37 100%)',
          }} />

          {/* Crest & Bureau Header */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ display: 'inline-flex', marginBottom: '12px' }}>
              <PcbLogo size={60} glow={true} />
            </div>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '22px',
              fontWeight: 900,
              color: '#F9F5EC',
              letterSpacing: '1px',
              margin: '0 0 6px',
            }}>
              PRODUCTIVITY CRIME BRANCH
            </h1>
            <div style={{
              fontFamily: 'var(--font-typewriter)',
              fontSize: '12px',
              color: '#00CED1',
              letterSpacing: '1.5px',
            }}>
              CITIZEN LOGIN TERMINAL // PHONE & OTP VERIFICATION
            </div>
            <p style={{
              fontSize: '12px',
              color: '#8A99AD',
              maxWidth: '460px',
              margin: '8px auto 0',
              lineHeight: 1.5,
              fontFamily: 'var(--font-mono)',
            }}>
              Under Statute DLOT-0927, citizens must authenticate identity via registered mobile number and encrypted OTP verification wire.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={(e) => {
            e.preventDefault();
            if (onLoginWithPhone) {
              onLoginWithPhone(phone, name);
            }
          }}>
            {/* Citizen Legal Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontFamily: 'var(--font-typewriter)',
                fontSize: '11px',
                color: 'var(--gold-primary)',
                letterSpacing: '1px',
                marginBottom: '6px',
              }}>
                1. CITIZEN FULL NAME:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Mohit"
                required
                style={{
                  width: '100%',
                  background: '#070C18',
                  border: '1px solid var(--navy-border)',
                  borderRadius: '4px',
                  padding: '12px 14px',
                  color: '#F9F5EC',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '15px',
                  fontWeight: 700,
                  outline: 'none',
                }}
              />
            </div>

            {/* Mobile / Phone Number */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{
                  fontFamily: 'var(--font-typewriter)',
                  fontSize: '11px',
                  color: 'var(--gold-primary)',
                  letterSpacing: '1px',
                }}>
                  2. MOBILE TELEPHONE NUMBER:
                </label>
                <span style={{ fontSize: '10px', color: '#00CED1', fontFamily: 'var(--font-mono)' }}>
                  [BROWSER ALERT & PROMPT WIRE]
                </span>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{
                  background: '#0F1A30',
                  border: '1px solid var(--navy-border)',
                  borderRadius: '4px',
                  padding: '12px 14px',
                  color: '#00CED1',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}>
                  <Phone size={15} />
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  required
                  style={{
                    flex: 1,
                    background: '#070C18',
                    border: '1px solid var(--navy-border)',
                    borderRadius: '4px',
                    padding: '12px 14px',
                    color: '#F9F5EC',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '15px',
                    fontWeight: 700,
                    outline: 'none',
                    letterSpacing: '1px',
                  }}
                />
              </div>
            </div>

            {/* OTP Protocol Notice Box */}
            <div style={{
              background: 'rgba(0, 206, 209, 0.06)',
              border: '1px dashed rgba(0, 206, 209, 0.4)',
              borderRadius: '6px',
              padding: '12px 16px',
              marginBottom: '20px',
              fontSize: '11px',
              color: '#94A3B8',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.6,
            }}>
              <div style={{ color: '#00CED1', fontWeight: 700, marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Key size={13} />
                <span>HOW THE SECURE OTP PROTOCOL OPERATES:</span>
              </div>
              • Clicking the button below generates an encrypted 4-digit code.<br/>
              • The code will be dispatched to your screen via a <strong>browser Alert</strong>.<br/>
              • You will then be prompted via a <strong>browser Prompt</strong> to enter the OTP.<br/>
              • Valid OTP unlocks your PCB 5★ Citizen Profile and docket history.
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              id="btn-portal-submit-otp"
              style={{
                width: '100%',
                background: 'linear-gradient(135deg, #00CED1 0%, #008B8B 100%)',
                color: '#070C18',
                fontFamily: 'var(--font-heading)',
                fontSize: '14px',
                fontWeight: 900,
                padding: '14px',
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '1px',
                boxShadow: '0 0 25px rgba(0, 206, 209, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
              }}
            >
              <Key size={18} strokeWidth={2.5} />
              <span>GENERATE SECURE OTP & AUTHENTICATE</span>
            </button>
          </form>

          {/* Quick Demo Access Option */}
          <div style={{
            marginTop: '16px',
            paddingTop: '14px',
            borderTop: '1px solid #142242',
            textAlign: 'center',
          }}>
            <button
              type="button"
              id="btn-portal-quick-demo-login"
              onClick={() => {
                if (onLoginWithPhone) {
                  onLoginWithPhone(phone || '9876543210', name || 'Mohit');
                }
              }}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--gold-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              ⚡ QUICK VERIFY: Run OTP sequence for Citizen {name || 'Mohit'} (+91 {phone || '9876543210'})
            </button>
          </div>
        </div>
      </div>
    );
  }

  // PCB Heatmap Activity Grid:
  // Spots the active investigation date (e.g. 29 Sep, 30 Sep, etc.) with glowing cyan; other cells dimmed
  const TOTAL_WEEKS = 16;
  const DAYS_PER_WEEK = 7;
  
  const currentInvestigationDate = userProfile?.investigationDate || investigationDate || '2026-09-29';
  const activeDateObj = parseLocalDate(currentInvestigationDate);
  const targetDayOfWeek = activeDateObj.getDay(); // 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat
  const formattedActiveDate = formatDateDisplay(currentInvestigationDate);

  const heatmapWeeks = Array.from({ length: TOTAL_WEEKS }, (_, weekIdx) =>
    Array.from({ length: DAYS_PER_WEEK }, (_, dayIdx) => {
      const isToday = weekIdx === TOTAL_WEEKS - 1 && dayIdx === targetDayOfWeek;
      return {
        isToday,
        level: isToday ? 4 : 0,
        label: isToday ? `${formattedActiveDate}: 1 Case Deposition Filed` : 'No prior depositions logged',
      };
    })
  );

  const getHeatmapColor = (cell) => {
    if (cell.isToday) {
      return '#00CED1';
    }
    return 'rgba(255, 255, 255, 0.04)';
  };

  return (
    <div className="step-transition" style={{
      maxWidth: '1180px',
      margin: '0 auto',
      padding: '24px 16px 80px',
      fontFamily: 'var(--font-ui)',
    }}>
      {/* Top PCB Navigation Bar / Back */}
      <div className="pcb-profile-top-bar" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#0D1424',
        border: '1px solid var(--navy-border)',
        borderRadius: '6px',
        padding: '12px 18px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: '1px solid var(--navy-border)',
            color: '#CBD5E1',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            padding: '8px 14px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={16} />
          <span>BACK TO INVESTIGATION</span>
        </button>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap',
        }}>
          <div style={{
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--gold-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#48BB78' }}></span>
            PCB CITIZEN PORTAL // DATABASE SYNCED
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid var(--gold-primary)',
              color: '#F7E7B4',
              fontSize: '12px',
              padding: '8px 14px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
            }}
          >
            <Edit3 size={14} />
            <span>{isEditing ? 'CANCEL EDIT' : 'EDIT DETAILS'}</span>
          </button>

          {/* Logout Button in Top Bar */}
          <button
            id="btn-portal-logout"
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(231, 76, 60, 0.15)',
              border: '1px solid #E74C3C',
              color: '#FF6B6B',
              fontSize: '12px',
              padding: '8px 14px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
            }}
            title="Log out of this citizen profile"
          >
            <LogOut size={14} />
            <span>LOGOUT</span>
          </button>
        </div>
      </div>

      {/* PCB Main Profile Layout: Top User Card */}
      <div className="pcb-profile-user-card" style={{
        background: '#0A1122',
        border: '1px solid #1E2D4A',
        borderRadius: '8px',
        padding: '28px 24px',
        marginBottom: '24px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        gap: '24px',
        alignItems: 'center',
      }}>
        {/* Avatar Shield */}
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '100px',
            height: '116px',
            background: 'radial-gradient(circle, #162444 0%, #070B14 100%)',
            border: '2px solid #00CED1',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 206, 209, 0.3)',
          }}>
            <PcbLogo size={64} glow={true} />
          </div>
          <div style={{
            position: 'absolute',
            bottom: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#00CED1',
            color: '#070C18',
            fontSize: '9px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 900,
            padding: '2px 8px',
            borderRadius: '10px',
            whiteSpace: 'nowrap',
          }}>
            5★ PROCR
          </div>
        </div>

        {/* User Info (PCB Recognized Format) */}
        <div className="user-details-column" style={{ display: 'flex', flexDirection: 'column' }}>
          {/* User Name & Rating Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '6px' }}>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '26px',
              fontWeight: 900,
              color: '#F9F5EC',
              letterSpacing: '1px',
              margin: 0,
            }}>
              {userProfile?.name || 'Mohit'}
            </h1>

            {/* PCB 5-Star Rating Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              background: '#2F1B05',
              border: '1px solid #D4AF37',
              padding: '3px 10px',
              borderRadius: '4px',
            }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={13} fill="#D4AF37" color="#D4AF37" />
              ))}
              <span style={{
                color: '#FFF2CD',
                fontSize: '11px',
                fontWeight: 800,
                fontFamily: 'var(--font-mono)',
                marginLeft: '4px',
              }}>
                5★
              </span>
            </div>
          </div>

          {/* Under Name: PCB Recognized Date, Month, Institution */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            fontSize: '13px',
            color: '#94A3B8',
            fontFamily: 'var(--font-mono)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{userProfile?.occupation || 'Software Engineer'}</span>
              <span>•</span>
              <span style={{ color: '#00CED1' }}>@{userProfile?.alias || 'The Chronos Fugitive'}</span>
            </div>

            {/* Date & Month Recognized as in PCB */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '4px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1' }}>
                <Calendar size={14} color="#D4AF37" />
                <span>Investigation Date: <strong style={{ color: '#FFF' }}>{formatDateDisplay(currentInvestigationDate)}</strong></span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8' }}>
                <Clock size={14} color="#00CED1" />
                <span>Joined Month: <strong style={{ color: '#F7E7B4' }}>{formatMonthYear(currentInvestigationDate)}</strong></span>
              </div>
            </div>

            {/* Verified Phone & OTP Test Trigger */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '6px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#CBD5E1' }}>
                <Phone size={14} color="#00CED1" />
                <span>Mobile: <strong style={{ color: '#FFF' }}>+91 {userProfile?.phone || '9876543210'}</strong></span>
                <span style={{
                  fontSize: '9px',
                  background: 'rgba(72, 187, 120, 0.2)',
                  border: '1px solid #48BB78',
                  color: '#48BB78',
                  padding: '1px 5px',
                  borderRadius: '2px',
                  fontWeight: 700,
                  marginLeft: '4px',
                }}>
                  OTP VERIFIED
                </span>
              </div>

              <button
                type="button"
                id="btn-retest-otp-in-page"
                onClick={() => {
                  if (onLoginWithPhone) {
                    onLoginWithPhone(userProfile?.phone || '9876543210', userProfile?.name || 'Mohit');
                  }
                }}
                style={{
                  background: 'rgba(0, 206, 209, 0.1)',
                  border: '1px solid rgba(0, 206, 209, 0.4)',
                  color: '#00CED1',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  padding: '3px 8px',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
                title="Generate new fake OTP alert & prompt verification"
              >
                <Key size={10} />
                <span>RE-VERIFY OTP</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
              <MapPin size={12} />
              <span>Location: Sector 7 // High Court of Temporal Jurisdiction</span>
            </div>
          </div>
        </div>

        {/* PCB Rating & Division Badge Column */}
        <div style={{
          background: '#070C18',
          border: '1px solid #1E2D4A',
          borderRadius: '8px',
          padding: '16px 20px',
          textAlign: 'center',
          minWidth: '170px',
        }}>
          <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--gold-primary)', fontWeight: 700 }}>
            TEMPORAL RATING
          </div>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '32px',
            fontWeight: 900,
            color: '#00CED1',
            margin: '2px 0',
          }}>
            {reportData?.annualHoursLost ? reportData.annualHoursLost : 2446}
          </div>
          <div style={{ fontSize: '11px', color: '#94A3B8', fontFamily: 'var(--font-mono)' }}>
            Div 1 Procrastinator
          </div>
          <div style={{
            fontSize: '10px',
            color: '#64748B',
            marginTop: '6px',
            borderTop: '1px dotted #1E2D4A',
            paddingTop: '6px',
          }}>
            Global Rank: <strong>#42</strong> | PCB Rank: <strong>#1</strong>
          </div>
        </div>
      </div>

      {/* Edit Form if toggled */}
      {isEditing && (
        <form onSubmit={handleSave} style={{
          background: '#0D1629',
          border: '2px solid var(--gold-primary)',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '24px',
        }}>
          <div style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '15px',
            fontWeight: 800,
            color: '#F7E7B4',
            marginBottom: '14px',
          }}>
            UPDATE PCB CITIZEN PROFILE IN DATABASE:
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '14px',
            marginBottom: '16px',
          }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#94A3B8', marginBottom: '6px' }}>
                FULL NAME:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  background: '#070C18',
                  border: '1px solid var(--navy-border)',
                  color: '#FFF',
                  padding: '10px 12px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-ui)',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#94A3B8', marginBottom: '6px' }}>
                MOBILE NUMBER (+91):
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="9876543210"
                style={{
                  width: '100%',
                  background: '#070C18',
                  border: '1px solid var(--navy-border)',
                  color: '#FFF',
                  padding: '10px 12px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#94A3B8', marginBottom: '6px' }}>
                OCCUPATION / ROLE:
              </label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                style={{
                  width: '100%',
                  background: '#070C18',
                  border: '1px solid var(--navy-border)',
                  color: '#FFF',
                  padding: '10px 12px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-ui)',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#94A3B8', marginBottom: '6px' }}>
                SUSPECT ALIAS:
              </label>
              <input
                type="text"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                placeholder="The Chronos Fugitive"
                style={{
                  width: '100%',
                  background: '#070C18',
                  border: '1px solid var(--navy-border)',
                  color: '#FFF',
                  padding: '10px 12px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-ui)',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#94A3B8', marginBottom: '6px' }}>
                INVESTIGATION DATE:
              </label>
              <input
                type="date"
                value={investigationDate}
                onChange={(e) => setInvestigationDate(e.target.value)}
                style={{
                  width: '100%',
                  background: '#070C18',
                  border: '1px solid var(--navy-border)',
                  color: '#FFF',
                  padding: '10px 12px',
                  borderRadius: '4px',
                  fontFamily: 'var(--font-mono)',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #00CED1 0%, #008B8B 100%)',
              color: '#070C18',
              border: 'none',
              fontFamily: 'var(--font-heading)',
              fontWeight: 800,
              fontSize: '13px',
              padding: '12px 24px',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Save size={16} />
            <span>SAVE PROFILE CHANGES TO DATABASE</span>
          </button>
        </form>
      )}

      {/* PCB Style Stats & Activity Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
        marginBottom: '24px',
      }}>
        {/* Heatmap Activity Container */}
        <div style={{
          background: '#0A1122',
          border: '1px solid #1E2D4A',
          borderRadius: '8px',
          padding: '20px',
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
              fontFamily: 'var(--font-heading)',
              fontSize: '15px',
              fontWeight: 800,
              color: '#F7E7B4',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <Activity size={18} color="#00CED1" />
              TEMPORAL PROCRASTINATION HEATMAP
            </div>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#94A3B8' }}>
              Past 16 Weeks Activity
            </span>
          </div>

          <div style={{
            fontSize: '11px',
            color: '#8A99AD',
            marginBottom: '12px',
            fontFamily: 'var(--font-mono)',
          }}>
            Showing activity for: <strong style={{ color: '#00CED1' }}>{formattedActiveDate}</strong>. Previous dates archived.
          </div>

          {/* Matrix Heatmap Grid */}
          <div style={{
            display: 'flex',
            gap: '5px',
            overflowX: 'auto',
            paddingBottom: '10px',
            WebkitOverflowScrolling: 'touch',
          }}>
            {heatmapWeeks.map((week, wIdx) => (
              <div key={wIdx} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {week.map((cell, dIdx) => (
                  <div
                    key={dIdx}
                    title={cell.label}
                    style={{
                      width: '13px',
                      height: '13px',
                      borderRadius: '2px',
                      background: getHeatmapColor(cell),
                      boxShadow: cell.isToday ? '0 0 10px #00CED1, 0 0 16px rgba(0, 206, 209, 0.8)' : 'none',
                      border: cell.isToday ? '1px solid #FFF' : '1px solid rgba(255, 255, 255, 0.05)',
                      cursor: cell.isToday ? 'pointer' : 'default',
                    }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Heatmap Legend */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px solid #1E2D4A',
            fontSize: '11px',
            color: '#64748B',
            fontFamily: 'var(--font-mono)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '2px',
                background: '#00CED1',
                boxShadow: '0 0 8px #00CED1',
              }} />
              <span style={{ color: '#00CED1', fontWeight: 700 }}>29 September (Spotted)</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Inactive</span>
              <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(255,255,255,0.04)' }} />
            </div>
          </div>
        </div>

        {/* Rating Breakdown */}
        <div style={{
          background: '#0A1122',
          border: '1px solid #1E2D4A',
          borderRadius: '8px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '15px',
              fontWeight: 800,
              color: '#F7E7B4',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '14px',
            }}>
              <Flame size={18} color="#FF6B6B" />
              TEMPORAL CRIME BREAKDOWN
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  <span style={{ color: '#CBD5E1' }}>Instagram Reels In Bed</span>
                  <span style={{ color: '#FF6B6B', fontWeight: 700 }}>42 Cases (High)</span>
                </div>
                <div style={{ height: '6px', background: '#1E2D4A', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '82%', height: '100%', background: '#FF6B6B', borderRadius: '3px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  <span style={{ color: '#CBD5E1' }}>"I'll Start at 2:00 PM"</span>
                  <span style={{ color: '#E2BF65', fontWeight: 700 }}>28 Cases</span>
                </div>
                <div style={{ height: '6px', background: '#1E2D4A', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '65%', height: '100%', background: '#E2BF65', borderRadius: '3px' }} />
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'var(--font-mono)', marginBottom: '4px' }}>
                  <span style={{ color: '#CBD5E1' }}>Productive Procrastination</span>
                  <span style={{ color: '#00CED1', fontWeight: 700 }}>19 Cases</span>
                </div>
                <div style={{ height: '6px', background: '#1E2D4A', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '48%', height: '100%', background: '#00CED1', borderRadius: '3px' }} />
                </div>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: '18px',
            padding: '12px',
            background: '#070C18',
            borderRadius: '6px',
            border: '1px solid #1E2D4A',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            <div>
              <div style={{ fontSize: '10px', color: '#64748B', fontFamily: 'var(--font-mono)' }}>CURRENT STREAK</div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 800, color: '#48BB78' }}>
                7 Days Unreformed
              </div>
            </div>
            <button
              onClick={onStartInvestigation}
              style={{
                background: 'linear-gradient(135deg, #E2BF65 0%, #C49E37 100%)',
                color: '#070C18',
                border: 'none',
                fontFamily: 'var(--font-heading)',
                fontSize: '11px',
                fontWeight: 900,
                padding: '8px 14px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              NEW INQUEST
            </button>
          </div>
        </div>
      </div>

      {/* PCB Recent Contest / Case Deposition Table */}
      <div style={{
        background: '#0A1122',
        border: '1px solid #1E2D4A',
        borderRadius: '8px',
        padding: '20px',
      }}>
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '15px',
          fontWeight: 800,
          color: '#F7E7B4',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <Award size={18} color="var(--gold-primary)" />
          OFFICIAL CONTEST / CASE INVESTIGATION HISTORY
        </div>

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{
            width: '100%',
            minWidth: '580px',
            borderCollapse: 'collapse',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            textAlign: 'left',
          }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #1E2D4A', color: 'var(--gold-primary)' }}>
                <th style={{ padding: '10px 12px' }}>CASE ID</th>
                <th style={{ padding: '10px 12px' }}>DATE</th>
                <th style={{ padding: '10px 12px' }}>CONFESSED TIME</th>
                <th style={{ padding: '10px 12px' }}>MAIN OFFENSE</th>
                <th style={{ padding: '10px 12px' }}>RATING CHANGE</th>
                <th style={{ padding: '10px 12px' }}>VERDICT</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #142242' }}>
                <td style={{ padding: '12px', color: '#00CED1', fontWeight: 700 }}>
                  {reportData?.caseId || '#DLOT-0927'}
                </td>
                <td style={{ padding: '12px', color: '#CBD5E1' }}>
                  {formatDateDisplay(userProfile?.investigationDate)}
                </td>
                <td style={{ padding: '12px', color: '#FF6B6B', fontWeight: 700 }}>
                  {reportData?.timeLostDisplay || '6h 42m'}
                </td>
                <td style={{ padding: '12px', color: '#CBD5E1' }}>
                  Productive Procrastination
                </td>
                <td style={{ padding: '12px', color: '#48BB78', fontWeight: 700 }}>
                  +148 (5★)
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    background: 'rgba(192, 57, 43, 0.2)',
                    color: '#E74C3C',
                    border: '1px solid #C0392B',
                    padding: '2px 8px',
                    borderRadius: '3px',
                    fontSize: '10px',
                    fontWeight: 700,
                  }}>
                    GUILTY
                  </span>
                </td>
              </tr>

              <tr style={{ borderBottom: '1px solid #142242' }}>
                <td style={{ padding: '12px', color: '#00CED1', fontWeight: 700 }}>
                  #PCB-2026-X1142
                </td>
                <td style={{ padding: '12px', color: '#CBD5E1' }}>
                  18 September 2026
                </td>
                <td style={{ padding: '12px', color: '#FF6B6B', fontWeight: 700 }}>
                  4h 15m
                </td>
                <td style={{ padding: '12px', color: '#CBD5E1' }}>
                  Infinite Tab Hoarding
                </td>
                <td style={{ padding: '12px', color: '#48BB78', fontWeight: 700 }}>
                  +92 (4★)
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    background: 'rgba(192, 57, 43, 0.2)',
                    color: '#E74C3C',
                    border: '1px solid #C0392B',
                    padding: '2px 8px',
                    borderRadius: '3px',
                    fontSize: '10px',
                    fontWeight: 700,
                  }}>
                    GUILTY
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Citizen Session Footer Bar with Logout */}
      <div style={{
        marginTop: '24px',
        padding: '16px 20px',
        background: '#0A1122',
        border: '1px solid #1E2D4A',
        borderRadius: '6px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: '#8A99AD',
        }}>
          ACTIVE PCB CITIZEN SESSION: <strong style={{ color: '#F7E7B4' }}>{userProfile?.name || 'Mohit'}</strong> (+91 {userProfile?.phone || '9876543210'})
        </div>
        <button
          id="btn-footer-logout"
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(231, 76, 60, 0.15)',
            border: '1px solid #E74C3C',
            color: '#FF6B6B',
            fontSize: '12px',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
          }}
        >
          <LogOut size={14} />
          <span>LOGOUT OF CITIZEN TERMINAL</span>
        </button>
      </div>
    </div>
  );
}
