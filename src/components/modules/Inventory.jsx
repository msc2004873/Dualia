import React from 'react';

export default function Inventory({ inventory }) {
  const critical = inventory.filter(i => i.currentStock < i.minStock).length;
  const alert = inventory.filter(i => i.currentStock < i.alertStock && i.currentStock >= i.minStock).length;

  return (
    <div className="p-8">
      <h1 className="module-title mb-6">Inventory</h1>
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="stat-card"><div className="stat-value text-[color:var(--danger)]">{critical}</div><div className="stat-label">Critical Stock</div></div>
        <div className="stat-card"><div className="stat-value text-[color:var(--warning)]">{alert}</div><div className="stat-label">Low Stock</div></div>
        <div className="stat-card"><div className="stat-value text-[color:var(--success)]">{inventory.length - critical - alert}</div><div className="stat-label">OK</div></div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead><tr><th>Item</th><th>Unit</th><th>Current</th><th>Min</th><th>Status</th><th>Cost/Unit</th><th>Supplier</th></tr></thead>
          <tbody>
            {inventory.map(i => {
              const isCritical = i.currentStock < i.minStock;
              const isAlert = i.currentStock < i.alertStock;
              return (
                <tr key={i.id} className={isCritical ? 'bg-[color:var(--danger-light)]' : isAlert ? 'bg-[color:var(--warning-light)]' : ''}>
                  <td className="font-medium">{i.name}</td>
                  <td>{i.unit}</td>
                  <td>{i.currentStock}</td>
                  <td>{i.minStock}</td>
                  <td><span className={`badge ${isCritical ? 'badge-danger' : isAlert ? 'badge-warning' : 'badge-success'}`}>{isCritical ? 'Critical' : isAlert ? 'Alert' : 'OK'}</span></td>
                  <td>${i.unitCost}</td>
                  <td className="text-sm">{i.supplier}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
