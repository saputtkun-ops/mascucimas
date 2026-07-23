export type OrderStatus =
  | 'Menunggu'
  | 'Antrian'
  | 'Sedang Dicuci'
  | 'Deep Cleaning'
  | 'Unyellowing'
  | 'Drying'
  | 'Finishing'
  | 'QC'
  | 'Packing'
  | 'Siap Diantar'
  | 'Selesai';

export type ServiceType =
  | 'Fast Clean'
  | 'Deep Clean'
  | 'Unyellowing'
  | 'Repaint & Recolor'
  | 'Leather Special Care'
  | 'Express 24 Hours';

export type PaymentMethod = 'QRIS' | 'Transfer Bank' | 'Tunai' | 'E-Wallet';
export type PaymentStatus = 'Lunas' | 'DP' | 'Belum Lunas';
export type MemberTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
export type ShoeMaterial = 'Leather' | 'Canvas' | 'Suede' | 'Mesh';

export interface ShoeDetail {
  brand: string;
  model: string;
  size: string;
  color: string;
  material: string;
  serialNumber?: string;
  photoBefore: string;
  photoAfter?: string;
  videoUrl?: string;
  damageNotes?: string;
  damageChecklist: string[];
  completenessChecklist: string[];
}

export interface SOPItem {
  id: string;
  label: string;
  completed: boolean;
  completedAt?: string;
  completedBy?: string;
}

export interface Order {
  id: string;
  invoiceNo: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  branchName: string;
  dateIn: string;
  deadline: string;
  estimatedFinish: string;
  status: OrderStatus;
  serviceType: ServiceType;
  totalAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  courierName?: string;
  technicianName?: string;
  shoe: ShoeDetail;
  sopList: SOPItem[];
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  mapsLink: string;
  notes: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  memberTier: MemberTier;
  points: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: 'Sabun' | 'Sikat' | 'Lap' | 'Sprayer' | 'Parfum' | 'Packaging' | 'Sticker & Tag' | 'Rak & Mesin';
  supplier: string;
  price: number;
  stock: number;
  minStock: number;
  unit: string;
  storageLocation: string;
  lastRestocked: string;
}

export interface Supplier {
  id: string;
  name: string;
  contact: string;
  address: string;
  productsSupplied: string;
  totalPurchases: number;
  dueDate?: string;
}

export interface FinancialRecord {
  id: string;
  date: string;
  type: 'Pendapatan' | 'Pengeluaran';
  category: string;
  description: string;
  amount: number;
  paymentMethod: string;
}

export interface Employee {
  id: string;
  name: string;
  role: 'Owner' | 'Manager' | 'Admin' | 'Kurir' | 'Teknisi' | 'Kasir';
  phone: string;
  status: 'Hadir' | 'Izin' | 'Libur';
  dailyTarget: number;
  completedToday: number;
  rating: number;
  commission: number;
}

export interface PickupTask {
  id: string;
  orderId: string;
  customerName: string;
  address: string;
  mapsLink: string;
  type: 'Pickup' | 'Delivery';
  scheduledTime: string;
  courierName: string;
  status: 'Jadwal' | 'Di Jalan' | 'Selesai';
  eta: string;
}

export interface ReviewItem {
  id: string;
  customerName: string;
  shoeModel: string;
  rating: number;
  comment: string;
  date: string;
  adminReply?: string;
  photoUrl?: string;
}
