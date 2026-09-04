import React, { useState } from 'react';
import { Wrench, Package, BookOpen, Zap, Store, Check, MapPin, Clock, Phone } from 'lucide-react';
import type { View } from '../types';

const SERVICES: { id: string; icon: React.ReactNode; title: string; price: number; duration: string; desc: string }[] = [
  { id: 'montage', icon: <Wrench size={28} />, title: 'Montage Skate', price: 15, duration: '30 min', desc: "Montage complet de ton setup par nos mécaniciens. Réglages trucks, pose grip, installation roulements." },
  { id: 'reparation', icon: <Wrench size={28} />, title: 'Réparation', price: 20, duration: '1h', desc: "Diagnostic et réparation de ton matériel. Trucks cassés, roulements à changer, deck fendu." },
  { id: 'location', icon: <Package size={28} />, title: 'Location Skate', price: 10, duration: 'Journée', desc: "Location de setup complet à la journée. Idéal pour essayer avant d'acheter ou pour une session ponctuelle." },
  { id: 'conseil', icon: <BookOpen size={28} />, title: 'Conseil Personnalisé', price: 0, duration: '20 min', desc: "Session avec un rider de l'équipe XOXO pour t'aider à choisir le matériel adapté à ton niveau." },
  { id: 'surfskate', icon: <Zap size={28} />, title: 'Initiation Surfskate', price: 30, duration: '1h', desc: "Session d'initiation au surfskate. Matériel fourni, rider expérimenté, spot adapté débutants." },
  { id: 'clickcollect', icon: <Store size={28} />, title: 'Click & Collect', price: 0, duration: 'Dès 2h', desc: 'Commande en ligne, retire en boutique dès 2 heures. Gratuit, sans frais de port, dispo 6j/7.' },
];

const SLOTS = [
  { day: 'LUN 09 SEP', times: ['10:00', '11:00', '14:00', '16:00'] },
  { day: 'MAR 10 SEP', times: ['10:00', '11:30', '15:00'] },
  { day: 'MER 11 SEP', times: ['09:30', '14:00', '15:30', '17:00'] },
  { day: 'JEU 12 SEP', times: ['10:00', '11:00', '16:00'] },
  { day: 'VEN 13 SEP', times: ['09:30', '11:00', '14:30', '16:00'] },
];

interface ServicesProps {
  setView: (v: View) => void;
}

export default function Services({ setView }: ServicesProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const service = SERVICES.find(s => s.id === selected);

  if (booked && service && slot) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" style={{ background: '#080808' }}>
        <div className="text-center max-w-md px-6">
          <div className="mb-4" style={{ color: '#CCFF00' }}>{service.icon}</div>
          <h2 className="font-display text-4xl tracking-wider mb-4" style={{ color: '#CCFF00' }}>RDV CONFIRMÉ</h2>
          <div className="p-4 mb-6" style={{ border: '1px solid #2a2a2a', background: '#111' }}>
            <div className="font-display text-xl mb-2" style={{ color: '#f0f0f0' }}>{service.title}</div>
            <div className="font-mono text-sm" style={{ color: '#666' }}>{slot}</div>
            <div className="font-mono text-xs mt-2" style={{ color: '#444' }}>197 Av. Pierre Mendès-France — Marseille 13008</div>
          </div>
          <p className="font-mono text-sm mb-8" style={{ color: '#555' }}>Un email de confirmation t'a été envoyé. À bientôt !</p>
          <button onClick={() => { setBooked(false); setSelected(null); setSlot(null); }} className="font-display tracking-widest px-8 py-4" style={{ background: '#CCFF00', color: '#080808', letterSpacing: '0.1em' }}>
            RETOUR AUX SERVICES
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-8" style={{ background: '#FF3800' }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: '#FF3800' }}>BOUTIQUE</span>
        </div>
        <h2 className="font-display text-6xl md:text-7xl tracking-tight mb-10" style={{ color: '#f0f0f0' }}>SERVICES</h2>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px mb-10" style={{ background: '#2a2a2a' }}>
          {SERVICES.map(svc => (
            <button
              key={svc.id}
              onClick={() => setSelected(svc.id === selected ? null : svc.id)}
              className="p-6 text-left transition-all"
              style={{
                background: selected === svc.id ? '#0e1a00' : '#111',
                border: selected === svc.id ? '1px solid #CCFF00' : '1px solid transparent',
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <span style={{ color: '#CCFF00' }}>{svc.icon}</span>
                <div className="text-right">
                  <div className="font-display text-xl" style={{ color: '#CCFF00' }}>{svc.price === 0 ? 'GRATUIT' : `${svc.price} €`}</div>
                  <div className="font-mono text-xs" style={{ color: '#444' }}>{svc.duration}</div>
                </div>
              </div>
              <div className="font-display text-xl tracking-wide mb-2" style={{ color: '#f0f0f0' }}>{svc.title}</div>
              <p className="font-mono text-xs leading-relaxed" style={{ color: '#666' }}>{svc.desc}</p>
              {selected === svc.id && (
                <div className="mt-4 font-mono text-xs flex items-center gap-1" style={{ color: '#CCFF00' }}><Check size={12} /> Sélectionné — Choisir un créneau ci-dessous</div>
              )}
            </button>
          ))}
        </div>

        {/* Booking calendar */}
        {selected && (
          <div className="p-6 mb-6" style={{ background: '#111', border: '1px solid #2a2a2a' }}>
            <div className="font-display text-xl tracking-wider mb-6" style={{ color: '#f0f0f0' }}>PRENDRE RENDEZ-VOUS — {service?.title}</div>
            <div className="overflow-x-auto">
              <div className="flex gap-px min-w-max" style={{ background: '#2a2a2a' }}>
                {SLOTS.map(({ day, times }) => (
                  <div key={day} style={{ background: '#111', minWidth: 140 }}>
                    <div className="font-mono text-xs tracking-widest p-3 text-center" style={{ color: '#555', borderBottom: '1px solid #2a2a2a' }}>{day}</div>
                    <div className="p-2 space-y-1">
                      {times.map(t => {
                        const slotKey = `${day} ${t}`;
                        const isSelected = slot === slotKey;
                        return (
                          <button
                            key={t}
                            onClick={() => setSlot(isSelected ? null : slotKey)}
                            className="w-full font-mono text-xs py-2 transition-all"
                            style={{
                              background: isSelected ? '#CCFF00' : 'transparent',
                              color: isSelected ? '#080808' : '#888',
                              border: '1px solid',
                              borderColor: isSelected ? '#CCFF00' : '#1a1a1a',
                            }}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {slot && (
              <div className="mt-6">
                <div className="font-mono text-sm mb-4" style={{ color: '#888' }}>
                  Créneau sélectionné : <span style={{ color: '#CCFF00' }}>{slot}</span>
                </div>
                <button
                  onClick={() => setBooked(true)}
                  className="font-display tracking-widest px-8 py-4"
                  style={{ background: '#CCFF00', color: '#080808', letterSpacing: '0.1em' }}
                >
                  CONFIRMER LE RDV
                </button>
              </div>
            )}
          </div>
        )}

        {/* Infos boutique */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: '#2a2a2a' }}>
          {[
            { icon: <MapPin size={24} />, title: 'ADRESSE', info: '197 Av. Pierre Mendès-France\nMarseille 13008' },
            { icon: <Clock size={24} />, title: 'HORAIRES', info: 'Lun–Sam : 10:00 – 19:00\nDimanche : Fermé' },
            { icon: <Phone size={24} />, title: 'CONTACT', info: '+33 4 91 XX XX XX\nshop@xoxoskate.fr' },
          ].map(({ icon, title, info }) => (
            <div key={title} className="p-6" style={{ background: '#111' }}>
              <div className="mb-3" style={{ color: '#CCFF00' }}>{icon}</div>
              <div className="font-mono text-xs tracking-widest mb-2" style={{ color: '#444' }}>{title}</div>
              <div className="font-mono text-sm whitespace-pre-line" style={{ color: '#888' }}>{info}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
