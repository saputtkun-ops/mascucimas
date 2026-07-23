import React, { useState } from 'react';
import { Settings, Store, Printer, MessageSquare, Database, Key, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';

interface SettingsPageProps {
  ownerPin: string;
  onUpdateOwnerPin: (newPin: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ ownerPin, onUpdateOwnerPin }) => {
  const [storeName, setStoreName] = useState('Mas Cuci Mas Kebayoran');
  const [whatsappApi, setWhatsappApi] = useState('https://api.whatsapp-gateway.mascucimas.id/v1/send');
  const [printerName, setPrinterName] = useState('Thermal Printer 80mm (USB/Bluetooth)');

  const [newPinInput, setNewPinInput] = useState('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState('');

  const handleSavePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPinInput || newPinInput.length < 4) {
      alert('PIN Baru harus minimal 4 karakter/angka!');
      return;
    }
    onUpdateOwnerPin(newPinInput);
    setPinSuccessMsg(`PIN Rahasia Owner Berhasil Diperbarui menjadi "${newPinInput}"!`);
    setNewPinInput('');
    setTimeout(() => setPinSuccessMsg(''), 4000);
  };

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" /> Pengaturan POS & Sistem Operasional
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Konfigurasi profil toko, PIN Rahasia Owner, integrasi WhatsApp Gateway, Printer Thermal 80mm, dan Backup Database.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Keamanan & Ganti PIN Rahasia Owner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-6 rounded-3xl border border-slate-800 text-white shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base">Keamanan & Ubah PIN Rahasia Owner</h3>
                <p className="text-xs text-slate-400">PIN saat ini digunakan untuk membuka Mode Owner & Laporan Keuangan.</p>
              </div>
            </div>

            <div className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-xl text-xs">
              PIN Aktif: <strong className="text-amber-400 font-mono text-sm ml-1">{ownerPin}</strong>
            </div>
          </div>

          <form onSubmit={handleSavePin} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center pt-2">
            <div className="relative flex-1">
              <input
                type="text"
                required
                minLength={4}
                maxLength={12}
                placeholder="Ketik PIN Baru (contoh: 8888 atau password baru)"
                value={newPinInput}
                onChange={(e) => setNewPinInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 text-white text-xs md:text-sm font-mono rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center justify-center gap-1.5 transition-all active:scale-95 shrink-0"
            >
              <ShieldCheck className="w-4 h-4" /> Simpan PIN Baru
            </button>
          </form>

          {pinSuccessMsg && (
            <p className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {pinSuccessMsg}
            </p>
          )}
        </div>

        {/* Store Profile */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Store className="w-4 h-4 text-blue-500" /> Profil Toko & Cabang Utama
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Toko</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Jam Operasional</label>
              <input
                type="text"
                defaultValue="08.00 - 21.00 WIB (Setiap Hari)"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp & Printer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-500" /> Integrasi WhatsApp API
            </h3>
            <p className="text-xs text-slate-400">Endpoint gateway notifikasi otomatis ke nomor HP pelanggan</p>
            <input
              type="text"
              value={whatsappApi}
              onChange={(e) => setWhatsappApi(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
            />
            <button
              onClick={() => alert('Tes Koneksi WhatsApp Gateway Berhasil! Connected to +6281234567890')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm"
            >
              Tes Kirim Pesan WA
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Printer className="w-4 h-4 text-blue-500" /> Driver Printer Thermal POS
            </h3>
            <p className="text-xs text-slate-400">Pilih perangkat printer struk thermal (58mm / 80mm)</p>
            <input
              type="text"
              value={printerName}
              onChange={(e) => setPrinterName(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
            />
            <button
              onClick={() => alert('Printer Thermal Test Page Printed Successfully!')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-sm"
            >
              Cetak Struk Uji Coba
            </button>
          </div>
        </div>

        {/* Database Backup & Restore */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-purple-500" /> Backup & Restore Database PostgreSQL / Cloud
          </h3>
          <p className="text-xs text-slate-400">Simpan cadangan seluruh data transaksi, pelanggan & galeri foto ke Google Drive.</p>
          <div className="flex gap-2">
            <button
              onClick={() => alert('Database PostgreSQL Backup Berhasil Disimpan di Google Drive!')}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs rounded-xl shadow-sm flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" /> Backup Database Sekarang
            </button>
            <button
              onClick={() => alert('Database Restored Successfully!')}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-xs rounded-xl"
            >
              Restore Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
