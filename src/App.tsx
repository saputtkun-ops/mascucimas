import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { MobileNav } from './components/layout/MobileNav';

import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { OrderList } from './components/orders/OrderList';
import { NewOrderModal } from './components/orders/NewOrderModal';
import { OrderDetailModal } from './components/orders/OrderDetailModal';
import { CustomerList } from './components/customers/CustomerList';
import { BeforeAfterGallery } from './components/gallery/BeforeAfterGallery';
import { PickupDelivery } from './components/pickup/PickupDelivery';
import { InventoryManager } from './components/inventory/InventoryManager';
import { FinancialOverview } from './components/finance/FinancialOverview';
import { EmployeeManager } from './components/employees/EmployeeManager';
import { QualityControl } from './components/qc/QualityControl';
import { SettingsPage } from './components/settings/SettingsPage';

import { ThermalReceiptModal } from './components/common/ThermalReceiptModal';
import { QRScannerModal } from './components/common/QRScannerModal';
import { OwnerAuthModal } from './components/common/OwnerAuthModal';

import {
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_INVENTORY,
  INITIAL_SUPPLIERS,
  INITIAL_FINANCIALS,
  INITIAL_EMPLOYEES,
  INITIAL_PICKUPS,
} from './mock/initialData';
import { Order, Customer, OrderStatus } from './types';

export function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Role Access State: 'Karyawan' (default) or 'Owner'
  const [userRole, setUserRole] = useState<'Owner' | 'Karyawan'>('Karyawan');
  const [ownerPin, setOwnerPin] = useState<string>('1234');
  const [isOwnerAuthOpen, setIsOwnerAuthOpen] = useState<boolean>(false);
  const [pendingTargetTab, setPendingTargetTab] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<string>('Cabang Utama (Kebayoran)');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // App State Data
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);

  // Modals
  const [isNewOrderOpen, setIsNewOrderOpen] = useState<boolean>(false);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<Order | null>(null);
  const [thermalReceiptOrder, setThermalReceiptOrder] = useState<Order | null>(null);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState<boolean>(false);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Tab switching with role security check
  const handleTabChange = (tab: string) => {
    const ownerOnlyTabs = ['finance', 'employees', 'settings'];
    if (ownerOnlyTabs.includes(tab) && userRole !== 'Owner') {
      setPendingTargetTab(tab);
      setIsOwnerAuthOpen(true);
      return;
    }
    setActiveTab(tab);
  };

  const handleToggleRoleButton = () => {
    if (userRole === 'Owner') {
      setUserRole('Karyawan');
      if (['finance', 'employees', 'settings'].includes(activeTab)) {
        setActiveTab('dashboard');
      }
    } else {
      setPendingTargetTab(null);
      setIsOwnerAuthOpen(true);
    }
  };

  const handleAuthSuccess = () => {
    setUserRole('Owner');
    setIsOwnerAuthOpen(false);
    if (pendingTargetTab) {
      setActiveTab(pendingTargetTab);
      setPendingTargetTab(null);
    }
  };

  // Handlers
  const handleSaveNewOrder = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setSelectedOrderDetail(newOrder);
  };

  const handleUpdateSOP = (orderId: string, sopId: string) => {
    setOrders((prev) =>
      prev.map((ord) => {
        if (ord.id === orderId) {
          const updatedSop = ord.sopList.map((s) => {
            if (s.id === sopId) {
              const nowDone = !s.completed;
              return {
                ...s,
                completed: nowDone,
                completedAt: nowDone ? new Date().toTimeString().slice(0, 5) : undefined,
                completedBy: 'Agus Senior Care',
              };
            }
            return s;
          });
          return { ...ord, sopList: updatedSop };
        }
        return ord;
      })
    );

    if (selectedOrderDetail && selectedOrderDetail.id === orderId) {
      setSelectedOrderDetail((prev) => {
        if (!prev) return null;
        const updatedSop = prev.sopList.map((s) => {
          if (s.id === sopId) {
            const nowDone = !s.completed;
            return {
              ...s,
              completed: nowDone,
              completedAt: nowDone ? new Date().toTimeString().slice(0, 5) : undefined,
              completedBy: 'Agus Senior Care',
            };
          }
          return s;
        });
        return { ...prev, sopList: updatedSop };
      });
    }
  };

  const handleUpdateStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    if (selectedOrderDetail && selectedOrderDetail.id === orderId) {
      setSelectedOrderDetail((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleApproveQC = (orderId: string) => {
    handleUpdateStatus(orderId, 'Packing');
    alert(`Quality Control Approved for order! Status updated to Packing.`);
  };

  const handleSendWhatsAppNotification = (order: Order) => {
    const text = encodeURIComponent(
      `Halo Kak ${order.customerName}! 👟 Sepatu ${order.shoe.brand} ${order.shoe.model} (No. Invoice: ${order.invoiceNo}) saat ini statusnya: [${order.status}]. Cek estimasi selesai pada ${order.estimatedFinish}. Terima kasih!`
    );
    window.open(`https://wa.me/62${order.customerPhone.replace(/^0/, '')}?text=${text}`, '_blank');
  };

  const pendingCount = orders.filter((o) => o.status !== 'Selesai').length;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        pendingCount={pendingCount}
        userRole={userRole}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          onOpenNewOrder={() => setIsNewOrderOpen(true)}
          onOpenQRScanner={() => setIsQRScannerOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          userRole={userRole}
          onToggleRole={handleToggleRoleButton}
        />

        {/* Dynamic Tab Views */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-8">
          {activeTab === 'dashboard' && (
            <OverviewDashboard
              orders={orders}
              customers={customers}
              financials={INITIAL_FINANCIALS}
              onOpenNewOrder={() => setIsNewOrderOpen(true)}
              onOpenQRScanner={() => setIsQRScannerOpen(true)}
              onNavigateTab={handleTabChange}
              onSelectOrder={setSelectedOrderDetail}
              userRole={userRole}
              onPromptOwnerAuth={(targetTab) => {
                setPendingTargetTab(targetTab || null);
                setIsOwnerAuthOpen(true);
              }}
            />
          )}

          {activeTab === 'orders' && (
            <OrderList
              orders={orders}
              onOpenNewOrder={() => setIsNewOrderOpen(true)}
              onSelectOrder={setSelectedOrderDetail}
              onPrintInvoice={setThermalReceiptOrder}
              onSendWhatsApp={handleSendWhatsAppNotification}
            />
          )}

          {activeTab === 'customers' && (
            <CustomerList
              customers={customers}
              onAddCustomer={(c) => setCustomers([...customers, c])}
            />
          )}

          {activeTab === 'gallery' && <BeforeAfterGallery orders={orders} />}

          {activeTab === 'pickup' && <PickupDelivery tasks={INITIAL_PICKUPS} />}

          {activeTab === 'inventory' && (
            <InventoryManager inventory={INITIAL_INVENTORY} suppliers={INITIAL_SUPPLIERS} />
          )}

          {activeTab === 'qc' && (
            <QualityControl orders={orders} onApproveQC={handleApproveQC} />
          )}

          {/* Owner Only Tabs */}
          {activeTab === 'finance' && userRole === 'Owner' && (
            <FinancialOverview financials={INITIAL_FINANCIALS} />
          )}

          {activeTab === 'employees' && userRole === 'Owner' && (
            <EmployeeManager employees={INITIAL_EMPLOYEES} />
          )}

          {activeTab === 'settings' && userRole === 'Owner' && (
            <SettingsPage ownerPin={ownerPin} onUpdateOwnerPin={(newPin) => setOwnerPin(newPin)} />
          )}
        </main>

        {/* Mobile Navigation */}
        <MobileNav
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          pendingCount={pendingCount}
          onOpenNewOrder={() => setIsNewOrderOpen(true)}
        />
      </div>

      {/* Global Modals */}
      <NewOrderModal
        isOpen={isNewOrderOpen}
        onClose={() => setIsNewOrderOpen(false)}
        onSaveOrder={handleSaveNewOrder}
        selectedBranch={selectedBranch}
      />

      <OrderDetailModal
        order={selectedOrderDetail}
        onClose={() => setSelectedOrderDetail(null)}
        onUpdateSOP={handleUpdateSOP}
        onUpdateStatus={handleUpdateStatus}
        onPrintInvoice={setThermalReceiptOrder}
        onSendWhatsApp={handleSendWhatsAppNotification}
      />

      <ThermalReceiptModal
        order={thermalReceiptOrder}
        onClose={() => setThermalReceiptOrder(null)}
      />

      <QRScannerModal
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        orders={orders}
        onSelectOrder={setSelectedOrderDetail}
      />

      <OwnerAuthModal
        isOpen={isOwnerAuthOpen}
        onClose={() => {
          setIsOwnerAuthOpen(false);
          setPendingTargetTab(null);
        }}
        onSuccess={handleAuthSuccess}
        correctPin={ownerPin}
      />
    </div>
  );
}

export default App;
