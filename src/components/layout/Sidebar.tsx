import React from 'react';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Image as ImageIcon,
  Truck,
  Boxes,
  BadgeDollarSign,
  UserCheck,
  CheckCheck,
  Settings,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Lock,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  pendingCount: number;
  userRole: 'Owner' | 'Karyawan';
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  pendingCount,
  userRole,
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, ownerOnly: false },
    { id: 'orders', label: 'Modul Order', icon: ShoppingBag, badge: pendingCount, ownerOnly: false },
    { id: 'customers', label: 'Pelanggan', icon: Users, ownerOnly: false },
    { id: 'gallery', label: 'Galeri Before After', icon: ImageIcon, ownerOnly: false },
    { id: 'pickup', label: 'Pickup & Delivery', icon: Truck, ownerOnly: false },
    { id: 'inventory', label: 'Inventaris & Supplier', icon: Boxes, ownerOnly: false },
    { id: 'qc', label: 'Quality Control (QC)', icon: CheckCheck, ownerOnly: false },
    { id: 'finance', label: 'Keuangan & Cash Flow', icon: BadgeDollarSign, ownerOnly: true },
    { id: 'employees', label: 'Karyawan & Akses', icon: UserCheck, ownerOnly: true },
    { id: 'settings', label: 'Pengaturan POS', icon: Settings, ownerOnly: true },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 relative ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white font-extrabold text-lg shadow-md shadow-blue-500/20 shrink-0">
            M
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                MAS CUCI MAS
              </h1>
              <p className="text-[10px] font-bold text-blue-600 dark:text-blue-400 tracking-wide uppercase">
                {userRole === 'Owner' ? '👑 Mode Owner (Full)' : '👤 Mode Karyawan'}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isLocked = item.ownerOnly && userRole !== 'Owner';

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold'
                  : isLocked
                  ? 'text-slate-400 dark:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 shrink-0 transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
              {!collapsed && <span className="truncate">{item.label}</span>}
              
              {/* Lock badge if owner-only and in Karyawan mode */}
              {!collapsed && isLocked && (
                <Lock className="w-3.5 h-3.5 ml-auto text-amber-500 shrink-0" title="Memerlukan PIN Owner" />
              )}

              {!collapsed && !isLocked && item.badge ? (
                <span
                  className={`ml-auto text-xs px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/60 dark:text-blue-300'
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Footer Banner */}
      {!collapsed && (
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/60 border border-blue-100 dark:border-slate-700/60">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              {userRole === 'Owner' ? 'Akses Rahasia Aktif' : 'Akses Karyawan Staf'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
            {userRole === 'Owner'
              ? 'Seluruh data keuangan & Laba Bersih dapat diakses.'
              : 'Fitur keuangan & gaji terkunci sandi PIN Owner.'}
          </p>
        </div>
      )}
    </aside>
  );
};
