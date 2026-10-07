'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Instagram,
  Facebook,
  MapPin,
  Phone,
  Mail,
  ShoppingBag,
  Clock,
  CheckCircle,
  Trash2,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  ArrowLeft,
  Package,
  Users,
  TrendingUp,
  LogOut,
  ChevronDown,
  ChevronUp,
  Plus,
  MessageCircle,
  Image as ImageIcon,
  Send,
} from 'lucide-react';
import { Product, defaultProducts } from '@/lib/productShared';
import { WhatsAppConfig, defaultWhatsApp, fillTemplate, waLink } from '@/lib/whatsappShared';

/* ─── Types ─── */
interface Settings {
  id: string;
  instagram: string;
  facebook: string;
  address: string;
  phone: string;
  email: string;
}

interface Order {
  id: string;
  productName: string;
  customerName: string;
  customerPhone: string;
  quantity: number;
  price: number;
  status: string;
  source: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderStats {
  total: number;
  pending: number;
  completed: number;
}

const ADMIN_PASSWORD = 'nitya2026';

const BUNDLED_IMAGES = [
  '/images/aloevera-soap.png',
  '/images/kesuda-soap.png',
  '/images/haldi-chandan-soap.png',
  '/images/rice-potato-soap.png',
  '/images/cream.png',
  '/images/face-wash.png',
  '/images/product-k.png',
  '/images/product-g.png',
];

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'products' | 'orders' | 'whatsapp'>('settings');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  /* Settings state */
  const [settings, setSettings] = useState<Settings>({
    id: 'main',
    instagram: '',
    facebook: '',
    address: '',
    phone: '',
    email: '',
  });

  /* Orders state */
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderStats, setOrderStats] = useState<OrderStats>({ total: 0, pending: 0, completed: 0 });
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  /* Products state */
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);

  /* WhatsApp state */
  const [waConfig, setWaConfig] = useState<WhatsAppConfig>(defaultWhatsApp);

  /* Toast helper */
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  /* Fetch settings */
  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.id) setSettings(data);
    } catch (err) {
      console.error('Fetch settings error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* Fetch orders */
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.orders) setOrders(data.orders);
      if (data.stats) setOrderStats(data.stats);
    } catch (err) {
      console.error('Fetch orders error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* Save settings */
  const saveSettings = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        showToast('✅ Settings saved successfully!');
      }
    } catch (err) {
      console.error('Save settings error:', err);
      showToast('❌ Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  /* Update order status */
  const updateOrderStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        showToast('✅ Order status updated!');
        fetchOrders();
      }
    } catch (err) {
      console.error('Update order error:', err);
    }
  };

  /* Delete order */
  const deleteOrder = async (id: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    try {
      const res = await fetch(`/api/orders?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('✅ Order deleted!');
        fetchOrders();
      }
    } catch (err) {
      console.error('Delete order error:', err);
    }
  };

  /* Fetch products */
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.products && Array.isArray(data.products) && data.products.length > 0) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Fetch products error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /* Fetch whatsapp config */
  const fetchWhatsApp = useCallback(async () => {
    try {
      const res = await fetch('/api/whatsapp');
      const data = await res.json();
      if (data.number) setWaConfig({ ...defaultWhatsApp, ...data });
    } catch (err) {
      console.error('Fetch whatsapp error:', err);
    }
  }, []);

  /* Save all products */
  const saveProducts = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products }),
      });
      if (res.ok) showToast('✅ Products saved successfully!');
      else showToast('❌ Failed to save products');
    } catch (err) {
      console.error('Save products error:', err);
      showToast('❌ Failed to save products');
    } finally {
      setSaving(false);
    }
  };

  /* Update a single product field */
  const updateProduct = (id: string, patch: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  };

  /* Add a new product */
  const addProduct = () => {
    const id = 'p-' + Date.now();
    setProducts((prev) => [
      ...prev,
      { id, name: 'નવું પ્રોડક્ટ', nameEn: 'New Product', inSlider: true, inPriceList: true },
    ]);
    setExpandedProduct(id);
  };

  /* Delete a product */
  const removeProduct = (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  /* Save whatsapp config */
  const saveWhatsApp = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(waConfig),
      });
      if (res.ok) showToast('✅ WhatsApp settings saved!');
      else showToast('❌ Failed to save WhatsApp settings');
    } catch (err) {
      console.error('Save whatsapp error:', err);
      showToast('❌ Failed to save WhatsApp settings');
    } finally {
      setSaving(false);
    }
  };

  /* Login */
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
    } else {
      showToast('❌ Wrong password!');
    }
  };

  /* Load data on auth */
  useEffect(() => {
    if (authenticated) {
      fetchSettings();
      fetchOrders();
      fetchProducts();
      fetchWhatsApp();
    }
  }, [authenticated, fetchSettings, fetchOrders, fetchProducts, fetchWhatsApp]);

  /* ─── Login Screen ─── */
  if (!authenticated) {
    return (
      <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-[#f12840] to-[#d92035] flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#f12840]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-[#f12840]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
            <p className="text-gray-500 text-sm mt-1">Nitya Herbal</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#f12840]/50 focus:border-[#f12840]"
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-[#f12840] hover:bg-[#d92035] text-white font-semibold py-3 rounded-xl transition-colors"
            >
              Login
            </button>
            <button
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
        {toast && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-xl px-6 py-3 text-sm font-medium z-[10000]">
            {toast}
          </div>
        )}
      </div>
    );
  }

  /* ─── Admin Dashboard ─── */
  return (
    <div className="fixed inset-0 z-[9999] bg-gray-50 overflow-y-auto">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft size={18} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Admin Panel</h1>
              <p className="text-xs text-gray-400">Nitya Herbal</p>
            </div>
          </div>
          <button
            onClick={() => setAuthenticated(false)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#f12840] transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Tab Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-3 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'settings'
                ? 'bg-[#f12840] text-white shadow-lg shadow-[#f12840]/30'
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            ⚙️ Settings
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'products'
                ? 'bg-[#f12840] text-white shadow-lg shadow-[#f12840]/30'
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            ️ Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-3 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'orders'
                ? 'bg-[#f12840] text-white shadow-lg shadow-[#f12840]/30'
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            📦 Orders ({orderStats.total})
          </button>
          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`py-3 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'whatsapp'
                ? 'bg-[#f12840] text-white shadow-lg shadow-[#f12840]/30'
                : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
          >
            💬 WhatsApp
          </button>
        </div>

        {/* ─── Settings Tab ─── */}
        {activeTab === 'settings' && (
          <div className="space-y-4">
            {/* Instagram */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Instagram size={16} className="text-[#E1306C]" />
                Instagram Link
              </label>
              <input
                type="url"
                value={settings.instagram}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                placeholder="https://www.instagram.com/..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f12840]/30 focus:border-[#f12840]"
              />
            </div>

            {/* Facebook */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Facebook size={16} className="text-[#1877F2]" />
                Facebook Link
              </label>
              <input
                type="url"
                value={settings.facebook}
                onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                placeholder="https://www.facebook.com/..."
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f12840]/30 focus:border-[#f12840]"
              />
            </div>

            {/* Address */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin size={16} className="text-[#f12840]" />
                Address
              </label>
              <textarea
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="Enter your business address"
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f12840]/30 focus:border-[#f12840] resize-none"
              />
            </div>

            {/* Phone */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Phone size={16} className="text-green-600" />
                Mobile Number
              </label>
              <input
                type="tel"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+91 6355789050"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f12840]/30 focus:border-[#f12840]"
              />
            </div>

            {/* Email */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Mail size={16} className="text-amber-500" />
                Email
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="nityaherbalsoap@gmail.com"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f12840]/30 focus:border-[#f12840]"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={saveSettings}
              disabled={saving}
              className="w-full bg-[#f12840] hover:bg-[#d92035] disabled:bg-gray-300 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#f12840]/20"
            >
              {saving ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        )}

        {/* ─── Products Tab ─── */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <button
              onClick={addProduct}
              className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              <Plus size={18} />
              Add Product
            </button>

            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Row header */}
                <div
                  className="p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => setExpandedProduct(expandedProduct === p.id ? null : p.id)}
                >
                  {p.img ? (
                    <img src={p.img} alt={p.nameEn} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                      <ImageIcon size={18} className="text-green-600" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-800 text-sm truncate">{p.name}</div>
                    <div className="text-xs text-gray-400 truncate">
                      {p.nameEn}
                      {p.price ? ` · ${p.price}` : ''}
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${p.inSlider ? 'bg-[#f12840]/10 text-[#f12840]' : 'bg-gray-100 text-gray-400'}`}>
                      Slider
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${p.inPriceList ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                      Price
                    </span>
                  </div>
                  {expandedProduct === p.id ? (
                    <ChevronUp size={16} className="text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400 shrink-0" />
                  )}
                </div>

                {/* Expanded editor */}
                {expandedProduct === p.id && (
                  <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(
                        [
                          ['name', 'Name (Gujarati)'],
                          ['nameEn', 'Name (English)'],
                          ['desc', 'Description'],
                          ['weight', 'Weight'],
                          ['price', 'Price'],
                          ['priceBuyTwo', 'Buy-2 Price'],
                          ['wholesale', 'Wholesale'],
                        ] as [keyof Product, string][]
                      ).map(([key, label]) => (
                        <div key={key}>
                          <label className="text-xs font-semibold text-gray-600 mb-1 block">{label}</label>
                          <input
                            value={(p[key] as string) ?? ''}
                            onChange={(e) => updateProduct(p.id, { [key]: e.target.value } as Partial<Product>)}
                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f12840]/30 focus:border-[#f12840]"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Image */}
                    <div>
                      <label className="flex items-center gap-1 text-xs font-semibold text-gray-600 mb-1">
                        <ImageIcon size={14} className="text-[#f12840]" />
                        Image URL
                      </label>
                      <input
                        value={p.img ?? ''}
                        onChange={(e) => updateProduct(p.id, { img: e.target.value })}
                        placeholder="/images/... or https://..."
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#f12840]/30 focus:border-[#f12840]"
                      />
                      <select
                        value={BUNDLED_IMAGES.includes(p.img ?? '') ? p.img : ''}
                        onChange={(e) => updateProduct(p.id, { img: e.target.value })}
                        className="w-full mt-2 border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#f12840]/30"
                      >
                        <option value="">— pick a bundled image —</option>
                        {BUNDLED_IMAGES.map((src) => (
                          <option key={src} value={src}>
                            {src.replace('/images/', '')}
                          </option>
                        ))}
                      </select>
                      {p.img && (
                        <img src={p.img} alt="preview" className="mt-2 h-20 rounded-lg object-cover border border-gray-100" />
                      )}
                    </div>

                    {/* Visibility toggles */}
                    <div className="flex gap-5">
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={p.inSlider}
                          onChange={(e) => updateProduct(p.id, { inSlider: e.target.checked })}
                          className="w-4 h-4 accent-[#f12840]"
                        />
                        Show in Slider
                      </label>
                      <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={p.inPriceList}
                          onChange={(e) => updateProduct(p.id, { inPriceList: e.target.checked })}
                          className="w-4 h-4 accent-green-600"
                        />
                        Show in Price List
                      </label>
                    </div>

                    <button
                      onClick={() => removeProduct(p.id)}
                      className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      <Trash2 size={14} />
                      Delete Product
                    </button>
                  </div>
                )}
              </div>
            ))}

            <button
              onClick={saveProducts}
              disabled={saving}
              className="w-full bg-[#f12840] hover:bg-[#d92035] disabled:bg-gray-300 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#f12840]/20"
            >
              {saving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? 'Saving...' : 'Save Products'}
            </button>
          </div>
        )}

        {/* ─── WhatsApp Tab ─── */}
        {activeTab === 'whatsapp' && (
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Phone size={16} className="text-green-600" />
                WhatsApp Business Number
              </label>
              <input
                type="tel"
                value={waConfig.number}
                onChange={(e) => setWaConfig({ ...waConfig, number: e.target.value })}
                placeholder="916355789050"
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f12840]/30 focus:border-[#f12840]"
              />
              <p className="text-xs text-gray-400 mt-1.5">Country code ke saath, sirf digits (e.g. 916355789050)</p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MessageCircle size={16} className="text-[#25D366]" />
                Greeting Message (floating button)
              </label>
              <textarea
                value={waConfig.greeting}
                onChange={(e) => setWaConfig({ ...waConfig, greeting: e.target.value })}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f12840]/30 focus:border-[#f12840] resize-none"
              />
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Send size={16} className="text-[#25D366]" />
                Order Message Template
              </label>
              <textarea
                value={waConfig.orderTemplate}
                onChange={(e) => setWaConfig({ ...waConfig, orderTemplate: e.target.value })}
                rows={2}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f12840]/30 focus:border-[#f12840] resize-none"
              />
              <p className="text-xs text-gray-400 mt-1.5">
                Placeholders: <code className="bg-gray-100 px-1 rounded">{'{product}'}</code>{' '}
                <code className="bg-gray-100 px-1 rounded">{'{price}'}</code> — auto-fill hote hain
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MessageCircle size={16} className="text-[#25D366]" />
                Auto-Reply Template (quick reply to customer)
              </label>
              <textarea
                value={waConfig.autoReply}
                onChange={(e) => setWaConfig({ ...waConfig, autoReply: e.target.value })}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#f12840]/30 focus:border-[#f12840] resize-none"
              />
            </div>

            {/* Test links */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-100 space-y-2">
              <p className="text-xs font-semibold text-green-700 mb-1">Test / Preview</p>
              <a
                href={waLink(waConfig.number, fillTemplate(waConfig.orderTemplate, { product: 'એલોવેરા સોપ', price: '₹ 40' }))}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-green-700 underline"
              >
                ▶ Test order message (Aloe Vera Soap)
              </a>
              <a
                href={waLink(waConfig.number, waConfig.greeting)}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-green-700 underline"
              >
                ▶ Test greeting message
              </a>
            </div>

            <button
              onClick={saveWhatsApp}
              disabled={saving}
              className="w-full bg-[#25D366] hover:bg-[#1ebe57] disabled:bg-gray-300 text-white font-semibold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/20"
            >
              {saving ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
              {saving ? 'Saving...' : 'Save WhatsApp Settings'}
            </button>
          </div>
        )}

        {/* ─── Orders Tab ─── */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="w-10 h-10 bg-[#f12840]/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Package size={18} className="text-[#f12840]" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{orderStats.total}</div>
                <div className="text-xs text-gray-400 font-medium">Total Orders</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock size={18} className="text-amber-500" />
                </div>
                <div className="text-2xl font-bold text-amber-600">{orderStats.pending}</div>
                <div className="text-xs text-gray-400 font-medium">Pending</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <CheckCircle size={18} className="text-green-500" />
                </div>
                <div className="text-2xl font-bold text-green-600">{orderStats.completed}</div>
                <div className="text-xs text-gray-400 font-medium">Completed</div>
              </div>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchOrders}
              className="w-full bg-white hover:bg-gray-50 text-gray-600 font-semibold py-2.5 rounded-xl border border-gray-200 transition-colors flex items-center justify-center gap-2 text-sm"
            >
              <RefreshCw size={16} />
              Refresh Orders
            </button>

            {/* Orders List */}
            {orders.length === 0 ? (
              <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100 text-center">
                <ShoppingBag size={48} className="text-gray-200 mx-auto mb-3" />
                <p className="text-gray-400 font-medium">No orders yet</p>
                <p className="text-gray-300 text-sm mt-1">Orders will appear here when customers place them</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Order Header */}
                    <div
                      className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-gray-800 text-sm truncate">{order.productName}</h3>
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                              order.status === 'pending'
                                ? 'bg-amber-100 text-amber-700'
                                : order.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {order.status === 'pending' ? 'Pending' : order.status === 'completed' ? 'Done' : order.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {order.quantity > 1 && (
                          <span className="text-xs bg-[#f12840]/10 text-[#f12840] font-bold px-2 py-1 rounded-lg">
                            x{order.quantity}
                          </span>
                        )}
                        {expandedOrder === order.id ? (
                          <ChevronUp size={16} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={16} className="text-gray-400" />
                        )}
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedOrder === order.id && (
                      <div className="px-4 pb-4 border-t border-gray-50 pt-3 space-y-2">
                        {order.customerName && (
                          <div className="flex items-center gap-2 text-sm">
                            <Users size={14} className="text-gray-400 shrink-0" />
                            <span className="text-gray-600">{order.customerName}</span>
                          </div>
                        )}
                        {order.customerPhone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone size={14} className="text-gray-400 shrink-0" />
                            <span className="text-gray-600">{order.customerPhone}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm">
                          <TrendingUp size={14} className="text-gray-400 shrink-0" />
                          <span className="text-gray-600">Source: {order.source}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 pt-2">
                          {order.status === 'pending' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="flex-1 flex items-center justify-center gap-1 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                            >
                              <CheckCircle size={14} />
                              Mark Done
                            </button>
                          )}
                          {order.status === 'completed' && (
                            <button
                              onClick={() => updateOrderStatus(order.id, 'pending')}
                              className="flex-1 flex items-center justify-center gap-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors"
                            >
                              <Clock size={14} />
                              Mark Pending
                            </button>
                          )}
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="flex items-center justify-center gap-1 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold py-2 px-4 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white shadow-2xl rounded-xl px-6 py-3 text-sm font-medium z-[10001]">
          {toast}
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[10002]">
          <div className="bg-white rounded-2xl p-6 flex items-center gap-3 shadow-xl">
            <RefreshCw size={20} className="animate-spin text-[#f12840]" />
            <span className="text-sm font-medium text-gray-700">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}
