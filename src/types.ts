export type Category = 'all' | 'skate' | 'surf' | 'shoes' | 'clothing' | 'rock' | 'accessories';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  stock: number;
  tags: string[];
  sizes?: string[];
  isNew?: boolean;
  isDrop?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  date: string;
  customer: string;
  email: string;
  city: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  status: OrderStatus;
  deliveryMode?: 'ship' | 'collect';
}

export interface Objective {
  id: string;
  label: string;
  current: number;
  target: number;
  unit: string;
  period: string;
  color: string;
}

export interface Rider {
  id: string;
  name: string;
  age: number;
  city: string;
  style: string;
  instagram: string;
  image: string;
  setup: { deck: string; trucks: string; wheels: string; shoes: string };
  setupIds: string[];
}

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  spots: number;
  registeredCount: number;
  type: 'contest' | 'session' | 'drop' | 'workshop';
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: number;
  image: string;
  excerpt: string;
  content: string;
}

export interface Drop {
  id: string;
  name: string;
  brand: string;
  dropDate: string; // ISO date string
  image: string;
  price: number;
  description: string;
  stock: number;
  notifyCount: number;
}

export interface SetupPart {
  id: string;
  type: 'deck' | 'trucks' | 'wheels' | 'bearings' | 'grip' | 'hardware';
  name: string;
  brand: string;
  price: number;
  image: string;
  size?: string;
}

export interface ClubLevel {
  name: string;
  points: number;
  color: string;
  perks: string[];
}

export type View =
  | 'home' | 'shop' | 'product' | 'cart' | 'checkout' | 'success'
  | 'admin' | 'build-setup' | 'assistant' | 'drops' | 'team'
  | 'events' | 'journal' | 'article' | 'services' | 'wishlist' | 'club';
