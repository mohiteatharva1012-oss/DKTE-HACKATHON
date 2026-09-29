import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { SplashIntro } from './components/SplashIntro';
import { ProfileModal } from './components/ProfileModal';
import { JudgeModal } from './components/JudgeModal';
import { LandingView } from './components/LandingView';
import { InterviewView } from './components/InterviewView';
import { LoadingInvestigationView } from './components/LoadingInvestigationView';
import { DateInquestModal } from './components/DateInquestModal';
import { ReportView } from './components/ReportView';
import { ConspiracyNetworkView } from './components/ConspiracyNetworkView';
import { VerdictView } from './components/VerdictView';
import { CaseFileCardView } from './components/CaseFileCardView';
import { CodeChefProfilePage } from './components/CodeChefProfilePage';
import { CustomCursor } from './components/CustomCursor';
import { evaluateInvestigation, JUDGE_DEMO_DATA, JUDGE_PRESETS } from './data/caseData';

export function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentStep, setCurrentStep] = useState('landing');
  const [answers, setAnswers] = useState({});
  const [reportData, setReportData] = useState(null);
  const [isJudgeModalOpen, setIsJudgeModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDateInquestOpen, setIsDateInquestOpen] = useState(false);
  const [isAutoTouring, setIsAutoTouring] = useState(false);
  const [autoTourPhase, setAutoTourPhase] = useState('');
  const autoTourTimers = useRef([]);

  // Load user profile from localStorage with fallback to Mohit
  const [userProfile, setUserProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('pcb_user_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          name: parsed.name || 'Mohit',
          alias: parsed.alias || 'The Chronos Fugitive',
          occupation: parsed.occupation || 'Software Engineer',
          investigationDate: parsed.investigationDate || '2026-09-29',
          avatarIndex: parsed.avatarIndex || 0,
          phone: parsed.phone || '9876543210',
          isLoggedIn: parsed.isLoggedIn !== false,
        };
      }
    } catch (e) {
      // ignore
    }
    return {
      name: 'Mohit',
      alias: 'The Chronos Fugitive',
      occupation: 'Software Engineer',
      investigationDate: '2026-09-29',
      avatarIndex: 0,
      phone: '9876543210',
      isLoggedIn: true,
    };
  });

  const handleSaveProfile = (newProfile) => {
    setUserProfile(newProfile);
    try {
      localStorage.setItem('pcb_user_profile', JSON.stringify(newProfile));
    } catch (e) {
      // ignore
    }
    // Update existing report if open
    if (reportData) {
      const refreshed = evaluateInvestigation(answers, false, newProfile);
      setReportData(refreshed);
    }
  };

  const handleLoginWithPhone = (phoneInput, nameInput) => {
    const cleanPhone = (phoneInput || '').trim();
    if (!cleanPhone || cleanPhone.length < 4) {
      window.alert("⚠️ [PCB SECURITY ERROR]\nPlease provide a valid citizen phone number (at least 4 digits).");
      return false;
    }

    // 1. Generate fake 4-digit OTP
    const fakeOtp = Math.floor(1000 + Math.random() * 9000);

    // 2. Alert the user with the fake OTP
    window.alert(
      `🚨 [PRODUCTIVITY CRIME BRANCH // SECURE OTP DISPATCH]\n\n` +
      `📱 Encrypted Wire to: +91 ${cleanPhone}\n` +
      `🔑 ONE-TIME PASSCODE (OTP): ${fakeOtp}\n\n` +
      `⚠️ NOTICE: This code expires in 60 seconds. Do not disclose to social media algorithms or temporal fugitives.`
    );

    // 3. Prompt the user to enter the OTP
    const entered = window.prompt(
      `[PCB TWO-FACTOR AUTHENTICATION]\n\nEnter the 4-digit OTP sent to +91 ${cleanPhone}:`,
      `${fakeOtp}`
    );

    if (entered === null) {
      window.alert("❌ [PCB INQUEST NOTICE]\nAuthentication cancelled by user.");
      return false;
    }

    if (entered.trim() === String(fakeOtp)) {
      const activeName = (nameInput || userProfile?.name || 'Mohit').trim();
      window.alert(
        `✅ [ACCESS GRANTED // CITIZEN AUTHENTICATED]\n\n` +
        `Welcome back, Citizen ${activeName}!\n` +
        `Temporal Dossier #DLOT-0927 unlocked with 5★ Clearance.`
      );
      const updated = {
        ...userProfile,
        name: activeName,
        phone: cleanPhone,
        isLoggedIn: true,
        lastLogin: new Date().toISOString(),
      };
      handleSaveProfile(updated);
      return true;
    } else {
      window.alert(
        `❌ [ACCESS DENIED // VERIFICATION FAILED]\n\n` +
        `Invalid OTP entered: "${entered}". Expected code was: ${fakeOtp}.\n` +
        `Terminal access blocked under Statute DLOT-0927.`
      );
      return false;
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm(
      "🚨 [PRODUCTIVITY CRIME BRANCH]\n\nAre you sure you wish to log out of your Citizen Dossier & Terminal?"
    );
    if (!confirmLogout) return;

    const updated = {
      ...userProfile,
      isLoggedIn: false,
    };
    handleSaveProfile(updated);
    window.alert("🔒 [PCB TERMINAL LOCKED]\nYou have been logged out of the Productivity Crime Branch.");
  };

  const clearAutoTourTimers = () => {
    autoTourTimers.current.forEach(clearTimeout);
    autoTourTimers.current = [];
  };

  useEffect(() => {
    return () => clearAutoTourTimers();
  }, []);

  const ensureReportData = (customAnswers = answers, isJudge = false, customProfile = userProfile) => {
    const finalAnswers = {
      morning_activity: customAnswers.morning_activity || 'instagram',
      deferral_frequency: customAnswers.deferral_frequency || 'later',
      fake_productivity: customAnswers.fake_productivity || 'research',
      temporal_distraction: customAnswers.temporal_distraction || 'youtube',
      sworn_excuse: customAnswers.sworn_excuse || 'chair',
      wasted_hours: customAnswers.wasted_hours !== undefined ? customAnswers.wasted_hours : 4,
      wasted_minutes: customAnswers.wasted_minutes !== undefined ? customAnswers.wasted_minutes : 30,
    };
    const evalData = evaluateInvestigation(finalAnswers, isJudge, customProfile);
    setReportData(evalData);
    return evalData;
  };

  const handleStartInvestigation = () => {
    clearAutoTourTimers();
    setIsAutoTouring(false);
    setCurrentStep('interview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAnswer = (questionId, optionId) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleCompleteInterview = () => {
    setCurrentStep('loading');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // After Investigation Loading: ask user for their date to register with database
  const handleCompleteLoading = () => {
    if (isAutoTouring) {
      // In auto-judge mode, auto-advance
      ensureReportData(answers, true);
      setCurrentStep('report');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Prompt user for their investigation date
      setIsDateInquestOpen(true);
    }
  };

  const handleConfirmInvestigationDate = (selectedDate) => {
    setIsDateInquestOpen(false);
    const updatedProfile = {
      ...userProfile,
      investigationDate: selectedDate,
    };
    handleSaveProfile(updatedProfile);
    ensureReportData(answers, false, updatedProfile);
    setCurrentStep('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProfilePortal = () => {
    clearAutoTourTimers();
    setIsAutoTouring(false);
    setCurrentStep('profile_portal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToConspiracy = () => {
    setCurrentStep('conspiracy');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToReport = () => {
    setCurrentStep('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToVerdict = () => {
    setCurrentStep('verdict');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToCaseFile = () => {
    setCurrentStep('casefile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    clearAutoTourTimers();
    setIsAutoTouring(false);
    setAutoTourPhase('');
    setAnswers({});
    setReportData(null);
    setCurrentStep('landing');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Preset Selection
  const handleApplyPreset = (preset) => {
    clearAutoTourTimers();
    setIsAutoTouring(false);
    setAnswers(preset.answers);
    const evalData = evaluateInvestigation(preset.answers, preset.isJudgeDemo, userProfile);
    setReportData(evalData);
    setCurrentStep('report');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct Jump
  const handleJumpToStep = (stepKey) => {
    clearAutoTourTimers();
    setIsAutoTouring(false);
    if (['report', 'conspiracy', 'verdict', 'casefile'].includes(stepKey) && !reportData) {
      ensureReportData(answers, true);
    }
    setCurrentStep(stepKey);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Functional JUDGE MODE:
  // Automatically: answers all questions → investigates → generates report → shows conspiracy → reveals verdict.
  // Subject: JUDGE | Case: #DLOT-0927 | Time lost: 6h 42m | Verdict: GUILTY OF PRODUCTIVE PROCRASTINATION | Sentence: Explain your project to a plant for 10 minutes.
  const handleRunJudgeDemo = () => {
    clearAutoTourTimers();
    setIsAutoTouring(true);

    const demoAnswers = JUDGE_DEMO_DATA.answers;
    setAnswers(demoAnswers);
    const evalData = evaluateInvestigation(demoAnswers, true, userProfile);
    setReportData(evalData);

    // Phase 1: Interview questions auto-answered
    setAutoTourPhase('AUTOMATICALLY ANSWERING SWORN QUESTIONS...');
    setCurrentStep('interview');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Phase 2: Transmit to Crime Lab
    const t1 = setTimeout(() => {
      setAutoTourPhase('INVESTIGATING FORENSIC ARTIFACTS IN CRIME LAB...');
      setCurrentStep('loading');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 2400);

    // Phase 3: Investigation Report (Classified Dossier)
    const t2 = setTimeout(() => {
      setAutoTourPhase('GENERATING CLASSIFIED DOSSIER (#DLOT-0927)...');
      setCurrentStep('report');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 5400);

    // Phase 4: Conspiracy Graph
    const t3 = setTimeout(() => {
      setAutoTourPhase('MAPPING PIPELINE: USER → EXCUSE → DISTRACTIONS → TOMORROW...');
      setCurrentStep('conspiracy');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 8800);

    // Phase 5: Reveal Final Verdict
    const t4 = setTimeout(() => {
      setAutoTourPhase('REVEALING HIGH COURT VERDICT (GUILTY)...');
      setCurrentStep('verdict');
      setIsAutoTouring(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 12400);

    autoTourTimers.current = [t1, t2, t3, t4];
  };

  const handleSkipJudgeTour = () => {
    clearAutoTourTimers();
    setIsAutoTouring(false);
    ensureReportData(JUDGE_DEMO_DATA.answers, true);
    setCurrentStep('verdict');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Forensic Detective Magnifying Glass Cursor with Smoke Particle Trail */}
      <CustomCursor />

      {/* 3-Second Blinkit-Style Splash Animation on opening */}
      {showSplash && (
        <SplashIntro onFinish={() => setShowSplash(false)} />
      )}

      {/* Bureau Top Navigation */}
      <Header
        currentStep={currentStep}
        userProfile={userProfile}
        onOpenProfile={handleOpenProfilePortal}
        onLogout={handleLogout}
        onOpenJudgeMode={() => setIsJudgeModalOpen(true)}
        onGoHome={handleRestart}
        onRunJudgeDemo={handleRunJudgeDemo}
        isAutoTouring={isAutoTouring}
      />

      {/* Auto-Tour Running Banner with Skip Button */}
      {isAutoTouring && (
        <div style={{
          background: 'linear-gradient(90deg, #8B2500 0%, #D4AF37 50%, #8B2500 100%)',
          color: '#070C18',
          padding: '8px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '12px',
          letterSpacing: '1px',
          boxShadow: '0 4px 20px rgba(212, 175, 55, 0.5)',
          position: 'sticky',
          top: '64px',
          zIndex: 90,
          flexWrap: 'wrap',
          gap: '8px',
        }}>
          <div>
            ⚖️ JUDGE MODE ACTIVE: {autoTourPhase}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleSkipJudgeTour}
              style={{
                background: '#070C18',
                color: '#FFF2CD',
                border: '1px solid #D4AF37',
                padding: '3px 12px',
                borderRadius: '3px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              FAST-FORWARD TO VERDICT ⏭
            </button>
            <button
              onClick={handleRestart}
              style={{
                background: 'rgba(0,0,0,0.5)',
                color: '#FFF',
                border: 'none',
                padding: '3px 10px',
                borderRadius: '3px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                cursor: 'pointer',
              }}
            >
              STOP
            </button>
          </div>
        </div>
      )}

      {/* Main Flow Stage Router */}
      <main style={{ flex: 1 }}>
        {currentStep === 'landing' && (
          <LandingView
            userProfile={userProfile}
            onStartInvestigation={handleStartInvestigation}
            onOpenJudgeMode={() => setIsJudgeModalOpen(true)}
            onApplyPreset={handleApplyPreset}
            onRunJudgeDemo={handleRunJudgeDemo}
            onOpenProfilePortal={handleOpenProfilePortal}
          />
        )}

        {/* Separate PCB Citizen Profile Page */}
        {currentStep === 'profile_portal' && (
          <CodeChefProfilePage
            userProfile={userProfile}
            onSaveProfile={handleSaveProfile}
            onLoginWithPhone={handleLoginWithPhone}
            onLogout={handleLogout}
            onBack={() => {
              if (reportData) {
                setCurrentStep('report');
              } else {
                setCurrentStep('landing');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartInvestigation={handleStartInvestigation}
            reportData={reportData}
          />
        )}

        {currentStep === 'interview' && (
          <InterviewView
            answers={answers}
            onSelectAnswer={handleSelectAnswer}
            onCompleteInterview={handleCompleteInterview}
            onCancel={handleRestart}
          />
        )}

        {currentStep === 'loading' && (
          <LoadingInvestigationView
            onCompleteLoading={handleCompleteLoading}
          />
        )}

        {currentStep === 'report' && (
          <ReportView
            reportData={reportData || ensureReportData()}
            onGoToConspiracy={handleGoToConspiracy}
            onGoToVerdict={handleGoToVerdict}
          />
        )}

        {currentStep === 'conspiracy' && (
          <ConspiracyNetworkView
            reportData={reportData || ensureReportData()}
            onGoToVerdict={handleGoToVerdict}
            onBackToReport={handleBackToReport}
          />
        )}

        {currentStep === 'verdict' && (
          <VerdictView
            reportData={reportData || ensureReportData()}
            onGoToCaseFile={handleGoToCaseFile}
            onRestart={handleRestart}
          />
        )}

        {currentStep === 'casefile' && (
          <CaseFileCardView
            reportData={reportData || ensureReportData()}
            onRestart={handleRestart}
            onOpenJudgeMode={() => setIsJudgeModalOpen(true)}
          />
        )}
      </main>

      {/* Bureau Official Footer */}
      <footer className="no-print" style={{
        borderTop: '1px solid var(--navy-border)',
        background: '#04070F',
        padding: '24px 20px',
        color: '#64748B',
        fontFamily: 'var(--font-mono)',
        fontSize: '11px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ color: 'var(--gold-muted)', fontFamily: 'var(--font-heading)', fontSize: '13px', fontWeight: 700 }}>
            PRODUCTIVITY CRIME BRANCH // GOVERNMENT OF LOST TIME
          </div>
          <div>
            Authorized under the Federal Temporal Integrity Convention. All rights reserved by the Republic of Chronos.
          </div>
          <div style={{ fontSize: '10px', color: '#475569' }}>
            CLASSIFIED DOCUMENTATION — DOCKET #DLOT-0927 REGISTERED WITH HIGH COURT.
          </div>
        </div>
      </footer>

      {/* Post-Investigation Date Inquest Modal */}
      <DateInquestModal
        isOpen={isDateInquestOpen}
        userProfile={userProfile}
        defaultDate={userProfile?.investigationDate || '2026-09-29'}
        onConfirmDate={handleConfirmInvestigationDate}
      />

      {/* User Login Profile Quick Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentProfile={userProfile}
        onSaveProfile={handleSaveProfile}
        onLoginWithPhone={handleLoginWithPhone}
        onLogout={handleLogout}
      />

      {/* Chief Magistrate Judge Mode Modal */}
      <JudgeModal
        isOpen={isJudgeModalOpen}
        onClose={() => setIsJudgeModalOpen(false)}
        onApplyPreset={handleApplyPreset}
        onJumpToStep={handleJumpToStep}
        onRunJudgeDemo={handleRunJudgeDemo}
        isAutoTouring={isAutoTouring}
      />
    </div>
  );
}

export default App;
