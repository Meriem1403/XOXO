import { useState } from 'react';
import { Check, X, Package, Award, ShoppingBag } from 'lucide-react';
import { products } from '../data';
import type { CartItem, View } from '../types';

// Smart suggestions: if you have a deck but no trucks → suggest trucks, etc.
function getSuggestions(items: CartItem[]) {
  const categories = items.map(i => i.product.category);
  const tags = items.flatMap(i => i.product.tags);
  const suggestions: typeof products = [];

  const hasDeck = tags.includes('deck') || tags.includes('complete');
  const hasTrucks = tags.includes('trucks');
  const hasWheels = tags.includes('wheels') || tags.includes('roues');
  const hasBearings = tags.includes('bearings');
  const hasGrip = tags.includes('grip');

  if (hasDeck && !hasTrucks) {
    const t = products.find(p => p.id === 'sk-002');
    if (t && !items.find(i => i.product.id === t.id)) suggestions.push(t);
  }
  if (hasDeck && !hasWheels) {
    const w = products.find(p => p.id === 'sk-003');
    if (w && !items.find(i => i.product.id === w.id)) suggestions.push(w);
  }
  if (hasDeck && !hasBearings) {
    const b = products.find(p => p.id === 'sk-006');
    if (b && !items.find(i => i.product.id === b.id)) suggestions.push(b);
  }
  if (hasDeck && !hasGrip) {
    const g = products.find(p => p.id === 'sk-007');
    if (g && !items.find(i => i.product.id === g.id)) suggestions.push(g);
  }
  if ((categories.includes('skate') || categories.includes('surf')) && !categories.includes('shoes')) {
    const s = products.find(p => p.id === 'sh-001');
    if (s && !items.find(i => i.product.id === s.id)) suggestions.push(s);
  }

  return suggestions.slice(0, 3);
}

interface CartProps {
  items: CartItem[];
  onUpdate: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onAdd: (p: CartItem) => void;
  setView: (v: View) => void;
}

export default function Cart({ items, onUpdate, onRemove, onAdd, setView }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = total > 100 ? 0 : 5.90;
  const suggestions = getSuggestions(items);

  const hasDeck = items.some(i => i.product.tags.includes('deck') || i.product.tags.includes('complete'));
  const hasTrucks = items.some(i => i.product.tags.includes('trucks'));
  const hasWheels = items.some(i => i.product.tags.includes('wheels'));
  const hasBearings = items.some(i => i.product.tags.includes('bearings'));
  const hasGrip = items.some(i => i.product.tags.includes('grip'));
  const isNearComplete = hasDeck && (!hasTrucks || !hasWheels || !hasBearings || !hasGrip);

  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-8" style={{ background: '#FF3800' }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: '#FF3800' }}>MON PANIER</span>
        </div>
        <h2 className="font-display text-5xl mb-10" style={{ color: '#f0f0f0' }}>PANIER</h2>

        {items.length === 0 ? (
          <div className="text-center py-24" style={{ border: '1px solid #1a1a1a' }}>
            <div className="font-display text-6xl mb-4" style={{ color: '#1e1e1e' }}>VIDE</div>
            <p className="mb-8" style={{ color: '#555' }}>Ton panier est vide. Le shop t'attend.</p>
            <div className="flex justify-center gap-4">
              <button onClick={() => setView('shop')} className="font-display tracking-widest px-8 py-4" style={{ background: '#CCFF00', color: '#080808', letterSpacing: '0.1em' }}>ACHETER</button>
              <button onClick={() => setView('build-setup')} className="font-display tracking-widest px-6 py-4" style={{ border: '1px solid #2a2a2a', color: '#888', letterSpacing: '0.1em' }}>CONSTRUIRE SETUP</button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-y">
              {/* Smart setup checker */}
              {isNearComplete && (
                <div className="p-4 mb-2" style={{ background: '#0e1a00', border: '1px solid #1a3300' }}>
                  <div className="font-display text-sm tracking-wider mb-3 flex items-center gap-2" style={{ color: '#CCFF00' }}><Package size={16} /> TON SETUP EST PRESQUE COMPLET</div>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: 'Deck', ok: hasDeck },
                      { label: 'Trucks', ok: hasTrucks },
                      { label: 'Roues', ok: hasWheels },
                      { label: 'Roulements', ok: hasBearings },
                      { label: 'Grip', ok: hasGrip },
                    ].map(({ label, ok }) => (
                      <div key={label} className="flex items-center gap-1">
                        <span style={{ color: ok ? '#CCFF00' : '#FF3800' }}>{ok ? <Check size={12} /> : <X size={12} />}</span>
                        <span className="font-mono text-xs" style={{ color: ok ? '#CCFF00' : '#888' }}>{label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ border: '1px solid #2a2a2a', background: '#111' }}>
                {items.map(({ product, quantity, size }) => (
                  <div key={product.id + (size || '')} className="flex gap-4 p-5" style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <div className="w-20 h-20 flex-shrink-0 overflow-hidden" style={{ background: '#0d0d0d' }}>
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-xs mb-1 uppercase" style={{ color: '#FF3800' }}>{product.brand}</div>
                      <div className="font-display text-sm leading-tight" style={{ color: '#f0f0f0' }}>{product.name}</div>
                      {size && <div className="font-mono text-xs mt-1" style={{ color: '#555' }}>TAILLE: {size}</div>}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-0" style={{ border: '1px solid #2a2a2a' }}>
                          <button onClick={() => quantity > 1 ? onUpdate(product.id, quantity - 1) : onRemove(product.id)} className="w-8 h-8 flex items-center justify-center font-mono text-sm" style={{ color: '#666' }}>-</button>
                          <span className="w-8 h-8 flex items-center justify-center font-mono text-sm" style={{ color: '#f0f0f0', borderLeft: '1px solid #2a2a2a', borderRight: '1px solid #2a2a2a' }}>{quantity}</span>
                          <button onClick={() => onUpdate(product.id, quantity + 1)} className="w-8 h-8 flex items-center justify-center font-mono text-sm" style={{ color: '#666' }}>+</button>
                        </div>
                        <div className="font-mono text-sm font-bold" style={{ color: '#CCFF00' }}>{(product.price * quantity).toFixed(2)} €</div>
                      </div>
                    </div>
                    <button onClick={() => onRemove(product.id)} className="self-start font-mono text-xs transition-colors" style={{ color: '#333' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#FF3800')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#333')}><X size={14} /></button>
                  </div>
                ))}
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 && (
                <div className="mt-6">
                  <div className="font-mono text-xs tracking-widest mb-3" style={{ color: '#555' }}>IL TE MANQUE →</div>
                  <div className="space-y-1">
                    {suggestions.map(p => (
                      <div key={p.id} className="flex items-center gap-3 p-3" style={{ border: '1px solid #1a1a1a', background: '#0d0d0d' }}>
                        <div className="w-10 h-10 flex-shrink-0 overflow-hidden" style={{ background: '#111' }}>
                          <img src={p.image} alt={p.name} className="w-full h-full object-cover" style={{ opacity: 0.8 }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-mono text-xs truncate" style={{ color: '#888' }}>{p.name}</div>
                          <div className="font-display text-sm" style={{ color: '#CCFF00' }}>{p.price.toFixed(2)} €</div>
                        </div>
                        <button
                          onClick={() => onAdd({ product: p, quantity: 1 })}
                          className="font-mono text-xs tracking-widest px-3 py-2 whitespace-nowrap transition-all"
                          style={{ border: '1px solid #CCFF00', color: '#CCFF00' }}
                        >
                          + AJOUTER
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Summary */}
            <div>
              <div className="p-6" style={{ border: '1px solid #2a2a2a', background: '#111' }}>
                <div className="font-display text-xl mb-6 tracking-wider" style={{ color: '#f0f0f0' }}>RÉCAPITULATIF</div>
                <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: '1px solid #2a2a2a' }}>
                  <div className="flex justify-between">
                    <span className="font-mono text-sm" style={{ color: '#666' }}>Sous-total</span>
                    <span className="font-mono text-sm" style={{ color: '#f0f0f0' }}>{total.toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-sm" style={{ color: '#666' }}>Livraison</span>
                    <span className="font-mono text-sm" style={{ color: shipping === 0 ? '#CCFF00' : '#f0f0f0' }}>
                      {shipping === 0 ? 'GRATUITE' : `${shipping.toFixed(2)} €`}
                    </span>
                  </div>
                  {total < 100 && (
                    <div className="font-mono text-xs" style={{ color: '#333' }}>
                      {(100 - total).toFixed(2)} € de plus → livraison gratuite
                    </div>
                  )}
                </div>
                <div className="flex justify-between mb-6">
                  <span className="font-display text-lg tracking-wide" style={{ color: '#f0f0f0' }}>TOTAL</span>
                  <span className="font-display text-xl" style={{ color: '#CCFF00' }}>{(total + shipping).toFixed(2)} €</span>
                </div>

                {/* XOXO Club */}
                <div className="p-3 mb-4 flex items-center gap-3" style={{ background: '#0e1a00', border: '1px solid #1a3300' }}>
                  <Award size={16} style={{ color: '#CCFF00' }} />
                  <span className="font-mono text-xs" style={{ color: '#668833' }}>
                    Tu gagneras +{Math.floor(total)} pts XOXO Club
                  </span>
                </div>

                <button onClick={() => setView('checkout')} className="w-full font-display tracking-widest text-base py-4 mb-2 transition-all" style={{ background: '#CCFF00', color: '#080808', letterSpacing: '0.12em' }}>
                  COMMANDER
                </button>
                <button onClick={() => setView('shop')} className="w-full font-mono text-xs tracking-widest py-3 transition-colors" style={{ color: '#444', border: '1px solid #1a1a1a' }}>
                  CONTINUER LE SHOPPING
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
