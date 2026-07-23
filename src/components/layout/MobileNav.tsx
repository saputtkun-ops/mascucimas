import React from 'react';
import { LayoutDashboard, ShoppingBag, Users, Image as ImageIcon, Truck, Plus } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
  onOpenNewOrder?: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  activeTab,
  setActiveTab,
  pendingCount,
  onOpenNewOrder,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-between shadow-2xl pb-safe">
      {/* Tab 1: Dashboard */}
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex flex-col items-center flex-1 py-1 transition-all ${
          activeTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105' : 'text-slate-500 dark:text-slate-400 font-medium'
        }`}
      >
        <LayoutDashboard className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">Dashboard</span>
      </button>

      {/* Tab 2: Orders */}
      <button
        onClick={() => setActiveTab('orders')}
        className={`flex flex-col items-center flex-1 py-1 transition-all relative ${
          activeTab === 'orders' ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105' : 'text-slate-500 dark:text-slate-400 font-medium'
        }`}
      >
        <ShoppingBag className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">Order</span>
        {pendingCount > 0 && (
          <span className="absolute top-0 right-3 w-4 h-4 bg-blue-600 text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-sm">
            {pendingCount}
          </span>
        )}
      </button>

      {/* Center Floating Plus Action Button */}
      {onOpenNewOrder && (
        <div className="flex-1 flex justify-center -mt-6">
          <button
            onClick={onOpenNewOrder}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/40 flex items-center justify-center active:scale-90 transition-all border-2 border-white dark:border-slate-900"
            title="Tambah Order Baru"
          >
            <Plus className="w-6 h-6 stroke-[3]" />
          </button>
        </div>
      )}

      {/* Tab 3: Customers */}
      <button
        onClick={() => setActiveTab('customers')}
        className={`flex flex-col items-center flex-1 py-1 transition-all ${
          activeTab === 'customers' ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105' : 'text-slate-500 dark:text-slate-400 font-medium'
        }`}
      >
        <Users className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">Pelanggan</span>
      </button>

      {/* Tab 4: Pickup */}
      <button
        onClick={() => setActiveTab('pickup')}
        className={`flex flex-col items-center flex-1 py-1 transition-all ${
          activeTab === 'pickup' ? 'text-blue-600 dark:text-blue-400 font-extrabold scale-105' : 'text-slate-500 dark:text-slate-400 font-medium'
        }`}
      >
        <Truck className="w-5 h-5 mb-0.5" />
        <span className="text-[10px]">Pickup</span>
      </button>
    </div>
  );
};
