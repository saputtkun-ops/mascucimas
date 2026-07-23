import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, Plus, Sparkles, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  onOpenNewOrder: () => void;
  onOpenQRScanner: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  selectedBranch,
  setSelectedBranch,
  onOpenNewOrder,
  onOpenQRScanner,
  searchQuery,
  setSearchQuery,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: '1', title: 'Stok Sikat Bulu Kuda Menipis', time: '10 menit lalu', type: 'warning', text: 'Tersisa 4 pcs di Rak B1' },
    { id: '2', title: 'Order Baru Masuk (MCM-20260723-004)', time: '25 menit lalu', type: 'info', text: 'Budi Santoso - Nike Air Force 1' },
    { id: '3', title: 'QC Approval Diperlukan', time: '1 jam lalu', type: 'success', text: 'Order MCM-20260723-002 telah siap QC' },
  ];

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 md:px-6 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Left: Global Search & Branch Switcher */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari order, no invoice, pelanggan, atau sepatu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800/70 text-slate-900 dark:text-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border border-transparent dark:border-slate-700/50 placeholder-slate-400"
          />
        </div>

        {/* Branch Selector */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
          <MapPin className="w-3.5 h-3.5 text-blue-500" />
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="bg-transparent focus:outline-none cursor-pointer text-xs font-semibold"
          >
            <option value="Cabang Utama (Kebayoran)">Cabang Kebayoran</option>
            <option value="Cabang Gading Serpong">Cabang Gading Serpong</option>
            <option value="Cabang Bandung Dago">Cabang Bandung Dago</option>
          </select>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* QR Scanner Trigger */}
        <button
          onClick={onOpenQRScanner}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all"
          title="Scan QR / Barcode Invoice"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Scan QR</span>
        </button>

        {/* New Order Button */}
        <button
          onClick={onOpenNewOrder}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 rounded-xl shadow-sm shadow-blue-500/20 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Order Baru</span>
          <span className="sm:hidden">Tambah</span>
        </button>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notification Bell with Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 z-50 animate-fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-2 mb-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Notifikasi Real-Time</h4>
                <span className="text-[10px] bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400 px-2 py-0.5 rounded-full font-semibold">3 Baru</span>
              </div>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div key={n.id} className="flex gap-2.5 items-start p-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-xl transition-colors cursor-pointer">
                    {n.type === 'warning' ? (
                      <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{n.text}</p>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
