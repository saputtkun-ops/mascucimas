import React, { useState } from 'react';
import { X, Lock, Key, ShieldCheck, AlertCircle, Edit3, CheckCircle2 } from 'lucide-react';

interface OwnerAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  correctPin: string;
  onUpdateOwnerPin: (newPin: string) => void;
}

export const OwnerAuthModal: React.FC<OwnerAuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  correctPin,
  onUpdateOwnerPin,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'changePin'>('login');
  
  // Login State
  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Change PIN State
  const [oldPinInput, setOldPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [changeErrorMsg, setChangeErrorMsg] = useState('');
  const [changeSuccessMsg, setChangeSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === correctPin) {
      setErrorMsg('');
      setPinInput('');
      onSuccess();
    } else {
      setErrorMsg('Sandi / PIN Owner salah! Akses ditolak.');
    }
  };

  const handleChangePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (oldPinInput !== correctPin) {
      setChangeErrorMsg('PIN Lama tidak cocok!');
      return;
    }
    if (!newPinInput || newPinInput.length < 4) {
      setChangeErrorMsg('PIN Baru minimal 4 angka/karakter!');
      return;
    }
    onUpdateOwnerPin(newPinInput);
    setChangeErrorMsg('');
    setChangeSuccessMsg(`PIN Berhasil Diubah menjadi "${newPinInput}"!`);
    setOldPinInput('');
    setNewPinInput('');
    setTimeout(() => {
      setChangeSuccessMsg('');
      setActiveTab('login');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 text-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-800 relative">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full">
          <X className="w-5 h-5 text-slate-400" />
        </button>

        <div className="text-center mb-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mx-auto mb-2 shadow-lg">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-black tracking-tight">Otentikasi Mode Owner</h3>
          <p className="text-xs text-slate-400 mt-1">Proteksi Keuangan & Pengaturan Bisnis Mas Cuci Mas</p>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl mb-4 border border-slate-800">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'login' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Masuk Mode Owner
          </button>
          <button
            onClick={() => setActiveTab('changePin')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'changePin' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            ✏️ Ubah PIN Owner
          </button>
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
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

            <div className="pt-1">
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 transition-all active:scale-95"
              >
                <ShieldCheck className="w-4 h-4" /> Buka Akses Owner
              </button>
            </div>

            <p className="text-[10px] text-slate-500 text-center italic">
              Lupa PIN? PIN Default saat ini adalah: <strong className="text-slate-300">{correctPin}</strong>
            </p>
          </form>
        ) : (
          <form onSubmit={handleChangePinSubmit} className="space-y-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">PIN Owner Lama</label>
              <input
                type="password"
                required
                placeholder="Masukkan PIN lama (default: 1234)"
                value={oldPinInput}
                onChange={(e) => setOldPinInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-white text-xs font-mono rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 mb-1">PIN Owner Baru</label>
              <input
                type="text"
                required
                minLength={4}
                maxLength={12}
                placeholder="Ketik PIN Baru (misal: 8888)"
                value={newPinInput}
                onChange={(e) => setNewPinInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 text-amber-400 text-xs font-mono font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {changeErrorMsg && (
              <p className="text-xs text-red-400 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {changeErrorMsg}
              </p>
            )}

            {changeSuccessMsg && (
              <p className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {changeSuccessMsg}
              </p>
            )}

            <button
              type="submit"
              className="w-full mt-2 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all"
            >
              <Edit3 className="w-4 h-4" /> Simpan PIN Baru
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
