import { useState } from 'react';
import { Check, ArrowLeft } from 'lucide-react';
import type { Product, CartItem, View } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  setView: (v: View) => void;
}

export default function ProductDetail({ product, onAddToCart, setView }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | undefined>(product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart({ product, quantity: qty, size: selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      {/* Back */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-4">
        <button
          onClick={() => setView('shop')}
          className="font-mono text-xs tracking-widest flex items-center gap-2 transition-colors"
          style={{ color: '#555' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#CCFF00')}
          onMouseLeave={e => (e.currentTarget.style.color = '#555')}
        >
          <span className="flex items-center gap-2"><ArrowLeft size={14} /> RETOUR AU SHOP</span>
        </button>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#2a2a2a' }}>
          {/* Image */}
          <div className="relative" style={{ background: '#0d0d0d', minHeight: 400, aspectRatio: '1/1' }}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              style={{ opacity: 0.9 }}
            />
            {product.originalPrice && (
              <div className="absolute top-4 left-4 font-mono text-sm px-3 py-2" style={{ background: '#FF3800', color: '#f0f0f0' }}>
                -{Math.round((1 - product.price / product.originalPrice) * 100)}% PROMO
              </div>
            )}
          </div>

          {/* Details */}
          <div className="p-8 md:p-12" style={{ background: '#111' }}>
            <div className="font-mono text-xs tracking-widest mb-2 uppercase" style={{ color: '#FF3800' }}>{product.brand}</div>
            <div className="font-mono text-xs tracking-widest mb-4 uppercase" style={{ color: '#444' }}>{product.category}</div>

            <h1 className="font-display text-3xl md:text-4xl mb-6 leading-tight" style={{ color: '#f0f0f0', letterSpacing: '0.02em' }}>
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-4 mb-8 pb-8" style={{ borderBottom: '1px solid #2a2a2a' }}>
              <span className="font-display text-4xl" style={{ color: '#CCFF00' }}>{product.price.toFixed(2)} €</span>
              {product.originalPrice && (
                <span className="font-mono text-lg line-through" style={{ color: '#444' }}>{product.originalPrice.toFixed(2)} €</span>
              )}
            </div>

            {/* Description */}
            <p className="text-base mb-8 leading-relaxed" style={{ color: '#888' }}>{product.description}</p>

            {/* Sizes */}
            {product.sizes && (
              <div className="mb-8">
                <div className="font-mono text-xs tracking-widest mb-3" style={{ color: '#555' }}>TAILLE</div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className="font-mono text-sm px-3 py-2 transition-all"
                      style={{
                        border: '1px solid',
                        borderColor: selectedSize === size ? '#CCFF00' : '#2a2a2a',
                        color: selectedSize === size ? '#CCFF00' : '#555',
                        background: selectedSize === size ? 'rgba(204,255,0,0.08)' : 'transparent',
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty */}
            <div className="mb-8">
              <div className="font-mono text-xs tracking-widest mb-3" style={{ color: '#555' }}>QUANTITÉ</div>
              <div className="flex items-center gap-0" style={{ width: 'fit-content', border: '1px solid #2a2a2a' }}>
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center font-mono transition-colors"
                  style={{ color: '#888' }}
                >-</button>
                <span className="w-10 h-10 flex items-center justify-center font-mono text-sm" style={{ color: '#f0f0f0', borderLeft: '1px solid #2a2a2a', borderRight: '1px solid #2a2a2a' }}>{qty}</span>
                <button
                  onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  className="w-10 h-10 flex items-center justify-center font-mono transition-colors"
                  style={{ color: '#888' }}
                >+</button>
              </div>
            </div>

            {/* Stock */}
            <div className="font-mono text-xs mb-6" style={{ color: product.stock > 5 ? '#444' : '#FF9500' }}>
              {product.stock > 5 ? `${product.stock} en stock` : `Seulement ${product.stock} restant${product.stock > 1 ? 's' : ''}`}
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              className="w-full font-display tracking-widest text-lg py-5 transition-all"
              style={{
                background: added ? '#CCFF00' : '#CCFF00',
                color: '#080808',
                letterSpacing: '0.12em',
                opacity: added ? 0.9 : 1,
              }}
            >
              {added ? <span className="flex items-center justify-center gap-2"><Check size={16} /> AJOUTÉ AU PANIER</span> : 'AJOUTER AU PANIER'}
            </button>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-6">
              {product.tags.map(tag => (
                <span key={tag} className="font-mono text-xs px-2 py-1" style={{ border: '1px solid #222', color: '#444' }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
