import React, { useState } from 'react';
import { useClaudeAI } from '../../hooks/useClaudeAI';
import { services } from '../../data';

export default function IntakeAI({ setActiveModule }) {
  const { loading, error, result, callClaude } = useClaudeAI();
  const [symptoms, setSymptoms] = useState([]);
  const [objective, setObjective] = useState('');
  const [hasMembership, setHasMembership] = useState(false);
  const [medicalHistory, setMedicalHistory] = useState('');

  const symptomOptions = ['Fatigue', 'Stress/Anxiety', 'Muscle pain', 'Low immunity', 'Brain fog', 'Jet lag', 'Migraines', 'Insomnia', 'Inflammation', 'Detox', 'Dehydration', 'Aging/Longevity', 'Post-surgery', 'Athletic recovery'];
  const objectiveOptions = ['Energy', 'Immunity', 'Recovery', 'Anti-aging', 'General wellness', 'Advanced protocol'];

  const handleGenerate = async () => {
    const servicesStr = [...services.ivTherapy, ...services.bathHouse, ...services.addons]
      .map(s => `${s.name} $${s.price || 'consultation'}`)
      .join(' | ');

    const prompt = `You are Dualia Healing Center's clinical assistant in Costa Rica.

Based on the patient's symptoms and objectives, recommend the most appropriate service from the complete Dualia menu.

COMPLETE MENU:
${servicesStr}

PATIENT SYMPTOMS: ${symptoms.join(', ') || 'None selected'}
PRIMARY OBJECTIVE: ${objective || 'Not specified'}
MEDICAL HISTORY: ${medicalHistory || 'None provided'}
ACTIVE MEMBERSHIP: ${hasMembership ? 'Yes (10% discount on IV Therapy)' : 'No'}

Respond in JSON format:
{
  "treatment": "service name",
  "dose": "description",
  "price": number,
  "discountedPrice": number or null,
  "reasoning": "2-3 sentence explanation"
}`;

    await callClaude(prompt, true);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.75rem', fontWeight: 300, marginBottom: '8px' }}>
          Intake & AI Recommendation
        </h1>
        <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', letterSpacing: '0.03em', textTransform: 'uppercase' }}>
          Let our AI suggest the perfect protocol
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Symptoms */}
          <div style={{ background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '28px', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
              Symptoms
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {symptomOptions.map(sym => (
                <label key={sym} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'background 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(42, 127, 111, 0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <input
                    type="checkbox"
                    checked={symptoms.includes(sym)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSymptoms([...symptoms, sym]);
                      } else {
                        setSymptoms(symptoms.filter(s => s !== sym));
                      }
                    }}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent)' }}
                  />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{sym}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Objective */}
          <div style={{ background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '28px', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>
              Primary Objective
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {objectiveOptions.map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'background 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(42, 127, 111, 0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <input
                    type="radio"
                    name="objective"
                    value={opt}
                    checked={objective === opt}
                    onChange={(e) => setObjective(e.target.value)}
                    style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent)' }}
                  />
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Medical History */}
          <div style={{ background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '28px', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)' }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
              Medical History
            </label>
            <textarea
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                background: 'white',
                border: '1.5px solid var(--border-light)',
                borderRadius: '12px',
                fontFamily: "'DM Sans', system-ui, sans-serif",
                fontSize: '0.875rem',
                color: 'var(--text-primary)',
                minHeight: '100px',
                resize: 'vertical',
                outline: 'none',
                transition: 'border-color 200ms ease',
              }}
              placeholder="Any relevant medical conditions..."
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border-light)'}
            />
          </div>

          {/* Membership */}
          <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '16px', background: 'linear-gradient(135deg, #E6F2F0 0%, #D4EBE7 100%)', borderRadius: '12px', border: '1px solid rgba(42, 127, 111, 0.2)' }}>
            <input
              type="checkbox"
              checked={hasMembership}
              onChange={(e) => setHasMembership(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent)' }}
            />
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Active Monthly Membership (10% IV discount)</span>
          </label>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            style={{
              padding: '12px 24px',
              borderRadius: '9999px',
              fontSize: '0.8125rem',
              fontWeight: 600,
              border: 'none',
              background: loading ? '#999' : 'linear-gradient(135deg, #2A7F6F 0%, #1E5C51 100%)',
              color: 'white',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 200ms cubic-bezier(0.23, 1, 0.320, 1)',
              boxShadow: '0 4px 12px rgba(42, 127, 111, 0.25)',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Generating...' : 'Generate Recommendation'}
          </button>
        </div>

        {/* Result */}
        <div>
          {error && (
            <div style={{ background: 'linear-gradient(135deg, #FDEDEC 0%, #FADEDE 100%)', border: '1px solid rgba(192, 57, 43, 0.2)', color: 'var(--danger)', padding: '20px', borderRadius: '12px', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}
          {result && (
            <div style={{
              background: `linear-gradient(135deg, #2A7F6F 0%, #1E5C51 100%)`,
              color: 'white',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 12px 28px rgba(27, 51, 48, 0.2)',
            }}>
              <div style={{ fontSize: '0.75rem', opacity: 0.8, letterSpacing: '0.03em', textTransform: 'uppercase', marginBottom: '16px' }}>
                Dualia Recommendation
              </div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '2.2rem', fontWeight: 300, marginBottom: '24px', lineHeight: 1 }}>
                {result.treatment}
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '4px' }}>DOSE</div>
                  <div style={{ fontSize: '1rem' }}>{result.dose}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', opacity: 0.8, marginBottom: '4px' }}>PRICE</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                    ${result.discountedPrice || result.price}
                    {result.discountedPrice && <span style={{ fontSize: '0.875rem', opacity: 0.8, marginLeft: '8px' }}>(was ${result.price})</span>}
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.95, fontStyle: 'italic', marginBottom: '24px' }}>
                {result.reasoning}
              </p>
              <button
                onClick={() => setActiveModule('protocol')}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  borderRadius: '9999px',
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  border: '1.5px solid white',
                  background: 'transparent',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 200ms cubic-bezier(0.23, 1, 0.320, 1)',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                Add to Protocol
              </button>
            </div>
          )}
          {!error && !result && (
            <div style={{
              background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)',
              border: '1px solid var(--border-light)',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)',
            }}>
              <p style={{ fontSize: '0.875rem' }}>Fill in your symptoms and objective to get AI recommendation</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
