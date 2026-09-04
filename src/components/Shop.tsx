import { useState } from 'react';
import { Heart, Check } from 'lucide-react';
import { products } from '../data';
import type { Category, Product, View } from '../types';

const CATEGORIES: { id: Category; label: string }[] = [
  { id: 'all', label: 'TOUT' },
  { id: 'skate', label: 'SKATE' },
  { id: 'surf', label: 'SURF' },
  { id: 'shoes', label: 'SHOES' },
  { id: 'clothing', label: 'CLOTHING' },
  { id: 'rock', label: 'ROCK' },
  { id: 'accessories', label: 'ACCÈS' },
];

interface ShopProps {
  onSelectProduct: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  wishlistIds: Set<string>;
  setView: (v: View) => void;
}

export default function Shop({ onSelectProduct, onAddToCart, onToggleWishlist, wishlistIds }: ShopProps) {
  const [category, setCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered = products
    .filter(p => category === 'all' || p.category === category)
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  const handleAdd = (e: React.MouseEvent, p: Product) => {
    e.stopPropagation();
    onAddToCart(p);
    setAddedId(p.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="min-h-screen pt-16 pb-20 md:pb-0" style={{ background: '#080808' }}>
      <div className="px-6 max-w-7xl mx-auto pt-10 pb-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-8" style={{ background: '#FF3800' }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: '#FF3800' }}>THE SHOP</span>
        </div>
        <h2 className="font-display text-5xl md:text-7xl tracking-tight" style={{ color: '#f0f0f0' }}>CATALOGUE</h2>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-40" style={{ background: 'rgba(8,8,8,0.98)', borderBottom: '1px solid #2a2a2a', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 overflow-x-auto">
          <div className="flex items-center">
            {CATEGORIES.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setCategory(id)}
                className="font-display tracking-widest text-xs px-4 py-4 whitespace-nowrap transition-all"
                style={{
                  color: category === id ? '#CCFF00' : '#555',
                  borderBottom: category === id ? '2px solid #CCFF00' : '2px solid transparent',
                  letterSpacing: '0.1em',
                }}
              >
                {label}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as typeof sortBy)}
            className="font-mono text-xs ml-4 hidden md:block"
            style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#666', padding: '4px 8px' }}
          >
            <option value="default">TRIER PAR</option>
            <option value="price-asc">PRIX ↑</option>
            <option value="price-desc">PRIX ↓</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4">
        <span className="font-mono text-xs" style={{ color: '#444' }}>{filtered.length} produit{filtered.length > 1 ? 's' : ''}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px" style={{ background: '#2a2a2a' }}>
          {filtered.map((product) => (
            <div
              key={product.id}
              onClick={() => onSelectProduct(product)}
              className="group text-left relative overflow-hidden hover-lift cursor-pointer"
              style={{ background: '#111' }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: '1/1', background: '#0d0d0d' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ opacity: 0.85 }}
                />
                {product.isNew && (
                  <div className="absolute top-3 left-3 font-mono text-xs px-2 py-1" style={{ background: '#CCFF00', color: '#080808' }}>NOUVEAU</div>
                )}
                {product.originalPrice && (
                  <div className="absolute top-3 left-3 font-mono text-xs px-2 py-1" style={{ background: '#FF3800', color: '#f0f0f0' }}>PROMO</div>
                )}
                {product.stock <= 5 && !product.isNew && (
                  <div className="absolute top-3 right-3 font-mono text-xs px-2 py-1" style={{ background: '#FF9500', color: '#080808' }}>
                    {product.stock} RESTANT
                  </div>
                )}

                {/* Wishlist button */}
                <button
                  onClick={e => { e.stopPropagation(); onToggleWishlist(product); }}
                  className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'rgba(8,8,8,0.8)',
                    border: '1px solid',
                    borderColor: wishlistIds.has(product.id) ? '#FF3800' : '#2a2a2a',
                    color: wishlistIds.has(product.id) ? '#FF3800' : '#555',
                  }}
                >
                  <Heart size={14} fill={wishlistIds.has(product.id) ? 'currentColor' : 'none'} />
                </button>

                {/* Add to cart overlay */}
                <div className="absolute inset-x-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={(e) => handleAdd(e, product)}
                    className="w-full font-display tracking-widest text-sm py-3 transition-colors"
                    style={{
                      background: addedId === product.id ? '#CCFF00' : 'rgba(8,8,8,0.92)',
                      color: addedId === product.id ? '#080808' : '#f0f0f0',
                      letterSpacing: '0.1em',
                    }}
                  >
                    {addedId === product.id ? <span className="flex items-center justify-center gap-1"><Check size={14} /> AJOUTÉ</span> : '+ PANIER'}
                  </button>
                </div>
              </div>

              <div className="p-4">
                <div className="font-mono text-xs mb-1 uppercase" style={{ color: '#FF3800' }}>{product.brand}</div>
                <div className="font-display text-sm leading-tight mb-3" style={{ color: '#f0f0f0', letterSpacing: '0.02em' }}>
                  {product.name}
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-base font-bold" style={{ color: '#CCFF00' }}>
                    {product.price.toFixed(2)} €
                  </span>
                  {product.originalPrice && (
                    <span className="font-mono text-xs line-through" style={{ color: '#444' }}>
                      {product.originalPrice.toFixed(2)} €
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
