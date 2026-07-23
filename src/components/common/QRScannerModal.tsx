import React, { useState } from 'react';
import { X, QrCode, Sparkles, CheckCircle2 } from 'lucide-react';
import { Order } from '../../types';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  orders,
  onSelectOrder,
}) => {
  const [scannedCode, setScannedCode] = useState('');

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    const targetOrder = orders[0];
    if (targetOrder) {
      onSelectOrder(targetOrder);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 text-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-800 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full">
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-2">
            <QrCode className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black">Scanner QR Code / Barcode Invoice</h3>
          <p className="text-xs text-slate-400 mt-1">Arahkan kamera ke QR Code pada hangtag sepatu atau resi invoice</p>
        </div>

        {/* Viewfinder simulation */}
        <div className="relative w-full h-56 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden flex items-center justify-center">
          <div className="w-40 h-40 border-2 border-amber-400 rounded-2xl relative flex items-center justify-center">
            <div className="w-full h-0.5 bg-amber-400 shadow-[0_0_15px_#f59e0b] animate-pulse"></div>
          </div>
          <span className="absolute bottom-3 text-[10px] text-amber-300 font-bold bg-black/60 px-3 py-1 rounded-full">
            Kamera Kamera Aktif
          </span>
        </div>

        <div className="mt-5 space-y-2">
          <button
            onClick={handleSimulateScan}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> Simulasi Scan Invoice MCM-20260723-001
          </button>
        </div>
      </div>
    </div>
  );
};
