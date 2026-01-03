
import React, { useState, useEffect, useRef } from 'react';
import { InvoiceData, ServiceCategory, DurationOption } from '../types';
import { SecurityService } from '../services/securityService';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';

interface InvoiceGeneratorProps {
  defaultCategory: ServiceCategory;
  title: string;
  desc: string;
}

const ADMIN_PHONE = '6289526974458';
const API_BASE = 'https://pay.athars.me/api/deposit';
const DB_KEY_ENCRYPTED = 'astralune_orders_db_encrypted';

const PRICING: Record<ServiceCategory, { base: number; perFeature: number; label: string }> = {
  WHATSAPP_BOT: { base: 45000, perFeature: 12000, label: 'WhatsApp Bot' },
  TELEGRAM_BOT: { base: 35000, perFeature: 8000, label: 'Telegram Bot' },
  DISCORD_BOT: { base: 65000, perFeature: 15000, label: 'Discord Bot' },
  WEBSITE: { base: 150000, perFeature: 35000, label: 'Professional Website' }
};

const DURATION_PRICING: Record<DurationOption, { label: string; price: number; accent: string }> = {
  FAST: { label: '3-7 Hari', price: 25000, accent: 'bg-red-500' },
  MEDIUM: { label: '7-14 Hari', price: 17000, accent: 'bg-blue-600' },
  SLOW: { label: '14-20 Hari', price: 13000, accent: 'bg-black' }
};

export const InvoiceGenerator: React.FC<InvoiceGeneratorProps> = ({ defaultCategory, title, desc }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  
  const [formData, setFormData] = useState<InvoiceData>({
    clientName: '',
    clientPhone: '',
    serviceCategory: defaultCategory,
    duration: 'MEDIUM',
    projectDescription: '',
    features: [],
    totalPrice: 0,
    date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
    invoiceNumber: `ORD-${Date.now().toString().slice(-6)}`,
  });

  const [newFeature, setNewFeature] = useState('');

  // Update category if the prop changes (navigation occurs)
  useEffect(() => {
    setFormData(prev => ({ ...prev, serviceCategory: defaultCategory }));
  }, [defaultCategory]);

  useEffect(() => {
    const serviceConfig = PRICING[formData.serviceCategory];
    const durationConfig = DURATION_PRICING[formData.duration];
    const total = serviceConfig.base + (formData.features.length * serviceConfig.perFeature) + durationConfig.price;
    setFormData(prev => ({ ...prev, totalPrice: total }));
  }, [formData.features, formData.serviceCategory, formData.duration]);

  const addFeature = () => {
    if (!newFeature.trim()) return;
    if (formData.features.includes(newFeature.trim())) return;
    setFormData(prev => ({ ...prev, features: [...prev.features, newFeature.trim()] }));
    setNewFeature('');
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }));
  };

  const formatIDR = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  const saveToEncryptedDB = (order: any) => {
    const rawData = localStorage.getItem(DB_KEY_ENCRYPTED);
    let history = [];
    if (rawData) {
      history = SecurityService.decryptData(rawData);
    }
    const updated = [order, ...history];
    localStorage.setItem(DB_KEY_ENCRYPTED, SecurityService.encryptData(updated));
  };

  const handlePaymentAndSend = async () => {
    const limitCheck = SecurityService.checkRateLimit('order', 3, 300000);
    if (!limitCheck.allowed) {
      Swal.fire('KEAMANAN AKTIF', 'Terdeteksi terlalu banyak permintaan dalam waktu singkat. Mohon tunggu 5 menit.', 'error');
      return;
    }

    if (!formData.clientName || !formData.clientPhone) {
      Swal.fire('DATA TIDAK LENGKAP', 'Mohon isi nama dan nomor WhatsApp Anda untuk melanjutkan proses.', 'warning');
      return;
    }

    const dpAmount = Math.round(formData.totalPrice * 0.5);
    setIsProcessingPayment(true);

    try {
      const response = await fetch(`${API_BASE}/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nominal: Number(dpAmount), reff_id: formData.invoiceNumber })
      });

      const data = await response.json();
      const paymentId = data.id || data.data?.id;
      const qrUrl = data.qr_url || data.data?.qr_url;

      if (!paymentId) throw new Error('Gateway Error');

      Swal.fire({
        title: 'GATEWAY PEMBAYARAN AMAN',
        html: `
          <div class="space-y-4">
             <div class="p-4 bg-slate-50 border-2 border-black font-black">
                <p class="text-[10px] opacity-40 uppercase">Pembayaran DP 50%</p>
                <p class="text-3xl text-blue-600">${formatIDR(dpAmount)}</p>
             </div>
             <div class="flex justify-center p-4 border-4 border-black bg-white">
                <img src="${qrUrl}" class="w-64 h-64 mx-auto" alt="QRIS QR" />
             </div>
             <p class="text-[9px] font-black uppercase tracking-widest opacity-40">Scan QRIS di atas untuk memproses pesanan secara otomatis.</p>
          </div>
        `,
        showConfirmButton: false,
        allowOutsideClick: false
      });

      const poll = setInterval(async () => {
        const res = await fetch(`${API_BASE}/status`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: String(paymentId) })
        });
        const statusData = await res.json();
        const state = statusData.status || statusData.data?.status;

        if (['success', 'PAID', 'COMPLETED'].includes(state)) {
          clearInterval(poll);
          Swal.close();
          completeOrder(true);
        }
      }, 5000);

      setTimeout(() => clearInterval(poll), 600000);

    } catch (e) {
      setIsProcessingPayment(false);
      Swal.fire({
        title: 'GATEWAY TERKENDALA',
        text: 'Sistem pembayaran sedang sibuk. Ingin melanjutkan dengan verifikasi manual oleh admin?',
        showCancelButton: true,
        confirmButtonText: 'YA, VERIFIKASI MANUAL',
        customClass: { popup: 'neo-border' }
      }).then(r => r.isConfirmed && completeOrder(false));
    }
  };

  const completeOrder = async (isAutoPaid: boolean) => {
    setIsGenerating(true);
    if (!previewRef.current) return;

    const canvas = await html2canvas(previewRef.current, { scale: 2 });
    const image = canvas.toDataURL("image/png");

    const orderRecord = { 
      ...formData, 
      status: isAutoPaid ? 'PAID' : 'PENDING_MANUAL', 
      timestamp: new Date().toISOString() 
    };

    saveToEncryptedDB(orderRecord);
    setIsGenerating(false);
    setIsProcessingPayment(false);

    Swal.fire({
      title: 'PESANAN TERVERIFIKASI',
      html: `
        <div class="text-left space-y-4">
          <p class="text-sm font-bold">Terima kasih, data pesanan Anda telah dienkripsi dan disimpan di database kami.</p>
          <img src="${image}" class="w-full border-4 border-black neo-shadow" />
        </div>
      `,
      confirmButtonText: 'HUBUNGI ADMIN VIA WA',
      customClass: { popup: 'neo-border' }
    }).then(() => {
      window.open(`https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent('Halo Astralune, saya ingin mengonfirmasi pesanan: ' + formData.invoiceNumber)}`, '_blank');
    });
  };

  return (
    <section className="py-12 md:py-24 max-w-7xl mx-auto px-4 relative">
       {(isGenerating || isProcessingPayment) && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center text-white backdrop-blur-2xl">
          <div className="w-16 h-16 border-8 border-t-blue-600 border-white/20 rounded-full animate-spin mb-6"></div>
          <p className="font-black uppercase tracking-[0.4em] text-xs">Menyiapkan Protokol Keamanan...</p>
        </div>
      )}

      <div className="mb-16 max-w-4xl">
        <div className="flex items-center gap-4 mb-4">
           <div className="w-12 h-1 border-4 border-blue-600"></div>
           <span className="font-black uppercase tracking-widest text-blue-600 text-xs">Portal Layanan Astralune</span>
        </div>
        <h2 className="text-5xl md:text-8xl font-heading font-black uppercase italic leading-tight mb-6">
          {title.split(' ')[0]} <span className="text-blue-600 text-outline">{title.split(' ')[1] || ''}</span>
        </h2>
        <p className="text-xl font-bold border-l-8 border-black pl-6 opacity-80 leading-relaxed">
          {desc}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-16">
        <div className="bg-white p-10 border-4 border-black neo-shadow-lg space-y-8 h-fit">
           <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase">Nama Lengkap / Client ID</label>
                <input 
                  className="w-full bg-slate-50 border-4 border-black p-5 font-bold outline-none focus:bg-blue-50 transition-all"
                  value={formData.clientName}
                  onChange={e => setFormData({...formData, clientName: e.target.value})}
                  placeholder="Contoh: Nathan"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase">Nomor WhatsApp Aktif</label>
                <input 
                  className="w-full bg-slate-50 border-4 border-black p-5 font-bold outline-none focus:bg-blue-50 transition-all"
                  value={formData.clientPhone}
                  onChange={e => setFormData({...formData, clientPhone: e.target.value})}
                  placeholder="628xxxx"
                />
              </div>
           </div>

           <div className="space-y-4">
              <label className="text-xs font-black uppercase">Konfigurasi Modul Kustom</label>
              <div className="flex gap-2">
                <input 
                  className="flex-grow bg-slate-50 border-4 border-black p-4 font-bold outline-none"
                  value={newFeature}
                  onChange={e => setNewFeature(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addFeature()}
                  placeholder="Nama fitur (misal: Auto-Reply)"
                />
                <button onClick={addFeature} className="bg-black text-white px-6 font-black border-4 border-black neo-shadow uppercase text-xs">TAMBAH</button>
              </div>
              <div className="flex flex-wrap gap-2 p-4 bg-slate-50 border-4 border-black border-dashed min-h-[100px]">
                 {formData.features.map((f, i) => (
                   <span key={i} className="px-3 py-1 bg-white border-2 border-black font-black text-[10px] uppercase flex items-center gap-2 animate-in zoom-in">
                     {f} <button onClick={() => removeFeature(i)} className="text-red-600 font-bold">×</button>
                   </span>
                 ))}
                 {formData.features.length === 0 && <p className="text-[10px] opacity-30 italic font-bold">Belum ada fitur tambahan yang ditambahkan.</p>}
              </div>
           </div>

           <div className="space-y-4">
              <label className="text-xs font-black uppercase">Estimasi Pengerjaan</label>
              <div className="grid grid-cols-3 gap-3">
                {(Object.keys(DURATION_PRICING) as DurationOption[]).map(d => (
                  <button
                    key={d}
                    onClick={() => setFormData({...formData, duration: d})}
                    className={`p-3 border-4 border-black font-black uppercase text-[10px] transition-all ${formData.duration === d ? 'bg-black text-white neo-shadow' : 'bg-white'}`}
                  >
                    {DURATION_PRICING[d].label}
                  </button>
                ))}
              </div>
           </div>

           <button 
            onClick={handlePaymentAndSend}
            className="w-full py-8 bg-blue-600 text-white border-4 border-black font-black text-2xl uppercase neo-shadow-hover transition-all"
           >
             PROSES PESANAN SEKARANG
           </button>
        </div>

        {/* PREVIEW NOTA */}
        <div ref={previewRef} className="bg-white border-4 border-black p-12 neo-shadow-lg flex flex-col min-h-[850px] relative">
           <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 0)', backgroundSize: '20px 20px' }}></div>
           <div className="flex justify-between items-start mb-12 pb-8 border-b-8 border-black">
              <div>
                <h3 className="text-5xl font-heading font-black italic uppercase">ASTRALUNE</h3>
                <p className="text-blue-600 font-black uppercase text-xs tracking-widest">BUKTI KONTRAK DIGITAL</p>
              </div>
              <div className="text-right font-black">
                <div className="bg-black text-white px-4 py-1 text-xs">REF: {formData.invoiceNumber}</div>
                <p className="text-[10px] opacity-40 mt-1">{formData.date}</p>
              </div>
           </div>
           
           <div className="flex-grow space-y-10">
              <div className="border-l-8 border-blue-600 pl-6">
                <p className="text-[10px] font-black uppercase opacity-40 mb-1">Subjek Kontrak</p>
                <p className="text-2xl font-black uppercase leading-none">{formData.clientName || 'BELUM TERISI'}</p>
                <p className="text-xs font-bold opacity-60 mt-1">WA: {formData.clientPhone || 'N/A'}</p>
              </div>

              <div className="p-6 bg-slate-50 border-4 border-black neo-shadow">
                 <p className="text-[10px] font-black uppercase opacity-40 mb-2">Rincian Teknis & Layanan</p>
                 <div className="flex justify-between font-black text-xl italic uppercase">
                    <span>{PRICING[formData.serviceCategory].label}</span>
                    <span className="text-blue-600">{formatIDR(PRICING[formData.serviceCategory].base)}</span>
                 </div>
                 {formData.features.length > 0 && (
                   <div className="mt-4 pt-4 border-t-2 border-black/10 space-y-1">
                      {formData.features.map((f, i) => (
                        <div key={i} className="flex justify-between text-[10px] font-bold uppercase opacity-60">
                           <span>+ {f}</span>
                           <span>{formatIDR(PRICING[formData.serviceCategory].perFeature)}</span>
                        </div>
                      ))}
                   </div>
                 )}
                 <div className="mt-4 pt-4 border-t-2 border-black/10 flex justify-between text-[10px] font-bold uppercase">
                    <span>Layanan Prioritas ({DURATION_PRICING[formData.duration].label})</span>
                    <span>{formatIDR(DURATION_PRICING[formData.duration].price)}</span>
                 </div>
              </div>
           </div>

           <div className="mt-12 pt-10 border-t-8 border-black flex justify-between items-end">
              <div>
                <p className="text-[10px] font-black uppercase opacity-40 italic">Total Investasi</p>
                <p className="text-6xl font-black text-blue-600 drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] tracking-tighter">
                   {formatIDR(formData.totalPrice)}
                </p>
              </div>
              <div className="w-24 h-24 border-4 border-black bg-white p-2 text-center flex items-center justify-center transform -rotate-12">
                 <span className="text-[8px] font-black uppercase italic leading-none">Astra<br/>Shield<br/>Verified</span>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};
