import React, { useState } from 'react';
import { Network, ShieldAlert, ArrowRight, Pin, Zap, Clock, Folder, AlertTriangle, Shield, User, Info, CheckCircle2, Calendar } from 'lucide-react';

export function ConspiracyNetworkView({ reportData, onGoToVerdict, onBackToReport }) {
  const [selectedNodeId, setSelectedNodeId] = useState('node_user');

  if (!reportData) return null;

  const { conspiracyNodes, conspiracyLinks } = reportData;
  const activeNode = conspiracyNodes.find((n) => n.id === selectedNodeId) || conspiracyNodes[0];

  const todayDisplay = reportData.todayFriendly || reportData.stampDate || '29 Sep 2026';
  const tomorrowDisplay = reportData.tomorrowFriendly || '30 Sep 2026';

  const getIconForAvatar = (avatar) => {
    switch (avatar) {
      case 'user': return User;
      case 'zap': return Zap;
      case 'clock': return Clock;
      case 'folder': return Folder;
      case 'alert-triangle': return AlertTriangle;
      default: return Shield;
    }
  };

  return (
    <div className="step-transition" style={{
      maxWidth: '1160px',
      margin: '0 auto',
      padding: '30px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top Banner */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#070C18',
        border: '1px solid var(--navy-border)',
        borderRadius: '6px',
        padding: '12px 20px',
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Network size={20} color="var(--gold-primary)" />
          <div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '16px',
              fontWeight: 800,
              color: '#F7E7B4',
              letterSpacing: '1px',
            }}>
              CONSPIRACY PIPELINE: TODAY ({todayDisplay}) → TOMORROW ({tomorrowDisplay})
            </span>
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--gold-muted)' }}>
              TIMELINE EVIDENCE: USER → EXCUSE → DISTRACTIONS → TOMORROW
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <button
            onClick={onBackToReport}
            style={{
              background: 'transparent',
              border: '1px solid var(--navy-border)',
              color: '#94A3B8',
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              padding: '6px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            ← BACK TO DOSSIER
          </button>

          <button
            id="btn-conspiracy-to-verdict"
            onClick={onGoToVerdict}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #C0392B 0%, #8B0000 100%)',
              color: '#FFF',
              border: 'none',
              fontFamily: 'var(--font-heading)',
              fontSize: '12px',
              fontWeight: 800,
              padding: '8px 18px',
              borderRadius: '4px',
              cursor: 'pointer',
              boxShadow: '0 0 15px rgba(192, 57, 43, 0.4)',
              letterSpacing: '1px',
            }}
          >
            <span>CONVENE HIGH COURT</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Main Board Container (Tactical Corkboard & Detail Split) */}
      <div className="conspiracy-main-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) 350px',
        gap: '20px',
      }}>
        {/* Tactical Pinboard */}
        <div className="conspiracy-corkboard" style={{
          background: 'radial-gradient(circle at 50% 50%, #151D2E 0%, #0A101C 100%)',
          border: '2px solid var(--navy-border)',
          borderRadius: '8px',
          height: '560px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 60px rgba(0, 0, 0, 0.8), 0 10px 30px rgba(0, 0, 0, 0.5)',
        }}>
          {/* Subtle Grid Lines & Background Watermark */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(212, 175, 55, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }}></div>

          {/* Top Pipeline Bar Header with Dates */}
          <div style={{
            position: 'absolute',
            top: '14px',
            left: '20px',
            right: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            zIndex: 10,
          }}>
            <div style={{
              fontFamily: 'var(--font-typewriter)',
              fontSize: '10px',
              color: 'var(--gold-primary)',
              letterSpacing: '1px',
              background: 'rgba(7, 12, 24, 0.9)',
              padding: '4px 10px',
              borderRadius: '3px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <Calendar size={12} color="var(--gold-primary)" />
              <span>[ TIMELINE: TODAY ({todayDisplay}) → EXCUSE → DISTRACTIONS → TOMORROW ({tomorrowDisplay}) ]</span>
            </div>

            <div style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              color: '#94A3B8',
              background: 'rgba(7, 12, 24, 0.75)',
              padding: '3px 8px',
              borderRadius: '3px',
            }}>
              CLICK ANY PIN TO INSPECT WIRE REPORT
            </div>
          </div>

          {/* SVG Red Yarn Connections */}
          <svg style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}>
            <defs>
              <filter id="glow-yarn-core" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="3" floodColor="#FF4D4F" floodOpacity="0.8" />
              </filter>
            </defs>

            {conspiracyLinks.map((link, idx) => {
              const src = conspiracyNodes.find((n) => n.id === link.source);
              const tgt = conspiracyNodes.find((n) => n.id === link.target);
              if (!src || !tgt) return null;

              const isPipeline = link.isPipeline;
              const isConnectedToActive = link.source === selectedNodeId || link.target === selectedNodeId;

              return (
                <g key={idx}>
                  <line
                    x1={`${src.x}%`}
                    y1={`${src.y}%`}
                    x2={`${tgt.x}%`}
                    y2={`${tgt.y}%`}
                    stroke={isPipeline ? '#FF4D4F' : (isConnectedToActive ? '#D4AF37' : 'rgba(192, 57, 43, 0.45)')}
                    strokeWidth={isPipeline ? (isConnectedToActive ? 4 : 3) : 1.5}
                    strokeDasharray={isPipeline ? 'none' : '4,3'}
                    filter={isPipeline ? 'url(#glow-yarn-core)' : undefined}
                  />

                  {/* Midpoint Label along Yarn */}
                  {(isPipeline || isConnectedToActive) && (
                    <text
                      x={`${(src.x + tgt.x) / 2}%`}
                      y={`${(src.y + tgt.y) / 2}%`}
                      fill={isPipeline ? '#FFF2CD' : '#D4AF37'}
                      fontSize="9"
                      fontFamily="var(--font-mono)"
                      textAnchor="middle"
                      dy="-6"
                      fontWeight={isPipeline ? 'bold' : 'normal'}
                      style={{
                        background: '#070C18',
                        padding: '2px',
                      }}
                    >
                      {link.label}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Interactive Nodes */}
          {conspiracyNodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isTarget = node.id === 'node_user';
            const isTomorrow = node.id === 'node_tomorrow';
            const Icon = getIconForAvatar(node.avatar);

            return (
              <div
                key={node.id}
                onClick={() => setSelectedNodeId(node.id)}
                style={{
                  position: 'absolute',
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer',
                  zIndex: isSelected ? 35 : 20,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* Brass / Red Push Pin */}
                <div style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: isTomorrow ? '#48BB78' : (isTarget ? '#FF4D4F' : 'var(--gold-primary)'),
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.8), 0 0 8px rgba(212, 175, 55, 0.8)',
                  marginBottom: '-6px',
                  zIndex: 2,
                  border: '2px solid #FFF',
                  transition: 'transform 0.2s ease',
                  transform: isSelected ? 'scale(1.25)' : 'scale(1)',
                }}></div>

                {/* Node Card / Note */}
                <div style={{
                  background: isSelected 
                    ? '#1E2C4A' 
                    : (isTarget ? '#241214' : (isTomorrow ? '#0F241A' : '#0F1829')),
                  border: isSelected 
                    ? '2px solid var(--gold-primary)' 
                    : (isTarget ? '2px solid #C0392B' : (isTomorrow ? '2px solid #38A169' : '1px solid var(--navy-border)')),
                  borderRadius: '6px',
                  padding: '8px 12px',
                  minWidth: '130px',
                  maxWidth: '180px',
                  textAlign: 'center',
                  boxShadow: isSelected ? '0 0 24px rgba(212, 175, 55, 0.5)' : '0 4px 14px rgba(0,0,0,0.5)',
                  transition: 'all 0.2s ease',
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '5px',
                    marginBottom: '2px',
                  }}>
                    <Icon size={12} color={isTarget ? '#FF4D4F' : (isTomorrow ? '#48BB78' : 'var(--gold-primary)')} />
                    <span style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '11px',
                      fontWeight: 800,
                      color: isTarget ? '#FF7875' : (isTomorrow ? '#9AE6B4' : (isSelected ? '#FFF2CD' : '#E2E8F0')),
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {node.label}
                    </span>
                  </div>

                  <div style={{
                    fontSize: '9px',
                    fontFamily: 'var(--font-mono)',
                    color: '#8A99AD',
                    textTransform: 'uppercase',
                  }}>
                    {node.role}
                  </div>

                  {/* Explicit Date Badges on Cards (TODAY with date, TOMORROW with date) */}
                  {isTarget && (
                    <div style={{
                      background: '#7F1D1D',
                      color: '#FEE2E2',
                      fontSize: '9px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '3px',
                      marginTop: '4px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      border: '1px solid #EF4444',
                    }}>
                      <Calendar size={9} />
                      <span>TODAY: {todayDisplay}</span>
                    </div>
                  )}

                  {isTomorrow && (
                    <div style={{
                      background: '#14532D',
                      color: '#DCFCE7',
                      fontSize: '9px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '3px',
                      marginTop: '4px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      border: '1px solid #22C55E',
                    }}>
                      <Calendar size={9} />
                      <span>TOMORROW: {tomorrowDisplay}</span>
                    </div>
                  )}

                  {!isTarget && !isTomorrow && (
                    <div style={{
                      background: 'rgba(5, 8, 17, 0.8)',
                      color: '#F7E7B4',
                      fontSize: '8px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 600,
                      padding: '1px 5px',
                      borderRadius: '3px',
                      marginTop: '3px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '3px',
                      border: '1px solid rgba(212, 175, 55, 0.25)',
                    }}>
                      <Clock size={8} color="var(--gold-primary)" />
                      <span>{node.dateBadge || `TODAY • ${todayDisplay}`}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Node Evidence Inspector Panel */}
        <div style={{
          background: 'var(--navy-elevated)',
          border: '1px solid var(--navy-border)',
          borderRadius: '8px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontFamily: 'var(--font-typewriter)',
              fontSize: '11px',
              color: 'var(--gold-primary)',
              letterSpacing: '1px',
              marginBottom: '12px',
              borderBottom: '1px solid var(--navy-border)',
              paddingBottom: '8px',
            }}>
              <Pin size={14} />
              <span>PIPELINE RECONNAISSANCE</span>
            </div>

            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '18px',
              fontWeight: 800,
              color: '#F9F5EC',
              marginBottom: '4px',
            }}>
              {activeNode.label}
            </div>

            {/* Official Date Coordinate Banner */}
            <div style={{
              background: 'rgba(16, 27, 52, 0.8)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              borderRadius: '4px',
              padding: '6px 10px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}>
              <Calendar size={13} color="var(--gold-primary)" />
              <div>
                <span style={{ fontSize: '9px', fontFamily: 'var(--font-mono)', color: '#94A3B8', marginRight: '6px' }}>
                  CALENDAR STAMP:
                </span>
                <span style={{ fontSize: '11px', fontFamily: 'var(--font-heading)', fontWeight: 800, color: '#FFF' }}>
                  {activeNode.id === 'node_user' 
                    ? `TODAY (${todayDisplay})` 
                    : (activeNode.id === 'node_tomorrow' 
                        ? `TOMORROW (${tomorrowDisplay})` 
                        : (activeNode.dateBadge || `TODAY (${todayDisplay})`))}
                </span>
              </div>
            </div>

            <div style={{
              fontFamily: 'var(--font-typewriter)',
              fontSize: '11px',
              color: 'var(--red-distressed)',
              fontWeight: 700,
              marginBottom: '16px',
            }}>
              STAGE: {activeNode.pipelineStep || activeNode.role}
            </div>

            <div style={{
              background: 'rgba(5, 8, 17, 0.7)',
              border: '1px solid var(--navy-border)',
              borderRadius: '4px',
              padding: '14px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: '#CBD5E1',
              lineHeight: 1.5,
              marginBottom: '20px',
            }}>
              <div style={{ color: 'var(--gold-muted)', fontSize: '10px', marginBottom: '6px' }}>
                // FORENSIC PIPELINE INTERCEPT:
              </div>
              "{activeNode.note}"
            </div>

            <div style={{
              fontSize: '11px',
              fontFamily: 'var(--font-ui)',
              color: '#8A99AD',
              lineHeight: 1.6,
            }}>
              <div>✦ <strong>Core Heist Path:</strong> USER → EXCUSE → DISTRACTIONS → TOMORROW</div>
              <div>✦ <strong>Suspect Threat Index:</strong> LEVEL-4 TEMPORAL DRAIN</div>
              <div>✦ <strong>Wiretap Status:</strong> ACTIVELY LOGGED UNDER STATUTE-DLOT</div>
            </div>
          </div>

          <div style={{
            borderTop: '1px solid var(--navy-border)',
            paddingTop: '16px',
            marginTop: '20px',
          }}>
            <button
              onClick={onGoToVerdict}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'var(--gold-primary)',
                color: '#070C18',
                border: 'none',
                fontFamily: 'var(--font-heading)',
                fontSize: '13px',
                fontWeight: 800,
                padding: '12px',
                borderRadius: '4px',
                cursor: 'pointer',
                letterSpacing: '1px',
              }}
            >
              <span>PROCEED TO VERDICT</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
