import React, { useState } from 'react';

export default function Memberships({ memberships }) {
  const [showVisitModal, setShowVisitModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);

  const activeMembers = memberships.filter(m => m.status === 'active').length;
  const expiringThisWeek = memberships.filter(m => m.status === 'active' && m.daysLeft <= 7).length;
  const monthlyRevenue = memberships.reduce((sum, m) => sum + (m.price || 250), 0);

  const handleRegisterVisit = (member) => {
    setSelectedMember(member);
    setShowVisitModal(true);
  };

  const confirmVisit = () => {
    if (!selectedMember) return;
    console.log('Visit registered for:', selectedMember.memberName, 'on', visitDate);
    alert(`✓ Visit registered for ${selectedMember.memberName}`);
    setShowVisitModal(false);
    setSelectedMember(null);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.75rem', fontWeight: 300, marginBottom: '8px' }}>
          Memberships
        </h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
          Manage member passes and subscriptions
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
        {[
          { icon: '✓', label: 'Active Members', value: activeMembers, color: 'teal' },
          { icon: '⚠️', label: 'Expiring This Week', value: expiringThisWeek, color: 'warning' },
          { icon: '💰', label: 'Monthly Revenue', value: `$${monthlyRevenue}`, color: 'gold' },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)',
              borderRadius: '16px',
              border: '1px solid var(--border-light)',
              padding: '28px',
              boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)',
              transition: 'all 300ms cubic-bezier(0.23, 1, 0.320, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(27, 51, 48, 0.08)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(27, 51, 48, 0.04)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '8px' }}>
              {stat.label}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2rem', fontWeight: 400, color: 'var(--text-primary)' }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid var(--border-light)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.06)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--border-light)', background: '#EDE8E1' }}>
                <th style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '16px', textAlign: 'left' }}>Member</th>
                <th style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '16px', textAlign: 'left' }}>Membership Type</th>
                <th style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '16px', textAlign: 'center' }}>Progress</th>
                <th style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '16px', textAlign: 'left' }}>Expires</th>
                <th style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '16px', textAlign: 'left' }}>Status</th>
                <th style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '16px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {memberships.map((m, idx) => {
                const isExpiringSoon = m.status === 'active' && m.daysLeft <= 7;
                const rowBg = isExpiringSoon ? 'rgba(212, 130, 26, 0.03)' : idx % 2 === 0 ? 'transparent' : 'rgba(42, 127, 111, 0.01)';
                const progress = m.visitsUsed !== null ? (m.visitsUsed / m.visitsTotal) * 100 : 100;

                return (
                  <tr
                    key={m.id}
                    style={{
                      borderBottom: '1px solid var(--border-light)',
                      background: rowBg,
                      transition: 'background 150ms ease',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(42, 127, 111, 0.04)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = rowBg}
                  >
                    <td style={{ padding: '16px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      👤 {m.memberName}
                    </td>
                    <td style={{ padding: '16px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      {m.passType === 'Monthly Pass' ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, background: 'linear-gradient(135deg, #E6F2F0 0%, #D4EBE7 100%)', color: 'var(--accent)' }}>
                          {m.passType}
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, background: 'linear-gradient(135deg, #F5EBE0 0%, #F0E0D0 100%)', color: '#A3784F' }}>
                          {m.passType}
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px', fontSize: '0.875rem', textAlign: 'center' }}>
                      {m.visitsUsed !== null ? (
                        <div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
                            {m.visitsUsed}/{m.visitsTotal}
                          </div>
                          <div style={{ height: '4px', background: '#EDE8E1', borderRadius: '9999px', overflow: 'hidden', width: '100px', margin: '0 auto' }}>
                            <div
                              style={{
                                height: '100%',
                                background: progress < 75 ? 'linear-gradient(90deg, #2A7F6F 0%, #3A9A87 100%)' : progress < 99 ? 'linear-gradient(90deg, #D4821A 0%, #E6934B 100%)' : 'linear-gradient(90deg, #C0392B 0%, #E74C3C 100%)',
                                width: `${Math.min(progress, 100)}%`,
                                borderRadius: '9999px',
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)' }}>∞ Unlimited</span>
                      )}
                    </td>
                    <td style={{ padding: '16px', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      {m.expiryDate}
                      {isExpiringSoon && (
                        <span style={{ display: 'inline-flex', alignItems: 'center', marginLeft: '8px', padding: '2px 8px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 600, background: 'var(--warning-light)', color: 'var(--warning)' }}>
                          {m.daysLeft}d left
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '16px', fontSize: '0.875rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '4px 10px',
                        borderRadius: '9999px',
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        background: m.status === 'expired' ? 'var(--danger-light)' : 'linear-gradient(135deg, #E9F7EF 0%, #D9F2E8 100%)',
                        color: m.status === 'expired' ? 'var(--danger)' : 'var(--success)',
                      }}>
                        {m.status === 'expired' ? '✗ Expired' : '✓ Active'}
                      </span>
                    </td>
                    <td style={{ padding: '16px', textAlign: 'center' }}>
                      {m.status === 'active' && m.visitsUsed !== null && m.visitsUsed < m.visitsTotal ? (
                        <button
                          onClick={() => handleRegisterVisit(m)}
                          style={{
                            padding: '6px 14px',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            border: '1.5px solid var(--accent)',
                            background: 'transparent',
                            color: 'var(--accent)',
                            cursor: 'pointer',
                            transition: 'all 150ms ease',
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'var(--accent-light)';
                            e.target.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'transparent';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          + Visit
                        </button>
                      ) : m.status === 'expired' ? (
                        <button
                          style={{
                            padding: '6px 14px',
                            borderRadius: '9999py',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            border: 'none',
                            background: 'linear-gradient(135deg, #C4956A 0%, #A3784F 100%)',
                            color: 'white',
                            cursor: 'pointer',
                            transition: 'all 150ms ease',
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-1px)';
                            e.target.style.boxShadow = '0 4px 12px rgba(196, 149, 106, 0.25)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          Renew
                        </button>
                      ) : null}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Register Visit Modal */}
      {showVisitModal && selectedMember && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '450px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'slideUp 300ms cubic-bezier(0.23, 1, 0.320, 1)',
          }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', fontWeight: 400, marginBottom: '8px' }}>
              Register Visit
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
              {selectedMember.memberName}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                Visit Date
              </label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: '12px',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none',
                  cursor: 'pointer',
                  transition: 'border-color 150ms ease',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
              />
            </div>

            <div style={{ background: 'linear-gradient(135deg, #E6F2F0 0%, #D4EBE7 100%)', borderRadius: '12px', padding: '16px', marginBottom: '24px', border: '1px solid rgba(42, 127, 111, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, marginBottom: '8px', textTransform: 'uppercase' }}>
                Visits Remaining
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.75rem', fontWeight: 400, color: 'var(--accent)' }}>
                {selectedMember.visitsTotal - selectedMember.visitsUsed} of {selectedMember.visitsTotal}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowVisitModal(false)}
                style={{
                  padding: '10px 24px',
                  borderRadius: '9999px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  border: '1.5px solid var(--border-light)',
                  background: 'white',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmVisit}
                style={{
                  padding: '10px 24px',
                  borderRadius: '9999py',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  border: 'none',
                  background: 'linear-gradient(135deg, #2A7F6F 0%, #1E5C51 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(42, 127, 111, 0.25)',
                  transition: 'all 150ms ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(42, 127, 111, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(42, 127, 111, 0.25)';
                }}
              >
                Register Visit
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
