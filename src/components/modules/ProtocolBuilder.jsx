import React, { useState, useEffect } from 'react';
import { patients, allServices } from '../../data';
import { useClaudeAI } from '../../hooks/useClaudeAI';

export default function ProtocolBuilder({ setActiveModule, setProtocolData, selectedPatient, setSelectedPatient }) {
  const { loading, error, result, callClaude } = useClaudeAI();
  const [patientId, setPatientId] = useState(selectedPatient || patients[0].id);
  const [services, setServices] = useState([]);
  const [serviceSearch, setServiceSearch] = useState('');
  const [notes, setNotes] = useState('');
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);

  const currentPatient = patients.find(p => p.id === patientId);
  const monthlyPassPatients = ['P001', 'P002', 'P004', 'P007', 'P008'];
  const hasMonthlyPass = monthlyPassPatients.includes(patientId);

  const filteredServices = allServices.filter(s =>
    s.name.toLowerCase().includes(serviceSearch.toLowerCase())
  );

  const handleAddService = (service) => {
    setServices([...services, { ...service, qty: 1 }]);
    setServiceSearch('');
    setShowServiceDropdown(false);
  };

  const handleRemoveService = (idx) => {
    setServices(services.filter((_, i) => i !== idx));
  };

  const subtotal = services.reduce((sum, s) => sum + (s.price * s.qty), 0);
  const ivTherapyServices = services.filter(s => s.category === 'IV Therapy');
  const ivDiscount = hasMonthlyPass && ivTherapyServices.length > 0
    ? ivTherapyServices.reduce((sum, s) => sum + (s.price * s.qty), 0) * 0.1
    : 0;
  const afterDiscount = subtotal - ivDiscount;
  const tax = afterDiscount * 0.13;
  const total = afterDiscount + tax;

  const handleCreateInvoice = () => {
    setProtocolData({
      patientId,
      patientName: currentPatient.name,
      services,
      subtotal,
      ivDiscount,
      afterDiscount,
      tax,
      total,
      notes,
    });
    setActiveModule('billing');
  };

  const handleSuggest = async () => {
    const prompt = `Patient: ${currentPatient.name}, Age ${currentPatient.age}
Conditions: ${currentPatient.medicalConditions.join(', ')}
Recent treatments: ${currentPatient.treatmentHistory.slice(0, 3).map(t => t.service).join(', ')}
Notes: ${notes || 'None'}

Suggest what services to add to this IV protocol today. Return JSON:
{
  "services": ["service 1", "service 2"],
  "reasoning": "brief explanation",
  "priority": "high/medium"
}`;

    await callClaude(prompt, true);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.75rem', fontWeight: 300 }}>
          Protocol Builder
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '40% 1fr', gap: '32px' }}>
        {/* Left panel - patient */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
              Select Patient
            </label>
            <select
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                background: 'white',
                border: '1.5px solid var(--border-light)',
                borderRadius: '12px',
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                outline: 'none',
                cursor: 'pointer',
                transition: 'border-color 150ms ease',
              }}
            >
              {patients.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          {currentPatient && (
            <div style={{ background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '24px', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #2A7F6F 0%, #1E5C51 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem', fontWeight: 'bold', boxShadow: '0 4px 12px rgba(42, 127, 111, 0.25)' }}>
                  {currentPatient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)' }}>{currentPatient.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Age {currentPatient.age}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid var(--border-light)' }}>
                {currentPatient.medicalConditions.map((cond, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', padding: '4px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 500, background: 'linear-gradient(135deg, #EDE8E1 0%, #E5DFD6 100%)', color: 'var(--text-secondary)', width: 'fit-content' }}>
                    {cond}
                  </span>
                ))}
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px' }}>
                Last 3 Treatments
              </div>
              {currentPatient.treatmentHistory.slice(0, 3).map((t, i) => (
                <div key={i} style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                  {t.service} • <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>${t.cost}</span>
                </div>
              ))}

              {hasMonthlyPass && (
                <div style={{ marginTop: '16px', padding: '12px 14px', background: 'linear-gradient(135deg, #F5EBE0 0%, #F0E0D0 100%)', borderRadius: '12px', border: '1px solid rgba(196, 149, 106, 0.2)', fontSize: '0.875rem', fontWeight: 500, color: '#A3784F' }}>
                  Monthly Pass Active (10% IV discount)
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right panel - protocol */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Services */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
              Services in Protocol
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px', maxHeight: '200px', overflowY: 'auto' }}>
              {services.length === 0 ? (
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No services added yet</p>
              ) : (
                services.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #E6F2F0 0%, #D4EBE7 100%)', padding: '12px 14px', borderRadius: '12px', border: '1px solid rgba(42, 127, 111, 0.15)' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{s.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>${s.price}</div>
                    </div>
                    <button
                      onClick={() => handleRemoveService(i)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--danger)',
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        cursor: 'pointer',
                        transition: 'transform 150ms ease',
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search and add service..."
                value={serviceSearch}
                onChange={(e) => setServiceSearch(e.target.value)}
                onFocus={() => setShowServiceDropdown(true)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  background: 'white',
                  border: '1.5px solid var(--border-light)',
                  borderRadius: '12px',
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  outline: 'none',
                  transition: 'border-color 150ms ease',
                }}
              />
              {showServiceDropdown && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'white', border: '1px solid var(--border-light)', borderRadius: '12px', marginTop: '8px', boxShadow: '0 8px 24px rgba(27, 51, 48, 0.12)', maxHeight: '240px', overflowY: 'auto', zIndex: 10 }}>
                  {filteredServices.map(s => (
                    <button
                      key={s.id}
                      onClick={() => handleAddService(s)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '12px 14px',
                        borderBottom: '1px solid var(--border-light)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 150ms ease',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(135deg, #E6F2F0 0%, #D4EBE7 100%)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{s.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.category} • ${s.price}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Totals */}
          <div style={{ background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '24px', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Subtotal</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>${subtotal.toFixed(2)}</span>
            </div>
            {ivDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: 'var(--success)' }}>
                <span style={{ fontSize: '0.875rem' }}>Monthly Pass Discount (10% IV)</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>-${ivDiscount.toFixed(2)}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Tax (13%)</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>${tax.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem' }}>Total</span>
              <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem', color: 'var(--accent)', fontWeight: 500 }}>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Nurse Notes */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
              Nurse Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                background: 'white',
                border: '1.5px solid var(--border-light)',
                borderRadius: '12px',
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                minHeight: '90px',
                resize: 'vertical',
                outline: 'none',
                transition: 'border-color 200ms ease',
              }}
              placeholder="Treatment notes, observations, follow-up instructions..."
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
            />
          </div>

          {/* AI Suggestion Button */}
          <button
            onClick={handleSuggest}
            disabled={loading || !currentPatient}
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              border: '1.5px solid var(--accent)',
              background: 'transparent',
              color: 'var(--accent)',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 200ms cubic-bezier(0.23, 1, 0.320, 1)',
              opacity: loading ? 0.6 : 1,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.background = 'var(--accent-light)';
                e.target.style.transform = 'translateY(-2px)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
              }
            }}
          >
            {loading ? 'AI Suggesting...' : 'AI Protocol Suggestion'}
          </button>

          {result && (
            <div style={{ background: 'linear-gradient(135deg, #F5EBE0 0%, #F0E0D0 100%)', borderRadius: '12px', border: '1px solid rgba(196, 149, 106, 0.2)', padding: '16px', borderLeft: '4px solid var(--brand-gold)' }}>
              <div style={{ fontSize: '0.75rem', color: '#A3784F', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px' }}>
                AI Suggestion
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '8px' }}>
                {result.services && result.services.map((s, i) => (
                  <div key={i}>• {s}</div>
                ))}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{result.reasoning}</div>
            </div>
          )}

          {/* Create Invoice Button */}
          <button
            onClick={handleCreateInvoice}
            disabled={services.length === 0}
            style={{
              padding: '12px 24px',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              border: 'none',
              background: services.length === 0 ? '#ccc' : 'linear-gradient(135deg, #C4956A 0%, #A3784F 100%)',
              color: 'white',
              cursor: services.length === 0 ? 'not-allowed' : 'pointer',
              transition: 'all 200ms cubic-bezier(0.23, 1, 0.320, 1)',
              boxShadow: '0 4px 12px rgba(196, 149, 106, 0.25)',
            }}
            onMouseEnter={(e) => {
              if (services.length > 0) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(196, 149, 106, 0.35)';
              }
            }}
            onMouseLeave={(e) => {
              if (services.length > 0) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 12px rgba(196, 149, 106, 0.25)';
              }
            }}
          >
            Create Invoice
          </button>
        </div>
      </div>
    </div>
  );
}
