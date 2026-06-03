import React, { useState } from 'react';

export default function Patients({ patients, selectedPatient, setSelectedPatient, setActiveModule }) {
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: '',
    idNumber: '',
    email: '',
    phone: '',
    birthDate: '',
    membership: 'Monthly Pass',
    conditions: '',
  });

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.idNumber.includes(search)
  );

  const handleAddPatient = () => {
    if (!newPatient.name || !newPatient.idNumber) {
      alert('Please fill in patient name and ID number');
      return;
    }
    // Here you would typically send to backend
    console.log('New patient:', newPatient);
    setShowAddModal(false);
    setNewPatient({ name: '', idNumber: '', email: '', phone: '', birthDate: '', membership: 'Monthly Pass', conditions: '' });
    alert('Patient added successfully!');
  };

  if (selectedPatient) {
    const patient = patients.find(p => p.id === selectedPatient);
    if (!patient) return null;

    return (
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <button
          onClick={() => setSelectedPatient(null)}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            marginBottom: '24px',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'color 150ms ease',
          }}
          onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
          onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
        >
          ← Back to List
        </button>

        <div style={{ marginBottom: '40px', paddingBottom: '24px', borderBottom: '1px solid var(--border-light)' }}>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.75rem', fontWeight: 300, marginBottom: '16px' }}>
            {patient.name}
          </h1>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '16px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, background: 'var(--accent-light)', color: 'var(--accent)' }}>
              📱 {patient.idNumber}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, background: 'var(--brand-gold-light)', color: '#A3784F' }}>
              💳 {patient.membership}
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, background: '#EFF3F2', color: 'var(--text-secondary)' }}>
              👤 Age {patient.age}
            </span>
          </div>
          {patient.medicalConditions.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {patient.medicalConditions.map((cond, i) => (
                <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 500, background: '#EDE8E1', color: 'var(--text-secondary)' }}>
                  {cond}
                </span>
              ))}
            </div>
          )}
        </div>

        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', fontWeight: 400, marginBottom: '20px' }}>Treatment History</h2>
        <div style={{ overflowX: 'auto', background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1.5px solid var(--border-light)' }}>
                <th style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px 16px', textAlign: 'left' }}>Date</th>
                <th style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px 16px', textAlign: 'left' }}>Service</th>
                <th style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px 16px', textAlign: 'left' }}>Dose</th>
                <th style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px 16px', textAlign: 'left' }}>Nurse</th>
                <th style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px 16px', textAlign: 'left' }}>Cost</th>
                <th style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px 16px', textAlign: 'left' }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {patient.treatmentHistory.map((t, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(42, 127, 111, 0.02)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: 'var(--text-primary)' }}>{t.date}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{t.service}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{t.dose}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.875rem', color: 'var(--text-primary)' }}>{t.nurse}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--accent)' }}>${t.cost}</td>
                  <td style={{ padding: '12px 16px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{t.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '24px' }}>
          <button
            onClick={() => setActiveModule('protocol')}
            style={{
              padding: '12px 24px',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              border: 'none',
              background: 'linear-gradient(135deg, #C4956A 0%, #A3784F 100%)',
              color: 'white',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(196, 149, 106, 0.25)',
              transition: 'all 200ms cubic-bezier(0.23, 1, 0.320, 1)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(196, 149, 106, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(196, 149, 106, 0.25)';
            }}
          >
            Create Protocol
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.75rem', fontWeight: 300, marginBottom: '8px' }}>Patients</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
            {patients.length} total patients
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          style={{
            padding: '12px 24px',
            borderRadius: '9999px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            border: 'none',
            background: 'linear-gradient(135deg, #2A7F6F 0%, #1E5C51 100%)',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(42, 127, 111, 0.25)',
            transition: 'all 200ms cubic-bezier(0.23, 1, 0.320, 1)',
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
          + Add Patient
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or ID number..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          maxWidth: '384px',
          padding: '10px 14px',
          background: 'white',
          border: '1.5px solid var(--border-light)',
          borderRadius: '12px',
          fontFamily: "'DM Sans', system-ui, sans-serif",
          fontSize: '0.875rem',
          color: 'var(--text-primary)',
          marginBottom: '32px',
          outline: 'none',
          transition: 'border-color 150ms ease',
        }}
        onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
        onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
        {filteredPatients.map((patient) => (
          <div
            key={patient.id}
            onClick={() => setSelectedPatient(patient.id)}
            style={{
              background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)',
              borderRadius: '16px',
              border: '1px solid var(--border-light)',
              padding: '24px',
              cursor: 'pointer',
              transition: 'all 250ms cubic-bezier(0.23, 1, 0.320, 1)',
              boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(27, 51, 48, 0.12)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(27, 51, 48, 0.04)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem', fontWeight: 400, color: 'var(--text-primary)', marginBottom: '8px' }}>
              {patient.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '12px' }}>ID: {patient.idNumber}</div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '9999px', fontSize: '0.7rem', fontWeight: 500, background: 'var(--accent-light)', color: 'var(--accent)' }}>
                {patient.membership}
              </span>
            </div>
            <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-light)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <div style={{ marginBottom: '4px' }}>Last Visit: {patient.lastVisit}</div>
              <div style={{ color: 'var(--accent)', fontWeight: 600 }}>Total Spent: ${patient.totalSpent}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Patient Modal */}
      {showAddModal && (
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
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'slideUp 300ms cubic-bezier(0.23, 1, 0.320, 1)',
          }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', fontWeight: 400, marginBottom: '24px' }}>
              Add New Patient
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Full Name"
                value={newPatient.name}
                onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
                style={{
                  padding: '10px 14px',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: '12px',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 150ms ease',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
              />

              <input
                type="text"
                placeholder="ID Number (cedula)"
                value={newPatient.idNumber}
                onChange={(e) => setNewPatient({ ...newPatient, idNumber: e.target.value })}
                style={{
                  padding: '10px 14px',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: '12px',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 150ms ease',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
              />

              <input
                type="email"
                placeholder="Email"
                value={newPatient.email}
                onChange={(e) => setNewPatient({ ...newPatient, email: e.target.value })}
                style={{
                  padding: '10px 14px',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: '12px',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 150ms ease',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
              />

              <input
                type="tel"
                placeholder="Phone"
                value={newPatient.phone}
                onChange={(e) => setNewPatient({ ...newPatient, phone: e.target.value })}
                style={{
                  padding: '10px 14px',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: '12px',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 150ms ease',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
              />

              <input
                type="date"
                value={newPatient.birthDate}
                onChange={(e) => setNewPatient({ ...newPatient, birthDate: e.target.value })}
                style={{
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

              <select
                value={newPatient.membership}
                onChange={(e) => setNewPatient({ ...newPatient, membership: e.target.value })}
                style={{
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
              >
                <option>Monthly Pass</option>
                <option>4-visit Pass</option>
                <option>8-visit Pass</option>
                <option>12-visit Pass</option>
              </select>

              <textarea
                placeholder="Medical conditions (comma separated)"
                value={newPatient.conditions}
                onChange={(e) => setNewPatient({ ...newPatient, conditions: e.target.value })}
                style={{
                  padding: '10px 14px',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: '12px',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 150ms ease',
                  minHeight: '80px',
                  resize: 'vertical',
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setShowAddModal(false)}
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
                onClick={handleAddPatient}
                style={{
                  padding: '10px 24px',
                  borderRadius: '9999px',
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
                Add Patient
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
