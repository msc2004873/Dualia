import { useState } from 'react';
import { patients, appointments, inventory, memberships, invoices } from './data';
import Sidebar from './components/Sidebar';
import Schedule from './components/modules/Schedule';
import Patients from './components/modules/Patients';
import IntakeAI from './components/modules/IntakeAI';
import ProtocolBuilder from './components/modules/ProtocolBuilder';
import Memberships from './components/modules/Memberships';
import Inventory from './components/modules/Inventory';
import Billing from './components/modules/Billing';
import Reports from './components/modules/Reports';
import './index.css';

function App() {
  const [activeModule, setActiveModule] = useState('schedule');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [protocolData, setProtocolData] = useState(null);
  const [nextInvoiceNum, setNextInvoiceNum] = useState(48);
  const [localInvoices, setLocalInvoices] = useState(invoices);

  const inventoryAlerts = inventory.filter(i => i.currentStock < i.minStock).length;
  const membershipExpiring = memberships.filter(m => m.status === 'active' && m.daysLeft <= 7).length;

  const handleAddInvoice = (invoice) => {
    setLocalInvoices([...localInvoices, invoice]);
    setNextInvoiceNum(nextInvoiceNum + 1);
  };

  const handleClearProtocol = () => {
    setProtocolData(null);
  };

  const moduleProps = {
    setActiveModule,
    selectedPatient,
    setSelectedPatient,
    protocolData,
    setProtocolData,
    nextInvoiceNum,
    setNextInvoiceNum,
    handleAddInvoice,
    handleClearProtocol,
    localInvoices,
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)' }}>
      <Sidebar
        activeModule={activeModule}
        setActiveModule={setActiveModule}
        inventoryAlerts={inventoryAlerts}
        membershipExpiring={membershipExpiring}
      />

      <main style={{ marginLeft: '248px', flex: 1, overflowY: 'auto' }}>
        <div key={activeModule} className="animate-fadeIn">
          {activeModule === 'schedule' && <Schedule {...moduleProps} appointments={appointments} />}
          {activeModule === 'patients' && <Patients {...moduleProps} patients={patients} />}
          {activeModule === 'intake' && <IntakeAI {...moduleProps} />}
          {activeModule === 'protocol' && <ProtocolBuilder {...moduleProps} />}
          {activeModule === 'memberships' && <Memberships {...moduleProps} memberships={memberships} />}
          {activeModule === 'inventory' && <Inventory {...moduleProps} inventory={inventory} />}
          {activeModule === 'billing' && <Billing {...moduleProps} invoices={localInvoices} />}
          {activeModule === 'reports' && <Reports {...moduleProps} />}
        </div>
      </main>
    </div>
  );
}

export default App;
