import type { View } from '../types';

interface HeroProps {
  setView: (v: View) => void;
}

export default function Hero({ setView }: HeroProps) {
  return (
    <div className="relative min-h-screen flex flex-col" style={{ background: '#080808' }}>
      {/* Background image with overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1547198152-dde291a08c45?w=1600&h=900&fit=crop&auto=format"
          alt="Skateboarder en action"
          className="w-full h-full object-cover"
          style={{ opacity: 0.3, filter: 'contrast(1.2) saturate(0.7)' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.7) 60%, #080808 100%)' }} />
        {/* Grain overlay */}
        <div className="absolute inset-0 noise-bg" />
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col justify-center px-6 max-w-7xl mx-auto w-full pt-20">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: '#FF3800' }} />
            <span className="font-mono text-xs tracking-widest uppercase" style={{ color: '#FF3800' }}>
              Marseille, France — Depuis 2018
            </span>
          </div>

          {/* Main headline */}
          <h1 className="font-display leading-none mb-4" style={{ fontSize: 'clamp(64px, 12vw, 160px)', color: '#f0f0f0', letterSpacing: '-0.02em' }}>
            XOXO
            <br />
            <span style={{ color: '#CCFF00', WebkitTextStroke: '2px #CCFF00' }}>SKATE</span>
            <br />
            SHOP
          </h1>

          {/* Tagline */}
          <p className="text-xl mb-10 max-w-xl" style={{ color: '#888', fontStyle: 'italic', fontWeight: 400 }}>
            Skate. Surf. Rock. Tout ce qu'il faut pour rider le bitume et les vagues de la Méditerranée.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => setView('shop')}
              className="font-display tracking-widest px-8 py-4 text-lg transition-all hover:scale-105"
              style={{ background: '#CCFF00', color: '#080808', letterSpacing: '0.1em' }}
            >
              ACHETER
            </button>
            <button
              onClick={() => setView('shop')}
              className="font-display tracking-widest px-8 py-4 text-lg transition-all"
              style={{ border: '1px solid #2a2a2a', color: '#888', letterSpacing: '0.1em' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.borderColor = '#f0f0f0'; (e.target as HTMLElement).style.color = '#f0f0f0'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.borderColor = '#2a2a2a'; (e.target as HTMLElement).style.color = '#888'; }}
            >
              EXPLORER
            </button>
          </div>

          {/* Stats bar */}
          <div className="flex gap-8 mt-16 pt-8" style={{ borderTop: '1px solid #2a2a2a' }}>
            {[
              { value: '500+', label: 'Produits' },
              { value: '6 ans', label: "d'expérience" },
              { value: '4.8★', label: 'Note client' },
              { value: 'Marseille', label: 'Centre-ville' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-display text-2xl" style={{ color: '#CCFF00' }}>{value}</div>
                <div className="font-mono text-xs tracking-widest mt-1" style={{ color: '#555' }}>{label.toUpperCase()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories strip */}
      <div className="relative py-6 overflow-x-auto" style={{ borderTop: '1px solid #2a2a2a' }}>
        <div className="flex items-center gap-0 px-6 w-max mx-auto">
          {['SKATEBOARD', 'SURF', 'ROCK', 'SHOES', 'CLOTHING', 'ACCESSORIES'].map((cat, i) => (
            <button
              key={cat}
              onClick={() => setView('shop')}
              className="font-display tracking-widest px-6 py-3 text-sm transition-colors hover:text-white whitespace-nowrap"
              style={{
                color: '#444',
                borderRight: i < 5 ? '1px solid #2a2a2a' : undefined,
                letterSpacing: '0.12em',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured section */}
      <div className="relative py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-display text-4xl tracking-wider" style={{ color: '#f0f0f0' }}>EN VEDETTE</span>
          <div className="flex-1 h-px" style={{ background: '#2a2a2a' }} />
          <span className="font-mono text-xs" style={{ color: '#555' }}>SÉLECTION AUTOMNE 24</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: '#2a2a2a' }}>
          {[
            {
              title: 'SKATE CULTURE',
              sub: 'Decks, Trucks, Roues',
              img: 'https://images.unsplash.com/photo-1571677594976-153c59b7ee67?w=600&h=500&fit=crop&auto=format',
              color: '#CCFF00',
            },
            {
              title: 'SURF & SEA',
              sub: 'Planches, Combis, Accès',
              img: 'https://images.unsplash.com/photo-1727851299783-173e730ff939?w=600&h=500&fit=crop&auto=format',
              color: '#FF3800',
            },
            {
              title: 'ROCK SPIRIT',
              sub: 'Band Tees, Vinyles, Patches',
              img: 'https://images.unsplash.com/photo-1503416829621-2a647b6c386a?w=600&h=500&fit=crop&auto=format',
              color: '#6644FF',
            },
          ].map(({ title, sub, img, color }) => (
            <button
              key={title}
              onClick={() => setView('shop')}
              className="relative overflow-hidden group text-left"
              style={{ background: '#111', aspectRatio: '4/3' }}
            >
              <img
                src={img}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                style={{ opacity: 0.5 }}
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}>
                <div className="w-8 h-1 mb-3 transition-all duration-300 group-hover:w-16" style={{ background: color }} />
                <div className="font-display text-2xl tracking-wider" style={{ color: '#f0f0f0', letterSpacing: '0.08em' }}>{title}</div>
                <div className="font-mono text-xs mt-1" style={{ color: '#888' }}>{sub}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
