
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { InvoiceGenerator } from './components/InvoiceGenerator';
import { Dashboard } from './components/Dashboard';
import { Footer } from './components/Footer';
import { SnowBackground } from './components/SnowBackground';
import { ServiceCategory } from './types';

export type AppSection = 'home' | 'whatsapp-bot' | 'telegram-bot' | 'discord-bot' | 'website' | 'dashboard';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>('home');

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <>
            <Hero onGetStarted={() => setActiveSection('whatsapp-bot')} />
            <Services onNavigate={(s) => setActiveSection(s as AppSection)} />
            <section id="server" className="py-32 border-y-8 border-black bg-black relative">
              <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                <h2 className="text-4xl md:text-6xl font-heading font-black mb-12 text-white uppercase tracking-tighter italic">
                  DITOPANG OLEH <span className="text-blue-600">INFRASTRUKTUR</span> PREMIUM
                </h2>
                <div className="p-16 bg-blue-600 border-4 border-black inline-block neo-shadow-lg transform -rotate-1 transition-transform hover:rotate-0">
                  <span className="text-5xl md:text-8xl font-mono font-black text-white uppercase tracking-tight">
                    athars.eu
                  </span>
                </div>
                <p className="mt-16 text-slate-400 text-2xl font-bold max-w-3xl mx-auto leading-relaxed italic">
                  "Kami percaya stabilitas adalah kunci. Astralune menggunakan server VPS performa tinggi untuk memastikan bot dan website Anda tetap online 24/7 tanpa kendala."
                </p>
              </div>
            </section>
          </>
        );
      case 'whatsapp-bot':
        return <InvoiceGenerator defaultCategory="WHATSAPP_BOT" title="WhatsApp Automation" desc="Bangun sistem otomatisasi chat WhatsApp untuk bisnis atau komunitas Anda dengan fitur manajemen database yang aman." />;
      case 'telegram-bot':
        return <InvoiceGenerator defaultCategory="TELEGRAM_BOT" title="Telegram Intelligence" desc="Ciptakan bot Telegram pintar untuk moderasi grup, integrasi API, hingga sistem monitoring otomatis yang responsif." />;
      case 'discord-bot':
        return <InvoiceGenerator defaultCategory="DISCORD_BOT" title="Discord Ecosystem" desc="Kelola komunitas Discord Anda dengan bot kustom yang mampu menangani sistem role, musik, hingga verifikasi member secara otomatis." />;
      case 'website':
        return <InvoiceGenerator defaultCategory="WEBSITE" title="Premium Web Development" desc="Dapatkan website eksklusif dengan desain modern dan performa kilat, dibangun khusus untuk merepresentasikan brand Anda di dunia digital." />;
      case 'dashboard':
        return <Dashboard />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f0f0] text-black selection:bg-blue-600 selection:text-white relative">
      <SnowBackground />
      <Header onNavigate={setActiveSection} activeSection={activeSection} />
      
      <main className="flex-grow pt-24 relative z-10">
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
};

export default App;
