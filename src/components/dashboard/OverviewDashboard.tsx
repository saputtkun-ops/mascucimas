import React from 'react';
import {
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Star,
  Plus,
  QrCode,
  Search,
  Calendar,
  Printer,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';
import { Order, Customer, FinancialRecord } from '../../types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface OverviewDashboardProps {
  orders: Order[];
  customers: Customer[];
  financials: FinancialRecord[];
  onOpenNewOrder: () => void;
  onOpenQRScanner: () => void;
  onNavigateTab: (tab: string) => void;
  onSelectOrder: (order: Order) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  orders,
  customers,
  financials,
  onOpenNewOrder,
  onOpenQRScanner,
  onNavigateTab,
  onSelectOrder,
}) => {
  // Metrics calculation
  const totalOrdersToday = orders.length;
  const ordersProcessing = orders.filter((o) => o.status !== 'Selesai' && o.status !== 'Siap Diantar').length;
  const ordersCompleted = orders.filter((o) => o.status === 'Selesai').length;
  const ordersDelivering = orders.filter((o) => o.status === 'Siap Diantar').length;

  const totalIncomeToday = orders
    .filter((o) => o.paymentStatus === 'Lunas')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const monthlyIncome = 28450000;
  const monthlyExpense = 9200000;
  const netProfit = monthlyIncome - monthlyExpense;

  const totalCustomers = customers.length;
  const averageRating = 4.9;

  // Chart data
  const revenueChartData = [
    { day: 'Sen', Pendapatan: 1200000, Order: 14 },
    { day: 'Sel', Pendapatan: 1850000, Order: 19 },
    { day: 'Rab', Pendapatan: 1400000, Order: 15 },
    { day: 'Kam', Pendapatan: 2100000, Order: 22 },
    { day: 'Jum', Pendapatan: 2950000, Order: 31 },
    { day: 'Sab', Pendapatan: 3800000, Order: 42 },
    { day: 'Min', Pendapatan: 4100000, Order: 48 },
  ];

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 p-6 md:p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Operasional Real-time Aktif
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Selamat Datang Kembali, Owner! 👋
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Performa bisnis Mas Cuci Mas hari ini sangat baik. Ada{' '}
              <span className="font-bold text-amber-300">{ordersProcessing} sepatu</span> sedang diproses dalam jalur laundry digital.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={onOpenNewOrder}
              className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 font-semibold text-sm rounded-xl shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" /> Order Baru (POS)
            </button>
            <button
              onClick={onOpenQRScanner}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition-all"
            >
              <QrCode className="w-4 h-4 text-cyan-400" /> Scan QR
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Toolbar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <button
          onClick={onOpenNewOrder}
          className="flex flex-col items-center justify-center p-3.5 bg-white dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Plus className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Tambah Order</span>
        </button>

        <button
          onClick={onOpenQRScanner}
          className="flex flex-col items-center justify-center p-3.5 bg-white dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <QrCode className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Scan QR Sepatu</span>
        </button>

        <button
          onClick={() => onNavigateTab('customers')}
          className="flex flex-col items-center justify-center p-3.5 bg-white dark:bg-slate-800/80 hover:bg-purple-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Search className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Cari Pelanggan</span>
        </button>

        <button
          onClick={() => onNavigateTab('pickup')}
          className="flex flex-col items-center justify-center p-3.5 bg-white dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Jadwal Pickup</span>
        </button>

        <button
          onClick={() => onNavigateTab('orders')}
          className="flex flex-col items-center justify-center p-3.5 bg-white dark:bg-slate-800/80 hover:bg-cyan-50 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700/80 rounded-2xl transition-all group col-span-2 sm:col-span-1"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
            <Printer className="w-5 h-5" />
          </div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Cetak Invoice</span>
        </button>
      </div>

      {/* KPI Cards Grid (10 Required Widgets) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Total Order Hari Ini</span>
            <ShoppingBag className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{totalOrdersToday}</p>
          <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> +18% vs Kemarin
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Order Diproses</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{ordersProcessing}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Di Jalur Washed/Drying</span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Order Selesai</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{ordersCompleted}</p>
          <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1 mt-1">
            100% Passed QC
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Order Diantar</span>
            <Truck className="w-4 h-4 text-indigo-500" />
          </div>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{ordersDelivering}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Kurir Aktif</span>
        </div>

        <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-4 rounded-2xl shadow-sm col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-semibold">Omset Hari Ini</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-xl font-black text-slate-900 dark:text-white">{formatRupiah(totalIncomeToday)}</p>
          <span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp className="w-3 h-3" /> Realtime Paid
          </span>
        </div>
      </div>

      {/* Financial Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white p-5 rounded-2xl shadow-md">
          <span className="text-xs text-blue-200 font-medium">Pendapatan Bulanan</span>
          <p className="text-2xl font-black mt-1">{formatRupiah(monthlyIncome)}</p>
          <span className="text-xs text-blue-200 mt-2 block">+14.2% dibanding bulan lalu</span>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-semibold">Pengeluaran Bulanan</span>
            <TrendingDown className="w-4 h-4 text-red-500" />
          </div>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{formatRupiah(monthlyExpense)}</p>
          <span className="text-[11px] text-slate-400 mt-2 block">Bahan & Komisi Operasional</span>
        </div>

        <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 p-5 rounded-2xl shadow-sm">
          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">Laba Bersih Estimasi</span>
          <p className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-1">{formatRupiah(netProfit)}</p>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-2 block">
            Margin Bersih ~67.6%
          </span>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-5 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Pelanggan & Rating</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-black text-slate-900 dark:text-white">{totalCustomers}</span>
              <span className="text-xs text-slate-400">Member</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-amber-400 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-400" /> {averageRating} / 5.0 Rating
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Interactive Charts & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Revenue & Order Volume Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Grafik Pendapatan & Order Mingguan</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Tren transaksi 7 hari terakhir di Cabang Utama</p>
            </div>
            <span className="text-xs px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-bold rounded-xl">
              Minggu Ini
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueChartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(v) => `${v / 1000}k`} tickLine={false} />
                <Tooltip
                  formatter={(value: any) => [formatRupiah(value), 'Pendapatan']}
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                />
                <Area type="monotone" dataKey="Pendapatan" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Col: Recent Orders List */}
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-5 rounded-3xl shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Order Terbaru</h3>
            <button
              onClick={() => onNavigateTab('orders')}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-0.5"
            >
              Lihat Semua <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-80">
            {orders.map((ord) => (
              <div
                key={ord.id}
                onClick={() => onSelectOrder(ord)}
                className="p-3 bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-600/60 rounded-2xl transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={ord.shoe.photoBefore}
                    alt={ord.shoe.model}
                    className="w-11 h-11 rounded-xl object-cover border border-slate-200 dark:border-slate-600"
                  />
                  <div>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">{ord.invoiceNo}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-300 font-medium">{ord.shoe.brand} {ord.shoe.model}</p>
                    <span className="text-[10px] text-slate-400">{ord.customerName}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
                    {ord.status}
                  </span>
                  <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200 mt-1">
                    {formatRupiah(ord.totalAmount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
