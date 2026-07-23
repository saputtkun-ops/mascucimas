import React, { useState } from 'react';
import { Users, Search, Plus, Award, Phone, MapPin, MessageSquare, Download, Upload, Star, ChevronRight } from 'lucide-react';
import { Customer, MemberTier } from '../../types';

interface CustomerListProps {
  customers: Customer[];
  onAddCustomer: (customer: Customer) => void;
}

export const CustomerList: React.FC<CustomerListProps> = ({ customers, onAddCustomer }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('Semua');

  const filtered = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = tierFilter === 'Semua' || c.memberTier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const getTierBadge = (tier: MemberTier) => {
    switch (tier) {
      case 'Platinum':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-300';
      case 'Gold':
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-300';
      case 'Silver':
        return 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border-slate-300';
      default:
        return 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border-orange-300';
    }
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" /> Database Pelanggan & Loyalty Membership
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kelola data member, poin otomatis, tier (Bronze, Silver, Gold, Platinum), dan riwayat order.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Fitur Export Excel Siap Download')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-all"
          >
            <Download className="w-4 h-4" /> Export Excel
          </button>
          <button
            onClick={() => alert('Simulasi Import Data Excel Pelanggan Selesai')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-bold text-xs rounded-xl transition-all"
          >
            <Upload className="w-4 h-4" /> Import Excel
          </button>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama, no HP/WhatsApp, atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {['Semua', 'Bronze', 'Silver', 'Gold', 'Platinum'].map((t) => (
            <button
              key={t}
              onClick={() => setTierFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                tierFilter === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Customer Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((cust) => (
          <div
            key={cust.id}
            className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{cust.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{cust.phone}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black border ${getTierBadge(cust.memberTier)}`}>
                  👑 {cust.memberTier}
                </span>
              </div>

              <div className="mt-3 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <p className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" /> {cust.address}
                </p>
                <p className="text-[11px] text-slate-400 italic">"{cust.notes}"</p>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-slate-50 dark:bg-slate-700/40 rounded-2xl text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Order</span>
                  <span className="font-extrabold text-xs text-slate-800 dark:text-slate-200">{cust.totalOrders} Sepatu</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Total Belanja</span>
                  <span className="font-extrabold text-xs text-blue-600 dark:text-blue-400">{formatRupiah(cust.totalSpent)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Poin MCM</span>
                  <span className="font-extrabold text-xs text-amber-500">⭐ {cust.points}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Member sejak {cust.joinedDate}</span>
              <a
                href={`https://wa.me/62${cust.phone.replace(/^0/, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WA Chat <ChevronRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
