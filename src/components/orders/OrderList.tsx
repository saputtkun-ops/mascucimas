import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Filter,
  Search,
  CheckSquare,
  Printer,
  MessageSquare,
  Eye,
  FileSpreadsheet,
  Calendar,
  Layers,
  Sparkles,
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

interface OrderListProps {
  orders: Order[];
  onOpenNewOrder: () => void;
  onSelectOrder: (order: Order) => void;
  onPrintInvoice: (order: Order) => void;
  onSendWhatsApp: (order: Order) => void;
}

export const OrderList: React.FC<OrderListProps> = ({
  orders,
  onOpenNewOrder,
  onSelectOrder,
  onPrintInvoice,
  onSendWhatsApp,
}) => {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('Semua');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const statusOptions: (OrderStatus | 'Semua')[] = [
    'Semua',
    'Menunggu',
    'Antrian',
    'Sedang Dicuci',
    'Deep Cleaning',
    'Drying',
    'Finishing',
    'QC',
    'Packing',
    'Siap Diantar',
    'Selesai',
  ];

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = selectedStatusFilter === 'Semua' || ord.status === selectedStatusFilter;
    const matchesSearch =
      ord.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.shoe.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ord.shoe.model.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Selesai':
        return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200';
      case 'Siap Diantar':
        return 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300 border-cyan-200';
      case 'QC':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-200';
      case 'Deep Cleaning':
      case 'Sedang Dicuci':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200';
      default:
        return 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-200';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-blue-600" /> Modul Manajemen Order & Sepatu
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Kelola transaksi masuk, tracking progress digital SOP, cetak nota thermal, dan WhatsApp otomatis.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNewOrder}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" /> Order Baru (POS)
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-stretch md:items-center">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari berdasarkan Invoice, Nama Pelanggan, Merek, atau Model Sepatu..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs md:text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total:</span>
            <span className="text-xs font-extrabold px-2.5 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 rounded-full">
              {filteredOrders.length} Order
            </span>
          </div>
        </div>

        {/* Scrollable Status Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {statusOptions.map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatusFilter(st)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedStatusFilter === st
                  ? 'bg-slate-900 text-white dark:bg-blue-600 dark:text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Order Table */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs md:text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 font-bold uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4">Invoice / Tgl</th>
                <th className="py-3.5 px-4">Sepatu & Pelanggan</th>
                <th className="py-3.5 px-4">Layanan</th>
                <th className="py-3.5 px-4">Status Progress</th>
                <th className="py-3.5 px-4">SOP Digital</th>
                <th className="py-3.5 px-4">Total & Bayar</th>
                <th className="py-3.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {filteredOrders.map((ord) => {
                const completedSopCount = ord.sopList.filter((s) => s.completed).length;
                const totalSopCount = ord.sopList.length;
                const sopPercentage = Math.round((completedSopCount / totalSopCount) * 100);

                return (
                  <tr
                    key={ord.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-700/40 transition-colors group cursor-pointer"
                    onClick={() => onSelectOrder(ord)}
                  >
                    {/* Invoice & Date */}
                    <td className="py-3.5 px-4">
                      <p className="font-extrabold text-blue-600 dark:text-blue-400 group-hover:underline">{ord.invoiceNo}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{ord.dateIn}</p>
                      <span className="inline-block text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md mt-1">
                        {ord.branchName}
                      </span>
                    </td>

                    {/* Shoe & Customer */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={ord.shoe.photoBefore}
                          alt={ord.shoe.model}
                          className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                        />
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{ord.shoe.brand} {ord.shoe.model}</p>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Ukuran: {ord.shoe.size} • Material: {ord.shoe.material}
                          </p>
                          <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                            👤 {ord.customerName} ({ord.customerPhone})
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Service Type */}
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">{ord.serviceType}</span>
                      <span className="text-[10px] text-slate-400">Est. Deadline: {ord.deadline}</span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-block px-3 py-1 text-xs font-extrabold rounded-full border ${getStatusColor(ord.status)}`}>
                        {ord.status}
                      </span>
                      {ord.technicianName && (
                        <p className="text-[10px] text-slate-400 mt-1">Teknisi: {ord.technicianName}</p>
                      )}
                    </td>

                    {/* SOP Progress Bar */}
                    <td className="py-3.5 px-4">
                      <div className="w-28 space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-600 dark:text-slate-300">
                          <span>{completedSopCount}/{totalSopCount} SOP</span>
                          <span>{sopPercentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-300"
                            style={{ width: `${sopPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Amount & Payment */}
                    <td className="py-3.5 px-4">
                      <p className="font-black text-slate-900 dark:text-white">{formatRupiah(ord.totalAmount)}</p>
                      <span
                        className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md mt-0.5 ${
                          ord.paymentStatus === 'Lunas'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {ord.paymentStatus} ({ord.paymentMethod})
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        {/* Thermal Print */}
                        <button
                          onClick={() => onPrintInvoice(ord)}
                          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                          title="Cetak Invoice Thermal"
                        >
                          <Printer className="w-4 h-4 text-blue-500" />
                        </button>

                        {/* WA Notif */}
                        <button
                          onClick={() => onSendWhatsApp(ord)}
                          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                          title="Kirim Update WA"
                        >
                          <MessageSquare className="w-4 h-4 text-emerald-500" />
                        </button>

                        {/* View Detail */}
                        <button
                          onClick={() => onSelectOrder(ord)}
                          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors"
                          title="Buka SOP & Detail Sepatu"
                        >
                          <Eye className="w-4 h-4 text-purple-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
