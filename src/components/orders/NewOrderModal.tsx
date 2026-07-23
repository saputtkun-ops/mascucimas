import React, { useState } from 'react';
import { X, Camera, Check, Sparkles, User, ShoppingBag, ShieldAlert, CreditCard } from 'lucide-react';
import { Order, ServiceType, PaymentMethod, ShoeMaterial, OrderStatus } from '../../types';

interface NewOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveOrder: (newOrder: Order) => void;
  selectedBranch: string;
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  isOpen,
  onClose,
  onSaveOrder,
  selectedBranch,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const [brand, setBrand] = useState('Nike');
  const [model, setModel] = useState('Air Jordan 1 Retro');
  const [size, setSize] = useState('42 EU');
  const [color, setColor] = useState('White/Red');
  const [material, setMaterial] = useState<string>('Leather');
  const [damageNotes, setDamageNotes] = useState('Scuffs di midsole, noda oli rantai');

  const [serviceType, setServiceType] = useState<ServiceType>('Deep Clean');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('QRIS');
  const [paymentStatus, setPaymentStatus] = useState<'Lunas' | 'DP'>('Lunas');

  const [damageChecklist, setDamageChecklist] = useState<string[]>(['Midsole Yellowing', 'Noda Membandel']);
  const [completenessChecklist, setCompletenessChecklist] = useState<string[]>(['Insole Original', 'Tali Bawaan']);

  if (!isOpen) return null;

  const getServicePrice = (type: ServiceType) => {
    switch (type) {
      case 'Fast Clean': return 50000;
      case 'Deep Clean': return 75000;
      case 'Express 24 Hours': return 120000;
      case 'Unyellowing': return 150000;
      case 'Repaint & Recolor': return 250000;
      case 'Leather Special Care': return 180000;
      default: return 75000;
    }
  };

  const handleToggleDamage = (item: string) => {
    if (damageChecklist.includes(item)) {
      setDamageChecklist(damageChecklist.filter((i) => i !== item));
    } else {
      setDamageChecklist([...damageChecklist, item]);
    }
  };

  const handleToggleCompleteness = (item: string) => {
    if (completenessChecklist.includes(item)) {
      setCompletenessChecklist(completenessChecklist.filter((i) => i !== item));
    } else {
      setCompletenessChecklist([...completenessChecklist, item]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !model) return;

    const totalAmount = getServicePrice(serviceType);
    const invoiceNum = `MCM-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`;

    const newOrd: Order = {
      id: `ord-${Date.now()}`,
      invoiceNo: invoiceNum,
      customerId: `cust-${Date.now()}`,
      customerName,
      customerPhone,
      customerAddress,
      branchName: selectedBranch,
      dateIn: new Date().toISOString().replace('T', ' ').slice(0, 16),
      deadline: new Date(Date.now() + 48 * 3600 * 1000).toISOString().replace('T', ' ').slice(0, 16),
      estimatedFinish: new Date(Date.now() + 36 * 3600 * 1000).toISOString().replace('T', ' ').slice(0, 16),
      status: 'Menunggu',
      serviceType,
      totalAmount,
      paymentMethod,
      paymentStatus,
      technicianName: 'Agus Senior Care',
      shoe: {
        brand,
        model,
        size,
        color,
        material,
        photoBefore: '/images/shoe_dirty_1.jpg',
        photoAfter: '/images/shoe_clean_1.jpg',
        damageNotes,
        damageChecklist,
        completenessChecklist,
      },
      sopList: [
        { id: '1', label: 'Foto Before (4 Sisi)', completed: false },
        { id: '2', label: 'Lepas Tali & Insole', completed: false },
        { id: '3', label: 'Dry Brush Outsole & Midsole', completed: false },
        { id: '4', label: 'Pembersihan Outsole Khusus', completed: false },
        { id: '5', label: 'Deep Cleaning Upper', completed: false },
        { id: '6', label: 'Pengeringan Suhu Terkontrol (Drying)', completed: false },
        { id: '7', label: 'Aplikasi Premium Perfume & Anti-Bakteri', completed: false },
        { id: '8', label: 'Quality Control (QC)', completed: false },
        { id: '9', label: 'Foto After & Packing Premium', completed: false },
        { id: '10', label: 'Siap Diantar / Notifikasi WA', completed: false },
      ],
    };

    onSaveOrder(newOrd);
    onClose();
  };

  const damageOptions = ['Midsole Yellowing', 'Noda Membandel', 'Upper Sobek', 'Sole Lepas / Mangap', 'Luntur Warna'];
  const completenessOptions = ['Insole Original', 'Tali Bawaan', 'Box Original', 'Shoe Tree plastic', 'Dustbag Bawaan'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white dark:bg-slate-800 w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">Register Order Baru (POS)</h3>
              <p className="text-[11px] text-blue-300">Input Data Pelanggan, Sepatu & SOP Kasir</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Section 1: Customer Info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-1.5">
              <User className="w-4 h-4" /> 1. Data Pelanggan
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rizky Febian"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs md:text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Nomor WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="081234567890"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs md:text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Alamat Penjemputan / Pengantaran</label>
                <input
                  type="text"
                  placeholder="Jl. Sudirman No. 12, Kebayoran Baru, Jakarta Selatan"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs md:text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shoe Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> 2. Detail Sepatu & Foto
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Merek</label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Model Sepatu</label>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Ukuran</label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Material</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl"
                >
                  <option value="Leather">Leather (Kulit)</option>
                  <option value="Canvas">Canvas</option>
                  <option value="Suede">Suede / Nubuck</option>
                  <option value="Mesh">Mesh / Knit</option>
                </select>
              </div>
            </div>

            {/* Photo Before Simulator */}
            <div className="mt-3 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src="/images/shoe_dirty_1.jpg" alt="Before" className="w-14 h-14 rounded-xl object-cover border" />
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Foto Before Siap Upload</p>
                  <p className="text-[11px] text-slate-500">Foto otomatis terintegrasi dengan AI SOP Mas Cuci Mas</p>
                </div>
              </div>
              <button
                type="button"
                className="px-3 py-1.5 bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 text-xs font-bold rounded-xl flex items-center gap-1"
              >
                <Camera className="w-3.5 h-3.5" /> Take Photo
              </button>
            </div>

            {/* Checklists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Checklist Kerusakan / Noda</label>
                <div className="flex flex-wrap gap-1.5">
                  {damageOptions.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => handleToggleDamage(item)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                        damageChecklist.includes(item)
                          ? 'bg-amber-500 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Checklist Kelengkapan</label>
                <div className="flex flex-wrap gap-1.5">
                  {completenessOptions.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => handleToggleCompleteness(item)}
                      className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-all ${
                        completenessChecklist.includes(item)
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Service & Payment */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4" /> 3. Pilih Layanan & Pembayaran
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Jenis Layanan</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value as ServiceType)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl font-bold text-blue-600 dark:text-blue-400"
                >
                  <option value="Fast Clean">Fast Clean (Rp 50.000)</option>
                  <option value="Deep Clean">Deep Clean (Rp 75.000)</option>
                  <option value="Express 24 Hours">Express 24 Hours (Rp 120.000)</option>
                  <option value="Unyellowing">Unyellowing (Rp 150.000)</option>
                  <option value="Repaint & Recolor">Repaint & Recolor (Rp 250.000)</option>
                  <option value="Leather Special Care">Leather Special Care (Rp 180.000)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Metode Pembayaran</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl font-bold"
                >
                  <option value="QRIS">QRIS / Instant E-Wallet</option>
                  <option value="Transfer Bank">Transfer Bank</option>
                  <option value="Tunai">Tunai / Cash</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Status Pembayaran</label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl font-bold"
                >
                  <option value="Lunas">Lunas</option>
                  <option value="DP">DP (Uang Muka)</option>
                </select>
              </div>
            </div>

            {/* Total Price Summary */}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-slate-700/60 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Total Tagihan Invoice</span>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  Rp {getServicePrice(serviceType).toLocaleString('id-ID')}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" /> Simpan & Cetak Invoice
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
