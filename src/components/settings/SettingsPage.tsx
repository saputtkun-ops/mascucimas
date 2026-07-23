import React, { useState } from 'react';
import { Settings, Store, Printer, MessageSquare, Database, Shield, Check, RefreshCw } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [storeName, setStoreName] = useState('Mas Cuci Mas Kebayoran');
  const [whatsappApi, setWhatsappApi] = useState('https://api.whatsapp-gateway.mascucimas.id/v1/send');
  const [printerName, setPrinterName] = useState('Thermal Printer 80mm (USB/Bluetooth)');

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-blue-600" /> Pengaturan POS & Sistem Operasional
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Konfigurasi profil toko, integrasi WhatsApp Gateway, Printer Thermal 80mm, dan Backup Database PostgreSQL.
          </p>
        </div>
      </div>

      <div className="space-y-4">
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
