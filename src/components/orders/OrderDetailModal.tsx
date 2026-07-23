import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Clock,
  Printer,
  MessageSquare,
  Sparkles,
  User,
  ShieldCheck,
  Calendar,
  Share2,
  Layers,
  ArrowRight,
  Check,
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateSOP: (orderId: string, sopId: string) => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onPrintInvoice: (order: Order) => void;
  onSendWhatsApp: (order: Order) => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  onClose,
  onUpdateSOP,
  onUpdateStatus,
  onPrintInvoice,
  onSendWhatsApp,
}) => {
  const [sliderPos, setSliderPos] = useState(50);

  if (!order) return null;

  const allStatuses: OrderStatus[] = [
    'Menunggu',
    'Antrian',
    'Sedang Dicuci',
    'Deep Cleaning',
    'Drying',
    'Finishing',
    'QC',
    'Packing',
    'Siap Diantar',
    'Selesai',
  ];

  const currentStatusIndex = allStatuses.indexOf(order.status);
  const completedSOPCount = order.sopList.filter((s) => s.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden my-6">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-blue-600 font-black text-xs rounded-xl">{order.invoiceNo}</div>
            <div>
              <h3 className="font-extrabold text-base">Detail Order & Tracking SOP Digital</h3>
              <p className="text-[11px] text-slate-300">
                {order.shoe.brand} {order.shoe.model} • {order.customerName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPrintInvoice(order)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" /> Thermal Print
            </button>
            <button
              onClick={() => onSendWhatsApp(order)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WA Customer
            </button>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-xl transition-colors">
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[82vh] overflow-y-auto">
          {/* Status Pipeline Visualizer */}
          <div className="bg-slate-50 dark:bg-slate-700/40 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-500" /> Progress Status Operasional
              </h4>
              <select
                value={order.status}
                onChange={(e) => onUpdateStatus(order.id, e.target.value as OrderStatus)}
                className="px-3 py-1 text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 text-blue-600 dark:text-blue-400 rounded-xl cursor-pointer"
              >
                {allStatuses.map((st) => (
                  <option key={st} value={st}>
                    Ubah Status: {st}
                  </option>
                ))}
              </select>
            </div>

            {/* Stepper Grid */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-1 text-center">
              {allStatuses.map((st, idx) => {
                const isPassed = idx <= currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;
                return (
                  <div key={st} className="flex flex-col items-center">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${
                        isCurrent
                          ? 'bg-blue-600 text-white ring-4 ring-blue-500/30 scale-110'
                          : isPassed
                          ? 'bg-emerald-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-600 text-slate-400'
                      }`}
                    >
                      {isPassed ? <Check className="w-3 h-3" /> : idx + 1}
                    </div>
                    <span className={`text-[9px] font-bold mt-1.5 leading-tight ${isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                      {st}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Interactive Before/After Visualizer Slider */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Interactive Before / After Slider
                </h4>
                <p className="text-[11px] text-slate-400 mb-3">Geser slider untuk melihat perbandingan hasil pencucian</p>
              </div>

              {/* Slider Image Container */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden select-none border border-slate-200 dark:border-slate-700">
                {/* Clean Image (After) */}
                <img
                  src={order.shoe.photoAfter || '/images/shoe_clean_1.jpg'}
                  alt="After"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Dirty Image (Before) clipped */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <img
                    src={order.shoe.photoBefore}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover max-w-none"
                    style={{ width: '100%', height: '100%' }}
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 text-white text-[10px] font-extrabold rounded-md backdrop-blur-sm">
                    BEFORE
                  </div>
                </div>

                <div className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-600/90 text-white text-[10px] font-extrabold rounded-md backdrop-blur-sm">
                  AFTER
                </div>

                {/* Slider Handle */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize shadow-lg flex items-center justify-center"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center font-bold text-[10px] shadow-md border border-slate-300">
                    ↔
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full"
                />
              </div>

              <div className="mt-3 text-center">
                <span className="text-[11px] text-slate-400">
                  Material: <strong className="text-slate-700 dark:text-slate-200">{order.shoe.material}</strong> • Ukuran: <strong className="text-slate-700 dark:text-slate-200">{order.shoe.size}</strong>
                </span>
              </div>
            </div>

            {/* Interactive Digital SOP Checklist */}
            <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-slate-700 pb-2">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" /> Digital SOP Checklist
                  </h4>
                  <p className="text-[11px] text-slate-400">Centang tahapan yang sudah selesai dilakukan teknisi</p>
                </div>
                <span className="text-xs font-extrabold px-2.5 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">
                  {completedSOPCount} / {order.sopList.length} Done
                </span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {order.sopList.map((sop) => (
                  <label
                    key={sop.id}
                    onClick={() => onUpdateSOP(order.id, sop.id)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                      sop.completed
                        ? 'bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-900/60'
                        : 'bg-slate-50 border-slate-200 dark:bg-slate-700/40 dark:border-slate-700 hover:border-blue-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center transition-all ${
                          sop.completed ? 'bg-emerald-600 text-white' : 'border border-slate-400 dark:border-slate-500'
                        }`}
                      >
                        {sop.completed && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className={`text-xs font-semibold ${sop.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                        {sop.label}
                      </span>
                    </div>
                    {sop.completedAt && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{sop.completedAt}</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Details & Notes Footer Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-slate-50 dark:bg-slate-700/40 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Catatan Kerusakan Sepatu</span>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {order.shoe.damageNotes || 'Tidak ada catatan khusus'}
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {order.shoe.damageChecklist.map((d) => (
                  <span key={d} className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 font-bold rounded-md">
                    ⚠️ {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-700/40 rounded-2xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">Kelengkapan Bawaan</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {order.shoe.completenessChecklist.map((c) => (
                  <span key={c} className="text-[10px] px-2 py-0.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold rounded-md">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-slate-700/60 rounded-2xl border border-blue-100 dark:border-slate-600 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 block">Total Tagihan & Pembayaran</span>
                <p className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  Rp {order.totalAmount.toLocaleString('id-ID')}
                </p>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-300">
                  {order.paymentMethod} • Status: <strong className="text-emerald-600">{order.paymentStatus}</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
