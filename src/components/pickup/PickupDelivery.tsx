import React from 'react';
import { Truck, MapPin, Calendar, Clock, Navigation, CheckCircle2, User, ChevronRight } from 'lucide-react';
import { PickupTask } from '../../types';

interface PickupDeliveryProps {
  tasks: PickupTask[];
}

export const PickupDelivery: React.FC<PickupDeliveryProps> = ({ tasks }) => {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-600" /> Jadwal Pickup & Delivery (Logistik Kurir)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manajemen penjemputan & pengantaran sepatu ke alamat pelanggan dengan tracking driver & rute Google Maps.
          </p>
        </div>

        <button
          onClick={() => alert('Jadwal Pickup Baru Berhasil Ditambahkan')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md"
        >
          + Tambah Pickup Baru
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Schedule List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Jadwal Tugas Kurir Hari Ini</h3>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-white shrink-0 ${
                      task.type === 'Pickup' ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}
                  >
                    {task.type === 'Pickup' ? '📦' : '🛵'}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-sm text-slate-900 dark:text-white">{task.customerName}</span>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                          task.type === 'Pickup' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {task.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" /> {task.address}
                    </p>

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
                      <span>🕒 {task.scheduledTime}</span>
                      <span>👤 Driver: <strong className="text-slate-700 dark:text-slate-300">{task.courierName}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100 dark:border-slate-700">
                  <a
                    href={task.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-blue-600 dark:text-blue-400 font-extrabold text-xs rounded-xl flex items-center gap-1"
                  >
                    <Navigation className="w-3.5 h-3.5" /> Google Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Simulated Map View */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mb-1">Simulasi Rute Google Maps</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Tracking lokasi driver real-time</p>

            {/* Map Placeholder Graphic */}
            <div className="relative w-full h-72 rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center p-4">
              <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
              
              {/* Map Pins */}
              <div className="absolute top-1/4 left-1/4 flex flex-col items-center animate-bounce">
                <div className="p-2 bg-blue-600 rounded-full text-white shadow-lg">🛵</div>
                <span className="text-[10px] font-bold bg-black/80 px-2 py-0.5 rounded text-white mt-1">Rian Driver (Kemang)</span>
              </div>

              <div className="absolute bottom-1/3 right-1/3 flex flex-col items-center">
                <div className="p-2 bg-amber-500 rounded-full text-white shadow-lg">🏠</div>
                <span className="text-[10px] font-bold bg-black/80 px-2 py-0.5 rounded text-white mt-1">Budi Santoso</span>
              </div>

              <div className="relative z-10 text-center">
                <span className="px-3 py-1 bg-blue-600/90 text-white font-bold text-xs rounded-full backdrop-blur-sm">
                  Google Maps API Active
                </span>
                <p className="text-[11px] text-slate-300 mt-2">Estimasi Total Waktu Rute: 45 Menit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
