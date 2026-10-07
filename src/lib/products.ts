// Products store — Firebase Realtime DB (REST) with in-memory fallback

export interface Product {
  id: string;
  name: string; // Gujarati
  nameEn: string;
  desc?: string;
  img?: string;
  weight?: string;
  price?: string;
  priceBuyTwo?: string;
  wholesale?: string;
  inSlider: boolean;
  inPriceList: boolean;
}

export const defaultProducts: Product[] = [
  { id: 'p-rice-water-mist', name: 'Rice Water Face Mist', nameEn: 'Rice Water Face Mist', desc: 'Oil Control, Skin Brightening & Barrier Repair', img: '/images/product-g.png', inSlider: true, inPriceList: false },
  { id: 'p-kesuda', name: 'કેસુડા હેન્ડમેડ સોપ', nameEn: 'Kesuda Soap', desc: 'સ્કિન માટે શ્રેષ્ઠ', img: '/images/kesuda-soap.png', weight: '100g', price: '₹ 40', priceBuyTwo: '₹ 35', wholesale: '₹ 30', inSlider: true, inPriceList: true },
  { id: 'p-aloe-vera', name: 'એલોવેરા સોપ', nameEn: 'Aloe Vera Soap', desc: 'સ્કિનને મોઈશ્ચરાઇઝ કરે', img: '/images/aloevera-soap.png', weight: '100g', price: '₹ 40', priceBuyTwo: '₹ 35', wholesale: '₹ 30', inSlider: true, inPriceList: true },
  { id: 'p-haldi-chandan', name: 'હળદર ચંદન સોપ', nameEn: 'Haldi Chandan Soap', desc: 'સ્કિન બ્રાઈટનિંગ માટે', img: '/images/haldi-chandan-soap.png', weight: '100g', price: '₹ 40', priceBuyTwo: '₹ 35', wholesale: '₹ 30', inSlider: true, inPriceList: true },
  { id: 'p-rice-potato', name: 'રાઈસ પોટેટો સોપ', nameEn: 'Rice Potato Soap', desc: 'સ્કિન ક્લીન અને સોફ્ટ', img: '/images/rice-potato-soap.png', weight: '100g', price: '₹ 40', priceBuyTwo: '₹ 35', wholesale: '₹ 30', inSlider: true, inPriceList: true },
  { id: 'p-day-night-cream', name: 'ડે & નાઈટ ક્રીમ', nameEn: 'Day & Night Cream', desc: 'નેચરલ ક્રીમ', img: '/images/cream.png', inSlider: true, inPriceList: false },
  { id: 'p-face-wash', name: 'નેચરલ હર્બલ ફેસ વોશ', nameEn: 'Natural Herbal Face Wash', desc: 'કોમળ સફાઈ અને કુદરતી નિખાર', img: '/images/face-wash.png', inSlider: true, inPriceList: false },
  { id: 'p-shikakai', name: 'શિકાકાઈ હેર કેર', nameEn: 'Shikakai Hair Care', desc: 'વાળ માટે કુદરતી દેખભાળ', img: '/images/product-k.png', inSlider: true, inPriceList: false },
  { id: 'p-neem', name: 'નીમ સોપ', nameEn: 'Neem Soap', weight: '100g', price: '₹ 40', priceBuyTwo: '₹ 35', wholesale: '₹ 30', inSlider: false, inPriceList: true },
  { id: 'p-charcoal', name: 'ચારકોલ સોપ', nameEn: 'Charcoal Soap', weight: '100g', price: '₹ 40', priceBuyTwo: '₹ 35', wholesale: '₹ 30', inSlider: false, inPriceList: true },
  { id: 'p-kesar', name: 'કેસર સોપ', nameEn: 'Kesar Soap', weight: '100g', price: '₹ 100', priceBuyTwo: '₹ 80', wholesale: '₹ 60', inSlider: false, inPriceList: true },
  { id: 'p-coffee', name: 'કોફી સોપ', nameEn: 'Coffee Soap', weight: '100g', price: '₹ 40', priceBuyTwo: '₹ 35', wholesale: '₹ 30', inSlider: false, inPriceList: true },
  { id: 'p-beet', name: 'બીટ સોપ', nameEn: 'Beet Soap', weight: '100g', price: '₹ 40', priceBuyTwo: '₹ 35', wholesale: '₹ 30', inSlider: false, inPriceList: true },
  { id: 'p-multani', name: 'મુલ્તાની માટી સોપ', nameEn: 'Multani Mati Soap', weight: '100g', price: '₹ 40', priceBuyTwo: '₹ 35', wholesale: '₹ 30', inSlider: false, inPriceList: true },
  { id: 'p-ubtan', name: 'ઉબટન', nameEn: 'Ubtan', weight: '100g', price: '₹ 50', priceBuyTwo: '₹ 35', wholesale: '₹ 40', inSlider: false, inPriceList: true },
];

// In-memory fallback when Firebase is not configured
let memoryProducts: Product[] | null = null;

const FIREBASE_URL = process.env.NEXT_PUBLIC_FIREBASE_URL || '';

export async function getProducts(): Promise<Product[]> {
  if (memoryProducts) return memoryProducts;
  if (FIREBASE_URL) {
    try {
      const res = await fetch(`${FIREBASE_URL}/products.json`, { next: { revalidate: 0 } });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          const list = Object.values(data) as Product[];
          if (list.length > 0) {
            memoryProducts = list;
            return list;
          }
        }
      }
    } catch {
      // fall through to defaults
    }
  }
  return defaultProducts;
}

export async function saveProducts(products: Product[]): Promise<Product[]> {
  memoryProducts = products;
  if (FIREBASE_URL) {
    try {
      // Firebase RTDB: store as object keyed by id
      const obj: Record<string, Product> = {};
      products.forEach((p) => (obj[p.id] = p));
      await fetch(`${FIREBASE_URL}/products.json`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
      });
    } catch (error) {
      console.error('Firebase PUT products failed:', error);
    }
  }
  return products;
}

export function marketplaceLinks(nameEn: string) {
  const q = encodeURIComponent(`nitya herbal ${nameEn.toLowerCase()}`).replace(/%20/g, '+');
  return {
    amazon: `https://amazon.in/s?k=${q}`,
    flipkart: `https://flipkart.com/search?q=${q}`,
    meesho: `https://meesho.com/search?q=${q}`,
  };
}
