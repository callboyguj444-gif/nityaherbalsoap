'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Star, Truck, Shield } from 'lucide-react';

const marketplaces = [
  {
    name: 'Amazon',
    color: '#FF9900',
    hoverBg: '#FFF3E0',
    url: 'https://amazon.in/s?k=nitya+herbal',
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="#FF9900" d="M.045 18.02c.07-.116.17-.193.3-.234 1.52-.542 3.13-.873 4.77-1.003.36-.028.72-.042 1.07-.042 2.14 0 4.18.4 6.12 1.2.32.13.63.28.94.44.12.06.24.12.35.18.09.05.18.1.26.15.06.03.12.06.18.09.24.13.46.24.68.36l.04.02c.37.19.72.36 1.08.52 1.06.47 2.13.77 3.22.91.37.05.73.07 1.08.07.89 0 1.73-.15 2.53-.44.08-.03.16-.07.24-.11.07-.04.14-.07.2-.1.14-.06.25-.09.34-.09.2 0 .33.13.33.33 0 .1-.03.2-.1.3-.05.07-.11.14-.18.2-.03.03-.07.06-.1.09-1.17.98-2.56 1.54-4.15 1.7-.25.02-.51.04-.76.04-1.23 0-2.4-.28-3.51-.83-.48-.24-.94-.51-1.39-.82l-.18-.12c-.3-.2-.59-.41-.89-.61-1.31-.88-2.72-1.48-4.25-1.81-.53-.11-1.07-.19-1.61-.23-.3-.02-.6-.03-.9-.03-1.37 0-2.69.22-3.97.66-.12.04-.23.06-.33.06-.2 0-.33-.13-.33-.33 0-.09.03-.19.09-.3zm4.62-4.86c-.12 0-.24-.02-.36-.05V9.84c0-.36-.08-.62-.25-.78-.16-.16-.42-.24-.76-.24-.28 0-.54.04-.78.13-.24.08-.44.2-.6.35l-.13.12c-.06-.16-.14-.3-.24-.42-.1-.11-.23-.2-.38-.26l-.08-.03-.37.25v.47c0 .07.01.14.04.2.03.06.08.11.14.15.07.04.16.07.27.09v3.74c-.18.03-.32.08-.42.16-.1.08-.15.19-.15.32v.47h2.05v-.47c0-.13-.05-.24-.15-.32-.1-.08-.24-.13-.42-.16v-3.04c.1-.06.23-.11.38-.15.16-.04.33-.06.51-.06.22 0 .4.06.52.17.12.11.18.3.18.55v2.53c-.18.03-.32.08-.42.16-.1.08-.15.19-.15.32v.47h2.05v-.47c0-.13-.05-.24-.15-.32-.1-.08-.24-.13-.42-.16v-2.72c0-.58-.16-1.02-.48-1.31-.32-.29-.77-.44-1.35-.44-.36 0-.69.06-.99.17-.3.11-.55.27-.74.47l-.06.07zm6.5-.36c-.25-.24-.56-.42-.93-.55-.37-.12-.8-.19-1.29-.19-.49 0-.92.06-1.29.19-.37.12-.68.31-.93.55-.25.24-.44.54-.57.9-.13.36-.2.78-.2 1.26 0 .48.07.9.2 1.26.13.36.32.66.57.9.25.24.56.42.93.54.37.12.8.18 1.29.18.49 0 .92-.06 1.29-.18.37-.12.68-.3.93-.54.25-.24.44-.54.57-.9.13-.36.2-.78.2-1.26 0-.48-.07-.9-.2-1.26-.13-.36-.32-.66-.57-.9zm-2.22 3.75c-.33 0-.58-.13-.75-.39-.17-.26-.25-.68-.25-1.2 0-.53.08-.94.25-1.2.17-.26.42-.39.75-.39s.58.13.75.39c.17.26.25.68.25 1.2 0 .53-.08.94-.25 1.2-.17.26-.42.39-.75.39zm7.04-3.75c-.25-.24-.56-.42-.93-.55-.37-.12-.8-.19-1.29-.19-.49 0-.92.06-1.29.19-.37.12-.68.31-.93.55-.25.24-.44.54-.57.9-.13.36-.2.78-.2 1.26 0 .48.07.9.2 1.26.13.36.32.66.57.9.25.24.56.42.93.54.37.12.8.18 1.29.18.49 0 .92-.06 1.29-.18.37-.12.68-.3.93-.54.25-.24.44-.54.57-.9.13-.36.2-.78.2-1.26 0-.48-.07-.9-.2-1.26-.13-.36-.32-.66-.57-.9zm-2.22 3.75c-.33 0-.58-.13-.75-.39-.17-.26-.25-.68-.25-1.2 0-.53.08-.94.25-1.2.17-.26.42-.39.75-.39s.58.13.75.39c.17.26.25.68.25 1.2 0 .53-.08.94-.25 1.2-.17.26-.42.39-.75.39z" />
      </svg>
    ),
    tagline: 'Fast Delivery · Prime Available',
  },
  {
    name: 'Flipkart',
    color: '#2874F0',
    hoverBg: '#E3F2FD',
    url: 'https://flipkart.com/search?q=nitya+herbal',
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="#2874F0" d="M3 4h7l2 2.5h9c.55 0 1 .45 1 1V18c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1zm4.5 8.5l2.5 2.5 5-5L17 12V8h-4l2 2-5.5 5.5-2-2z" />
      </svg>
    ),
    tagline: 'Best Deals · Free Shipping',
  },
  {
    name: 'Meesho',
    color: '#570A57',
    hoverBg: '#F3E5F5',
    url: 'https://meesho.com/search?q=nitya+herbal',
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path fill="#570A57" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
    tagline: 'Lowest Price · COD Available',
  },
];

const benefits = [
  { icon: <Truck className="w-6 h-6 text-[#f12840]" />, text: 'Free Delivery' },
  { icon: <Shield className="w-6 h-6 text-[#f12840]" />, text: '100% Genuine' },
  { icon: <Star className="w-6 h-6 text-[#f12840]" />, text: 'Top Rated' },
  { icon: <ShoppingBag className="w-6 h-6 text-[#f12840]" />, text: 'Easy Returns' },
];

export default function AvailableOn() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-[#f9f9f9]">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#f12840] mb-3">
          Now Available On
        </h2>
        <p className="text-gray-500 mb-10 text-base">
          અમારા પ્રોડક્ટ્સ હવે તમારા મનપસંદ પ્લેટફોર્મ પર ઉપલબ્ધ છે!
        </p>

        {/* Marketplace Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          {marketplaces.map((mp, i) => (
            <motion.a
              key={mp.name}
              href={mp.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-md hover:shadow-xl border border-gray-100 transition-all duration-300 group cursor-pointer"
              style={{ ['--hover-bg' as string]: mp.hoverBg }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = mp.hoverBg;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = '#fff';
              }}
            >
              <div className="transform group-hover:scale-110 transition-transform duration-300">
                {mp.icon}
              </div>
              <h3
                className="text-xl font-bold transition-colors duration-300"
                style={{ color: mp.color }}
              >
                {mp.name}
              </h3>
              <p className="text-gray-500 text-sm">{mp.tagline}</p>
              <span
                className="mt-2 inline-block text-white text-xs font-semibold px-5 py-1.5 rounded-full transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundColor: mp.color }}
              >
                Shop Now
              </span>
            </motion.a>
          ))}
        </div>

        {/* Benefits Bar */}
        <div className="flex flex-wrap justify-center gap-8">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-2 text-gray-600">
              {b.icon}
              <span className="font-semibold text-sm">{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
