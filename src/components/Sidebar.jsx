import React from 'react';

const NavIcon = ({ type }) => {
  const icons = {
    schedule: (
      <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" fill="none" style={{ width: '16px', height: '16px' }}>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    patients: (
      <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" fill="none" style={{ width: '16px', height: '16px' }}>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    ),
    intake: (
      <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" fill="none" style={{ width: '16px', height: '16px' }}>
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8Z" />
      </svg>
    ),
    protocol: (
      <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" fill="none" style={{ width: '16px', height: '16px' }}>
        <path d="M9 3v3M15 3v3M3 9h18" />
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="14" r="2" />
        <circle cx="15" cy="14" r="2" />
      </svg>
    ),
    memberships: (
      <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" fill="none" style={{ width: '16px', height: '16px' }}>
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <path d="M2 9h20" />
      </svg>
    ),
    inventory: (
      <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" fill="none" style={{ width: '16px', height: '16px' }}>
        <path d="M6 9L12 6l6 3M6 9v8l6 3v-8M18 9v8l-6 3v-8" />
      </svg>
    ),
    billing: (
      <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" fill="none" style={{ width: '16px', height: '16px' }}>
        <path d="M3 5h18v14H3z" />
        <path d="M3 9h18M7 13h1M7 16h1M11 13h1M11 16h1M15 13h1M15 16h1" />
      </svg>
    ),
    reports: (
      <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" fill="none" style={{ width: '16px', height: '16px' }}>
        <path d="M3 20h18M3 12l4-6 4 2 4-8 4 6V20" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };
  return icons[type];
};

export default function Sidebar({ activeModule, setActiveModule, inventoryAlerts, membershipExpiring }) {
  const navSections = [
    {
      title: 'Core',
      items: [
        { id: 'schedule', label: 'Schedule', icon: 'schedule' },
        { id: 'patients', label: 'Patients', icon: 'patients' },
      ]
    },
    {
      title: 'AI & Clinical',
      items: [
        { id: 'intake', label: 'Intake & AI', icon: 'intake', badge: 'AI', badgeColor: 'gold' },
        { id: 'protocol', label: 'Protocol Builder', icon: 'protocol', badge: 'AI', badgeColor: 'gold' },
      ]
    },
    {
      title: 'Operations',
      items: [
        { id: 'memberships', label: 'Memberships', icon: 'memberships', badge: membershipExpiring > 0 ? membershipExpiring.toString() : null, badgeColor: 'warning' },
        { id: 'inventory', label: 'Inventory', icon: 'inventory', badge: inventoryAlerts > 0 ? inventoryAlerts.toString() : null, badgeColor: 'danger' },
        { id: 'billing', label: 'Billing', icon: 'billing' },
      ]
    },
    {
      title: 'Insights',
      items: [
        { id: 'reports', label: 'Reports', icon: 'reports' },
      ]
    },
  ];

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div style={{
      position: 'fixed',
      left: 0,
      top: 0,
      height: '100vh',
      width: '248px',
      background: 'linear-gradient(180deg, #FFFFFF 0%, #FDFAF7 100%)',
      borderRight: `1px solid var(--border-light)`,
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
      boxShadow: '2px 0 12px rgba(27, 51, 48, 0.08)',
    }}>
      {/* Logo */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <img src="/dualia.webp" alt="Dualia" style={{ width: '28px', height: '28px', borderRadius: '4px' }} />
          <span style={{ fontSize: '1.1rem', fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, color: 'var(--accent)', lineHeight: 1.2 }}>Dualia Healing Center</span>
        </div>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Dominical, Costa Rica</p>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
        {navSections.map((section) => (
          <div key={section.title}>
            <div style={{ padding: '12px 20px 8px', fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {section.title}
            </div>
            {section.items.map((item) => {
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  style={{
                    width: '100%',
                    padding: '10px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.8125rem',
                    fontWeight: 500,
                    border: 'none',
                    background: isActive ? 'var(--accent-light)' : 'transparent',
                    color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                    borderLeft: `3px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                    cursor: 'pointer',
                    transition: 'all 150ms ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(42, 127, 111, 0.03)';
                      e.currentTarget.style.color = 'var(--accent)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }
                  }}
                >
                  <NavIcon type={item.icon} />
                  <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      fontSize: '0.6rem',
                      padding: '2px 6px',
                      borderRadius: '9999px',
                      fontWeight: 600,
                      background: item.badgeColor === 'gold'
                        ? 'var(--brand-gold-light)'
                        : item.badgeColor === 'warning'
                        ? 'var(--warning-light)'
                        : 'var(--danger-light)',
                      color: item.badgeColor === 'gold'
                        ? '#A3784F'
                        : item.badgeColor === 'warning'
                        ? 'var(--warning)'
                        : 'var(--danger)',
                    }}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ borderTop: '1px solid var(--border-light)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{dateStr}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #2A7F6F 0%, #1E5C51 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.7rem', fontWeight: 'bold', boxShadow: '0 2px 6px rgba(42, 127, 111, 0.2)' }}>
            VS
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Sara Chavez</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Clinical Lead</p>
          </div>
        </div>
      </div>
    </div>
  );
}
