import { useState } from 'react';
import { riders, products } from '../data';
import type { Product, View } from '../types';

interface TeamProps {
  onSelectProduct: (p: Product) => void;
  setView: (v: View) => void;
}

export default function Team({ onSelectProduct, setView }: TeamProps) {
  const [selected, setSelected] = useState(riders[0].id);
  const rider = riders.find(r => r.id === selected)!;
  const riderProducts = rider.setupIds
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-8" style={{ background: '#FF3800' }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: '#FF3800' }}>LES RIDERS</span>
        </div>
        <h2 className="font-display text-6xl md:text-7xl tracking-tight mb-10" style={{ color: '#f0f0f0' }}>XOXO TEAM</h2>

        {/* Rider selector */}
        <div className="flex gap-px mb-10" style={{ background: '#2a2a2a' }}>
          {riders.map(r => (
            <button
              key={r.id}
              onClick={() => setSelected(r.id)}
              className="flex-1 py-4 font-display tracking-wider text-sm transition-all"
              style={{
                background: selected === r.id ? '#0e1a00' : '#111',
                color: selected === r.id ? '#CCFF00' : '#555',
                borderBottom: selected === r.id ? '2px solid #CCFF00' : '2px solid transparent',
                letterSpacing: '0.08em',
              }}
            >
              {r.name}
            </button>
          ))}
        </div>

        {/* Rider detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#2a2a2a' }}>
          {/* Photo */}
          <div className="relative overflow-hidden" style={{ minHeight: 480, background: '#0d0d0d' }}>
            <img
              src={rider.image}
              alt={rider.name}
              className="w-full h-full object-cover"
              style={{ opacity: 0.85, minHeight: 480 }}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.7) 0%, transparent 50%)' }} />
            <div className="absolute bottom-6 left-6">
              <div className="font-display text-5xl tracking-tight" style={{ color: '#f0f0f0' }}>{rider.name}</div>
              <div className="font-mono text-xs mt-1" style={{ color: '#CCFF00' }}>{rider.instagram}</div>
            </div>
          </div>

          {/* Info */}
          <div className="p-8" style={{ background: '#111' }}>
            <div className="grid grid-cols-3 gap-4 mb-8 pb-8" style={{ borderBottom: '1px solid #2a2a2a' }}>
              {[
                { label: 'ÂGE', value: `${rider.age} ans` },
                { label: 'VILLE', value: rider.city },
                { label: 'STYLE', value: rider.style },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="font-mono text-xs mb-1" style={{ color: '#444' }}>{label}</div>
                  <div className="font-display text-lg" style={{ color: '#f0f0f0' }}>{value}</div>
                </div>
              ))}
            </div>

            {/* Setup */}
            <div className="mb-8">
              <div className="font-display text-xl tracking-wider mb-4" style={{ color: '#f0f0f0' }}>SON SETUP</div>
              <div className="space-y-3">
                {Object.entries(rider.setup).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#444' }}>{key}</span>
                    <span className="font-mono text-sm" style={{ color: '#888' }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shop his setup */}
            <div>
              <div className="font-display text-xl tracking-wider mb-4" style={{ color: '#f0f0f0' }}>SHOP SON SETUP</div>
              <div className="space-y-2">
                {riderProducts.map(p => (
                  <button
                    key={p.id}
                    onClick={() => { onSelectProduct(p); setView('product'); }}
                    className="w-full flex items-center gap-3 p-3 text-left transition-all"
                    style={{ border: '1px solid #1a1a1a', background: 'transparent' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#CCFF00')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#1a1a1a')}
                  >
                    <div className="w-10 h-10 flex-shrink-0 overflow-hidden" style={{ background: '#0d0d0d' }}>
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
                    </div>
                    <span className="font-mono text-xs flex-1 truncate" style={{ color: '#888' }}>{p.name}</span>
                    <span className="font-display text-sm whitespace-nowrap" style={{ color: '#CCFF00' }}>{p.price.toFixed(2)} €</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
