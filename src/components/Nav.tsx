import React, { useState } from 'react';
import { Home, ShoppingBag, Wrench, Flame, ShoppingCart } from 'lucide-react';
import type { View } from '../types';

interface NavProps {
  currentView: View;
  setView: (v: View) => void;
  cartCount: number;
  wishlistCount: number;
}

const MEGA_MENU = [
  {
    label: 'SHOP',
    items: [
      { label: 'Tout le catalogue', view: 'shop' as View },
      { label: 'Skateboard', view: 'shop' as View },
      { label: 'Surf', view: 'shop' as View },
      { label: 'Shoes', view: 'shop' as View },
      { label: 'Clothing', view: 'shop' as View },
      { label: 'Rock', view: 'shop' as View },
    ],
  },
  {
    label: 'BUILD',
    items: [
      { label: 'Construis ton setup', view: 'build-setup' as View },
      { label: 'XOXO Assistant', view: 'assistant' as View },
    ],
  },
  {
    label: 'DROPS',
    items: [{ label: 'New Drops', view: 'drops' as View }],
  },
  {
    label: 'XOXO',
    items: [
      { label: 'Team', view: 'team' as View },
      { label: 'Journal', view: 'journal' as View },
      { label: 'Events', view: 'events' as View },
      { label: 'Services', view: 'services' as View },
      { label: 'XOXO Club', view: 'club' as View },
    ],
  },
];

export default function Nav({ currentView, setView, cartCount, wishlistCount }: NavProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ borderBottom: '1px solid #2a2a2a', background: 'rgba(8,8,8,0.97)', backdropFilter: 'blur(12px)' }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => { setView('home'); setOpenMenu(null); }}
            className="font-display text-xl tracking-widest transition-colors flex-shrink-0"
            style={{ color: currentView === 'home' ? '#CCFF00' : '#f0f0f0', letterSpacing: '0.15em' }}
          >
            XOXO<span style={{ color: '#FF3800' }}>•</span>SKATE
          </button>

          {/* Nav links (desktop) */}
          <div className="hidden md:flex items-center h-full">
            {MEGA_MENU.map(({ label, items }) => (
              <div key={label} className="relative h-full flex items-center"
                onMouseEnter={() => setOpenMenu(label)}
                onMouseLeave={() => setOpenMenu(null)}>
                <button
                  className="font-display tracking-widest text-xs px-4 h-full transition-colors flex items-center"
                  style={{
                    color: openMenu === label ? '#CCFF00' : '#666',
                    letterSpacing: '0.12em',
                    borderBottom: openMenu === label ? '2px solid #CCFF00' : '2px solid transparent',
                  }}
                >
                  {label}
                </button>
                {/* Dropdown */}
                {openMenu === label && (
                  <div className="absolute top-full left-0 min-w-max py-3 z-50" style={{ background: '#0d0d0d', border: '1px solid #2a2a2a', borderTop: 'none' }}>
                    {items.map(item => (
                      <button
                        key={item.label}
                        onClick={() => { setView(item.view); setOpenMenu(null); }}
                        className="block w-full text-left px-6 py-3 font-mono text-xs tracking-widest transition-colors"
                        style={{ color: '#666' }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#CCFF00')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#666')}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button
              onClick={() => setView('admin')}
              className="font-display tracking-widest text-xs px-4 h-full transition-colors flex items-center"
              style={{ color: currentView === 'admin' ? '#CCFF00' : '#444', letterSpacing: '0.12em', borderBottom: currentView === 'admin' ? '2px solid #CCFF00' : '2px solid transparent' }}
            >
              ADMIN
            </button>
          </div>

          {/* Right icons */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <button
              onClick={() => setView('wishlist')}
              className="relative w-10 h-10 flex items-center justify-center transition-colors"
              style={{ color: currentView === 'wishlist' ? '#FF3800' : '#555', border: '1px solid', borderColor: currentView === 'wishlist' ? '#FF3800' : 'transparent' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill={currentView === 'wishlist' ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center font-mono" style={{ background: '#FF3800', color: '#f0f0f0', fontSize: 9, borderRadius: '50%' }}>{wishlistCount}</span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => setView('cart')}
              className="relative flex items-center gap-2 px-3 py-2 transition-all"
              style={{ border: '1px solid', borderColor: cartCount > 0 ? '#CCFF00' : '#2a2a2a', color: cartCount > 0 ? '#CCFF00' : '#555' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              <span className="font-mono text-xs">{cartCount}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 md:hidden z-50 flex" style={{ background: 'rgba(8,8,8,0.98)', borderTop: '1px solid #2a2a2a', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {([
          { view: 'home' as View, icon: <Home size={18} />, label: 'ACCUEIL' },
          { view: 'shop' as View, icon: <ShoppingBag size={18} />, label: 'SHOP' },
          { view: 'build-setup' as View, icon: <Wrench size={18} />, label: 'BUILD' },
          { view: 'drops' as View, icon: <Flame size={18} />, label: 'DROPS' },
          { view: 'cart' as View, icon: <ShoppingCart size={18} />, label: cartCount > 0 ? `(${cartCount})` : 'PANIER' },
        ] as { view: View; icon: React.ReactNode; label: string }[]).map(({ view, icon, label }) => (
          <button
            key={view}
            onClick={() => setView(view)}
            className="flex-1 flex flex-col items-center gap-1 py-3 transition-colors"
            style={{ color: currentView === view ? '#CCFF00' : '#444' }}
          >
            {icon}
            <span className="font-mono" style={{ fontSize: 8, letterSpacing: '0.08em' }}>{label}</span>
          </button>
        ))}
      </div>
    </>
  );
}
