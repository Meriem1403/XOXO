import { useState } from 'react';
import { Truck, Store, CreditCard, Lock } from 'lucide-react';
import type { CartItem, Order, View } from '../types';

interface CheckoutProps {
  items: CartItem[];
  onSuccess: (order: Order) => void;
  setView: (v: View) => void;
}

export default function Checkout({ items, onSuccess, setView }: CheckoutProps) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', zip: '', country: 'France',
    payment: 'card',
    cardNumber: '', cardExpiry: '', cardCvv: '',
    deliveryMode: 'ship' as 'ship' | 'collect',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const total = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shipping = form.deliveryMode === 'collect' ? 0 : (total > 100 ? 0 : 5.90);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName) e.firstName = 'Requis';
    if (!form.lastName) e.lastName = 'Requis';
    if (!form.email || !form.email.includes('@')) e.email = 'Email invalide';
    if (form.deliveryMode === 'ship') {
      if (!form.address) e.address = 'Requis';
      if (!form.city) e.city = 'Requis';
      if (!form.zip) e.zip = 'Requis';
    }
    if (form.payment === 'card') {
      if (!form.cardNumber || form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = 'Numéro invalide';
      if (!form.cardExpiry) e.cardExpiry = 'Requis';
      if (!form.cardCvv || form.cardCvv.length < 3) e.cardCvv = 'CVV invalide';
    }
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    setTimeout(() => {
      const order: Order = {
        id: `ORD-2024-${String(Date.now()).slice(-4)}`,
        date: new Date().toISOString().slice(0, 10),
        customer: `${form.firstName} ${form.lastName}`,
        email: form.email,
        city: form.deliveryMode === 'collect' ? 'Marseille (Click & Collect)' : form.city,
        items: items.map(i => ({ name: i.product.name, qty: i.quantity, price: i.product.price })),
        total: total + shipping,
        status: 'pending',
        deliveryMode: form.deliveryMode,
      };
      onSuccess(order);
    }, 1200);
  };

  const field = (name: keyof typeof form, label: string, type = 'text', placeholder = '') => (
    <div>
      <label className="font-mono text-xs tracking-widest block mb-2" style={{ color: '#555' }}>{label}</label>
      <input
        type={type}
        value={form[name] as string}
        onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrors(er => { const n = { ...er }; delete n[name]; return n; }); }}
        placeholder={placeholder}
        className="w-full"
        style={{ borderColor: errors[name] ? '#FF3800' : '#2a2a2a' }}
      />
      {errors[name] && <span className="font-mono text-xs mt-1 block" style={{ color: '#FF3800' }}>{errors[name]}</span>}
    </div>
  );

  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-px w-8" style={{ background: '#FF3800' }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: '#FF3800' }}>COMMANDER</span>
        </div>
        <h2 className="font-display text-5xl mb-10" style={{ color: '#f0f0f0' }}>COMMANDE</h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              {/* Personal info */}
              <div className="p-6" style={{ background: '#111', border: '1px solid #2a2a2a' }}>
                <h3 className="font-display text-lg tracking-wider mb-6" style={{ color: '#f0f0f0' }}>INFORMATIONS PERSONNELLES</h3>
                <div className="grid grid-cols-2 gap-4">
                  {field('firstName', 'PRÉNOM')}
                  {field('lastName', 'NOM')}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {field('email', 'EMAIL', 'email', 'you@example.com')}
                  {field('phone', 'TÉLÉPHONE', 'tel', '+33 6 ...')}
                </div>
              </div>

              {/* Delivery mode */}
              <div className="p-6" style={{ background: '#111', border: '1px solid #2a2a2a' }}>
                <h3 className="font-display text-lg tracking-wider mb-6" style={{ color: '#f0f0f0' }}>MODE DE LIVRAISON</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px mb-6" style={{ background: '#2a2a2a' }}>
                  {([
                    { id: 'ship', icon: <Truck size={24} />, title: 'Livraison à domicile', sub: total > 100 ? 'Gratuite' : '5.90 €', desc: 'Délai 3–5 jours ouvrés' },
                    { id: 'collect', icon: <Store size={24} />, title: 'Click & Collect', sub: 'Gratuit', desc: 'Dispo en boutique dès 2h' },
                  ] as const).map(opt => (
                    <button
                      type="button"
                      key={opt.id}
                      onClick={() => setForm(f => ({ ...f, deliveryMode: opt.id }))}
                      className="p-5 text-left transition-all"
                      style={{
                        background: form.deliveryMode === opt.id ? '#0e1a00' : '#111',
                        border: form.deliveryMode === opt.id ? '1px solid #CCFF00' : '1px solid transparent',
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span style={{ color: '#CCFF00' }}>{opt.icon}</span>
                        <span className="font-display text-sm" style={{ color: '#CCFF00' }}>{opt.sub}</span>
                      </div>
                      <div className="font-display text-base tracking-wide" style={{ color: '#f0f0f0' }}>{opt.title}</div>
                      <div className="font-mono text-xs mt-1" style={{ color: '#555' }}>{opt.desc}</div>
                    </button>
                  ))}
                </div>

                {form.deliveryMode === 'ship' && (
                  <div className="space-y-4">
                    {field('address', 'ADRESSE', 'text', '12 Rue de la République')}
                    <div className="grid grid-cols-2 gap-4">
                      {field('city', 'VILLE', 'text', 'Marseille')}
                      {field('zip', 'CODE POSTAL', 'text', '13001')}
                    </div>
                  </div>
                )}

                {form.deliveryMode === 'collect' && (
                  <div className="p-4" style={{ border: '1px solid #1a3300', background: '#0e1a00' }}>
                    <div className="font-display text-sm mb-1" style={{ color: '#CCFF00' }}>XOXO SKATE SHOP</div>
                    <div className="font-mono text-xs" style={{ color: '#668833' }}>197 Avenue Pierre Mendès-France — Marseille 13008</div>
                    <div className="font-mono text-xs mt-1" style={{ color: '#555' }}>Lun–Sam 10:00–19:00 · Prêt dès 2h après commande</div>
                  </div>
                )}
              </div>

              {/* Payment */}
              <div className="p-6" style={{ background: '#111', border: '1px solid #2a2a2a' }}>
                <h3 className="font-display text-lg tracking-wider mb-6" style={{ color: '#f0f0f0' }}>PAIEMENT</h3>
                <div className="flex gap-3 mb-6 flex-wrap">
                  {[
                    { id: 'card', label: 'CARTE' },
                    { id: 'paypal', label: 'PAYPAL' },
                    { id: 'apple', label: 'APPLE PAY' },
                    { id: 'google', label: 'GOOGLE PAY' },
                  ].map(({ id, label }) => (
                    <button type="button" key={id} onClick={() => setForm(f => ({ ...f, payment: id }))}
                      className="font-mono text-xs px-4 py-3 tracking-widest transition-all"
                      style={{ border: '1px solid', borderColor: form.payment === id ? '#CCFF00' : '#2a2a2a', color: form.payment === id ? '#CCFF00' : '#555', background: form.payment === id ? 'rgba(204,255,0,0.05)' : 'transparent' }}>
                      {label}
                    </button>
                  ))}
                </div>
                {form.payment === 'card' && (
                  <div className="space-y-4">
                    {field('cardNumber', 'NUMÉRO DE CARTE', 'text', '1234 5678 9012 3456')}
                    <div className="grid grid-cols-2 gap-4">
                      {field('cardExpiry', 'EXPIRATION', 'text', 'MM/AA')}
                      {field('cardCvv', 'CVV', 'text', '123')}
                    </div>
                  </div>
                )}
                {(['paypal', 'apple', 'google'].includes(form.payment)) && (
                  <div className="p-4 text-center" style={{ border: '1px solid #2a2a2a' }}>
                    <p className="font-mono text-sm" style={{ color: '#666' }}>Vous serez redirigé après confirmation.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Order summary */}
            <div>
              <div className="p-6 sticky top-20" style={{ background: '#111', border: '1px solid #2a2a2a' }}>
                <h3 className="font-display text-lg tracking-wider mb-6" style={{ color: '#f0f0f0' }}>COMMANDE</h3>
                <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: '1px solid #2a2a2a' }}>
                  {items.map(item => (
                    <div key={item.product.id} className="flex justify-between gap-2">
                      <span className="font-mono text-xs leading-tight flex-1" style={{ color: '#666' }}>
                        {item.product.name} ×{item.quantity}
                      </span>
                      <span className="font-mono text-xs whitespace-nowrap" style={{ color: '#f0f0f0' }}>
                        {(item.product.price * item.quantity).toFixed(2)} €
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 mb-6">
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
                  <div className="flex justify-between pt-4" style={{ borderTop: '1px solid #2a2a2a' }}>
                    <span className="font-display text-base tracking-wide" style={{ color: '#f0f0f0' }}>TOTAL</span>
                    <span className="font-display text-xl" style={{ color: '#CCFF00' }}>{(total + shipping).toFixed(2)} €</span>
                  </div>
                </div>

                {/* Points preview */}
                <div className="p-3 mb-4" style={{ background: '#0e1a00', border: '1px solid #1a3300' }}>
                  <span className="font-mono text-xs" style={{ color: '#668833' }}>+{Math.floor(total)} pts XOXO Club après achat</span>
                </div>

                <button type="submit" disabled={submitting} className="w-full font-display tracking-widest text-base py-4 transition-all" style={{ background: '#CCFF00', color: '#080808', letterSpacing: '0.12em', opacity: submitting ? 0.7 : 1 }}>
                  {submitting ? 'TRAITEMENT...' : 'CONFIRMER'}
                </button>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Lock size={12} style={{ color: '#333' }} /><span className="font-mono text-xs" style={{ color: '#333' }}>Paiement sécurisé SSL</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
