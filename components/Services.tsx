
import React from 'react';

interface ServicesProps {
  onNavigate: (section: string) => void;
}

const services = [
  {
    title: "WHATSAPP BOT",
    desc: "Otomatisasi percakapan untuk bisnis. Mulai dari sistem customer service hingga broadcast otomatis yang aman dari blokir.",
    color: "bg-blue-600",
    gradient: "from-blue-600 to-blue-800",
    textColor: "text-white",
    accent: "bg-cyan-400",
    section: "whatsapp-bot"
  },
  {
    title: "TELEGRAM BOT",
    desc: "Bot pintar untuk ekosistem Telegram. Cocok untuk manajemen grup, sistem pembayaran, hingga bot trading responsif.",
    color: "bg-white",
    gradient: "from-white to-slate-100",
    textColor: "text-black",
    accent: "bg-blue-600",
    section: "telegram-bot"
  },
  {
    title: "DISCORD BOT",
    desc: "Modulasi komunitas Discord tingkat lanjut. Integrasi sistem role, level, musik, dan proteksi server kustom.",
    color: "bg-black",
    gradient: "from-black to-slate-800",
    textColor: "text-white",
    accent: "bg-blue-500",
    section: "discord-bot"
  },
  {
    title: "PRO WEBSITE",
    desc: "Landing page hingga web aplikasi dengan performa maksimal dan keamanan berlapis untuk profil bisnis profesional.",
    color: "bg-blue-50",
    gradient: "from-blue-50 to-white",
    textColor: "text-black",
    accent: "bg-black",
    section: "website"
  }
];

export const Services: React.FC<ServicesProps> = ({ onNavigate }) => {
  return (
    <section className="py-32 bg-[#f0f0f0] border-t-8 border-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="text-6xl md:text-8xl font-heading font-black uppercase mb-6 tracking-tighter italic leading-none">
              <span className="text-blue-600 block">KAMI</span> 
              <span>MENGUASAI</span>
            </h2>
            <p className="text-2xl font-bold text-black border-l-8 border-black pl-6">
              Layanan digital eksklusif yang dirancang untuk efisiensi dan keamanan maksimal.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
          {services.map((s, i) => (
            <div 
              key={i} 
              onClick={() => onNavigate(s.section)}
              className={`cursor-pointer relative p-8 border-4 border-black bg-gradient-to-br ${s.gradient} ${s.textColor} neo-shadow-lg transform transition-all hover:-translate-y-4 hover:rotate-1 group overflow-hidden`}
            >
              <div className={`absolute top-0 right-0 w-16 h-16 ${s.accent} border-b-4 border-l-4 border-black transform translate-x-8 -translate-y-8 rotate-45 group-hover:translate-x-6 group-hover:-translate-y-6 transition-transform`}></div>

              <h3 className="text-2xl font-black mb-6 uppercase leading-tight">{s.title}</h3>
              <p className="text-sm font-bold opacity-80 leading-relaxed mb-10">{s.desc}</p>
              
              <div className="flex items-center justify-between mt-auto">
                <span className="font-black text-[10px] tracking-widest uppercase opacity-40 italic">Pilih Layanan</span>
                <div className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                  <span className="text-black group-hover:text-white font-black">↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Highlight */}
        <div className="p-16 border-8 border-black bg-white text-black neo-shadow-lg relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-600 border-4 border-black neo-shadow -rotate-12 flex items-center justify-center">
            <span className="text-white font-black text-4xl">!</span>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h4 className="text-5xl font-black mb-8 uppercase italic leading-none">Sistem Bot <span className="text-blue-600 underline">Reliabilitas Tinggi</span></h4>
              <p className="text-2xl font-bold mb-10 leading-relaxed">
                Dari integrasi API v14 hingga MTProto, kami membangun infrastruktur bot yang tangguh menghadapi lonjakan traffic.
              </p>
              <div className="flex gap-4 flex-wrap">
                <span className="px-6 py-2 bg-slate-100 border-2 border-black font-black uppercase text-[10px]">#Uptime_99%</span>
                <span className="px-6 py-2 bg-slate-100 border-2 border-black font-black uppercase text-[10px]">#Anti_Spam</span>
                <span className="px-6 py-2 bg-slate-100 border-2 border-black font-black uppercase text-[10px]">#Secure_Auth</span>
              </div>
            </div>
            <div className="bg-blue-600 p-8 border-4 border-black neo-shadow transform rotate-1">
              <div className="space-y-6">
                <div className="flex justify-between border-b-2 border-black pb-2 font-black text-white uppercase tracking-tighter italic">
                   <span>Statistik Proyek</span>
                   <span>Status</span>
                </div>
                <div className="flex justify-between font-bold text-white text-lg">
                   <span>Rata-rata Uptime</span>
                   <span>99.98%</span>
                </div>
                <div className="flex justify-between font-bold text-white text-lg">
                   <span>Keamanan Enkripsi</span>
                   <span>AES-256</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
