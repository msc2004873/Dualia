import React, { useState, useEffect } from 'react';
import { patients, allServices } from '../../data';

export default function Billing({ protocolData, setProtocolData, handleClearProtocol, nextInvoiceNum, handleAddInvoice, localInvoices }) {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [clientId, setClientId] = useState('');
  const [services, setServices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [ccSurcharge, setCcSurcharge] = useState(false);

  useEffect(() => {
    setInvoiceNumber(`INV-2026-${String(nextInvoiceNum).padStart(4, '0')}`);
    if (protocolData) {
      setClientId(protocolData.patientId);
      setServices(protocolData.services || []);
    }
  }, [protocolData, nextInvoiceNum]);

  const client = patients.find(p => p.id === clientId);
  const subtotal = services.reduce((sum, s) => sum + (s.price * s.qty), 0);
  const tax = subtotal * 0.13;
  const surcharge = ccSurcharge ? (subtotal + tax) * 0.025 : 0;
  const total = subtotal + tax + surcharge;

  const handleIssue = () => {
    if (!clientId || services.length === 0) return;

    const invoice = {
      id: `INV-${invoiceNumber}`,
      number: invoiceNumber,
      date: new Date().toISOString().split('T')[0],
      clientId,
      clientName: client.name,
      idNumber: client.idNumber,
      services: services.map(s => ({ id: s.id, name: s.name, qty: s.qty, unitPrice: s.price, lineTotal: s.price * s.qty })),
      subtotal,
      tax13: tax,
      total: subtotal + tax,
      paymentMethod,
      ccSurcharge: surcharge,
      grandTotal: total,
      status: 'issued',
    };

    handleAddInvoice(invoice);
    handleClearProtocol();
    setServices([]);
    setClientId('');
    setPaymentMethod('Bank Transfer');
    setCcSurcharge(false);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.75rem', fontWeight: 300 }}>
          Billing
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '60px' }}>
        {/* New Invoice Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '32px', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)' }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', fontWeight: 400, marginBottom: '24px', color: 'var(--text-primary)' }}>
              New Invoice
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                  Invoice Number
                </label>
                <input type="text" value={invoiceNumber} disabled style={{ width: '100%', padding: '10px 14px', background: '#F0EDE8', border: '1.5px solid var(--border-light)', borderRadius: '12px', fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: '0.875rem', color: 'var(--text-muted)' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                  Date
                </label>
                <input type="text" value={new Date().toISOString().split('T')[0]} disabled style={{ width: '100%', padding: '10px 14px', background: '#F0EDE8', border: '1.5px solid var(--border-light)', borderRadius: '12px', fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: '0.875rem', color: 'var(--text-muted)' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                  Client
                </label>
                <select value={clientId} onChange={(e) => setClientId(e.target.value)} style={{ width: '100%', padding: '10px 14px', background: 'white', border: '1.5px solid var(--border-light)', borderRadius: '12px', fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: '0.875rem', color: 'var(--text-primary)', cursor: 'pointer', outline: 'none' }}>
                  <option value="">Select client...</option>
                  {patients.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.idNumber})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
                  Services
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '160px', overflowY: 'auto' }}>
                  {services.length === 0 ? (
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No services added. Use Protocol Builder to create one.</p>
                  ) : (
                    services.map((s, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'linear-gradient(135deg, #E6F2F0 0%, #D4EBE7 100%)', borderRadius: '12px', border: '1px solid rgba(42, 127, 111, 0.15)', fontSize: '0.875rem' }}>
                        <div>
                          <div style={{ fontWeight: 500, color: 'var(--text-primary)', marginBottom: '4px' }}>{s.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {s.qty} × ${s.price}</div>
                        </div>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>${(s.price * s.qty).toFixed(2)}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '12px', display: 'block' }}>
                  Payment Method
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {['Cash', 'Bank Transfer', 'Debit Card', 'Credit Card'].map(method => (
                    <label key={method} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'background 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(42, 127, 111, 0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--accent)' }}
                      />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)' }}>{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {paymentMethod === 'Credit Card' && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '12px', background: 'linear-gradient(135deg, #FEF3E2 0%, #FCEECF 100%)', borderRadius: '12px', border: '1px solid rgba(212, 130, 26, 0.2)' }}>
                  <input
                    type="checkbox"
                    checked={ccSurcharge}
                    onChange={(e) => setCcSurcharge(e.target.checked)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: 'var(--warning)' }}
                  />
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>Apply 2.5% credit card surcharge</span>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Preview & Totals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Totals Card */}
          <div style={{ background: 'linear-gradient(135deg, #F5EBE0 0%, #F0E0D0 100%)', borderRadius: '16px', border: '2px solid var(--brand-gold)', padding: '28px', boxShadow: '0 4px 12px rgba(196, 149, 106, 0.15)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Subtotal</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Tax (13%)</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>${tax.toFixed(2)}</span>
              </div>
              {surcharge > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--warning)' }}>
                  <span style={{ fontSize: '0.875rem' }}>CC Surcharge (2.5%)</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>${surcharge.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1.5px solid rgba(196, 149, 106, 0.2)' }}>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.25rem' }}>Total</span>
                <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', color: 'var(--brand-gold)', fontWeight: 600 }}>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleIssue}
              disabled={!clientId || services.length === 0}
              style={{
                width: '100%',
                padding: '12px 24px',
                borderRadius: '9999px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                border: 'none',
                background: !clientId || services.length === 0 ? '#ccc' : 'linear-gradient(135deg, #C4956A 0%, #A3784F 100%)',
                color: 'white',
                cursor: !clientId || services.length === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 200ms cubic-bezier(0.23, 1, 0.320, 1)',
                boxShadow: '0 4px 12px rgba(196, 149, 106, 0.25)',
                opacity: !clientId || services.length === 0 ? 0.6 : 1,
              }}
              onMouseEnter={(e) => {
                if (clientId && services.length > 0) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(196, 149, 106, 0.35)';
                }
              }}
              onMouseLeave={(e) => {
                if (clientId && services.length > 0) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(196, 149, 106, 0.25)';
                }
              }}
            >
              Issue Invoice
            </button>
          </div>

          {/* Invoice Preview */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border-light)', padding: '32px', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)' }}>
            <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '16px', marginBottom: '16px' }}>
              <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.75rem', fontWeight: 300, marginBottom: '4px' }}>Dualia</h1>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Healing Center · Dominical, Uvita, Costa Rica</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>License: 3-101-XXX</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8125rem', marginBottom: '16px' }}>
              <div><span style={{ fontWeight: 600 }}>Invoice:</span> {invoiceNumber}</div>
              <div><span style={{ fontWeight: 600 }}>Date:</span> {new Date().toISOString().split('T')[0]}</div>
              {client && (
                <>
                  <div><span style={{ fontWeight: 600 }}>Client:</span> {client.name}</div>
                  <div><span style={{ fontWeight: 600 }}>ID:</span> {client.idNumber}</div>
                </>
              )}
            </div>

            {services.length > 0 && (
              <>
                <table style={{ width: '100%', fontSize: '0.75rem', marginBottom: '16px', borderTop: '1px solid var(--border-light)', borderBottom: '1px solid var(--border-light)' }}>
                  <tbody>
                    {services.map((s, i) => (
                      <tr key={i} style={{ borderTop: i > 0 ? '1px solid var(--border-light)' : 'none' }}>
                        <td style={{ padding: '8px 0' }}>{s.name}</td>
                        <td style={{ textAlign: 'right', paddingRight: '8px' }}>x{s.qty}</td>
                        <td style={{ textAlign: 'right', width: '60px' }}>${(s.price * s.qty).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.8125rem', textAlign: 'right', marginBottom: '20px', fontWeight: 500 }}>
                  <div>Total: <span style={{ fontWeight: 600 }}>${total.toFixed(2)}</span></div>
                  <div style={{ color: 'var(--text-muted)' }}>{paymentMethod}</div>
                </div>
              </>
            )}

            <div style={{ textAlign: 'center', paddingTop: '16px' }}>
              <svg viewBox="0 0 100 100" style={{ width: '64px', height: '64px', margin: '0 auto', stroke: 'var(--brand-gold)', fill: 'none', strokeWidth: 1.5 }}>
                <circle cx="50" cy="50" r="45" />
                <text x="50" y="55" textAnchor="middle" style={{ fontSize: '10px', fontWeight: 'bold', fill: 'var(--brand-gold)' }}>
                  ISSUED
                </text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice History */}
      <div>
        <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.5rem', fontWeight: 400, marginBottom: '20px', color: 'var(--text-primary)' }}>
          Invoice History
        </h2>
        <div style={{ overflowX: 'auto', background: 'linear-gradient(135deg, #FDFAF7 0%, #FFFFFF 100%)', borderRadius: '16px', border: '1px solid var(--border-light)', boxShadow: '0 2px 12px rgba(27, 51, 48, 0.04)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
                <th style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px 16px', textAlign: 'left' }}>Number</th>
                <th style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px 16px', textAlign: 'left' }}>Date</th>
                <th style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px 16px', textAlign: 'left' }}>Client</th>
                <th style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px 16px', textAlign: 'left' }}>Total</th>
                <th style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px 16px', textAlign: 'left' }}>Payment</th>
                <th style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', padding: '14px 16px', textAlign: 'left' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {localInvoices && localInvoices.map(inv => (
                <tr key={inv.id} style={{ borderBottom: '1px solid var(--border-light)', transition: 'background 150ms ease' }} onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(90deg, #E6F2F0 0%, transparent 100%)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '14px 16px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{inv.number}</td>
                  <td style={{ padding: '14px 16px', fontSize: '0.875rem', color: 'var(--text-primary)' }}>{inv.date}</td>
                  <td style={{ padding: '14px 16px', fontSize: '0.875rem', color: 'var(--text-primary)' }}>{inv.clientName}</td>
                  <td style={{ padding: '14px 16px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>${inv.grandTotal.toFixed(2)}</td>
                  <td style={{ padding: '14px 16px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{inv.paymentMethod}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '3px 10px', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 500, background: 'linear-gradient(135deg, #E9F7EF 0%, #D9F2E8 100%)', color: 'var(--success)' }}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
