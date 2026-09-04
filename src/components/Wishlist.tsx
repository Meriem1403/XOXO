import { Heart, X } from 'lucide-react';
import type { Product, CartItem, View } from '../types';

interface WishlistProps {
  items: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (item: CartItem) => void;
  setView: (v: View) => void;
}

export default function Wishlist({ items, onRemove, onAddToCart, setView }: WishlistProps) {
  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-8" style={{ background: '#FF3800' }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: '#FF3800' }}>FAVORIS</span>
        </div>
        <h2 className="font-display text-5xl mb-10" style={{ color: '#f0f0f0' }}>MES FAVORIS</h2>

        {items.length === 0 ? (
          <div className="text-center py-24" style={{ border: '1px solid #1a1a1a' }}>
            <div className="mb-4" style={{ color: '#444' }}><Heart size={48} /></div>
            <p className="font-mono text-sm mb-8" style={{ color: '#555' }}>Ta wishlist est vide.</p>
            <button onClick={() => setView('shop')} className="font-display tracking-widest px-8 py-4" style={{ background: '#CCFF00', color: '#080808', letterSpacing: '0.1em' }}>
              EXPLORER LE SHOP
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: '#2a2a2a' }}>
            {items.map(product => (
              <div key={product.id} className="group" style={{ background: '#111' }}>
                <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#0d0d0d' }}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
                  <button
                    onClick={() => onRemove(product.id)}
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all"
                    style={{ background: 'rgba(8,8,8,0.8)', border: '1px solid #FF3800', color: '#FF3800' }}
                  ><X size={14} /></button>
                </div>
                <div className="p-4">
                  <div className="font-mono text-xs mb-1" style={{ color: '#FF3800' }}>{product.brand}</div>
                  <div className="font-display text-sm leading-tight mb-3" style={{ color: '#f0f0f0' }}>{product.name}</div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-base" style={{ color: '#CCFF00' }}>{product.price.toFixed(2)} €</span>
                    <button
                      onClick={() => { onAddToCart({ product, quantity: 1 }); onRemove(product.id); }}
                      className="font-mono text-xs tracking-widest px-3 py-2 transition-all"
                      style={{ border: '1px solid #CCFF00', color: '#CCFF00' }}
                    >
                      + PANIER
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
