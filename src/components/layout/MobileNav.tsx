import React from 'react';
import { LayoutDashboard, ShoppingBag, Users, Image as ImageIcon, Truck } from 'lucide-react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  pendingCount: number;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab, pendingCount }) => {
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Order', icon: ShoppingBag, badge: pendingCount },
    { id: 'customers', label: 'Pelanggan', icon: Users },
    { id: 'gallery', label: 'Galeri', icon: ImageIcon },
    { id: 'pickup', label: 'Pickup', icon: Truck },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 px-2 py-1 flex items-center justify-around">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all relative ${
              isActive ? 'text-blue-600 dark:text-blue-400 font-bold' : 'text-slate-500 dark:text-slate-400 font-medium'
            }`}
          >
            <Icon className="w-5 h-5 mb-0.5" />
            <span className="text-[10px]">{item.label}</span>
            {item.badge ? (
              <span className="absolute top-1 right-2 w-4 h-4 bg-blue-600 text-white rounded-full text-[9px] font-extrabold flex items-center justify-center">
                {item.badge}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
};
