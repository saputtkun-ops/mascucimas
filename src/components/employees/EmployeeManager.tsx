import React from 'react';
import { UserCheck, Shield, Star, Plus, Check, Award, Phone } from 'lucide-react';
import { Employee } from '../../types';

interface EmployeeManagerProps {
  employees: Employee[];
}

export const EmployeeManager: React.FC<EmployeeManagerProps> = ({ employees }) => {
  const rolesList = ['Owner', 'Manager', 'Admin', 'Kurir', 'Teknisi', 'Kasir'];

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-600" /> Manajemen Karyawan, Komisi & Hak Akses Role
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Data teknisi, kurir, kasir, target harian cuci sepatu, perolehan komisi, dan sistem izin role 6 tingkat.
          </p>
        </div>

        <button
          onClick={() => alert('Tambah Karyawan Baru Selesai')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md"
        >
          + Tambah Karyawan Baru
        </button>
      </div>

      {/* Employee Roster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((emp) => {
          const targetPercentage = Math.round((emp.completedToday / emp.dailyTarget) * 100);

          return (
            <div key={emp.id} className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 font-extrabold flex items-center justify-center text-sm">
                    {emp.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">{emp.name}</h3>
                    <p className="text-xs text-slate-400">{emp.phone}</p>
                  </div>
                </div>
                <span className="px-3 py-1 bg-blue-600 text-white text-[11px] font-extrabold rounded-full">{emp.role}</span>
              </div>

              {/* Target Progress Bar */}
              <div className="bg-slate-50 dark:bg-slate-700/40 p-3 rounded-2xl space-y-1.5">
                <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-200">
                  <span>Target Cuci / Order Harian</span>
                  <span>{emp.completedToday} / {emp.dailyTarget} ({targetPercentage}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${targetPercentage}%` }}></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-amber-500 font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {emp.rating} Rating Pengerjaan
                </span>
                <span className="font-black text-emerald-600 dark:text-emerald-400">
                  Komisi: {formatRupiah(emp.commission)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Role Permission Matrix */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-600" /> Matriks Hak Akses System (6 Role RBAC)
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 font-bold uppercase">
                <th className="py-2.5 px-3">Fitur System</th>
                {rolesList.map((r) => (
                  <th key={r} className="py-2.5 px-3 text-center">{r}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {['Dashboard Omset & Laporan', 'Input POS Order Baru', 'Update Progress SOP Digital', 'Quality Control Signoff', 'Manajemen Inventaris & Supplier', 'Pengaturan Cabang & DB Backup'].map((feature, idx) => (
                <tr key={feature}>
                  <td className="py-2.5 px-3 font-semibold text-slate-800 dark:text-slate-200">{feature}</td>
                  <td className="text-center text-emerald-500 font-bold">✓</td>
                  <td className="text-center text-emerald-500 font-bold">{idx < 5 ? '✓' : '-'}</td>
                  <td className="text-center text-emerald-500 font-bold">{idx < 4 ? '✓' : '-'}</td>
                  <td className="text-center text-emerald-500 font-bold">{idx === 1 || idx === 2 ? '✓' : '-'}</td>
                  <td className="text-center text-emerald-500 font-bold">{idx === 2 ? '✓' : '-'}</td>
                  <td className="text-center text-emerald-500 font-bold">{idx === 1 ? '✓' : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
