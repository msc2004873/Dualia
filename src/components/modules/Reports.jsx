import React, { useState } from 'react';
import { appointments, patients, memberships } from '../../data';

export default function Reports() {
  const [period, setPeriod] = useState('month');

  // Calculate metrics
  const metrics = {
    totalRevenue: appointments.reduce((sum, a) => sum + (a.servicePrice || 150), 0),
    totalAppointments: appointments.length,
    avgSessionValue: Math.round(appointments.reduce((sum, a) => sum + (a.servicePrice || 150), 0) / Math.max(appointments.length, 1)),
    activeMembers: memberships.filter(m => m.status === 'active').length,
    occupancyRate: Math.round((appointments.length / 35) * 100),
    patientSatisfaction: '96%',
    retentionRate: '94%',
    visitGrowth: '+15%',
  };

  // Top services
  const topServices = appointments.reduce((acc, apt) => {
    const existing = acc.find(s => s.name === apt.service);
    if (existing) {
      existing.count++;
      existing.revenue += apt.servicePrice || 150;
    } else {
      acc.push({ name: apt.service, count: 1, revenue: apt.servicePrice || 150 });
    }
    return acc;
  }, []).sort((a, b) => b.revenue - a.revenue).slice(0, 8);

  // Service categories
  const categories = {
    'IV Therapy': appointments.filter(a => a.service.includes('IV')).length,
    'Add-ons': appointments.filter(a => ['B12 Shot', 'Glutathione Shot', 'Hydrogen', 'Lymphatic'].some(s => a.service.includes(s))).length,
    'Other': appointments.filter(a => !a.service.includes('IV') && !['B12 Shot', 'Glutathione Shot', 'Hydrogen', 'Lymphatic'].some(s => a.service.includes(s))).length,
  };

  // Nurse performance
  const nursePerformance = appointments.reduce((acc, apt) => {
    const existing = acc.find(n => n.name === apt.nurse);
    if (existing) {
      existing.appointments++;
      existing.revenue += apt.servicePrice || 150;
    } else {
      acc.push({ name: apt.nurse, appointments: 1, revenue: apt.servicePrice || 150 });
    }
    return acc;
  }, []).sort((a, b) => b.revenue - a.revenue);

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.75rem', fontWeight: 300, marginBottom: '8px' }}>
            Reports & Analytics
          </h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
            Comprehensive business intelligence dashboard
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['today', 'week', 'month'].map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              style={{
                padding: '10px 20px',
                borderRadius: '9999px',
                border: '1.5px solid',
                borderColor: period === p ? 'var(--accent)' : 'var(--border-light)',
                background: period === p ? 'var(--accent-light)' : 'white',
                color: period === p ? 'var(--accent)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.8125rem',
                fontWeight: 600,
                transition: 'all 150ms ease',
                textTransform: 'capitalize',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
        {[
          { label: 'Total Revenue', value: `$${metrics.totalRevenue}`, detail: metrics.visitGrowth },
          { label: 'Appointments', value: metrics.totalAppointments, detail: `Avg $${metrics.avgSessionValue}/session` },
          { label: 'Active Members', value: metrics.activeMembers, detail: metrics.retentionRate + ' retention' },
          { label: 'Occupancy Rate', value: metrics.occupancyRate + '%', detail: 'capacity utilization' },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)',
              borderRadius: '16px',
              border: '1px solid var(--border-light)',
              padding: '24px',
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
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '8px' }}>
              {stat.label}
            </div>
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {stat.value}
            </div>
            <div style={{ fontSize: '0.8125rem', color: 'var(--success)', fontWeight: 500 }}>
              ↑ {stat.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '40px' }}>
        {/* Top Services */}
        <div style={{ background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '28px', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem', fontWeight: 400, marginBottom: '24px', color: 'var(--text-primary)' }}>
            Top Services by Revenue
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {topServices.map((service, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {i + 1}. {service.name}
                  </span>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)', marginRight: '12px' }}>
                      ${service.revenue}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {service.count} visits
                    </span>
                  </div>
                </div>
                <div style={{ height: '6px', background: '#EDE8E1', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      background: `linear-gradient(90deg, #2A7F6F 0%, #3A9A87 100%)`,
                      width: `${(service.revenue / (topServices[0]?.revenue || 1)) * 100}%`,
                      borderRadius: '9999px',
                      transition: 'width 300ms ease',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Categories */}
        <div style={{ background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '28px', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem', fontWeight: 400, marginBottom: '20px', color: 'var(--text-primary)' }}>
            Service Mix
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {Object.entries(categories).map(([cat, count], i) => {
              const total = Object.values(categories).reduce((a, b) => a + b);
              const pct = Math.round((count / total) * 100);
              return (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{cat}</span>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--accent)' }}>{pct}%</span>
                  </div>
                  <div style={{ height: '8px', background: '#EDE8E1', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: i === 0 ? 'linear-gradient(90deg, #2A7F6F 0%, #3A9A87 100%)' : i === 1 ? 'linear-gradient(90deg, #C4956A 0%, #D4A373 100%)' : 'linear-gradient(90deg, #1B3330 0%, #2A5250 100%)', width: `${pct}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Nurse Performance */}
      <div style={{ background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '28px', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)', marginBottom: '40px' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem', fontWeight: 400, marginBottom: '24px', color: 'var(--text-primary)' }}>
          Nurse Performance
        </h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--border-light)' }}>
                <th style={{ textAlign: 'left', padding: '14px 0', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Nurse</th>
                <th style={{ textAlign: 'right', padding: '14px 0', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Appointments</th>
                <th style={{ textAlign: 'right', padding: '14px 0', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Revenue</th>
                <th style={{ textAlign: 'right', padding: '14px 0', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', fontSize: '0.75rem' }}>Avg Value</th>
              </tr>
            </thead>
            <tbody>
              {nursePerformance.map((nurse, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(42, 127, 111, 0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 0', color: 'var(--text-primary)', fontWeight: 500 }}>{nurse.name}</td>
                  <td style={{ padding: '14px 0', textAlign: 'right', color: 'var(--text-secondary)' }}>{nurse.appointments}</td>
                  <td style={{ padding: '14px 0', textAlign: 'right', color: 'var(--accent)', fontWeight: 600 }}>${nurse.revenue}</td>
                  <td style={{ padding: '14px 0', textAlign: 'right', color: 'var(--text-secondary)' }}>${Math.round(nurse.revenue / nurse.appointments)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Patient Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
        {[
          { label: 'Patient Satisfaction', value: metrics.patientSatisfaction },
          { label: 'Retention Rate', value: metrics.retentionRate },
          { label: 'Total Patients', value: patients.length },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)',
              borderRadius: '16px',
              border: '1px solid var(--border-light)',
              padding: '24px',
              textAlign: 'center',
              boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)',
            }}
          >
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {item.value}
            </div>
            <div style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-muted)' }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
