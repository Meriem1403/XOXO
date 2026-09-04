import type {
  Product, Order, Objective, Rider, Event, Article, Drop, SetupPart,
} from './types';

export const products: Product[] = [
  // SKATE
  {
    id: 'sk-001', name: 'Deck Santa Cruz Screaming Hand', brand: 'Santa Cruz', category: 'skate',
    price: 59.90, image: 'https://images.unsplash.com/photo-1681198444108-3c2689ffdb3a?w=600&h=600&fit=crop&auto=format',
    description: 'Le classique absolu. Deck 8.0" avec graphic Screaming Hand iconique. Wood maple canadien 7 plis, concave medium.',
    stock: 12, tags: ['deck', 'classic', 'graphic'], isNew: false,
  },
  {
    id: 'sk-002', name: 'Trucks Independent Stage 11 169mm', brand: 'Independent', category: 'skate',
    price: 69.90, image: 'https://images.unsplash.com/photo-1571677594976-153c59b7ee67?w=600&h=600&fit=crop&auto=format',
    description: 'Les trucks préférés des pros depuis 1978. Aluminium forgé haute résistance, pivot chromé.',
    stock: 8, tags: ['trucks', 'pro', 'durable'],
  },
  {
    id: 'sk-003', name: 'Roues Spitfire Formula Four 54mm', brand: 'Spitfire', category: 'skate',
    price: 44.90, originalPrice: 54.90,
    image: 'https://images.unsplash.com/photo-1503416829621-2a647b6c386a?w=600&h=600&fit=crop&auto=format',
    description: 'Formula Four 99A. La roue la plus rapide du marché. Anti-flatspot, parfaite pour le street et le park.',
    stock: 20, tags: ['wheels', 'fast', 'promo'],
  },
  {
    id: 'sk-004', name: 'Setup Complet Powell Peralta', brand: 'Powell Peralta', category: 'skate',
    price: 149.90, image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=600&h=600&fit=crop&auto=format',
    description: 'Setup prêt-à-rider. Deck 8.25" + trucks Tensor + roues + roulements ABEC-7.',
    stock: 5, tags: ['complete', 'setup', 'beginner'],
  },
  {
    id: 'sk-005', name: 'Deck Element Seal 8.2"', brand: 'Element', category: 'skate',
    price: 54.90, image: 'https://images.unsplash.com/photo-1681198444108-3c2689ffdb3a?w=600&h=600&fit=crop&auto=format',
    description: 'Deck Element avec graphic seal en édition limitée. 7 plis érable canadien, concave medium-high.',
    stock: 7, tags: ['deck', 'limited', 'element'], isNew: true,
  },
  {
    id: 'sk-006', name: 'Roulements Bones Reds', brand: 'Bones', category: 'accessories',
    price: 19.90, image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=600&h=600&fit=crop&auto=format',
    description: 'Les roulements incontournables. Billes en acier chromé, shield simple côté intérieur. Pack de 8.',
    stock: 30, tags: ['bearings', 'essentials'],
  },
  {
    id: 'sk-007', name: 'Grip Jessup Ultra', brand: 'Jessup', category: 'accessories',
    price: 7.90, image: 'https://images.unsplash.com/photo-1681198444108-3c2689ffdb3a?w=600&h=600&fit=crop&auto=format',
    description: 'Grip silicone carbide ultra-adhérent. Format 9" x 33", découpable facilement.',
    stock: 45, tags: ['grip', 'essentials'],
  },
  {
    id: 'sk-008', name: 'Visserie Shorty\'s 1"', brand: "Shorty's", category: 'accessories',
    price: 4.90, image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=600&h=600&fit=crop&auto=format',
    description: 'Pack visserie Allen 1 pouce. Compatible avec tous les trucks standard.',
    stock: 60, tags: ['hardware', 'essentials'],
  },
  // SURF
  {
    id: 'su-001', name: 'Shortboard Channel Islands 6\'2"', brand: 'Channel Islands', category: 'surf',
    price: 649.00, image: 'https://images.unsplash.com/photo-1727851299783-173e730ff939?w=600&h=600&fit=crop&auto=format',
    description: 'Shortboard performance pour vagues méditerranéennes. Shape Al Merrick, 6\'2" x 18.5" x 2.25".',
    stock: 3, tags: ['board', 'performance', 'shortboard'],
  },
  {
    id: 'su-002', name: 'Combinaison O\'Neill Hyperfreak 3/2', brand: "O'Neill", category: 'surf',
    price: 299.00, originalPrice: 349.00,
    image: 'https://images.unsplash.com/photo-1692534686163-63f174b72119?w=600&h=600&fit=crop&auto=format',
    description: 'Combi full-stretch pour les eaux méditerranéennes. TechnoButter 3x néoprène, coutures collées.',
    stock: 6, tags: ['wetsuit', 'winter', 'promo'], sizes: ['XS', 'S', 'M', 'L', 'XL'],
  },
  {
    id: 'su-003', name: 'Wax Sex Wax Cool Water', brand: 'Mr. Zog', category: 'surf',
    price: 3.90, image: 'https://images.unsplash.com/photo-1727851299783-173e730ff939?w=600&h=600&fit=crop&auto=format',
    description: 'La wax légendaire pour eaux fraîches. Formule cool (12-18°C), parfaite pour la Méditerranée.',
    stock: 50, tags: ['wax', 'essentials', 'cool'],
  },
  {
    id: 'su-004', name: 'Leash FCS 6\' Regular', brand: 'FCS', category: 'surf',
    price: 34.90, image: 'https://images.unsplash.com/photo-1692534686163-63f174b72119?w=600&h=600&fit=crop&auto=format',
    description: 'Leash 6 pieds 7mm, swivel double 360°. Attache cheville ultra-soft néoprène.',
    stock: 15, tags: ['leash', 'accessory'],
  },
  // SHOES
  {
    id: 'sh-001', name: 'Vans Old Skool Black/White', brand: 'Vans', category: 'shoes',
    price: 89.90, image: 'https://images.unsplash.com/photo-1571677594976-153c59b7ee67?w=600&h=600&fit=crop&auto=format',
    description: 'L\'original. Semelle Waffle en caoutchouc vulcanisé, renfort latéral Sidestripe.',
    stock: 18, tags: ['classic', 'iconic', 'everyday'], sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
  },
  {
    id: 'sh-002', name: 'Emerica Reynolds G6', brand: 'Emerica', category: 'shoes',
    price: 99.90, image: 'https://images.unsplash.com/photo-1503416829621-2a647b6c386a?w=600&h=600&fit=crop&auto=format',
    description: 'La chaussure de Andrew Reynolds. Cuir pleine fleur, semelle Tri-Fuse, protection impact G6.',
    stock: 10, tags: ['pro', 'impact', 'leather'], sizes: ['40', '41', '42', '43', '44', '45'],
  },
  {
    id: 'sh-003', name: 'DC Shoes Manteca 4', brand: 'DC Shoes', category: 'shoes',
    price: 79.90, originalPrice: 94.90,
    image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=600&h=600&fit=crop&auto=format',
    description: 'Confort maximal en session longue. Semelle PILL cushion, tige textile renforcée.',
    stock: 14, tags: ['comfort', 'promo', 'all-day'], sizes: ['39', '40', '41', '42', '43', '44', '45'],
  },
  {
    id: 'sh-004', name: 'Nike SB Dunk Low Pro', brand: 'Nike SB', category: 'shoes',
    price: 119.90, image: 'https://images.unsplash.com/photo-1571677594976-153c59b7ee67?w=600&h=600&fit=crop&auto=format',
    description: 'La Dunk SB légendaire. Zoom Air au talon, tige cuir premium, outsole vulcanisée.',
    stock: 4, tags: ['premium', 'nike', 'limited'], sizes: ['40', '41', '42', '43', '44', '45'],
    isNew: true, isDrop: true,
  },
  // CLOTHING
  {
    id: 'cl-001', name: 'Hoodie XOXO Logo Skate — Lime', brand: 'XOXO', category: 'clothing',
    price: 65.00, image: 'https://images.unsplash.com/photo-1536443664265-46b42d043c2d?w=600&h=600&fit=crop&auto=format',
    description: 'Notre hoodie signature. Broderie logo XOXO devant, 400g/m² fleece, coupe oversized. Made in Marseille.',
    stock: 25, tags: ['brand', 'hoodie', 'exclusive'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'cl-002', name: 'Tee-shirt Anti-Hero Skate Noir', brand: 'Anti-Hero', category: 'clothing',
    price: 34.90, image: 'https://images.unsplash.com/photo-1571677594976-153c59b7ee67?w=600&h=600&fit=crop&auto=format',
    description: 'Tee Anti-Hero Eagle graphic. 100% coton peigné 200g, coupe regular. Screen print eau-base.',
    stock: 20, tags: ['tee', 'graphic', 'classic'], sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 'cl-003', name: 'Cap Thrasher Magazine Logo', brand: 'Thrasher', category: 'clothing',
    price: 29.90, image: 'https://images.unsplash.com/photo-1536443664265-46b42d043c2d?w=600&h=600&fit=crop&auto=format',
    description: 'La casquette qui ne se présente plus. Broderie flame logo, 6 panneaux structurés.',
    stock: 35, tags: ['cap', 'iconic', 'snapback'],
  },
  {
    id: 'cl-004', name: 'Cargo XOXO Marseille — Noir', brand: 'XOXO', category: 'clothing',
    price: 89.00, image: 'https://images.unsplash.com/photo-1536443664265-46b42d043c2d?w=600&h=600&fit=crop&auto=format',
    description: 'Cargo technique coupe baggy. 6 poches, tissu ripstop 240g. Broderie XOXO 13 au genou.',
    stock: 10, tags: ['cargo', 'xoxo', 'marseille'], sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
  },
  // ROCK
  {
    id: 'ro-001', name: 'Tee Ramones — Road to Ruin', brand: 'Rock Merch', category: 'rock',
    price: 39.90, image: 'https://images.unsplash.com/photo-1503416829621-2a647b6c386a?w=600&h=600&fit=crop&auto=format',
    description: 'Tee vintage official Ramones "Road to Ruin". Coton ringspun 180g, effet washed.',
    stock: 12, tags: ['ramones', 'vintage', 'band-tee'], sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'ro-002', name: 'Patch Black Flag Barres', brand: 'Rock Merch', category: 'rock',
    price: 5.90, image: 'https://images.unsplash.com/photo-1681198444108-3c2689ffdb3a?w=600&h=600&fit=crop&auto=format',
    description: 'Patch brodé Black Flag iconic barres. 8x8cm, thermocollant et couture.',
    stock: 40, tags: ['patch', 'punk', 'diy'],
  },
  {
    id: 'ro-003', name: 'Vinyle Nirvana — Nevermind', brand: 'DGC Records', category: 'rock',
    price: 24.90, originalPrice: 29.90,
    image: 'https://images.unsplash.com/photo-1503416829621-2a647b6c386a?w=600&h=600&fit=crop&auto=format',
    description: 'Réédition 180g du chef-d\'oeuvre de Nirvana. Pressage audiophile, insert photos original.',
    stock: 8, tags: ['vinyl', 'nirvana', 'classic-rock'],
  },
];

export const initialOrders: Order[] = [
  { id: 'ORD-2024-001', date: '2024-09-01', customer: 'Julien Ramirez', email: 'julien.r@gmail.com', city: 'Marseille', items: [{ name: 'Deck Santa Cruz', qty: 1, price: 59.90 }, { name: 'Bones Reds', qty: 1, price: 19.90 }], total: 79.80, status: 'delivered', deliveryMode: 'ship' },
  { id: 'ORD-2024-002', date: '2024-09-02', customer: 'Sofia Brun', email: 'sofia.brun@icloud.com', city: 'Aix-en-Provence', items: [{ name: 'Vans Old Skool', qty: 1, price: 89.90 }, { name: 'Hoodie XOXO', qty: 1, price: 65.00 }], total: 154.90, status: 'shipped', deliveryMode: 'ship' },
  { id: 'ORD-2024-003', date: '2024-09-02', customer: 'Théo Moreau', email: 'theo.m@hotmail.fr', city: 'Marseille', items: [{ name: 'Shortboard Channel Islands', qty: 1, price: 649.00 }], total: 649.00, status: 'processing', deliveryMode: 'collect' },
  { id: 'ORD-2024-004', date: '2024-09-03', customer: 'Camille Fabre', email: 'camille.fabre@gmail.com', city: 'Toulon', items: [{ name: "Combi O'Neill", qty: 1, price: 299.00 }, { name: 'Leash FCS', qty: 1, price: 34.90 }], total: 333.90, status: 'pending', deliveryMode: 'ship' },
  { id: 'ORD-2024-005', date: '2024-09-03', customer: 'Maxime Leclerc', email: 'max.lec@outlook.fr', city: 'Marseille', items: [{ name: 'Tee Ramones', qty: 2, price: 39.90 }, { name: 'Patch Black Flag', qty: 3, price: 5.90 }], total: 97.50, status: 'delivered', deliveryMode: 'collect' },
  { id: 'ORD-2024-006', date: '2024-09-04', customer: 'Inès Dupont', email: 'ines.dupont@gmail.com', city: 'Nice', items: [{ name: 'DC Manteca 4', qty: 1, price: 79.90 }, { name: 'Cap Thrasher', qty: 1, price: 29.90 }], total: 109.80, status: 'pending', deliveryMode: 'ship' },
];

export const monthlyRevenue = [
  { month: 'Mar', revenue: 3200, orders: 42 },
  { month: 'Avr', revenue: 4800, orders: 61 },
  { month: 'Mai', revenue: 6200, orders: 78 },
  { month: 'Juin', revenue: 8900, orders: 112 },
  { month: 'Juil', revenue: 12400, orders: 158 },
  { month: 'Août', revenue: 14200, orders: 181 },
  { month: 'Sep', revenue: 9800, orders: 124 },
];

export const categoryRevenue = [
  { name: 'Skate', value: 38, color: '#CCFF00' },
  { name: 'Surf', value: 27, color: '#FF3800' },
  { name: 'Shoes', value: 18, color: '#6644FF' },
  { name: 'Clothing', value: 12, color: '#FF9500' },
  { name: 'Rock', value: 5, color: '#FF2288' },
];

export const objectives: Objective[] = [
  { id: 'obj-1', label: "Chiffre d'affaires Septembre", current: 9800, target: 15000, unit: '€', period: 'Septembre 2024', color: '#CCFF00' },
  { id: 'obj-2', label: 'Nouvelles commandes', current: 124, target: 200, unit: 'cmd', period: 'Septembre 2024', color: '#FF3800' },
  { id: 'obj-3', label: 'Nouveaux clients', current: 47, target: 80, unit: 'clients', period: 'Septembre 2024', color: '#6644FF' },
  { id: 'obj-4', label: 'Produits vendus', current: 312, target: 500, unit: 'articles', period: 'Septembre 2024', color: '#FF9500' },
  { id: 'obj-5', label: 'Satisfaction client', current: 4.6, target: 5.0, unit: '/5', period: 'Cumulé 2024', color: '#FF2288' },
  { id: 'obj-6', label: 'Référencements produits', current: 19, target: 30, unit: 'produits', period: 'Q4 2024', color: '#00BBFF' },
];

export const topProducts = [
  { name: 'Vans Old Skool', sales: 48, revenue: 4315.20 },
  { name: 'Deck Santa Cruz', sales: 34, revenue: 2036.60 },
  { name: 'Hoodie XOXO Logo', sales: 29, revenue: 1885.00 },
  { name: 'Cap Thrasher', sales: 27, revenue: 807.30 },
  { name: 'Spitfire F4 54mm', sales: 24, revenue: 1077.60 },
];

// SETUP BUILDER parts
export const setupParts: SetupPart[] = [
  // Decks
  { id: 'sp-deck-1', type: 'deck', name: 'Santa Cruz Screaming Hand 8.0"', brand: 'Santa Cruz', price: 59.90, image: 'https://images.unsplash.com/photo-1681198444108-3c2689ffdb3a?w=200&h=200&fit=crop', size: '8.0"' },
  { id: 'sp-deck-2', type: 'deck', name: 'Element Seal 8.2"', brand: 'Element', price: 54.90, image: 'https://images.unsplash.com/photo-1681198444108-3c2689ffdb3a?w=200&h=200&fit=crop', size: '8.2"' },
  { id: 'sp-deck-3', type: 'deck', name: 'Anti-Hero Eagle 8.5"', brand: 'Anti-Hero', price: 62.90, image: 'https://images.unsplash.com/photo-1681198444108-3c2689ffdb3a?w=200&h=200&fit=crop', size: '8.5"' },
  { id: 'sp-deck-4', type: 'deck', name: 'Baker Brand Logo 8.25"', brand: 'Baker', price: 57.90, image: 'https://images.unsplash.com/photo-1681198444108-3c2689ffdb3a?w=200&h=200&fit=crop', size: '8.25"' },
  // Trucks
  { id: 'sp-trucks-1', type: 'trucks', name: 'Independent Stage 11 139mm', brand: 'Independent', price: 69.90, image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=200&h=200&fit=crop', size: '139mm' },
  { id: 'sp-trucks-2', type: 'trucks', name: 'Thunder Team 149mm', brand: 'Thunder', price: 64.90, image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=200&h=200&fit=crop', size: '149mm' },
  { id: 'sp-trucks-3', type: 'trucks', name: 'Venture 5.25 Hi', brand: 'Venture', price: 59.90, image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=200&h=200&fit=crop', size: '5.25"' },
  // Wheels
  { id: 'sp-wheels-1', type: 'wheels', name: 'Spitfire Formula Four 54mm 99A', brand: 'Spitfire', price: 44.90, image: 'https://images.unsplash.com/photo-1503416829621-2a647b6c386a?w=200&h=200&fit=crop', size: '54mm' },
  { id: 'sp-wheels-2', type: 'wheels', name: 'OJ Wheels Super Juice 60mm 78A', brand: 'OJ Wheels', price: 39.90, image: 'https://images.unsplash.com/photo-1503416829621-2a647b6c386a?w=200&h=200&fit=crop', size: '60mm' },
  { id: 'sp-wheels-3', type: 'wheels', name: 'Ricta Clouds 54mm 86A', brand: 'Ricta', price: 42.90, image: 'https://images.unsplash.com/photo-1503416829621-2a647b6c386a?w=200&h=200&fit=crop', size: '54mm' },
  // Bearings
  { id: 'sp-bearings-1', type: 'bearings', name: 'Bones Reds', brand: 'Bones', price: 19.90, image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=200&h=200&fit=crop' },
  { id: 'sp-bearings-2', type: 'bearings', name: 'Bronson G3', brand: 'Bronson', price: 24.90, image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=200&h=200&fit=crop' },
  // Grip
  { id: 'sp-grip-1', type: 'grip', name: 'Jessup Ultra Grip', brand: 'Jessup', price: 7.90, image: 'https://images.unsplash.com/photo-1681198444108-3c2689ffdb3a?w=200&h=200&fit=crop' },
  { id: 'sp-grip-2', type: 'grip', name: 'Mob Grip Perforated', brand: 'Mob Grip', price: 9.90, image: 'https://images.unsplash.com/photo-1681198444108-3c2689ffdb3a?w=200&h=200&fit=crop' },
  // Hardware
  { id: 'sp-hw-1', type: 'hardware', name: "Visserie Shorty's 1\"", brand: "Shorty's", price: 4.90, image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=200&h=200&fit=crop' },
  { id: 'sp-hw-2', type: 'hardware', name: 'Visserie Ace Bolts 7/8"', brand: 'ACE', price: 5.90, image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=200&h=200&fit=crop' },
];

// RIDERS / TEAM
export const riders: Rider[] = [
  {
    id: 'r-1', name: 'Kenzo Alarcon', age: 22, city: 'Marseille', style: 'Street / Tech',
    instagram: '@kenzo_skates', image: 'https://images.unsplash.com/photo-1571677594976-153c59b7ee67?w=600&h=800&fit=crop&auto=format',
    setup: { deck: 'Santa Cruz 8.0"', trucks: 'Independent 139mm', wheels: 'Spitfire 52mm', shoes: 'Emerica Reynolds G6' },
    setupIds: ['sk-001', 'sk-002', 'sk-003', 'sh-002'],
  },
  {
    id: 'r-2', name: 'Léa Vidal', age: 19, city: 'Marseille', style: 'Park / Bowl',
    instagram: '@lea_ride', image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=600&h=800&fit=crop&auto=format',
    setup: { deck: 'Element 8.5"', trucks: 'Thunder 149mm', wheels: 'OJ 60mm', shoes: 'Vans Old Skool' },
    setupIds: ['sk-005', 'sk-002', 'sk-003', 'sh-001'],
  },
  {
    id: 'r-3', name: 'Sam Nkosi', age: 25, city: 'Marseille', style: 'Cruiser / Surfskate',
    instagram: '@sam_nkosi13', image: 'https://images.unsplash.com/photo-1503416829621-2a647b6c386a?w=600&h=800&fit=crop&auto=format',
    setup: { deck: 'Anti-Hero 8.25"', trucks: 'Independent 149mm', wheels: 'Ricta Clouds 56mm', shoes: 'DC Manteca 4' },
    setupIds: ['sk-004', 'sk-002', 'sk-003', 'sh-003'],
  },
];

// EVENTS
export const events: Event[] = [
  {
    id: 'ev-1', title: 'XOXO Street Session', date: '2024-09-14', time: '14:00',
    location: 'Place de la Joliette, Marseille', type: 'session',
    description: 'Session street ouverte à tous les niveaux. Venez rider les spots emblématiques du vieux port avec l\'équipe XOXO.',
    image: 'https://images.unsplash.com/photo-1571677594976-153c59b7ee67?w=800&h=400&fit=crop&auto=format',
    spots: 50, registeredCount: 34,
  },
  {
    id: 'ev-2', title: 'NIKE SB DUNK DROP', date: '2024-09-21', time: '10:00',
    location: 'XOXO Skate Shop, 197 Av. P. Mendès-France', type: 'drop',
    description: 'Drop exclusif Nike SB Dunk Low Pro coloris Marseille. Quantités limitées — 12 paires. Préinscription obligatoire.',
    image: 'https://images.unsplash.com/photo-1536443664265-46b42d043c2d?w=800&h=400&fit=crop&auto=format',
    spots: 12, registeredCount: 12,
  },
  {
    id: 'ev-3', title: 'Atelier Montage Skate', date: '2024-09-28', time: '11:00',
    location: 'XOXO Skate Shop, 197 Av. P. Mendès-France', type: 'workshop',
    description: 'Apprends à monter ton propre setup avec nos mécaniciens. Atelier de 2h pour débutants. Matériel fourni.',
    image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=800&h=400&fit=crop&auto=format',
    spots: 12, registeredCount: 7,
  },
  {
    id: 'ev-4', title: 'XOXO Bowl Contest', date: '2024-10-05', time: '13:00',
    location: 'Skatepark de la Plage, Marseille', type: 'contest',
    description: 'Compétition annuelle XOXO sur le bowl. Catégories amateur et pro. Prizes: matériel + cash.',
    image: 'https://images.unsplash.com/photo-1503416829621-2a647b6c386a?w=800&h=400&fit=crop&auto=format',
    spots: 40, registeredCount: 22,
  },
];

// JOURNAL
export const articles: Article[] = [
  {
    id: 'art-1', title: 'Comment choisir son premier skate ?', category: 'GUIDE', date: '2024-09-01',
    readTime: 5, image: 'https://images.unsplash.com/photo-1547198152-dde291a08c45?w=800&h=500&fit=crop&auto=format',
    excerpt: '8.0" ou 8.25" ? Street ou park ? On te guide dans le choix de ton premier setup pour démarrer du bon pied.',
    content: 'Quand on commence le skate, le choix du setup est crucial. La taille du deck dépend de ta morphologie : pour des chaussures en 42 ou moins, opte pour un 8.0". Pour du 43 et plus, le 8.25" sera plus stable...',
  },
  {
    id: 'art-2', title: 'Les meilleurs spots de Marseille', category: 'SPOTS', date: '2024-08-28',
    readTime: 4, image: 'https://images.unsplash.com/photo-1571677594976-153c59b7ee67?w=800&h=500&fit=crop&auto=format',
    excerpt: 'Tour des incontournables du street marseillais — du Vieux-Port à la Joliette en passant par Euroméditerranée.',
    content: 'Marseille est une ville faite pour rider. Le Vieux-Port offre des spots de street légendaires avec ses marches et ses bordures...',
  },
  {
    id: 'art-3', title: 'Skate vs Surfskate : les différences', category: 'CULTURE', date: '2024-08-15',
    readTime: 6, image: 'https://images.unsplash.com/photo-1503416829621-2a647b6c386a?w=800&h=500&fit=crop&auto=format',
    excerpt: 'Le surfskate explose dans le sud. Mais concrètement, c\'est quoi la différence avec un skate classique ?',
    content: 'Le surfskate se distingue par son système de trucks avant très pivotant, qui permet de reproduire les mouvements du surf sur asphalte...',
  },
  {
    id: 'art-4', title: 'Interview : Kenzo Alarcon, rider XOXO', category: 'INTERVIEW', date: '2024-08-05',
    readTime: 7, image: 'https://images.unsplash.com/photo-1571677594976-153c59b7ee67?w=800&h=500&fit=crop&auto=format',
    excerpt: '"Marseille c\'est le bitume le plus rugueux et les meilleurs spots de France. On s\'endurcit ici."',
    content: 'On a retrouvé Kenzo au spot de la Joliette pour cette interview. Le rider XOXO nous parle de son parcours...',
  },
];

// DROPS
export const drops: Drop[] = [
  {
    id: 'drop-1', name: 'Nike SB Dunk Low Pro — Marseille', brand: 'Nike SB',
    dropDate: new Date(Date.now() + 7 * 24 * 3600 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1536443664265-46b42d043c2d?w=600&h=600&fit=crop&auto=format',
    price: 139.90, description: 'Coloris exclusif Marseille 13. Bleu Klein et blanc cassé. 12 paires disponibles.', stock: 12, notifyCount: 284,
  },
  {
    id: 'drop-2', name: 'Hoodie XOXO Édition Hiver — Anthracite', brand: 'XOXO',
    dropDate: new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1536443664265-46b42d043c2d?w=600&h=600&fit=crop&auto=format',
    price: 79.00, description: 'Hoodie XOXO édition automne-hiver. Broderie 3D, intérieur sherpa. 50 pièces.', stock: 50, notifyCount: 127,
  },
  {
    id: 'drop-3', name: 'Deck Santa Cruz x XOXO Collab', brand: 'Santa Cruz x XOXO',
    dropDate: new Date(Date.now() + 21 * 24 * 3600 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1681198444108-3c2689ffdb3a?w=600&h=600&fit=crop&auto=format',
    price: 74.90, description: 'Collaboration exclusive Santa Cruz x XOXO. Graphic Marseille. 30 decks numérotés.', stock: 30, notifyCount: 96,
  },
];
