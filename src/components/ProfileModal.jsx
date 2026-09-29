import React, { useState, useEffect } from 'react';
import { User, Check, X, Award, LogOut, Phone, Key } from 'lucide-react';
import { PcbLogo } from './PcbLogo';

export function ProfileModal({ isOpen, onClose, currentProfile, onSaveProfile, onLoginWithPhone, onLogout }) {
  const [name, setName] = useState(currentProfile?.name || 'Mohit');
  const [alias, setAlias] = useState(currentProfile?.alias || 'The Chronos Fugitive');
  const [occupation, setOccupation] = useState(currentProfile?.occupation || 'Software Engineer');
  const [avatarIndex, setAvatarIndex] = useState(currentProfile?.avatarIndex || 0);
  const [phone, setPhone] = useState(currentProfile?.phone || '9876543210');
  const [investigationDate, setInvestigationDate] = useState(currentProfile?.investigationDate || '2026-09-29');

  const isLoggedIn = currentProfile?.isLoggedIn !== false;

  useEffect(() => {
    if (currentProfile) {
      setName(currentProfile.name || 'Mohit');
      setAlias(currentProfile.alias || 'The Chronos Fugitive');
      setOccupation(currentProfile.occupation || 'Software Engineer');
      setAvatarIndex(currentProfile.avatarIndex || 0);
      setPhone(currentProfile.phone || '9876543210');
      setInvestigationDate(currentProfile.investigationDate || '2026-09-29');
    }
  }, [currentProfile, isOpen]);

  if (!isOpen) return null;

  const avatars = [
    { label: 'Official PCB Shield', isPcb: true },
    { label: 'Suspect Silhouette', icon: User, bg: '#E74C3C' },
    { label: 'Special Agent', icon: Award, bg: '#48BB78' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const updated = {
      ...currentProfile,
      name: name.trim() || 'Mohit',
      alias: alias.trim() || 'The Chronos Fugitive',
      occupation: occupation.trim() || 'Software Engineer',
      phone: phone.trim() || '9876543210',
      investigationDate: investigationDate || currentProfile?.investigationDate || '2026-09-29',
      avatarIndex,
      updatedAt: new Date().toISOString(),
    };
    onSaveProfile(updated);
    onClose();
  };

  const handlePhoneLoginClick = () => {
    if (onLoginWithPhone) {
      onLoginWithPhone(phone, name);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(3, 6, 12, 0.85)',
      backdropFilter: 'blur(8px)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        background: 'var(--navy-elevated)',
        border: '2px solid var(--gold-primary)',
        boxShadow: '0 0 40px rgba(0, 206, 209, 0.3), 0 25px 50px rgba(0, 0, 0, 0.8)',
        borderRadius: '8px',
        maxWidth: '540px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        {/* Header with PCB Logo */}
        <div style={{
          background: 'linear-gradient(90deg, #162444 0%, #0A1122 100%)',
          padding: '16px 24px',
          borderBottom: '1px solid var(--navy-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <PcbLogo size={32} />
            <div>
              <div style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '16px',
                fontWeight: 800,
                color: '#F7E7B4',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                <span>BUREAU CITIZEN DOSSIER & PROFILE</span>
                {isLoggedIn ? (
                  <span style={{
                    fontSize: '9px',
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(72, 187, 120, 0.2)',
                    border: '1px solid #48BB78',
                    color: '#48BB78',
                    padding: '1px 6px',
                    borderRadius: '2px',
                  }}>
                    LOGGED IN
                  </span>
                ) : (
                  <span style={{
                    fontSize: '9px',
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(231, 76, 60, 0.2)',
                    border: '1px solid #E74C3C',
                    color: '#FF6B6B',
                    padding: '1px 6px',
                    borderRadius: '2px',
                  }}>
                    LOGGED OUT
                  </span>
                )}
              </div>
              <div style={{
                fontFamily: 'var(--font-typewriter)',
                fontSize: '10px',
                color: '#00CED1',
              }}>
                [SAVED LOCALLY IN CHRONOS SECURE STORAGE]
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
              padding: '4px',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {/* Avatar Choice */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontFamily: 'var(--font-typewriter)',
              fontSize: '11px',
              color: 'var(--gold-primary)',
              letterSpacing: '1px',
              marginBottom: '10px',
            }}>
              1. OFFICIAL IDENTIFICATION CREST:
            </label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {avatars.map((av, idx) => {
                const Icon = av.icon;
                const isSelected = avatarIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => setAvatarIndex(idx)}
                    style={{
                      flex: 1,
                      background: isSelected ? 'rgba(0, 206, 209, 0.15)' : 'rgba(10, 16, 32, 0.7)',
                      border: isSelected ? '2px solid #00CED1' : '1px solid var(--navy-border)',
                      padding: '12px 8px',
                      borderRadius: '6px',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{
                      height: '38px',
                      margin: '0 auto 6px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {av.isPcb ? (
                        <PcbLogo size={32} />
                      ) : (
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: av.bg,
                          color: '#070C18',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                          <Icon size={16} />
                        </div>
                      )}
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      color: isSelected ? '#F7E7B4' : '#8A99AD',
                      fontWeight: isSelected ? 700 : 400,
                    }}>
                      {av.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Name Input */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              fontFamily: 'var(--font-typewriter)',
              fontSize: '11px',
              color: 'var(--gold-primary)',
              letterSpacing: '1px',
              marginBottom: '6px',
            }}>
              2. FULL LEGAL NAME (SUBJECT OF INQUEST):
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
                padding: '10px 14px',
                color: '#F9F5EC',
                fontFamily: 'var(--font-heading)',
                fontSize: '15px',
                fontWeight: 700,
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--navy-border)')}
            />
          </div>

          {/* Phone Number Input */}
          <div style={{ marginBottom: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{
                fontFamily: 'var(--font-typewriter)',
                fontSize: '11px',
                color: 'var(--gold-primary)',
                letterSpacing: '1px',
              }}>
                3. CITIZEN PHONE NUMBER (FOR OTP LOGIN):
              </label>
              <span style={{ fontSize: '10px', color: '#00CED1', fontFamily: 'var(--font-mono)' }}>
                [FAKE OTP VIA ALERTS & PROMPTS]
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{
                background: '#0A1224',
                border: '1px solid var(--navy-border)',
                borderRadius: '4px',
                padding: '10px 12px',
                color: '#00CED1',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}>
                <Phone size={14} />
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
                  padding: '10px 14px',
                  color: '#CBD5E1',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '14px',
                  fontWeight: 600,
                  outline: 'none',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#00CED1')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--navy-border)')}
              />
            </div>
          </div>

          {/* Occupation / Title */}
          <div style={{ marginBottom: '18px' }}>
            <label style={{
              display: 'block',
              fontFamily: 'var(--font-typewriter)',
              fontSize: '11px',
              color: 'var(--gold-primary)',
              letterSpacing: '1px',
              marginBottom: '6px',
            }}>
              4. DESIGNATION / OCCUPATION:
            </label>
            <input
              type="text"
              value={occupation}
              onChange={(e) => setOccupation(e.target.value)}
              placeholder="e.g. Software Engineer, Designer, Student"
              style={{
                width: '100%',
                background: '#070C18',
                border: '1px solid var(--navy-border)',
                borderRadius: '4px',
                padding: '10px 14px',
                color: '#CBD5E1',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--navy-border)')}
            />
          </div>

          {/* Alias / Call-sign */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{
              display: 'block',
              fontFamily: 'var(--font-typewriter)',
              fontSize: '11px',
              color: 'var(--gold-primary)',
              letterSpacing: '1px',
              marginBottom: '6px',
            }}>
              5. BUREAU SUSPECT ALIAS:
            </label>
            <input
              type="text"
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="e.g. The Chronos Fugitive"
              style={{
                width: '100%',
                background: '#070C18',
                border: '1px solid var(--navy-border)',
                borderRadius: '4px',
                padding: '10px 14px',
                color: '#CBD5E1',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                outline: 'none',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--gold-primary)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--navy-border)')}
            />
          </div>

          {/* Investigation Date Input & Quick Presets */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{
                fontFamily: 'var(--font-typewriter)',
                fontSize: '11px',
                color: 'var(--gold-primary)',
                letterSpacing: '1px',
              }}>
                6. INVESTIGATION DATE (SAVED IN LOGIN ACCOUNT):
              </label>
              <span style={{ fontSize: '10px', color: '#00CED1', fontFamily: 'var(--font-mono)' }}>
                [DATABASE SYNCED]
              </span>
            </div>
            <input
              type="date"
              value={investigationDate}
              onChange={(e) => setInvestigationDate(e.target.value)}
              style={{
                width: '100%',
                background: '#070C18',
                border: '1px solid var(--navy-border)',
                borderRadius: '4px',
                padding: '10px 14px',
                color: '#FFF2CD',
                fontFamily: 'var(--font-mono)',
                fontSize: '13px',
                outline: 'none',
                marginBottom: '8px',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#00CED1')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--navy-border)')}
            />
            {/* Quick date presets */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={() => setInvestigationDate('2026-09-29')}
                style={{
                  flex: 1,
                  background: investigationDate === '2026-09-29' ? 'rgba(0, 206, 209, 0.2)' : '#070C18',
                  border: investigationDate === '2026-09-29' ? '1px solid #00CED1' : '1px solid var(--navy-border)',
                  color: investigationDate === '2026-09-29' ? '#00CED1' : '#94A3B8',
                  padding: '6px 8px',
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  fontWeight: investigationDate === '2026-09-29' ? 700 : 400,
                }}
              >
                Today (29 Sep 2026)
              </button>
              <button
                type="button"
                onClick={() => setInvestigationDate('2026-09-30')}
                style={{
                  flex: 1,
                  background: investigationDate === '2026-09-30' ? 'rgba(212, 175, 55, 0.2)' : '#070C18',
                  border: investigationDate === '2026-09-30' ? '1px solid var(--gold-primary)' : '1px solid var(--navy-border)',
                  color: investigationDate === '2026-09-30' ? '#FFF2CD' : '#94A3B8',
                  padding: '6px 8px',
                  borderRadius: '3px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                  fontWeight: investigationDate === '2026-09-30' ? 700 : 400,
                }}
              >
                Tomorrow (30 Sep 2026) ★
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* If logged out: Primary button is LOGIN WITH PHONE & OTP */}
            {!isLoggedIn ? (
              <button
                type="button"
                id="btn-login-with-phone-otp"
                onClick={handlePhoneLoginClick}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #00CED1 0%, #008B8B 100%)',
                  color: '#070C18',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '14px',
                  fontWeight: 900,
                  padding: '12px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  letterSpacing: '1px',
                  boxShadow: '0 0 20px rgba(0, 206, 209, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                <Key size={16} strokeWidth={2.5} />
                <span>GENERATE OTP & LOGIN WITH PHONE</span>
              </button>
            ) : (
              <>
                {/* Save Button */}
                <button
                  type="submit"
                  id="btn-save-profile-dossier"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #E2BF65 0%, #C49E37 100%)',
                    color: '#070C18',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '14px',
                    fontWeight: 900,
                    padding: '12px',
                    borderRadius: '4px',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '1px',
                    boxShadow: '0 0 15px rgba(212, 175, 55, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <Check size={16} strokeWidth={3} />
                  <span>SAVE PROFILE DOSSIER</span>
                </button>

                {/* Secondary Button: Re-verify / Test Phone OTP */}
                <button
                  type="button"
                  id="btn-test-otp-verification"
                  onClick={handlePhoneLoginClick}
                  style={{
                    width: '100%',
                    background: 'rgba(0, 206, 209, 0.12)',
                    border: '1px solid #00CED1',
                    color: '#00CED1',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    fontWeight: 700,
                    padding: '9px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                  title="Generate fake OTP alert and verify via browser prompt"
                >
                  <Key size={14} />
                  <span>RE-AUTHENTICATE PHONE VIA OTP (ALERT & PROMPT)</span>
                </button>

                {/* Explicit Logout Option */}
                <button
                  type="button"
                  id="btn-modal-logout"
                  onClick={() => {
                    if (onLogout) onLogout();
                    onClose();
                  }}
                  style={{
                    width: '100%',
                    background: 'rgba(231, 76, 60, 0.12)',
                    border: '1px solid #E74C3C',
                    color: '#FF6B6B',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '13px',
                    fontWeight: 800,
                    padding: '10px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <LogOut size={15} />
                  <span>LOGOUT OF THIS PROFILE</span>
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
