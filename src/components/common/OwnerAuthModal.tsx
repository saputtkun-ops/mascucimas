import React, { useState } from 'react';
import { X, Lock, Key, ShieldCheck, AlertCircle } from 'lucide-react';

interface OwnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  correctPin: string;
}

export const OwnerAuthModal: React.FC<OwnerAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  correctPin,
}) => {
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === correctPin) {
      setErrorMsg('');
      setPinInput('');
      onSuccess();
    } else {
      setErrorMsg('Sandi / PIN Owner salah! Akses ditolak.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 text-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-800 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full">
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="text-center mb-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-blue-500/10">
            <Lock className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-black tracking-tight">Akses Khusus Owner</h3>
          <p className="text-xs text-slate-400 mt-1">Masukkan kata sandi / PIN rahasia untuk membuka Laporan Keuangan, Omset & Pengaturan Toko.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1">
              <Key className="w-3.5 h-3.5 text-blue-400" /> Kata Sandi / PIN Owner
            </label>
            <input
              type="password"
              required
              autoFocus
              maxLength={12}
              placeholder="Masukkan PIN (Default: 1234)"
              value={pinInput}
              onChange={(e) => {
                setPinInput(e.target.value);
                setErrorMsg('');
              }}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-700 text-white text-center text-lg font-black tracking-widest rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errorMsg && (
              <p className="text-xs text-red-400 font-bold mt-1.5 flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <ShieldCheck className="w-4 h-4" /> Buka Mode Owner
            </button>
          </div>

          <p className="text-[10px] text-slate-500 text-center italic">
            PIN Default: <strong className="text-slate-400">1234</strong> (Dapat diubah di Pengaturan POS)
          </p>
        </form>
      </div>
    </div>
  );
};
