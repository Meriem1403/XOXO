import { useState } from 'react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';
import { monthlyRevenue, categoryRevenue, objectives, topProducts, initialOrders } from '../data';
import type { Order, OrderStatus, Objective } from '../types';

type Tab = 'stats' | 'orders' | 'objectives';

interface DashboardProps {
  orders: Order[];
  onUpdateOrderStatus: (id: string, status: OrderStatus) => void;
}

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: '#FF9500',
  processing: '#6644FF',
  shipped: '#00BBFF',
  delivered: '#CCFF00',
  cancelled: '#FF3800',
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'EN ATTENTE',
  processing: 'EN COURS',
  shipped: 'EXPÉDIÉE',
  delivered: 'LIVRÉE',
  cancelled: 'ANNULÉE',
};

function StatCard({ label, value, sub, color = '#CCFF00' }: { label: string; value: string; sub?: string; color?: string }) {
  return (
    <div className="p-6" style={{ background: '#111', border: '1px solid #2a2a2a' }}>
      <div className="font-mono text-xs tracking-widest mb-3 uppercase" style={{ color: '#555' }}>{label}</div>
      <div className="font-display text-3xl mb-1" style={{ color }}>{value}</div>
      {sub && <div className="font-mono text-xs" style={{ color: '#444' }}>{sub}</div>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { value: number }[]; label?: string }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="p-3" style={{ background: '#1a1a1a', border: '1px solid #2a2a2a' }}>
      <div className="font-mono text-xs mb-1" style={{ color: '#666' }}>{label}</div>
      <div className="font-mono text-sm font-bold" style={{ color: '#CCFF00' }}>{payload[0].value.toLocaleString('fr-FR')} €</div>
    </div>
  );
};

function ObjectiveCard({ obj }: { obj: Objective }) {
  const pct = Math.min(100, Math.round((obj.current / obj.target) * 100));
  return (
    <div className="p-5" style={{ background: '#111', border: '1px solid #2a2a2a' }}>
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="font-display text-sm tracking-wide" style={{ color: '#f0f0f0' }}>{obj.label}</div>
          <div className="font-mono text-xs mt-1" style={{ color: '#444' }}>{obj.period}</div>
        </div>
        <div className="font-mono text-xs px-2 py-1 ml-4" style={{ background: 'rgba(204,255,0,0.08)', color: '#CCFF00', border: '1px solid #1a3300' }}>
          {pct}%
        </div>
      </div>
      <div className="progress-bar mb-3">
        <div className="progress-fill" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${obj.color}, ${obj.color}aa)` }} />
      </div>
      <div className="flex justify-between">
        <span className="font-mono text-xs" style={{ color: '#555' }}>
          {obj.current.toLocaleString('fr-FR')} {obj.unit}
        </span>
        <span className="font-mono text-xs" style={{ color: '#333' }}>
          /{obj.target.toLocaleString('fr-FR')} {obj.unit}
        </span>
      </div>
    </div>
  );
}

export default function Dashboard({ orders, onUpdateOrderStatus }: DashboardProps) {
  const [tab, setTab] = useState<Tab>('stats');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'all'>('all');

  const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
  const deliveredOrders = orders.filter(o => o.status === 'delivered').length;
  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;

  const filteredOrders = statusFilter === 'all' ? orders : orders.filter(o => o.status === statusFilter);

  return (
    <div className="min-h-screen pt-16" style={{ background: '#080808' }}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-2">
          <div className="h-px w-8" style={{ background: '#FF3800' }} />
          <span className="font-mono text-xs tracking-widest" style={{ color: '#FF3800' }}>ADMIN</span>
        </div>
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-display text-5xl md:text-6xl" style={{ color: '#f0f0f0' }}>DASHBOARD</h2>
          <div className="font-mono text-xs" style={{ color: '#444' }}>XOXO SKATE SHOP — MARSEILLE</div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0 mb-10" style={{ borderBottom: '1px solid #2a2a2a' }}>
          {([
            { id: 'stats', label: 'STATISTIQUES' },
            { id: 'orders', label: 'COMMANDES' },
            { id: 'objectives', label: 'OBJECTIFS' },
          ] as const).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className="font-display tracking-widest text-sm px-6 py-4 transition-all"
              style={{
                color: tab === id ? '#CCFF00' : '#444',
                borderBottom: tab === id ? '2px solid #CCFF00' : '2px solid transparent',
                letterSpacing: '0.1em',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* STATS TAB */}
        {tab === 'stats' && (
          <div className="space-y-8">
            {/* KPI cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: '#2a2a2a' }}>
              <StatCard label="CA Total (2024)" value={`${totalRevenue.toLocaleString('fr-FR', { minimumFractionDigits: 0 })} €`} sub="↑ +23% vs 2023" />
              <StatCard label="Commandes" value={String(orders.length)} sub={`${deliveredOrders} livrées`} color="#FF3800" />
              <StatCard label="En attente" value={String(pendingOrders)} sub="nécessitent action" color="#FF9500" />
              <StatCard label="Ticket moyen" value={`${orders.length ? (totalRevenue / orders.length).toFixed(0) : 0} €`} sub="par commande" color="#6644FF" />
            </div>

            {/* Revenue chart */}
            <div className="p-6" style={{ background: '#111', border: '1px solid #2a2a2a' }}>
              <div className="flex items-center justify-between mb-6">
                <div className="font-display text-xl tracking-wider" style={{ color: '#f0f0f0' }}>REVENUS MENSUELS 2024</div>
                <div className="font-mono text-xs" style={{ color: '#444' }}>MARS → SEPTEMBRE</div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={monthlyRevenue} margin={{ top: 0, right: 0, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="limeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#CCFF00" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#CCFF00" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
                  <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#555', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="revenue" stroke="#CCFF00" strokeWidth={2} fill="url(#limeGrad)" dot={{ fill: '#CCFF00', r: 3 }} activeDot={{ r: 5, fill: '#CCFF00' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Bottom row: categories + top products */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#2a2a2a' }}>
              {/* Category breakdown */}
              <div className="p-6" style={{ background: '#111' }}>
                <div className="font-display text-lg tracking-wider mb-6" style={{ color: '#f0f0f0' }}>RÉPARTITION PAR CATÉGORIE</div>
                <div className="flex items-center gap-6">
                  <PieChart width={140} height={140}>
                    <Pie data={categoryRevenue} cx={65} cy={65} innerRadius={40} outerRadius={65} dataKey="value" strokeWidth={0}>
                      {categoryRevenue.map(entry => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="space-y-3 flex-1">
                    {categoryRevenue.map(cat => (
                      <div key={cat.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
                          <span className="font-mono text-xs" style={{ color: '#888' }}>{cat.name}</span>
                        </div>
                        <span className="font-mono text-xs font-bold" style={{ color: cat.color }}>{cat.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top products */}
              <div className="p-6" style={{ background: '#111' }}>
                <div className="font-display text-lg tracking-wider mb-6" style={{ color: '#f0f0f0' }}>TOP PRODUITS</div>
                <div className="space-y-3">
                  {topProducts.map((p, i) => (
                    <div key={p.name} className="flex items-center gap-3">
                      <span className="font-mono text-xs w-5" style={{ color: i === 0 ? '#CCFF00' : '#333' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-mono text-xs truncate" style={{ color: '#888' }}>{p.name}</div>
                        <div className="progress-bar mt-1" style={{ height: 3 }}>
                          <div className="progress-fill" style={{ width: `${(p.sales / topProducts[0].sales) * 100}%`, height: '100%' }} />
                        </div>
                      </div>
                      <div className="text-right ml-2">
                        <div className="font-mono text-xs font-bold" style={{ color: '#f0f0f0' }}>{p.sales} ventes</div>
                        <div className="font-mono text-xs" style={{ color: '#444' }}>{p.revenue.toFixed(0)} €</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Orders bar chart */}
            <div className="p-6" style={{ background: '#111', border: '1px solid #2a2a2a' }}>
              <div className="font-display text-lg tracking-wider mb-6" style={{ color: '#f0f0f0' }}>VOLUME DE COMMANDES</div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={monthlyRevenue} margin={{ top: 0, right: 0, left: -10, bottom: 0 }} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#555', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#555', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: '#1a1a1a', border: '1px solid #2a2a2a', fontFamily: 'JetBrains Mono', fontSize: 12 }} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
                  <Bar dataKey="orders" fill="#FF3800" radius={[1, 1, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {tab === 'orders' && (
          <div>
            {/* Filter */}
            <div className="flex gap-2 mb-6 flex-wrap">
              {(['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const).map(s => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className="font-mono text-xs px-3 py-2 tracking-widest transition-all"
                  style={{
                    border: '1px solid',
                    borderColor: statusFilter === s ? (s === 'all' ? '#CCFF00' : STATUS_COLORS[s as OrderStatus] || '#CCFF00') : '#2a2a2a',
                    color: statusFilter === s ? (s === 'all' ? '#CCFF00' : STATUS_COLORS[s as OrderStatus] || '#CCFF00') : '#444',
                    background: statusFilter === s ? 'rgba(255,255,255,0.02)' : 'transparent',
                  }}
                >
                  {s === 'all' ? 'TOUTES' : STATUS_LABELS[s as OrderStatus]}
                </button>
              ))}
              <span className="ml-auto font-mono text-xs self-center" style={{ color: '#333' }}>{filteredOrders.length} commande{filteredOrders.length > 1 ? 's' : ''}</span>
            </div>

            {/* Table */}
            <div style={{ border: '1px solid #2a2a2a', background: '#111' }}>
              <div className="grid font-mono text-xs tracking-widest px-4 py-3" style={{ gridTemplateColumns: '120px 1fr 1fr 80px 120px 160px', color: '#444', borderBottom: '1px solid #2a2a2a' }}>
                <span>ID</span>
                <span>CLIENT</span>
                <span>VILLE</span>
                <span>TOTAL</span>
                <span>DATE</span>
                <span>STATUT</span>
              </div>
              <div className="divide-y" style={{ borderColor: '#1a1a1a' }}>
                {filteredOrders.map(order => (
                  <div
                    key={order.id}
                    className="grid px-4 py-4 items-center transition-colors"
                    style={{ gridTemplateColumns: '120px 1fr 1fr 80px 120px 160px', borderBottom: '1px solid #1a1a1a' }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#161616')}
                    onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  >
                    <span className="font-mono text-xs" style={{ color: '#CCFF00' }}>{order.id}</span>
                    <div>
                      <div className="font-mono text-xs" style={{ color: '#f0f0f0' }}>{order.customer}</div>
                      <div className="font-mono text-xs" style={{ color: '#444' }}>{order.email}</div>
                    </div>
                    <span className="font-mono text-xs" style={{ color: '#666' }}>{order.city}</span>
                    <span className="font-mono text-xs font-bold" style={{ color: '#f0f0f0' }}>{order.total.toFixed(2)} €</span>
                    <span className="font-mono text-xs" style={{ color: '#444' }}>{order.date}</span>
                    <select
                      value={order.status}
                      onChange={e => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="font-mono text-xs px-2 py-1"
                      style={{
                        background: 'transparent',
                        border: `1px solid ${STATUS_COLORS[order.status]}`,
                        color: STATUS_COLORS[order.status],
                        width: '150px',
                      }}
                    >
                      {(Object.keys(STATUS_LABELS) as OrderStatus[]).map(s => (
                        <option key={s} value={s} style={{ background: '#111', color: '#f0f0f0' }}>{STATUS_LABELS[s]}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* OBJECTIVES TAB */}
        {tab === 'objectives' && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div>
                <div className="font-mono text-xs mb-1" style={{ color: '#555' }}>PROGRESSION GLOBALE</div>
                <div className="font-display text-4xl" style={{ color: '#CCFF00' }}>
                  {Math.round(objectives.reduce((s, o) => s + Math.min(100, (o.current / o.target) * 100), 0) / objectives.length)}%
                </div>
              </div>
              <div className="flex-1 ml-8">
                <div className="progress-bar" style={{ height: 8 }}>
                  <div className="progress-fill" style={{ width: `${Math.round(objectives.reduce((s, o) => s + Math.min(100, (o.current / o.target) * 100), 0) / objectives.length)}%` }} />
                </div>
                <div className="font-mono text-xs mt-2" style={{ color: '#444' }}>Moyenne sur {objectives.length} objectifs</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#2a2a2a' }}>
              {objectives.map(obj => (
                <ObjectiveCard key={obj.id} obj={obj} />
              ))}
            </div>

            {/* Seasonal note */}
            <div className="mt-8 p-6" style={{ background: '#0e1a00', border: '1px solid #1a3300' }}>
              <div className="flex items-start gap-4">
                <div className="font-display text-xl" style={{ color: '#CCFF00' }}>↗</div>
                <div>
                  <div className="font-display text-sm tracking-wider mb-2" style={{ color: '#CCFF00' }}>ANALYSE SAISONNIÈRE</div>
                  <p className="font-mono text-xs leading-relaxed" style={{ color: '#668833' }}>
                    Septembre marque la rentrée — pic de vente skateboard prévu. La saison surf méditerranéenne ralentit.
                    Renforcer les stocks vêtements et chaussures pour Q4. Objectif CA à 65% d'atteinte, rythme à accélérer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
