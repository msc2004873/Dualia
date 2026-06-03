import React, { useState } from 'react';

export default function Schedule({ appointments, setActiveModule, setSelectedPatient }) {
  const [selectedResource, setSelectedResource] = useState('all');
  const [selectedWeek, setSelectedWeek] = useState(0);

  const resources = [
    { id: 'room-ceiba', name: 'Ceiba Suite', type: 'room' },
    { id: 'room-guanacaste', name: 'Guanacaste Room', type: 'room' },
    { id: 'room-sarapiqui', name: 'Sarapiquí Room', type: 'room' },
    { id: 'nurse-sara', name: 'Sara Chavez', type: 'nurse' },
    { id: 'nurse-daniela', name: 'Daniela Chaves', type: 'nurse' },
    { id: 'doctor-alan', name: 'Dr. Alan Inman', type: 'doctor' },
  ];

  const getWeekDates = (weekOffset) => {
    const june2 = new Date(2026, 5, 2);
    const monday = new Date(june2.getTime() + (weekOffset * 7 * 24 * 60 * 60 * 1000));
    const dates = [];
    for (let i = 0; i < 5; i++) {
      dates.push(new Date(monday.getTime() + i * 24 * 60 * 60 * 1000));
    }
    return dates;
  };

  const weekDates = getWeekDates(selectedWeek);
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const getApptsByResourceAndDay = (resourceId, date) => {
    const dateStr = date.toISOString().split('T')[0];
    return appointments.filter(apt => {
      const aptDate = apt.date || '2026-06-02';
      if (aptDate !== dateStr) return false;
      if (resourceId === 'all') return true;
      if (resourceId.startsWith('room')) return apt.room === resources.find(r => r.id === resourceId)?.name;
      if (resourceId.startsWith('nurse') || resourceId.startsWith('doctor')) return apt.nurse === resources.find(r => r.id === resourceId)?.name;
      return false;
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'completed': { bg: '#E6F2F0', border: '#2A7F6F', text: '#2A7F6F' },
      'in-progress': { bg: '#F5EBE0', border: '#C4956A', text: '#C4956A' },
      'confirmed': { bg: '#FFFFFF', border: '#1B3330', text: '#1B3330' },
      'pending': { bg: '#EFF3F2', border: '#8A9E9B', text: '#8A9E9B' },
    };
    return colors[status] || colors['confirmed'];
  };

  const filteredResources = selectedResource === 'all'
    ? resources
    : resources.filter(r => r.id === selectedResource);

  const stats = {
    total: appointments.length,
    inProgress: appointments.filter(a => a.status === 'in-progress').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    revenue: appointments.reduce((sum, a) => sum + (a.servicePrice || 150), 0),
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.75rem', fontWeight: 300, marginBottom: '8px' }}>
          Schedule
        </h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
          {weekDates[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} – {weekDates[4].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', alignItems: 'center' }}>
        <button
          onClick={() => setSelectedWeek(Math.max(0, selectedWeek - 1))}
          disabled={selectedWeek === 0}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1.5px solid var(--border-light)',
            background: selectedWeek === 0 ? '#f0f0f0' : 'white',
            cursor: selectedWeek === 0 ? 'not-allowed' : 'pointer',
            fontSize: '0.8125rem',
            fontWeight: 500,
            transition: 'all 150ms ease',
          }}
        >
          Previous Week
        </button>
        <button
          onClick={() => setSelectedWeek(selectedWeek + 1)}
          style={{
            padding: '8px 14px',
            borderRadius: '8px',
            border: '1.5px solid var(--border-light)',
            background: 'white',
            cursor: 'pointer',
            fontSize: '0.8125rem',
            fontWeight: 500,
            transition: 'all 150ms ease',
          }}
        >
          Next Week
        </button>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
          Filter by Resource
        </label>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {[{ id: 'all', name: 'All Resources', type: 'all' }, ...resources].map(res => (
            <button
              key={res.id}
              onClick={() => setSelectedResource(res.id)}
              style={{
                padding: '8px 16px',
                borderRadius: '9999px',
                border: '1.5px solid',
                borderColor: selectedResource === res.id ? 'var(--accent)' : 'var(--border-light)',
                background: selectedResource === res.id ? 'var(--accent-light)' : 'white',
                color: selectedResource === res.id ? 'var(--accent)' : 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '0.8125rem',
                fontWeight: 500,
                transition: 'all 150ms ease',
              }}
            >
              {res.name}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid var(--border-light)', overflow: 'hidden', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.06)', marginBottom: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '180px repeat(5, 1fr)', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ padding: '16px', background: '#EDE8E1', fontWeight: 600, fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Resource
          </div>
          {dayNames.map((day, i) => (
            <div key={i} style={{ padding: '16px', textAlign: 'center', borderRight: i < 4 ? '1px solid var(--border-light)' : 'none' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', fontSize: '0.875rem' }}>
                {day}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {weekDates[i].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          ))}
        </div>

        {filteredResources.map((resource, rIdx) => (
          <div key={resource.id} style={{ display: 'grid', gridTemplateColumns: '180px repeat(5, 1fr)', borderBottom: rIdx < filteredResources.length - 1 ? '1px solid var(--border-light)' : 'none', minHeight: '120px' }}>
            <div style={{ padding: '16px', background: resource.type === 'nurse' || resource.type === 'doctor' ? '#F5EBE0' : '#E6F2F0', borderRight: '1px solid var(--border-light)', display: 'flex', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '2px' }}>
                  {resource.name}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </div>
              </div>
            </div>

            {weekDates.map((date, dIdx) => {
              const dayAppts = getApptsByResourceAndDay(resource.id, date);
              return (
                <div
                  key={dIdx}
                  style={{
                    padding: '12px',
                    borderRight: dIdx < 4 ? '1px solid var(--border-light)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    background: dayAppts.length > 0 ? 'rgba(42, 127, 111, 0.02)' : 'transparent',
                  }}
                >
                  {dayAppts.map((apt, aIdx) => {
                    const colors = getStatusColor(apt.status);
                    return (
                      <div
                        key={aIdx}
                        onClick={() => {
                          setSelectedPatient(apt.patientId);
                          setActiveModule('patients');
                        }}
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          background: colors.bg,
                          borderLeft: `3px solid ${colors.border}`,
                          fontSize: '0.75rem',
                          cursor: 'pointer',
                          transition: 'all 150ms cubic-bezier(0.23, 1, 0.320, 1)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(27, 51, 48, 0.1)';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                      >
                        <div style={{ fontWeight: 500, color: colors.text, marginBottom: '2px' }}>
                          {apt.time}
                        </div>
                        <div style={{ color: colors.text, marginBottom: '4px' }}>
                          {apt.patientName}
                        </div>
                        <div style={{ color: colors.text, opacity: 0.7, marginBottom: '4px', fontSize: '0.7rem' }}>
                          {apt.service}
                        </div>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '0.6rem',
                          padding: '2px 6px',
                          borderRadius: '9999px',
                          background: colors.border,
                          color: 'white',
                          fontWeight: 500,
                          textTransform: 'capitalize',
                        }}>
                          {apt.status.replace('-', ' ')}
                        </span>
                      </div>
                    );
                  })}
                  {dayAppts.length === 0 && (
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', opacity: 0.5 }}>—</div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Total Appointments', value: stats.total },
          { label: 'In Progress', value: stats.inProgress },
          { label: 'Confirmed', value: stats.confirmed },
          { label: 'Week Revenue', value: `$${stats.revenue}` },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)',
              borderRadius: '16px',
              padding: '24px',
              border: '1px solid var(--border-light)',
              boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)',
              transition: 'all 300ms cubic-bezier(0.23, 1, 0.320, 1)',
              cursor: 'pointer',
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
            <div style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: '2rem',
              fontWeight: 400,
              color: 'var(--text-primary)',
              lineHeight: 1,
              marginBottom: '8px',
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--text-muted)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
