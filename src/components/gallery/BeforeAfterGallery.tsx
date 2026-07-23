import React, { useState } from 'react';
import { Image as ImageIcon, Sparkles, Share2, Camera, Download, Eye, Heart, X } from 'lucide-react';
import { Order } from '../../types';

interface BeforeAfterGalleryProps {
  orders: Order[];
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({ orders }) => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeMockupOrder, setActiveMockupOrder] = useState<Order | null>(null);

  const completedOrdersWithPhotos = orders.filter((o) => o.shoe.photoBefore && o.shoe.photoAfter);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-5 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-600" /> Galeri Portfolio Before & After
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Arsip hasil pencucian & restorasi sepatu otomatis. Siap diexport untuk konten Instagram Feeds & TikTok Stories!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 rounded-full flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" /> Instagram & TikTok Ready
          </span>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedOrdersWithPhotos.map((ord) => (
          <div
            key={ord.id}
            className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden group hover:shadow-lg transition-all"
          >
            {/* Split Images */}
            <div className="relative h-64 grid grid-cols-2 border-b border-slate-200 dark:border-slate-700 overflow-hidden">
              {/* Before */}
              <div className="relative">
                <img src={ord.shoe.photoBefore} alt="Before" className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 px-2.5 py-1 bg-black/80 text-white text-[10px] font-black rounded-lg backdrop-blur-sm">
                  BEFORE
                </span>
              </div>

              {/* After */}
              <div className="relative">
                <img src={ord.shoe.photoAfter || '/images/shoe_clean_1.jpg'} alt="After" className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-black rounded-lg shadow-md">
                  AFTER
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="p-5 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  {ord.shoe.brand} {ord.shoe.model}
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mt-0.5">{ord.serviceType}</p>
                <p className="text-[11px] text-slate-400 mt-1">Pelanggan: {ord.customerName}</p>
              </div>

              <button
                onClick={() => setActiveMockupOrder(ord)}
                className="px-3.5 py-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-extrabold text-xs rounded-xl shadow-md shadow-pink-500/20 flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <Camera className="w-4 h-4" /> Mockup Feed
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Social Media Card Mockup Modal */}
      {activeMockupOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
          <div className="bg-slate-900 text-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-800 relative">
            <button
              onClick={() => setActiveMockupOrder(null)}
              className="absolute top-4 right-4 p-2 hover:bg-slate-800 rounded-full"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            <div className="text-center mb-4">
              <span className="text-[10px] font-extrabold text-pink-400 tracking-wider uppercase">Instagram / TikTok Card Mockup</span>
              <h3 className="text-lg font-black mt-0.5">MAS CUCI MAS RESTORATION</h3>
            </div>

            {/* Instagram Card Frame */}
            <div className="bg-gradient-to-b from-slate-800 to-slate-950 p-4 rounded-2xl border border-slate-700 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-black text-xs">M</div>
                  <div>
                    <p className="text-xs font-bold">mascucimas.id</p>
                    <p className="text-[9px] text-slate-400">Restorasi Sepatu Professional</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full font-bold">Verified</span>
              </div>

              {/* Grid 2 Images */}
              <div className="grid grid-cols-2 gap-1 rounded-xl overflow-hidden h-48 border border-slate-700">
                <div className="relative">
                  <img src={activeMockupOrder.shoe.photoBefore} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/80 text-white text-[9px] font-black rounded">BEFORE</span>
                </div>
                <div className="relative">
                  <img src={activeMockupOrder.shoe.photoAfter || '/images/shoe_clean_1.jpg'} className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-black rounded">AFTER</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-200">
                  {activeMockupOrder.shoe.brand} {activeMockupOrder.shoe.model}
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Treatment: <span className="text-blue-400 font-semibold">{activeMockupOrder.serviceType}</span> ✨ Sepatu kesayangan kembali kinclong seperti baru!
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <span className="flex items-center gap-1 text-pink-400 font-bold"><Heart className="w-4 h-4 fill-pink-400" /> 1,420 Likes</span>
                <span>#MasCuciMas #ShoeCare</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <button
                onClick={() => alert('Gambar Mockup Berhasil Di-download!')}
                className="flex-1 py-2.5 bg-pink-600 hover:bg-pink-500 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-pink-600/30"
              >
                <Download className="w-4 h-4" /> Download HD Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
