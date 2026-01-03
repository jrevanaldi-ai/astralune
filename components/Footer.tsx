
import React from 'react';
import { AstraluneLogo } from './AstraluneLogo';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="relative z-10 bg-white border-t-8 border-black pt-24 pb-12 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-astral opacity-5 -rotate-45 transform translate-x-16 -translate-y-16"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-20">
          
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <AstraluneLogo size="md" className="-rotate-3" />
              <span className="text-4xl font-heading font-black uppercase tracking-tighter italic">
                Astralune
              </span>
            </div>
            <p className="text-xl font-bold max-w-sm leading-relaxed">
              Arsitek solusi digital yang berfokus pada <span className="text-astral font-black underline">performa</span>, 
              <span className="text-astral font-black underline"> keamanan</span>, dan <span className="text-astral font-black underline">estetika</span> modern.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://t.me/NathanAwful" 
                target="_blank"
                className="w-14 h-14 border-4 border-black bg-white flex items-center justify-center neo-shadow-hover transition-all hover:rotate-6 group"
                title="Telegram"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg" 
                  className="w-8 h-8 group-hover:scale-110 transition-transform" 
                  alt="Telegram"
                />
              </a>
              <a 
                href="mailto:contact@nathan.christmas" 
                className="w-14 h-14 border-4 border-black bg-white flex items-center justify-center neo-shadow-hover transition-all hover:-rotate-6 group"
                title="Email"
              >
                <img 
                  src="https://www.svgrepo.com/show/303161/gmail-icon-logo.svg" 
                  className="w-8 h-8 group-hover:scale-110 transition-transform" 
                  alt="Email"
                />
              </a>
              <a 
                href="https://wa.me/6289526974458" 
                target="_blank"
                className="w-14 h-14 border-4 border-black bg-white flex items-center justify-center neo-shadow-hover transition-all hover:scale-110 group"
                title="WhatsApp"
              >
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                  className="w-8 h-8 group-hover:scale-110 transition-transform" 
                  alt="WhatsApp"
                />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black mb-10 uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-1 bg-astral inline-block"></span>
              Teknologi Kami
            </h4>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {['Golang', 'Rust', 'Python', 'JavaScript', 'TypeScript', 'Java'].map(tech => (
                <div key={tech} className="flex items-center gap-2 group">
                  <div className="w-2 h-2 bg-black group-hover:bg-astral transition-colors"></div>
                  <span className="font-black uppercase text-xs">{tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-black mb-10 uppercase tracking-widest flex items-center gap-2">
              <span className="w-8 h-1 bg-black inline-block"></span>
              Status Sistem
            </h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="https://athars.eu" 
                  target="_blank" 
                  className="flex items-center justify-between p-4 border-2 border-black bg-slate-50 hover:bg-astral hover:text-white transition-all neo-shadow group"
                >
                  <span className="font-black uppercase text-[10px] tracking-widest">Infrastruktur</span>
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="block font-black uppercase text-[10px] tracking-widest hover:text-astral transition-colors border-b-2 border-transparent hover:border-astral pb-1 w-fit">
                  Syarat & Ketentuan
                </a>
              </li>
              <li>
                <a href="#" className="block font-black uppercase text-[10px] tracking-widest hover:text-astral transition-colors border-b-2 border-transparent hover:border-astral pb-1 w-fit">
                  Dokumentasi Teknis
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t-4 border-black flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <p className="font-black uppercase text-sm tracking-widest italic mb-1">
              &copy; {new Date().getFullYear()} Astralune Digital Solutions.
            </p>
            <p className="text-[10px] font-bold text-astral uppercase tracking-[0.3em]">
              Premium Craftsmanship for the Digital World
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="px-4 py-1 bg-black text-white text-[10px] font-black uppercase">v2.5.1</div>
             <div className="px-4 py-1 bg-astral text-white text-[10px] font-black uppercase">Astra-Shield Active</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
