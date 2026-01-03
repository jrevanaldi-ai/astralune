
import React, { useState } from 'react';
import { AppSection } from '../App';
import { AstraluneLogo } from './AstraluneLogo';

interface HeaderProps {
  onNavigate: (section: AppSection) => void;
  activeSection: AppSection;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (section: AppSection) => {
    onNavigate(section);
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[60] bg-white border-b-4 border-black">
      <div className="max-w-7xl mx-auto px-4 h-24 flex items-center justify-between">
        <div 
          className="flex items-center space-x-4 cursor-pointer group"
          onClick={() => handleNav('home')}
        >
          <AstraluneLogo size="md" />
          <span className="text-3xl font-heading font-black uppercase tracking-tighter">Astralune</span>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://t.me/NathanAwful" 
            target="_blank"
            className="hidden sm:block px-6 py-2 bg-black text-white font-black uppercase border-4 border-black neo-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(27,61,141,1)] transition-all text-xs"
          >
            Konsultasi Gratis
          </a>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 border-4 border-black bg-white flex flex-col items-center justify-center gap-1.5 neo-shadow hover:bg-astral group transition-all"
            aria-label="Menu"
          >
            <div className={`w-8 h-1.5 bg-black group-hover:bg-white transition-all ${isOpen ? 'rotate-45 translate-y-3' : ''}`}></div>
            <div className={`w-8 h-1.5 bg-black group-hover:bg-white transition-all ${isOpen ? 'opacity-0' : ''}`}></div>
            <div className={`w-8 h-1.5 bg-black group-hover:bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-3' : ''}`}></div>
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[70] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}>
        <div 
          className={`absolute top-0 right-0 h-full w-full sm:w-[450px] bg-white border-l-8 border-black p-10 flex flex-col transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-10">
            <span className="text-xs font-black uppercase tracking-[0.3em] opacity-40 italic">Menu Navigasi Utama</span>
            <button onClick={() => setIsOpen(false)} className="text-3xl font-black hover:text-astral transition-colors">✕</button>
          </div>

          <nav className="flex flex-col gap-4 overflow-y-auto pr-4 custom-scrollbar">
            <button 
              onClick={() => handleNav('home')}
              className={`text-left text-4xl font-heading font-black uppercase italic tracking-tighter transition-all hover:text-astral ${activeSection === 'home' ? 'text-astral border-l-8 border-astral pl-4' : 'text-black'}`}
            >
              Beranda
            </button>
            
            <div className="mt-4 space-y-3">
              <span className="text-[10px] font-black uppercase opacity-40 tracking-widest">Layanan Pengembangan</span>
              <button 
                onClick={() => handleNav('whatsapp-bot')}
                className={`w-full text-left text-2xl font-black uppercase italic hover:translate-x-2 transition-all ${activeSection === 'whatsapp-bot' ? 'text-astral' : 'text-black opacity-80'}`}
              >
                • WhatsApp Bot
              </button>
              <button 
                onClick={() => handleNav('telegram-bot')}
                className={`w-full text-left text-2xl font-black uppercase italic hover:translate-x-2 transition-all ${activeSection === 'telegram-bot' ? 'text-astral' : 'text-black opacity-80'}`}
              >
                • Telegram Bot
              </button>
              <button 
                onClick={() => handleNav('discord-bot')}
                className={`w-full text-left text-2xl font-black uppercase italic hover:translate-x-2 transition-all ${activeSection === 'discord-bot' ? 'text-astral' : 'text-black opacity-80'}`}
              >
                • Discord Bot
              </button>
              <button 
                onClick={() => handleNav('website')}
                className={`w-full text-left text-2xl font-black uppercase italic hover:translate-x-2 transition-all ${activeSection === 'website' ? 'text-astral' : 'text-black opacity-80'}`}
              >
                • Website Pro
              </button>
            </div>

            <button 
              onClick={() => handleNav('dashboard')}
              className={`text-left text-3xl font-heading font-black uppercase italic tracking-tighter mt-6 transition-all hover:text-astral ${activeSection === 'dashboard' ? 'text-astral border-l-8 border-astral pl-4' : 'text-black opacity-60'}`}
            >
              Monitor Sistem
            </button>
          </nav>

          <div className="mt-auto pt-8 border-t-4 border-black">
            <div className="p-4 bg-slate-100 border-2 border-black mb-6">
               <p className="text-[8px] font-black uppercase opacity-60 mb-1">Status Astra-Shield</p>
               <div className="flex items-center gap-2">
                 <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                 <span className="text-[10px] font-black uppercase">Enkripsi Biometrik Aktif</span>
               </div>
            </div>
            
            <div className="flex gap-4">
               <a href="https://t.me/NathanAwful" target="_blank" className="flex-grow py-4 border-4 border-black bg-black text-white text-center font-black uppercase text-[10px] neo-shadow">Telegram</a>
               <a href="https://wa.me/6289526974458" target="_blank" className="flex-grow py-4 border-4 border-black bg-white text-black text-center font-black uppercase text-[10px] neo-shadow">WhatsApp</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
