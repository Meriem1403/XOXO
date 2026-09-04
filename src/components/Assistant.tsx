import React, { useState } from 'react';
import { ShoppingBag, Zap, Target, MapPin } from 'lucide-react';
import { products } from '../data';
import type { Product, View } from '../types';

type Step = 'sport' | 'level' | 'budget' | 'usage' | 'results';
type Sport = 'skate' | 'surfskate' | 'trottinette' | 'roller';
type Level = 'debutant' | 'intermediaire' | 'confirme';
type Budget = 'low' | 'mid' | 'high';
type Usage = 'street' | 'park' | 'cruise' | 'everything';

interface Answers {
  sport?: Sport;
  level?: Level;
  budget?: Budget;
  usage?: Usage;
}

const SPORT_OPTIONS: { id: Sport; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: 'skate', label: 'Skateboard', icon: <ShoppingBag size={36} />, desc: 'Street, park, tricks' },
  { id: 'surfskate', label: 'Surfskate', icon: <Zap size={36} />, desc: 'Sensations surf sur asphalte' },
  { id: 'trottinette', label: 'Trottinette', icon: <Target size={36} />, desc: 'Scooter freestyle / urbain' },
  { id: 'roller', label: 'Roller', icon: <MapPin size={36} />, desc: 'Inline, agressif, fitness' },
];

const LEVEL_OPTIONS: { id: Level; label: string; desc: string }[] = [
  { id: 'debutant', label: 'Débutant', desc: 'Je commence ou je reprends' },
  { id: 'intermediaire', label: 'Intermédiaire', desc: 'Je maîtrise les bases' },
  { id: 'confirme', label: 'Confirmé', desc: 'Je fais des tricks régulièrement' },
];

const BUDGET_OPTIONS: { id: Budget; label: string; range: string }[] = [
  { id: 'low', label: 'Petit budget', range: '< 100 €' },
  { id: 'mid', label: 'Budget moyen', range: '100 – 200 €' },
  { id: 'high', label: 'Sans limite', range: '200 € +' },
];

const USAGE_OPTIONS: { id: Usage; label: string; icon: React.ReactNode }[] = [
  { id: 'street', label: 'Street / urbain', icon: <MapPin size={28} /> },
  { id: 'park', label: 'Skatepark', icon: <Target size={28} /> },
  { id: 'cruise', label: 'Balade / cruising', icon: <Zap size={28} /> },
  { id: 'everything', label: 'Un peu tout', icon: <ShoppingBag size={28} /> },
];

function getRecommendations(answers: Answers): { product: Product; why: string[] }[] {
  const budget = answers.budget === 'low' ? 100 : answers.budget === 'mid' ? 200 : Infinity;
  let recs: { product: Product; why: string[] }[] = [];

  if (answers.sport === 'skate') {
    if (answers.level === 'debutant') {
      const p = products.find(x => x.id === 'sk-004');
      if (p && p.price <= budget) recs.push({ product: p, why: ['Setup complet prêt à rider', 'Idéal pour apprendre', 'Rapport qualité/prix parfait'] });
    }
    if (answers.level === 'intermediaire' || answers.level === 'confirme') {
      const p = products.find(x => x.id === 'sk-001');
      if (p && p.price <= budget) recs.push({ product: p, why: ['Deck pro qualité', 'Graphic iconique', 'Recommandé par notre équipe'] });
      const t = products.find(x => x.id === 'sk-002');
      if (t && t.price <= budget) recs.push({ product: t, why: ['Trucks Independent — référence mondiale', 'Ultra durables', 'Standard de l\'industrie'] });
    }
    const w = products.find(x => x.id === 'sk-003');
    if (w && w.price <= budget) recs.push({ product: w, why: ['Roues polyvalentes', 'Anti-flatspot', 'Pour street et park'] });
    const shoes = products.find(x => x.id === 'sh-001');
    if (shoes && shoes.price <= budget) recs.push({ product: shoes, why: ['Chaussure skate iconique', 'Résistante', 'Semelle vulcanisée'] });
  }

  if (answers.sport === 'surfskate') {
    const p = products.find(x => x.id === 'sk-004');
    if (p) recs.push({ product: p, why: ['Adapté au surfskate', 'Deck large et stable', 'Parfait pour les vagues simulées'] });
  }

  // Add clothing if budget allows
  if (answers.budget !== 'low') {
    const hoodie = products.find(x => x.id === 'cl-001');
    if (hoodie) recs.push({ product: hoodie, why: ['Hoodie XOXO exclusif', 'Made in Marseille', 'Finitions premium'] });
  }

  return recs.slice(0, 4);
}

interface AssistantProps {
  onSelectProduct: (p: Product) => void;
  setView: (v: View) => void;
}

export default function Assistant({ onSelectProduct, setView }: AssistantProps) {
  const [step, setStep] = useState<Step>('sport');
  const [answers, setAnswers] = useState<Answers>({});
  const [recs, setRecs] = useState<{ product: Product; why: string[] }[]>([]);

  const answer = <K extends keyof Answers>(key: K, value: Answers[K]) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);
    const next: Record<Step, Step> = { sport: 'level', level: 'budget', budget: 'usage', usage: 'results', results: 'results' };
    if (key === 'usage') {
      setRecs(getRecommendations(updated));
      setStep('results');
    } else {
      setStep(next[step]);
    }
  };

  const reset = () => { setStep('sport'); setAnswers({}); setRecs([]); };

  const steps = ['sport', 'level', 'budget', 'usage', 'results'];
  const stepIdx = steps.indexOf(step);

  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-8" style={{ background: '#FF3800' }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: '#FF3800' }}>ASSISTANT XOXO</span>
        </div>
        <h2 className="font-display text-5xl md:text-6xl tracking-tight mb-3" style={{ color: '#f0f0f0' }}>TU NE SAIS<br />PAS QUOI<br />CHOISIR ?</h2>
        <p className="font-mono text-sm mb-10" style={{ color: '#555' }}>On te guide en 4 questions vers la sélection parfaite.</p>

        {/* Progress */}
        {step !== 'results' && (
          <div className="flex gap-1 mb-10">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="h-1 flex-1 transition-all" style={{ background: i < stepIdx ? '#CCFF00' : i === stepIdx ? '#CCFF00' : '#1a1a1a', opacity: i === stepIdx ? 1 : i < stepIdx ? 0.6 : 1 }} />
            ))}
          </div>
        )}

        {/* SPORT */}
        {step === 'sport' && (
          <div>
            <div className="font-display text-2xl mb-6" style={{ color: '#f0f0f0' }}>Quel sport t'intéresse ?</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: '#2a2a2a' }}>
              {SPORT_OPTIONS.map(o => (
                <button key={o.id} onClick={() => answer('sport', o.id)} className="p-6 text-left transition-all group" style={{ background: '#111' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#161616')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#111')}>
                  <div className="mb-3" style={{ color: '#CCFF00' }}>{o.icon}</div>
                  <div className="font-display text-xl tracking-wide mb-1" style={{ color: '#f0f0f0' }}>{o.label}</div>
                  <div className="font-mono text-xs" style={{ color: '#555' }}>{o.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* LEVEL */}
        {step === 'level' && (
          <div>
            <div className="font-display text-2xl mb-6" style={{ color: '#f0f0f0' }}>Ton niveau ?</div>
            <div className="space-y-px" style={{ background: '#2a2a2a' }}>
              {LEVEL_OPTIONS.map(o => (
                <button key={o.id} onClick={() => answer('level', o.id)}
                  className="w-full flex items-center justify-between p-6 text-left transition-all"
                  style={{ background: '#111' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#161616')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#111')}>
                  <div>
                    <div className="font-display text-xl tracking-wide" style={{ color: '#f0f0f0' }}>{o.label}</div>
                    <div className="font-mono text-xs mt-1" style={{ color: '#555' }}>{o.desc}</div>
                  </div>
                  <span className="font-mono text-2xl" style={{ color: '#2a2a2a' }}>→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* BUDGET */}
        {step === 'budget' && (
          <div>
            <div className="font-display text-2xl mb-6" style={{ color: '#f0f0f0' }}>Ton budget ?</div>
            <div className="grid grid-cols-3 gap-px" style={{ background: '#2a2a2a' }}>
              {BUDGET_OPTIONS.map(o => (
                <button key={o.id} onClick={() => answer('budget', o.id)}
                  className="p-6 text-center transition-all"
                  style={{ background: '#111' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#161616')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#111')}>
                  <div className="font-mono text-xs mb-2" style={{ color: '#555' }}>{o.label}</div>
                  <div className="font-display text-2xl" style={{ color: '#CCFF00' }}>{o.range}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* USAGE */}
        {step === 'usage' && (
          <div>
            <div className="font-display text-2xl mb-6" style={{ color: '#f0f0f0' }}>Ton utilisation principale ?</div>
            <div className="grid grid-cols-2 gap-px" style={{ background: '#2a2a2a' }}>
              {USAGE_OPTIONS.map(o => (
                <button key={o.id} onClick={() => answer('usage', o.id)}
                  className="p-6 text-left transition-all"
                  style={{ background: '#111' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#161616')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#111')}>
                  <div className="mb-3" style={{ color: '#CCFF00' }}>{o.icon}</div>
                  <div className="font-display text-lg tracking-wide" style={{ color: '#f0f0f0' }}>{o.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS */}
        {step === 'results' && (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="font-display text-2xl flex items-center gap-3" style={{ color: '#f0f0f0' }}><Target size={24} style={{ color: '#CCFF00' }} /> NOTRE SÉLECTION POUR TOI</div>
            </div>
            {recs.length === 0 ? (
              <div className="p-8 text-center" style={{ border: '1px solid #2a2a2a' }}>
                <p className="font-mono text-sm mb-4" style={{ color: '#555' }}>Aucune recommandation précise. Viens nous voir en boutique !</p>
                <p className="font-mono text-xs" style={{ color: '#444' }}>197 Av. Pierre Mendès-France — Marseille 13008</p>
              </div>
            ) : (
              <div className="space-y-px" style={{ background: '#2a2a2a' }}>
                {recs.map(({ product, why }) => (
                  <div key={product.id} className="flex gap-4 p-5" style={{ background: '#111' }}>
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden" style={{ background: '#0d0d0d' }}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-xs mb-1" style={{ color: '#FF3800' }}>{product.brand}</div>
                      <div className="font-display text-base mb-2" style={{ color: '#f0f0f0' }}>{product.name}</div>
                      <div className="space-y-1 mb-3">
                        {why.map(w => (
                          <div key={w} className="flex items-center gap-2">
                            <span style={{ color: '#CCFF00' }}>→</span>
                            <span className="font-mono text-xs" style={{ color: '#666' }}>{w}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-display text-xl" style={{ color: '#CCFF00' }}>{product.price.toFixed(2)} €</span>
                        <button
                          onClick={() => { onSelectProduct(product); setView('product'); }}
                          className="font-mono text-xs tracking-widest px-4 py-2 transition-all"
                          style={{ border: '1px solid #CCFF00', color: '#CCFF00' }}
                        >
                          VOIR →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-4 mt-8">
              <button onClick={reset} className="font-mono text-xs tracking-widest px-6 py-3" style={{ border: '1px solid #2a2a2a', color: '#555' }}>← RECOMMENCER</button>
              <button onClick={() => setView('shop')} className="font-display tracking-widest px-6 py-3" style={{ background: '#CCFF00', color: '#080808', letterSpacing: '0.1em' }}>TOUT LE SHOP</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
