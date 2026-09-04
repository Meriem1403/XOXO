import { useState, useEffect } from 'react';
import { Flame, Bell, Check } from 'lucide-react';
import { drops } from '../data';
import type { Drop, View } from '../types';

function useCountdown(targetDate: string) {
  const calc = () => {
    const diff = new Date(targetDate).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, done: true };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
      done: false,
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return time;
}

function DropCard({ drop }: { drop: Drop }) {
  const time = useCountdown(drop.dropDate);
  const [notified, setNotified] = useState(false);

  return (
    <div style={{ background: '#111', border: '1px solid #2a2a2a' }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0d0d0d' }}>
        <img src={drop.image} alt={drop.name} className="w-full h-full object-cover" style={{ opacity: 0.6 }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.9) 0%, transparent 60%)' }} />
        {/* Type badge */}
        <div className="absolute top-4 left-4 font-mono text-xs px-2 py-1" style={{ background: '#FF3800', color: '#f0f0f0' }}>
          DROP EXCLUSIF
        </div>
        {drop.stock <= 15 && (
          <div className="absolute top-4 right-4 font-mono text-xs px-2 py-1 flex items-center gap-1" style={{ background: 'rgba(255,56,0,0.2)', border: '1px solid #FF3800', color: '#FF3800' }}>
            <Flame size={12} /> {drop.stock} PIÈCES
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="font-mono text-xs mb-1" style={{ color: '#FF3800' }}>{drop.brand}</div>
        <h3 className="font-display text-2xl tracking-wide mb-2" style={{ color: '#f0f0f0' }}>{drop.name}</h3>
        <p className="font-mono text-xs mb-6 leading-relaxed" style={{ color: '#666' }}>{drop.description}</p>

        {/* Countdown */}
        {!time.done ? (
          <div className="mb-6">
            <div className="font-mono text-xs tracking-widest mb-3" style={{ color: '#555' }}>DROP DANS</div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { v: time.days, l: 'JOURS' },
                { v: time.hours, l: 'HEURES' },
                { v: time.minutes, l: 'MIN' },
                { v: time.seconds, l: 'SEC' },
              ].map(({ v, l }) => (
                <div key={l} className="text-center p-3" style={{ background: '#0a0a0a', border: '1px solid #1a1a1a' }}>
                  <div className="font-display text-2xl" style={{ color: '#CCFF00' }}>{String(v).padStart(2, '0')}</div>
                  <div className="font-mono text-xs mt-1" style={{ color: '#333' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="font-display text-xl mb-6" style={{ color: '#CCFF00' }}>DISPONIBLE MAINTENANT</div>
        )}

        <div className="flex items-center justify-between mb-4">
          <span className="font-display text-3xl" style={{ color: '#CCFF00' }}>{drop.price.toFixed(2)} €</span>
          <span className="font-mono text-xs" style={{ color: '#444' }}>{drop.notifyCount} notifications</span>
        </div>

        <button
          onClick={() => setNotified(true)}
          disabled={notified}
          className="w-full font-display tracking-widest py-4 transition-all"
          style={{
            background: notified ? 'rgba(204,255,0,0.08)' : '#CCFF00',
            color: notified ? '#CCFF00' : '#080808',
            border: notified ? '1px solid #CCFF00' : 'none',
            letterSpacing: '0.1em',
          }}
        >
          {notified ? <span className="flex items-center justify-center gap-2"><Check size={14} /> NOTIFICATION ACTIVÉE</span> : <span className="flex items-center justify-center gap-2"><Bell size={14} /> ME PRÉVENIR</span>}
        </button>
      </div>
    </div>
  );
}

interface DropsProps {
  setView: (v: View) => void;
}

export default function Drops({ setView }: DropsProps) {
  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-8" style={{ background: '#FF3800' }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: '#FF3800' }}>BIENTÔT DISPONIBLE</span>
        </div>
        <h2 className="font-display text-6xl md:text-8xl tracking-tight mb-4" style={{ color: '#f0f0f0' }}>DROPS</h2>
        <p className="font-mono text-sm mb-12" style={{ color: '#555' }}>Produits en édition limitée. Sois prêt. Une fois parti, c'est parti.</p>

        {/* Marque en défilement */}
        <div className="overflow-hidden mb-12 py-3" style={{ borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
          <div className="font-display text-xs tracking-widest whitespace-nowrap" style={{ color: '#222', animation: 'none' }}>
            {Array(8).fill('DROP EXCLUSIF — ÉDITION LIMITÉE — MARSEILLE — ').join('')}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: '#2a2a2a' }}>
          {drops.map(drop => (
            <DropCard key={drop.id} drop={drop} />
          ))}
        </div>

        {/* Info */}
        <div className="mt-10 p-6" style={{ border: '1px solid #1a1a1a' }}>
          <div className="font-display text-lg mb-2 tracking-wider" style={{ color: '#f0f0f0' }}>COMMENT ÇA MARCHE ?</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {[
              { n: '01', t: 'NOTIFICATION', d: 'Active les alertes sur les drops qui t\'intéressent.' },
              { n: '02', t: 'DROP DAY', d: 'Le jour J, connecte-toi à l\'heure exacte du drop.' },
              { n: '03', t: 'PREMIER ARRIVÉ', d: 'Commande en premier. Quantités ultra-limitées.' },
            ].map(({ n, t, d }) => (
              <div key={n} className="flex gap-4">
                <div className="font-mono text-2xl font-bold" style={{ color: '#1a1a1a' }}>{n}</div>
                <div>
                  <div className="font-display text-sm tracking-wide mb-1" style={{ color: '#f0f0f0' }}>{t}</div>
                  <div className="font-mono text-xs leading-relaxed" style={{ color: '#555' }}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
