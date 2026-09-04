import { useState } from 'react';
import { MapPin, Check } from 'lucide-react';
import { events } from '../data';
import type { Event, View } from '../types';

const TYPE_COLORS: Record<Event['type'], string> = {
  contest: '#FF3800',
  session: '#CCFF00',
  drop: '#FF9500',
  workshop: '#6644FF',
};
const TYPE_LABELS: Record<Event['type'], string> = {
  contest: 'CONTEST',
  session: 'SESSION',
  drop: 'DROP',
  workshop: 'WORKSHOP',
};

interface EventsProps {
  setView: (v: View) => void;
}

export default function Events({ setView }: EventsProps) {
  const [registered, setRegistered] = useState<Set<string>>(new Set());

  const register = (id: string) => setRegistered(prev => new Set([...prev, id]));

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' }).toUpperCase();

  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-8" style={{ background: '#FF3800' }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: '#FF3800' }}>AGENDA</span>
        </div>
        <h2 className="font-display text-6xl md:text-7xl tracking-tight mb-10" style={{ color: '#f0f0f0' }}>XOXO EVENTS</h2>

        <div className="space-y-px" style={{ background: '#2a2a2a' }}>
          {events.map(event => {
            const isReg = registered.has(event.id);
            const isFull = event.registeredCount >= event.spots;
            const pct = Math.min(100, Math.round((event.registeredCount / event.spots) * 100));
            return (
              <div key={event.id} style={{ background: '#111' }}>
                <div className="grid grid-cols-1 md:grid-cols-5">
                  {/* Image */}
                  <div className="md:col-span-2 relative overflow-hidden" style={{ minHeight: 200, background: '#0d0d0d' }}>
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" style={{ opacity: 0.6 }} />
                    <div className="absolute top-4 left-4 font-mono text-xs px-2 py-1" style={{ background: TYPE_COLORS[event.type], color: '#080808' }}>
                      {TYPE_LABELS[event.type]}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="md:col-span-3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-xs mb-2" style={{ color: '#555' }}>{formatDate(event.date)} — {event.time}</div>
                      <h3 className="font-display text-2xl tracking-wide mb-2" style={{ color: '#f0f0f0' }}>{event.title}</h3>
                      <div className="flex items-center gap-2 mb-4">
                        <MapPin size={12} style={{ color: '#444' }} /><span className="font-mono text-xs" style={{ color: '#444' }}>{event.location}</span>
                      </div>
                      <p className="font-mono text-xs leading-relaxed mb-6" style={{ color: '#666' }}>{event.description}</p>

                      {/* Capacity bar */}
                      <div className="mb-4">
                        <div className="flex justify-between mb-1">
                          <span className="font-mono text-xs" style={{ color: '#444' }}>PLACES</span>
                          <span className="font-mono text-xs" style={{ color: isFull ? '#FF3800' : '#666' }}>
                            {event.registeredCount}/{event.spots}
                          </span>
                        </div>
                        <div className="progress-bar">
                          <div className="progress-fill" style={{ width: `${pct}%`, background: isFull ? '#FF3800' : '#CCFF00' }} />
                        </div>
                        {isFull && <div className="font-mono text-xs mt-1" style={{ color: '#FF3800' }}>COMPLET</div>}
                      </div>
                    </div>

                    <button
                      onClick={() => !isFull && !isReg && register(event.id)}
                      disabled={isFull || isReg}
                      className="self-start font-display tracking-widest px-6 py-3 transition-all"
                      style={{
                        background: isReg ? 'rgba(204,255,0,0.08)' : isFull ? 'transparent' : '#CCFF00',
                        color: isReg ? '#CCFF00' : isFull ? '#333' : '#080808',
                        border: (isReg || isFull) ? '1px solid' : 'none',
                        borderColor: isReg ? '#CCFF00' : '#2a2a2a',
                        letterSpacing: '0.1em',
                        cursor: (isFull || isReg) ? 'default' : 'pointer',
                      }}
                    >
                      {isReg ? <span className="flex items-center gap-2"><Check size={14} /> INSCRIT</span> : isFull ? "LISTE D'ATTENTE" : 'JE PARTICIPE'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Map / Location block */}
        <div className="mt-10 p-6" style={{ border: '1px solid #2a2a2a', background: '#111' }}>
          <div className="font-display text-xl tracking-wider mb-4" style={{ color: '#f0f0f0' }}>LA BOUTIQUE</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="font-mono text-sm mb-2" style={{ color: '#CCFF00' }}>XOXO SKATE SHOP</div>
              <div className="font-mono text-xs leading-relaxed" style={{ color: '#666' }}>
                197 Avenue Pierre Mendès-France<br />
                Marseille 13008<br /><br />
                Lun–Sam : 10:00 – 19:00<br />
                Dim : Fermé
              </div>
            </div>
            <div className="h-32 md:h-full" style={{ background: '#0d0d0d', minHeight: 120, border: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="flex items-center gap-1 font-mono text-xs" style={{ color: '#2a2a2a' }}><MapPin size={12} /> Carte Google Maps</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
