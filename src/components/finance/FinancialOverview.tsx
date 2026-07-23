import React, { useState } from 'react';
import { BadgeDollarSign, Download, TrendingUp, TrendingDown, Calendar, FileText, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { FinancialRecord } from '../../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface FinancialOverviewProps {
  financials: FinancialRecord[];
}

export const FinancialOverview: React.FC<FinancialOverviewProps> = ({ financials }) => {
  const [filterPeriod, setFilterPeriod] = useState('Bulanan');

  const totalIncome = financials
    .filter((f) => f.type === 'Pendapatan')
    .reduce((sum, f) => sum + f.amount, 0);

  const totalExpense = financials
    .filter((f) => f.type === 'Pengeluaran')
    .reduce((sum, f) => sum + f.amount, 0);

  const netProfit = totalIncome - totalExpense;

  const chartData = [
    { bulan: 'Jan', Omset: 18500000, Pengeluaran: 6200000 },
    { bulan: 'Feb', Omset: 21000000, Pengeluaran: 7100000 },
    { bulan: 'Mar', Omset: 24500000, Pengeluaran: 8400000 },
    { bulan: 'Apr', Omset: 22800000, Pengeluaran: 7800000 },
    { bulan: 'Mei', Omset: 27900000, Pengeluaran: 8900000 },
    { bulan: 'Jun', Omset: 31200000, Pengeluaran: 9500000 },
    { bulan: 'Jul', Omset: 28450000, Pengeluaran: 9200000 },
  ];

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BadgeDollarSign className="w-5 h-5 text-blue-600" /> Modul Laporan Keuangan & Cash Flow
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pantau arus kas pendapatan harian/bulanan, pengeluaran bahan & komisi, serta export laporan PDF & Excel.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Download Laporan Keuangan PDF Berhasil')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs rounded-xl shadow-sm"
          >
            <FileText className="w-4 h-4" /> Export PDF
          </button>
          <button
            onClick={() => alert('Download Laporan Excel (.xlsx) Berhasil')}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm"
          >
            <Download className="w-4 h-4" /> Export Excel
          </button>
        </div>
      </div>

      {/* KPI Financial Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-5 rounded-3xl shadow-md">
          <div className="flex justify-between items-center text-blue-200 mb-1">
            <span className="text-xs font-semibold">Total Omset Pendapatan</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <p className="text-3xl font-black">{formatRupiah(totalIncome)}</p>
          <span className="text-xs text-blue-200 mt-2 block">+18.5% dari target bulanan</span>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-3xl shadow-sm">
          <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-xs font-semibold">Total Pengeluaran Operasional</span>
            <TrendingDown className="w-5 h-5 text-red-500" />
          </div>
          <p className="text-3xl font-black text-slate-900 dark:text-white">{formatRupiah(totalExpense)}</p>
          <span className="text-xs text-slate-400 mt-2 block">Bahan Laundry & Insentif Teknisi</span>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-5 rounded-3xl shadow-sm">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 block mb-1">Laba Bersih (Net Profit)</span>
          <p className="text-3xl font-black text-emerald-700 dark:text-emerald-300">{formatRupiah(netProfit)}</p>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2 block">Margin Keuntungan ~74%</span>
        </div>
      </div>

      {/* Financial Chart */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-4">Grafik Cash Flow Bulanan 2026</h3>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <XAxis dataKey="bulan" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v / 1000000}M`} />
              <Tooltip formatter={(v: any) => formatRupiah(v)} />
              <Area type="monotone" dataKey="Omset" stroke="#2563eb" fill="#2563eb" fillOpacity={0.2} />
              <Area type="monotone" dataKey="Pengeluaran" stroke="#ef4444" fill="#ef4444" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transaction Records Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700 font-bold text-sm">
          Riwayat Jurnal Transaksi Keuangan
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-bold uppercase text-[11px]">
                <th className="py-3 px-4">Tanggal</th>
                <th className="py-3 px-4">Jenis</th>
                <th className="py-3 px-4">Kategori</th>
                <th className="py-3 px-4">Keterangan</th>
                <th className="py-3 px-4">Metode</th>
                <th className="py-3 px-4 text-right">Jumlah</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {financials.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/40">
                  <td className="py-3 px-4 font-bold text-slate-700 dark:text-slate-300">{f.date}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        f.type === 'Pendapatan' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {f.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">{f.category}</td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300">{f.description}</td>
                  <td className="py-3 px-4 text-slate-500">{f.paymentMethod}</td>
                  <td className="py-3 px-4 text-right font-black">
                    <span className={f.type === 'Pendapatan' ? 'text-emerald-600' : 'text-red-500'}>
                      {f.type === 'Pendapatan' ? '+' : '-'} {formatRupiah(f.amount)}
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
};
