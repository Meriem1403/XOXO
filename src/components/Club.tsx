import React, { useState } from 'react';
import { Award, Gift, Truck, Flame, Package, Star } from 'lucide-react';
import type { View } from '../types';

const LEVELS: { name: string; points: number; color: string; icon: React.ReactNode; perks: string[] }[] = [
  { name: 'BRONZE', points: 0, color: '#CD7F32', icon: <Award size={28} />, perks: ['Livraison -10% dès 100€', 'Accès aux ventes privées'] },
  { name: 'SILVER', points: 300, color: '#C0C0C0', icon: <Award size={28} />, perks: ['Livraison gratuite dès 60€', 'Grip offert tous les 6 mois', '-5% permanent en boutique'] },
  { name: 'GOLD', points: 600, color: '#CCFF00', icon: <Award size={28} />, perks: ['Livraison gratuite', '-10% permanent', 'Accès anticipé aux drops', 'Invitations événements VIP', 'Setup gratuit 1×/an'] },
];

const ACTIVITIES = [
  { label: 'Commande #ORD-2024-005', points: 97, date: '03/09/2024', type: 'purchase' },
  { label: 'Commande #ORD-2024-003', points: 149, date: '02/09/2024', type: 'purchase' },
  { label: 'Inscription newsletter', points: 50, date: '01/09/2024', type: 'bonus' },
  { label: 'Premier achat', points: 79, date: '01/09/2024', type: 'purchase' },
  { label: 'Bonus création compte', points: 100, date: '01/09/2024', type: 'bonus' },
];

const REWARDS: { label: string; points: number; icon: React.ReactNode }[] = [
  { label: 'Grip offert', points: 100, icon: <Package size={28} /> },
  { label: 'Livraison gratuite', points: 200, icon: <Truck size={28} /> },
  { label: '-15% sur ta prochaine commande', points: 300, icon: <Star size={28} /> },
  { label: 'Goodies XOXO Pack', points: 400, icon: <Gift size={28} /> },
  { label: 'Accès drop exclusif', points: 500, icon: <Flame size={28} /> },
  { label: "Session privée avec l'équipe", points: 1000, icon: <Award size={28} /> },
];

interface ClubProps {
  setView: (v: View) => void;
}

export default function Club({ setView }: ClubProps) {
  const [tab, setTab] = useState<'compte' | 'recompenses' | 'historique'>('compte');
  const userPoints = 475;
  const currentLevel = LEVELS.find((_, i) => LEVELS[i + 1]?.points > userPoints) || LEVELS[LEVELS.length - 1];
  const nextLevel = LEVELS[LEVELS.indexOf(currentLevel) + 1];
  const progress = nextLevel
    ? Math.round(((userPoints - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100)
    : 100;

  const [redeemed, setRedeemed] = useState<Set<string>>(new Set());

  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-8" style={{ background: '#FF3800' }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: '#FF3800' }}>FIDÉLITÉ</span>
        </div>
        <h2 className="font-display text-6xl md:text-7xl tracking-tight mb-10" style={{ color: '#f0f0f0' }}>XOXO CLUB</h2>

        {/* Status card */}
        <div className="p-6 mb-8" style={{ background: 'linear-gradient(135deg, #0e1a00 0%, #111 60%)', border: '1px solid #CCFF00', position: 'relative', overflow: 'hidden' }}>
          <div className="absolute top-0 right-0 font-display opacity-5" style={{ fontSize: 120, lineHeight: 1, color: '#CCFF00', userSelect: 'none' }}>XOXO</div>
          <div className="relative">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="font-mono text-xs tracking-widest mb-1" style={{ color: '#555' }}>TON STATUT</div>
                <div className="flex items-center gap-3">
                  <span style={{ color: currentLevel.color }}>{currentLevel.icon}</span>
                  <div className="font-display text-3xl tracking-wider" style={{ color: currentLevel.color }}>{currentLevel.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono text-xs tracking-widest mb-1" style={{ color: '#555' }}>TES POINTS</div>
                <div className="font-display text-4xl" style={{ color: '#CCFF00' }}>{userPoints}</div>
                <div className="font-mono text-xs" style={{ color: '#444' }}>pts</div>
              </div>
            </div>

            {nextLevel && (
              <>
                <div className="flex justify-between mb-2">
                  <span className="font-mono text-xs flex items-center gap-1" style={{ color: '#555' }}>Prochain niveau : <span style={{ color: nextLevel.color }}>{nextLevel.icon}</span> {nextLevel.name}</span>
                  <span className="font-mono text-xs" style={{ color: '#CCFF00' }}>{nextLevel.points - userPoints} pts restants</span>
                </div>
                <div className="progress-bar" style={{ height: 8 }}>
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </>
            )}

            <div className="mt-4">
              <div className="font-mono text-xs mb-2" style={{ color: '#444' }}>TES AVANTAGES</div>
              <div className="flex flex-wrap gap-2">
                {currentLevel.perks.map(p => (
                  <span key={p} className="font-mono text-xs px-2 py-1" style={{ background: 'rgba(204,255,0,0.08)', border: '1px solid #1a3300', color: '#CCFF00' }}>{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 mb-8" style={{ borderBottom: '1px solid #2a2a2a' }}>
          {(['compte', 'recompenses', 'historique'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="font-display tracking-widest text-sm px-6 py-4 capitalize transition-all"
              style={{
                color: tab === t ? '#CCFF00' : '#444',
                borderBottom: tab === t ? '2px solid #CCFF00' : '2px solid transparent',
                letterSpacing: '0.1em',
              }}>
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {/* COMPTE */}
        {tab === 'compte' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: '#2a2a2a' }}>
            {LEVELS.map(lvl => (
              <div key={lvl.name} className="p-6" style={{ background: lvl.name === currentLevel.name ? '#0e1a00' : '#111', border: lvl.name === currentLevel.name ? '1px solid #CCFF00' : '1px solid transparent' }}>
                <div className="flex items-center gap-2 mb-4">
                  <span style={{ color: lvl.color }}>{lvl.icon}</span>
                  <div className="font-display text-xl tracking-wider" style={{ color: lvl.color }}>{lvl.name}</div>
                  {lvl.name === currentLevel.name && <span className="font-mono text-xs ml-auto" style={{ color: '#CCFF00' }}>TU ES ICI</span>}
                </div>
                <div className="font-mono text-xs mb-3" style={{ color: '#444' }}>{lvl.points} pts pour débloquer</div>
                <div className="space-y-2">
                  {lvl.perks.map(p => (
                    <div key={p} className="flex items-start gap-2">
                      <span style={{ color: lvl.color }}>→</span>
                      <span className="font-mono text-xs leading-relaxed" style={{ color: '#666' }}>{p}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* RÉCOMPENSES */}
        {tab === 'recompenses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#2a2a2a' }}>
            {REWARDS.map(r => {
              const canRedeem = userPoints >= r.points;
              const done = redeemed.has(r.label);
              return (
                <div key={r.label} className="p-5 flex items-center gap-4" style={{ background: '#111', opacity: canRedeem ? 1 : 0.5 }}>
                  <span style={{ color: '#CCFF00' }}>{r.icon}</span>
                  <div className="flex-1">
                    <div className="font-display text-base tracking-wide" style={{ color: '#f0f0f0' }}>{r.label}</div>
                    <div className="font-mono text-xs mt-1" style={{ color: '#555' }}>{r.points} points</div>
                  </div>
                  <button
                    disabled={!canRedeem || done}
                    onClick={() => canRedeem && !done && setRedeemed(p => new Set([...p, r.label]))}
                    className="font-mono text-xs tracking-widest px-4 py-2 whitespace-nowrap transition-all"
                    style={{
                      border: '1px solid',
                      borderColor: done ? '#CCFF00' : canRedeem ? '#CCFF00' : '#2a2a2a',
                      color: done ? '#CCFF00' : canRedeem ? '#CCFF00' : '#333',
                      cursor: canRedeem && !done ? 'pointer' : 'default',
                    }}
                  >
                    {done ? <span className="flex items-center gap-1"><Award size={12} /> UTILISÉ</span> : canRedeem ? 'UTILISER' : `${r.points - userPoints} pts`}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* HISTORIQUE */}
        {tab === 'historique' && (
          <div style={{ border: '1px solid #2a2a2a', background: '#111' }}>
            {ACTIVITIES.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-4" style={{ borderBottom: '1px solid #1a1a1a' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 flex items-center justify-center" style={{ background: a.type === 'bonus' ? 'rgba(255,56,0,0.1)' : 'rgba(204,255,0,0.08)', border: `1px solid ${a.type === 'bonus' ? '#FF3800' : '#CCFF00'}` }}>
                    <span className="font-mono text-xs" style={{ color: a.type === 'bonus' ? '#FF3800' : '#CCFF00' }}>{a.type === 'bonus' ? <Star size={12} /> : '€'}</span>
                  </div>
                  <div>
                    <div className="font-mono text-xs" style={{ color: '#888' }}>{a.label}</div>
                    <div className="font-mono text-xs mt-0.5" style={{ color: '#333' }}>{a.date}</div>
                  </div>
                </div>
                <div className="font-display text-lg" style={{ color: '#CCFF00' }}>+{a.points} pts</div>
              </div>
            ))}
          </div>
        )}

        {/* Birthday */}
        <div className="mt-8 p-6" style={{ border: '1px dashed #2a2a2a' }}>
          <div className="flex items-center gap-4">
            <span style={{ color: '#CCFF00' }}><Gift size={28} /></span>
            <div>
              <div className="font-display text-lg tracking-wider mb-1" style={{ color: '#f0f0f0' }}>ANNIVERSAIRE XOXO</div>
              <p className="font-mono text-xs" style={{ color: '#555' }}>
                Renseigne ta date d'anniversaire et reçois automatiquement -15% le jour J.
              </p>
            </div>
            <button className="ml-auto font-mono text-xs tracking-widest px-4 py-2 whitespace-nowrap" style={{ border: '1px solid #2a2a2a', color: '#555' }}>
              AJOUTER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
