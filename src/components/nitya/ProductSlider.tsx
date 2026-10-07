'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Product, marketplaceLinks } from '@/lib/productShared';
import { WhatsAppConfig, defaultWhatsApp, fillTemplate, waLink } from '@/lib/whatsappShared';

export default function ProductSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [wa, setWa] = useState<WhatsAppConfig>(defaultWhatsApp);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((d) => {
        if (d.products) setProducts(d.products.filter((p: Product) => p.inSlider));
      })
      .catch(() => {});
    fetch('/api/whatsapp')
      .then((r) => r.json())
      .then((d) => {
        if (d.number) setWa({ ...defaultWhatsApp, ...d });
      })
      .catch(() => {});
  }, []);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = 320;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
    setTimeout(checkScroll, 400);
  };

  return (
    <section id="products" className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-[#f12840] text-center mb-10">
          અમારા પ્રોડક્ટ્સ
        </h2>

        {/* Slider container */}
        <div className="relative">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
          )}

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((p, i) => {
              const links = marketplaceLinks(p.nameEn);
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="snap-start shrink-0 w-[260px] sm:w-[280px]"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                    {/* Image */}
                    <div className="h-[200px] overflow-hidden relative bg-gradient-to-br from-green-50 to-emerald-100">
                      {p.img ? (
                        <img
                          src={p.img}
                          alt={p.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-green-700 px-4 text-center">{p.nameEn}</span>
                        </div>
                      )}
                      {/* Price Badge */}
                      {p.price && (
                        <div className="absolute top-3 right-3 bg-[#f12840] text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                          {p.price}
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-semibold text-gray-800 text-base mb-0.5">
                        {p.name}
                      </h3>
                      <p className="text-gray-400 text-xs mb-2">{p.nameEn}</p>
                      {p.desc && <p className="text-gray-500 text-sm mb-2">{p.desc}</p>}

                      {/* Price Info */}
                      {p.price && (
                        <div className="bg-gray-50 rounded-lg p-2.5 mb-3">
                          <div className="flex items-center justify-between text-xs">
                            <div className="text-center flex-1">
                              <div className="text-gray-400 mb-0.5">ભાવ</div>
                              <div className="font-bold text-[#f12840]">{p.price}</div>
                            </div>
                            <div className="w-px h-8 bg-gray-200" />
                            <div className="text-center flex-1">
                              <div className="text-gray-400 mb-0.5">2 ખરીદો</div>
                              <div className="font-bold text-[#d4af37]">{p.priceBuyTwo}</div>
                            </div>
                            <div className="w-px h-8 bg-gray-200" />
                            <div className="text-center flex-1">
                              <div className="text-gray-400 mb-0.5">હોલસેલ</div>
                              <div className="font-bold text-green-600">{p.wholesale}</div>
                            </div>
                          </div>
                          {p.weight && (
                            <div className="text-center text-xs text-gray-400 mt-1.5">વજન: {p.weight}</div>
                          )}
                        </div>
                      )}

                      {/* Marketplace Buttons */}
                      <div className="flex gap-2 mb-3">
                        <a
                          href={links.amazon}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1 bg-[#FF9900] hover:bg-[#e68a00] text-white text-xs font-semibold py-2 px-2 rounded-lg transition-colors duration-300"
                          title="Buy on Amazon"
                        >
                          <AmazonIcon />
                          Amazon
                        </a>
                        <a
                          href={links.flipkart}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1 bg-[#2874F0] hover:bg-[#1a5fd9] text-white text-xs font-semibold py-2 px-2 rounded-lg transition-colors duration-300"
                          title="Buy on Flipkart"
                        >
                          <FlipkartIcon />
                          Flipkart
                        </a>
                        <a
                          href={links.meesho}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 flex items-center justify-center gap-1 bg-[#570A57] hover:bg-[#440044] text-white text-xs font-semibold py-2 px-2 rounded-lg transition-colors duration-300"
                          title="Buy on Meesho"
                        >
                          <MeeshoIcon />
                          Meesho
                        </a>
                      </div>

                      {/* WhatsApp Order */}
                      <a
                        href={waLink(wa.number, fillTemplate(wa.orderTemplate, { product: p.name, price: p.price ?? '' }))}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          fetch('/api/orders', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ productName: p.name, source: 'whatsapp', price: p.price ? parseInt(p.price.replace(/\D/g, '')) : 0 }),
                          }).catch(() => {});
                        }}
                        className="mt-auto flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe57] text-white font-semibold py-2.5 rounded-xl transition-colors duration-300 text-sm"
                      >
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.273-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp ઓર્ડર
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-white shadow-lg rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Marketplace SVG Icons ─── */

function AmazonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
      <path d="M.045 18.02c.07-.116.17-.193.3-.234 1.52-.542 3.13-.873 4.77-1.003.36-.028.72-.042 1.07-.042 2.14 0 4.18.4 6.12 1.2.32.13.63.28.94.44.12.06.24.12.35.18.09.05.18.1.26.15.06.03.12.06.18.09.24.13.46.24.68.36l.04.02c.37.19.72.36 1.08.52 1.06.47 2.13.77 3.22.91.37.05.73.07 1.08.07.89 0 1.73-.15 2.53-.44.08-.03.16-.07.24-.11.07-.04.14-.07.2-.1.14-.06.25-.09.34-.09.2 0 .33.13.33.33 0 .1-.03.2-.1.3-.05.07-.11.14-.18.2-.03.03-.07.06-.1.09-1.17.98-2.56 1.54-4.15 1.7-.25.02-.51.04-.76.04-1.23 0-2.4-.28-3.51-.83-.48-.24-.94-.51-1.39-.82l-.18-.12c-.3-.2-.59-.41-.89-.61-1.31-.88-2.72-1.48-4.25-1.81-.53-.11-1.07-.19-1.61-.23-.3-.02-.6-.03-.9-.03-1.37 0-2.69.22-3.97.66-.12.04-.23.06-.33.06-.2 0-.33-.13-.33-.33 0-.09.03-.19.09-.3zm4.62-4.86c-.12 0-.24-.02-.36-.05V9.84c0-.36-.08-.62-.25-.78-.16-.16-.42-.24-.76-.24-.28 0-.54.04-.78.13-.24.08-.44.2-.6.35l-.13.12c-.06-.16-.14-.3-.24-.42-.1-.11-.23-.2-.38-.26l-.08-.03-.37.25v.47c0 .07.01.14.04.2.03.06.08.11.14.15.07.04.16.07.27.09v3.74c-.18.03-.32.08-.42.16-.1.08-.15.19-.15.32v.47h2.05v-.47c0-.13-.05-.24-.15-.32-.1-.08-.24-.13-.42-.16v-3.04c.1-.06.23-.11.38-.15.16-.04.33-.06.51-.06.22 0 .4.06.52.17.12.11.18.3.18.55v2.53c-.18.03-.32.08-.42.16-.1.08-.15.19-.15.32v.47h2.05v-.47c0-.13-.05-.24-.15-.32-.1-.08-.24-.13-.42-.16v-2.72c0-.58-.16-1.02-.48-1.31-.32-.29-.77-.44-1.35-.44-.36 0-.69.06-.99.17-.3.11-.55.27-.74.47l-.06.07zm6.5-.36c-.25-.24-.56-.42-.93-.55-.37-.12-.8-.19-1.29-.19-.49 0-.92.06-1.29.19-.37.12-.68.31-.93.55-.25.24-.44.54-.57.9-.13.36-.2.78-.2 1.26 0 .48.07.9.2 1.26.13.36.32.66.57.9.25.24.56.42.93.54.37.12.8.18 1.29.18.49 0 .92-.06 1.29-.18.37-.12.68-.3.93-.54.25-.24.44-.54.57-.9.13-.36.2-.78.2-1.26 0-.48-.07-.9-.2-1.26-.13-.36-.32-.66-.57-.9zm-2.22 3.75c-.33 0-.58-.13-.75-.39-.17-.26-.25-.68-.25-1.2 0-.53.08-.94.25-1.2.17-.26.42-.39.75-.39s.58.13.75.39c.17.26.25.68.25 1.2 0 .53-.08.94-.25 1.2-.17.26-.42.39-.75.39zm7.04-3.75c-.25-.24-.56-.42-.93-.55-.37-.12-.8-.19-1.29-.19-.49 0-.92.06-1.29.19-.37.12-.68.31-.93.55-.25.24-.44.54-.57.9-.13.36-.2.78-.2 1.26 0 .48.07.9.2 1.26.13.36.32.66.57.9.25.24.56.42.93.54.37.12.8.18 1.29.18.49 0 .92-.06 1.29-.18.37-.12.68-.3.93-.54.25-.24.44-.54.57-.9.13-.36.2-.78.2-1.26 0-.48-.07-.9-.2-1.26-.13-.36-.32-.66-.57-.9zm-2.22 3.75c-.33 0-.58-.13-.75-.39-.17-.26-.25-.68-.25-1.2 0-.53.08-.94.25-1.2.17-.26.42-.39.75-.39s.58.13.75.39c.17.26.25.68.25 1.2 0 .53-.08.94-.25 1.2-.17.26-.42.39-.75.39z" />
    </svg>
  );
}

function FlipkartIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
      <path d="M3 4h7l2 2.5h9c.55 0 1 .45 1 1V18c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1zm4.5 8.5l2.5 2.5 5-5L17 12V8h-4l2 2-5.5 5.5-2-2z" />
    </svg>
  );
}

function MeeshoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  );
}
