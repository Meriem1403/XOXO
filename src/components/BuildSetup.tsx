import React, { useState } from 'react';
import { Package, Wrench, Settings, BookOpen, Check } from 'lucide-react';
import { setupParts } from '../data';
import type { SetupPart, CartItem, View } from '../types';

const STEPS: { type: SetupPart['type']; label: string; icon: React.ReactNode; required: boolean }[] = [
  { type: 'deck', label: 'DECK', icon: <Package size={16} />, required: true },
  { type: 'trucks', label: 'TRUCKS', icon: <Wrench size={16} />, required: true },
  { type: 'wheels', label: 'ROUES', icon: <Settings size={16} />, required: true },
  { type: 'bearings', label: 'ROULEMENTS', icon: <Settings size={16} />, required: true },
  { type: 'grip', label: 'GRIP', icon: <BookOpen size={16} />, required: true },
  { type: 'hardware', label: 'VISSERIE', icon: <Wrench size={16} />, required: true },
];

interface BuildSetupProps {
  onAddSetupToCart: (items: CartItem[]) => void;
  setView: (v: View) => void;
}

export default function BuildSetup({ onAddSetupToCart, setView }: BuildSetupProps) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<Partial<Record<SetupPart['type'], SetupPart>>>({});
  const [done, setDone] = useState(false);

  const currentType = STEPS[step].type;
  const partsForStep = setupParts.filter(p => p.type === currentType);
  const total = Object.values(selected).reduce((s, p) => s + p.price, 0);
  const allSelected = STEPS.every(s => selected[s.type]);

  const handleSelect = (part: SetupPart) => {
    setSelected(prev => ({ ...prev, [currentType]: part }));
    if (step < STEPS.length - 1) {
      setTimeout(() => setStep(s => s + 1), 250);
    }
  };

  const handleAddToCart = () => {
    const items: CartItem[] = Object.values(selected).map(part => ({
      product: {
        id: part.id, name: part.name, brand: part.brand, category: 'accessories' as const,
        price: part.price, image: part.image, description: '', stock: 10, tags: [],
      },
      quantity: 1,
    }));
    onAddSetupToCart(items);
    setDone(true);
  };

  if (done) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center" style={{ background: '#080808' }}>
        <div className="text-center max-w-md px-6">
          <div className="mb-4" style={{ color: '#CCFF00' }}><Package size={80} /></div>
          <h2 className="font-display text-4xl tracking-wider mb-4" style={{ color: '#f0f0f0' }}>SETUP CRÉÉ !</h2>
          <p className="font-mono text-sm mb-2" style={{ color: '#666' }}>Ton setup custom est dans le panier.</p>
          <p className="font-display text-3xl mb-8" style={{ color: '#CCFF00' }}>{total.toFixed(2)} €</p>
          <div className="flex flex-col gap-3">
            <button onClick={() => setView('cart')} className="font-display tracking-widest px-8 py-4" style={{ background: '#CCFF00', color: '#080808', letterSpacing: '0.1em' }}>VOIR MON PANIER</button>
            <button onClick={() => { setSelected({}); setStep(0); setDone(false); }} className="font-mono text-xs tracking-widest py-3" style={{ color: '#444', border: '1px solid #1a1a1a' }}>RECOMMENCER</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-8" style={{ background: '#FF3800' }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: '#FF3800' }}>CONFIGURATEUR</span>
        </div>
        <h2 className="font-display text-5xl md:text-7xl tracking-tight mb-10" style={{ color: '#f0f0f0' }}>CONSTRUIS<br />TON SETUP</h2>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar summary */}
          <div className="order-2 lg:order-1">
            <div className="sticky top-24 p-5" style={{ background: '#111', border: '1px solid #2a2a2a' }}>
              <div className="font-display text-lg tracking-wider mb-4" style={{ color: '#f0f0f0' }}>TON SETUP</div>
              <div className="space-y-3 mb-6">
                {STEPS.map((s, i) => {
                  const part = selected[s.type];
                  const isActive = i === step;
                  return (
                    <button
                      key={s.type}
                      onClick={() => setStep(i)}
                      className="w-full flex items-center gap-3 text-left p-2 transition-all"
                      style={{ borderLeft: '2px solid', borderColor: isActive ? '#CCFF00' : part ? '#2a2a2a' : '#1a1a1a' }}
                    >
                      <span className="flex items-center">{s.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-xs tracking-widest" style={{ color: isActive ? '#CCFF00' : '#555' }}>{s.label}</div>
                        {part && (
                          <div className="font-mono text-xs truncate mt-0.5" style={{ color: '#888' }}>{part.name}</div>
                        )}
                        {!part && <div className="font-mono text-xs" style={{ color: '#333' }}>Non choisi</div>}
                      </div>
                      {part && <span className="font-mono text-xs whitespace-nowrap" style={{ color: '#CCFF00' }}>{part.price.toFixed(0)} €</span>}
                    </button>
                  );
                })}
              </div>

              {/* Total */}
              <div className="pt-4 mb-4" style={{ borderTop: '1px solid #2a2a2a' }}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-mono text-xs" style={{ color: '#555' }}>TOTAL SETUP</span>
                  <span className="font-display text-2xl" style={{ color: '#CCFF00' }}>{total.toFixed(2)} €</span>
                </div>
                <div className="font-mono text-xs" style={{ color: '#333' }}>
                  {Object.keys(selected).length}/{STEPS.length} pièces choisies
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!allSelected}
                className="w-full font-display tracking-widest py-4 transition-all"
                style={{
                  background: allSelected ? '#CCFF00' : '#1a1a1a',
                  color: allSelected ? '#080808' : '#333',
                  letterSpacing: '0.1em',
                  cursor: allSelected ? 'pointer' : 'not-allowed',
                }}
              >
                {allSelected ? 'AJOUTER AU PANIER' : 'COMPLÈTE TON SETUP'}
              </button>
            </div>
          </div>

          {/* Step content */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            {/* Step nav */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {STEPS.map((s, i) => (
                <button
                  key={s.type}
                  onClick={() => setStep(i)}
                  className="flex items-center gap-2 px-4 py-2 whitespace-nowrap font-mono text-xs tracking-widest transition-all"
                  style={{
                    border: '1px solid',
                    borderColor: i === step ? '#CCFF00' : selected[s.type] ? '#2a2a2a' : '#1a1a1a',
                    color: i === step ? '#CCFF00' : selected[s.type] ? '#888' : '#333',
                    background: i === step ? 'rgba(204,255,0,0.05)' : 'transparent',
                  }}
                >
                  <span className="flex items-center">{s.icon}</span>
                  <span>{s.label}</span>
                  {selected[s.type] && <Check size={12} />}
                </button>
              ))}
            </div>

            <div className="font-display text-2xl mb-6 tracking-wide flex items-center gap-3" style={{ color: '#f0f0f0' }}>
              CHOISIR {STEPS[step].label} <span className="flex items-center">{STEPS[step].icon}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: '#2a2a2a' }}>
              {partsForStep.map(part => {
                const isSelected = selected[currentType]?.id === part.id;
                return (
                  <button
                    key={part.id}
                    onClick={() => handleSelect(part)}
                    className="flex gap-4 p-5 text-left transition-all"
                    style={{
                      background: isSelected ? '#0e1a00' : '#111',
                      border: isSelected ? '1px solid #CCFF00' : '1px solid transparent',
                      outline: 'none',
                    }}
                  >
                    <div className="w-16 h-16 flex-shrink-0 overflow-hidden" style={{ background: '#0d0d0d' }}>
                      <img src={part.image} alt={part.name} className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-xs mb-1" style={{ color: isSelected ? '#CCFF00' : '#FF3800' }}>{part.brand}</div>
                      <div className="font-display text-sm leading-tight mb-1" style={{ color: '#f0f0f0' }}>{part.name}</div>
                      {part.size && <div className="font-mono text-xs" style={{ color: '#555' }}>Taille: {part.size}</div>}
                      <div className="font-display text-lg mt-2" style={{ color: '#CCFF00' }}>{part.price.toFixed(2)} €</div>
                    </div>
                    {isSelected && (
                      <div className="self-center w-6 h-6 flex items-center justify-center" style={{ background: '#CCFF00', borderRadius: '50%' }}>
                        <Check size={12} style={{ color: '#080808' }} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {step < STEPS.length - 1 && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setStep(s => s + 1)}
                  className="font-mono text-xs tracking-widest px-6 py-3 transition-all"
                  style={{ border: '1px solid #2a2a2a', color: '#555' }}
                >
                  PASSER →
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
