import React, { useState } from 'react';
import { Boxes, AlertTriangle, Plus, Search, Truck, Layers, CheckCircle2 } from 'lucide-react';
import { InventoryItem, Supplier } from '../../types';

interface InventoryManagerProps {
  inventory: InventoryItem[];
  suppliers: Supplier[];
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({ inventory, suppliers }) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'suppliers'>('inventory');
  const [searchTerm, setSearchTerm] = useState('');

  const lowStockItems = inventory.filter((i) => i.stock <= i.minStock);

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Boxes className="w-5 h-5 text-blue-600" /> Manajemen Inventaris & Supplier Bahan
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Monitoring stok sabun, sikat, lap, packaging, parfum, serta riwayat pembelian supplier.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'inventory' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            Stok Barang
          </button>
          <button
            onClick={() => setActiveTab('suppliers')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'suppliers' ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
            }`}
          >
            Daftar Supplier
          </button>
        </div>
      </div>

      {/* Low Stock Warning Banner */}
      {lowStockItems.length > 0 && (
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-amber-800 dark:text-amber-300">
                Peringatan Stok Menipis! Ada {lowStockItems.length} barang di bawah batas minimum:
              </p>
              <p className="text-[11px] text-amber-700 dark:text-amber-400">
                {lowStockItems.map((i) => `${i.name} (Tersisa: ${i.stock} ${i.unit})`).join(', ')}
              </p>
            </div>
          </div>
          <button
            onClick={() => alert('Purchase Order Otomatis Dikirim ke Supplier!')}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-extrabold text-xs rounded-xl shadow-sm shrink-0"
          >
            Restock Otomatis
          </button>
        </div>
      )}

      {/* Main Content */}
      {activeTab === 'inventory' ? (
        <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 font-bold uppercase text-[11px]">
                  <th className="py-3.5 px-4">Nama Barang</th>
                  <th className="py-3.5 px-4">Kategori</th>
                  <th className="py-3.5 px-4">Supplier</th>
                  <th className="py-3.5 px-4">Stok Saat Ini</th>
                  <th className="py-3.5 px-4">Harga / Unit</th>
                  <th className="py-3.5 px-4">Lokasi Rak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                {inventory.map((inv) => {
                  const isLow = inv.stock <= inv.minStock;
                  return (
                    <tr key={inv.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{inv.name}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold">
                          {inv.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">{inv.supplier}</td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`font-black px-2.5 py-1 rounded-full text-xs ${
                            isLow ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse' : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}
                        >
                          {inv.stock} {inv.unit}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{formatRupiah(inv.price)}</td>
                      <td className="py-3.5 px-4 text-slate-500">{inv.storageLocation}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {suppliers.map((sup) => (
            <div key={sup.id} className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{sup.name}</h3>
              <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-0.5">{sup.contact}</p>
              <p className="text-xs text-slate-500 mt-2">{sup.address}</p>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs">
                <span className="text-slate-400">Total Pembelian</span>
                <span className="font-black text-slate-900 dark:text-white">{formatRupiah(sup.totalPurchases)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
