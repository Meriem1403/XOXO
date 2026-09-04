import { useState } from 'react';
import { articles } from '../data';
import type { Article, View } from '../types';

const CAT_COLORS: Record<string, string> = {
  GUIDE: '#CCFF00', SPOTS: '#FF3800', CULTURE: '#6644FF', INTERVIEW: '#FF9500',
};

interface JournalProps {
  setView: (v: View) => void;
  onSelectArticle: (a: Article) => void;
}

export default function Journal({ onSelectArticle, setView }: JournalProps) {
  const [filter, setFilter] = useState('TOUT');
  const categories = ['TOUT', ...Array.from(new Set(articles.map(a => a.category)))];
  const filtered = filter === 'TOUT' ? articles : articles.filter(a => a.category === filter);

  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-8" style={{ background: '#FF3800' }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: '#FF3800' }}>MAGAZINE</span>
        </div>
        <h2 className="font-display text-6xl md:text-7xl tracking-tight mb-10" style={{ color: '#f0f0f0' }}>XOXO JOURNAL</h2>

        {/* Category filters */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className="font-mono text-xs tracking-widest px-4 py-2 transition-all"
              style={{
                border: '1px solid',
                borderColor: filter === cat ? (CAT_COLORS[cat] || '#CCFF00') : '#2a2a2a',
                color: filter === cat ? (CAT_COLORS[cat] || '#CCFF00') : '#555',
                background: filter === cat ? 'rgba(255,255,255,0.02)' : 'transparent',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured (first article) */}
        {filter === 'TOUT' && filtered[0] && (
          <button
            onClick={() => onSelectArticle(filtered[0])}
            className="w-full text-left mb-px group"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#2a2a2a', marginBottom: 1 }}>
              <div className="relative overflow-hidden" style={{ minHeight: 280, background: '#0d0d0d' }}>
                <img src={filtered[0].image} alt={filtered[0].title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ opacity: 0.7 }} />
              </div>
              <div className="p-8 flex flex-col justify-center" style={{ background: '#111' }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs px-2 py-1" style={{ background: CAT_COLORS[filtered[0].category] || '#CCFF00', color: '#080808' }}>{filtered[0].category}</span>
                  <span className="font-mono text-xs" style={{ color: '#444' }}>{filtered[0].readTime} MIN DE LECTURE</span>
                </div>
                <h3 className="font-display text-3xl tracking-wide mb-4 leading-tight" style={{ color: '#f0f0f0' }}>{filtered[0].title}</h3>
                <p className="font-mono text-xs leading-relaxed mb-6" style={{ color: '#666' }}>{filtered[0].excerpt}</p>
                <span className="font-display tracking-widest text-sm" style={{ color: '#CCFF00' }}>LIRE L'ARTICLE →</span>
              </div>
            </div>
          </button>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#2a2a2a' }}>
          {(filter === 'TOUT' ? filtered.slice(1) : filtered).map(article => (
            <button key={article.id} onClick={() => onSelectArticle(article)} className="group text-left" style={{ background: '#111' }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '16/9', background: '#0d0d0d' }}>
                <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ opacity: 0.6 }} />
                <div className="absolute top-3 left-3 font-mono text-xs px-2 py-1" style={{ background: CAT_COLORS[article.category] || '#CCFF00', color: '#080808' }}>
                  {article.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-xl tracking-wide mb-2 leading-tight" style={{ color: '#f0f0f0' }}>{article.title}</h3>
                <p className="font-mono text-xs leading-relaxed mb-3" style={{ color: '#555' }}>{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs" style={{ color: '#333' }}>{article.date}</span>
                  <span className="font-mono text-xs" style={{ color: '#444' }}>{article.readTime} min</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Article detail view
export function ArticleDetail({ article, setView }: { article: Article; setView: (v: View) => void }) {
  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      <div className="max-w-3xl mx-auto px-6 py-10">
        <button
          onClick={() => setView('journal')}
          className="font-mono text-xs tracking-widest flex items-center gap-2 mb-8 transition-colors"
          style={{ color: '#555' }}
          onMouseEnter={e => (e.currentTarget.style.color = '#CCFF00')}
          onMouseLeave={e => (e.currentTarget.style.color = '#555')}
        >
          ← JOURNAL
        </button>

        <div className="flex items-center gap-3 mb-6">
          <span className="font-mono text-xs px-2 py-1" style={{ background: CAT_COLORS[article.category] || '#CCFF00', color: '#080808' }}>{article.category}</span>
          <span className="font-mono text-xs" style={{ color: '#444' }}>{article.date} — {article.readTime} MIN</span>
        </div>

        <h1 className="font-display text-4xl md:text-5xl tracking-tight mb-8 leading-tight" style={{ color: '#f0f0f0' }}>{article.title}</h1>

        <div className="mb-10 overflow-hidden" style={{ aspectRatio: '16/9', background: '#0d0d0d' }}>
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" style={{ opacity: 0.85 }} />
        </div>

        <div className="prose mb-10">
          <p className="text-lg mb-6 leading-relaxed italic" style={{ color: '#888', fontFamily: 'Barlow, sans-serif' }}>{article.excerpt}</p>
          <p className="leading-relaxed" style={{ color: '#aaa', fontFamily: 'Barlow, sans-serif', lineHeight: 1.8 }}>{article.content}</p>
          <p className="leading-relaxed mt-4" style={{ color: '#aaa', fontFamily: 'Barlow, sans-serif', lineHeight: 1.8 }}>
            Rendez-vous à la boutique pour plus de conseils personnalisés. Notre équipe est disponible 6 jours sur 7 au 197 Avenue Pierre Mendès-France, Marseille 13008.
          </p>
        </div>

        <div className="p-6" style={{ border: '1px solid #2a2a2a', background: '#111' }}>
          <div className="font-display text-xl tracking-wider mb-4" style={{ color: '#f0f0f0' }}>XOXO SKATE SHOP</div>
          <p className="font-mono text-xs mb-4" style={{ color: '#555' }}>Besoin de conseils ? Passe nous voir en boutique ou explore notre catalogue.</p>
          <button onClick={() => setView('shop')} className="font-display tracking-widest px-6 py-3" style={{ background: '#CCFF00', color: '#080808', letterSpacing: '0.1em' }}>
            EXPLORER LE SHOP →
          </button>
        </div>
      </div>
    </div>
  );
}
