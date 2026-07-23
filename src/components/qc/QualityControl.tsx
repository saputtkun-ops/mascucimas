import React from 'react';
import { CheckCheck, CheckCircle2, XCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Order } from '../../types';

interface QualityControlProps {
  orders: Order[];
  onApproveQC: (orderId: string) => void;
}

export const QualityControl: React.FC<QualityControlProps> = ({ orders, onApproveQC }) => {
  const qcPendingOrders = orders.filter((o) => o.status === 'QC' || o.status === 'Finishing');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <CheckCheck className="w-5 h-5 text-blue-600" /> Modul Quality Control (QC) & Approval Manager
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Verifikasi standar kebersihan 10 titik sepatu sebelum dipacking & dikirim ke pelanggan.
          </p>
        </div>

        <span className="px-3.5 py-1.5 bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 font-extrabold text-xs rounded-full">
          {qcPendingOrders.length} Order Perlu Approval
        </span>
      </div>

      {/* QC Queue List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {qcPendingOrders.map((ord) => (
          <div key={ord.id} className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-black text-blue-600 dark:text-blue-400">{ord.invoiceNo}</span>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{ord.shoe.brand} {ord.shoe.model}</h3>
                <p className="text-xs text-slate-500">Teknisi: {ord.technicianName}</p>
              </div>
              <img src={ord.shoe.photoAfter || ord.shoe.photoBefore} className="w-14 h-14 rounded-2xl object-cover border" />
            </div>

            {/* QC Points Checklist */}
            <div className="space-y-1.5 p-3 bg-slate-50 dark:bg-slate-700/40 rounded-2xl text-xs">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Outsole & Midsole Bebas Noda Lumpur
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Upper & Insole Sudah Di-Deep Clean
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Aroma Parfum Ocean Breeze Segar (Anti-Bakteri)
              </div>
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Tali Sepatu Terpasang Rapi
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onApproveQC(ord.id)}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4" /> Approve & Lanjut Packing
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
