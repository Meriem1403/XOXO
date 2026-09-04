import { useState } from 'react';
import { Check } from 'lucide-react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Shop from './components/Shop';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Dashboard from './components/Dashboard';
import BuildSetup from './components/BuildSetup';
import Assistant from './components/Assistant';
import Drops from './components/Drops';
import Team from './components/Team';
import Events from './components/Events';
import Journal, { ArticleDetail } from './components/Journal';
import Services from './components/Services';
import Club from './components/Club';
import Wishlist from './components/Wishlist';
import type { Article, CartItem, Order, OrderStatus, Product, View } from './types';
import { initialOrders } from './data';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>(initialOrders);

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const wishlistIds = new Set(wishlist.map(p => p.id));

  const handleSelectProduct = (p: Product) => {
    setSelectedProduct(p);
    setView('product');
  };

  const handleAddToCart = (item: CartItem | Product) => {
    if ('quantity' in item) {
      setCart(prev => {
        const existing = prev.find(c => c.product.id === item.product.id);
        if (existing) return prev.map(c => c.product.id === item.product.id ? { ...c, quantity: c.quantity + item.quantity } : c);
        return [...prev, item];
      });
    } else {
      setCart(prev => {
        const existing = prev.find(c => c.product.id === item.id);
        if (existing) return prev.map(c => c.product.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
        return [...prev, { product: item, quantity: 1 }];
      });
    }
  };

  const handleAddSetupToCart = (items: CartItem[]) => {
    items.forEach(item => handleAddToCart(item));
  };

  const handleUpdateCart = (id: string, qty: number) => {
    setCart(prev => prev.map(c => c.product.id === id ? { ...c, quantity: qty } : c));
  };

  const handleRemoveFromCart = (id: string) => {
    setCart(prev => prev.filter(c => c.product.id !== id));
  };

  const handleToggleWishlist = (p: Product) => {
    setWishlist(prev =>
      prev.find(x => x.id === p.id) ? prev.filter(x => x.id !== p.id) : [...prev, p]
    );
  };

  const handleOrderSuccess = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    setCart([]);
    setView('success');
  };

  const handleUpdateOrderStatus = (id: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  return (
    <div className="min-h-screen pb-16 md:pb-0" style={{ background: '#080808', color: '#f0f0f0' }}>
      <Nav currentView={view} setView={setView} cartCount={cartCount} wishlistCount={wishlist.length} />

      {view === 'home' && <Hero setView={setView} />}

      {view === 'shop' && (
        <Shop
          onSelectProduct={handleSelectProduct}
          onAddToCart={p => handleAddToCart(p)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlistIds}
          setView={setView}
        />
      )}

      {view === 'product' && selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onAddToCart={handleAddToCart}
          setView={setView}
        />
      )}

      {view === 'cart' && (
        <Cart
          items={cart}
          onUpdate={handleUpdateCart}
          onRemove={handleRemoveFromCart}
          onAdd={handleAddToCart}
          setView={setView}
        />
      )}

      {view === 'checkout' && (
        <Checkout
          items={cart}
          onSuccess={handleOrderSuccess}
          setView={setView}
        />
      )}

      {view === 'admin' && (
        <Dashboard
          orders={orders}
          onUpdateOrderStatus={handleUpdateOrderStatus}
        />
      )}

      {view === 'build-setup' && (
        <BuildSetup
          onAddSetupToCart={handleAddSetupToCart}
          setView={setView}
        />
      )}

      {view === 'assistant' && (
        <Assistant
          onSelectProduct={handleSelectProduct}
          setView={setView}
        />
      )}

      {view === 'drops' && <Drops setView={setView} />}

      {view === 'team' && (
        <Team
          onSelectProduct={handleSelectProduct}
          setView={setView}
        />
      )}

      {view === 'events' && <Events setView={setView} />}

      {view === 'journal' && (
        <Journal
          onSelectArticle={a => { setSelectedArticle(a); setView('article'); }}
          setView={setView}
        />
      )}

      {view === 'article' && selectedArticle && (
        <ArticleDetail article={selectedArticle} setView={setView} />
      )}

      {view === 'services' && <Services setView={setView} />}

      {view === 'club' && <Club setView={setView} />}

      {view === 'wishlist' && (
        <Wishlist
          items={wishlist}
          onRemove={id => setWishlist(prev => prev.filter(p => p.id !== id))}
          onAddToCart={handleAddToCart}
          setView={setView}
        />
      )}

      {view === 'success' && (
        <div className="min-h-screen pt-16 flex items-center justify-center" style={{ background: '#080808' }}>
          <div className="text-center max-w-lg px-6">
            <div className="mb-4" style={{ color: '#CCFF00' }}><Check size={80} strokeWidth={3} /></div>
            <h2 className="font-display text-4xl mb-4 tracking-wider" style={{ color: '#f0f0f0' }}>COMMANDE CONFIRMÉE</h2>

            {/* Order tracking timeline */}
            <div className="my-8 p-6 text-left" style={{ border: '1px solid #2a2a2a', background: '#111' }}>
              <div className="font-display text-lg tracking-wider mb-6" style={{ color: '#f0f0f0' }}>SUIVI COMMANDE</div>
              <div className="space-y-0">
                {[
                  { label: 'Commande reçue', done: true, current: false },
                  { label: 'Préparation en cours', done: false, current: true },
                  { label: 'Préparée', done: false, current: false },
                  { label: 'Expédiée', done: false, current: false },
                  { label: 'En livraison', done: false, current: false },
                  { label: 'Livrée', done: false, current: false },
                ].map(({ label, done, current }, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 flex items-center justify-center flex-shrink-0" style={{
                        background: done ? '#CCFF00' : current ? 'rgba(204,255,0,0.1)' : 'transparent',
                        border: `2px solid ${done ? '#CCFF00' : current ? '#CCFF00' : '#2a2a2a'}`,
                        borderRadius: '50%',
                      }}>
                        {done && <Check size={10} style={{ color: '#080808' }} strokeWidth={3} />}
                        {current && <span style={{ width: 8, height: 8, background: '#CCFF00', borderRadius: '50%', display: 'block' }} />}
                      </div>
                      {i < 5 && <div className="w-px flex-1 my-1" style={{ background: done ? '#CCFF00' : '#1a1a1a', height: 20, minHeight: 20 }} />}
                    </div>
                    <div className="pb-4">
                      <div className="font-mono text-xs" style={{ color: done ? '#CCFF00' : current ? '#f0f0f0' : '#333' }}>{label}</div>
                      {current && <div className="font-mono text-xs mt-1" style={{ color: '#555' }}>En cours...</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="font-mono text-sm mb-8 leading-relaxed" style={{ color: '#666' }}>
              Confirmation par email sous 2min. Livraison estimée 3–5 jours ouvrés.
            </p>
            <div className="flex flex-col gap-3">
              <button onClick={() => setView('shop')} className="font-display tracking-widest px-8 py-4" style={{ background: '#CCFF00', color: '#080808', letterSpacing: '0.1em' }}>
                CONTINUER LE SHOPPING
              </button>
              <button onClick={() => setView('admin')} className="font-mono text-xs tracking-widest py-3 transition-colors" style={{ color: '#444', border: '1px solid #1a1a1a' }}>
                VOIR LES COMMANDES ADMIN
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer (home only) */}
      {view === 'home' && (
        <footer className="py-12 px-6" style={{ borderTop: '1px solid #1a1a1a', background: '#060606' }}>
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="font-display text-xl tracking-widest mb-3" style={{ color: '#CCFF00' }}>XOXO SKATE</div>
              <p className="font-mono text-xs leading-relaxed" style={{ color: '#333' }}>Skate. Surf. Rock.<br />Marseille — Depuis 2018.</p>
            </div>
            {[
              { title: 'SHOP', links: ['Skate', 'Surf', 'Shoes', 'Clothing', 'Rock', 'Drops'] },
              { title: 'XOXO', links: ['Team', 'Journal', 'Events', 'Services', 'XOXO Club'] },
              { title: 'AIDE', links: ['Livraison', 'Retours', 'FAQ', 'Click & Collect'] },
              { title: 'CONTACT', links: ['197 Av. P. Mendès-France', 'Marseille 13008', 'shop@xoxoskate.fr', '+33 4 91 XX XX XX'] },
            ].map(({ title, links }) => (
              <div key={title}>
                <div className="font-mono text-xs tracking-widest mb-4" style={{ color: '#2a2a2a' }}>{title}</div>
                <div className="space-y-2">{links.map(l => <div key={l} className="font-mono text-xs" style={{ color: '#2a2a2a' }}>{l}</div>)}</div>
              </div>
            ))}
          </div>
          <div className="max-w-7xl mx-auto mt-10 pt-6 flex items-center justify-between" style={{ borderTop: '1px solid #111' }}>
            <span className="font-mono text-xs" style={{ color: '#1a1a1a' }}>© 2024 XOXO SKATE SHOP MARSEILLE</span>
            <span className="font-mono text-xs" style={{ color: '#1a1a1a' }}>SKATE OR DIE</span>
          </div>
        </footer>
      )}
    </div>
  );
}
