import React from 'react';
import { X, Printer, Check } from 'lucide-react';
import { Order } from '../../types';

interface ThermalReceiptModalProps {
  order: Order | null;
  onClose: () => void;
}

export const ThermalReceiptModal: React.FC<ThermalReceiptModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white text-slate-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl relative font-mono text-xs">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>

        <div className="text-center pb-4 border-b border-dashed border-slate-300">
          <h2 className="font-black text-base tracking-wider">MAS CUCI MAS</h2>
          <p className="text-[10px] text-slate-500">Premium Shoe Cleaning & Care</p>
          <p className="text-[10px] text-slate-500">{order.branchName}</p>
          <p className="text-[10px] text-slate-500">WhatsApp: 0812-3456-7890</p>
        </div>

        <div className="py-3 border-b border-dashed border-slate-300 space-y-1 text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-500">No. Invoice:</span>
            <span className="font-extrabold">{order.invoiceNo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Tanggal Masuk:</span>
            <span>{order.dateIn}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Pelanggan:</span>
            <span className="font-extrabold">{order.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">No. HP/WA:</span>
            <span>{order.customerPhone}</span>
          </div>
        </div>

        {/* Item */}
        <div className="py-3 border-b border-dashed border-slate-300 space-y-2">
          <div className="font-bold text-xs">{order.shoe.brand} {order.shoe.model}</div>
          <div className="text-[10px] text-slate-600">
            Material: {order.shoe.material} • Size: {order.shoe.size}
          </div>
          <div className="flex justify-between text-xs font-bold pt-1">
            <span>Treatment: {order.serviceType}</span>
            <span>Rp {order.totalAmount.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div className="py-3 border-b border-dashed border-slate-300 space-y-1 text-xs font-bold">
          <div className="flex justify-between text-base">
            <span>TOTAL:</span>
            <span>Rp {order.totalAmount.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-[11px] text-slate-600">
            <span>Metode Bayar:</span>
            <span>{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between text-[11px] text-slate-600">
            <span>Status Bayar:</span>
            <span className="text-emerald-600">{order.paymentStatus}</span>
          </div>
        </div>

        <div className="pt-4 text-center space-y-2">
          <p className="text-[10px] text-slate-500">
            Terima kasih telah mempercayakan perawatan sepatu Anda pada Mas Cuci Mas!
          </p>
          <div className="flex items-center justify-center p-2 bg-slate-100 rounded-xl">
            <span className="text-[10px] font-bold text-slate-700">QR Code Tracking Active</span>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="mt-4 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md"
        >
          <Printer className="w-4 h-4" /> Cetak Struk Thermal (80mm)
        </button>
      </div>
    </div>
  );
};
