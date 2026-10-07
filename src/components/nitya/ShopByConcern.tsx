'use client';

import { useState } from 'react';

interface Concern {
  id: string;
  label: string;
  labelGu: string;
  image: string;
  description: string;
}

const concerns: Concern[] = [
  {
    id: 'dry-skin',
    label: 'Dry Skin',
    labelGu: 'સૂકી ત્વચા',
    image: '/images/concerns/dry-skin.jpg',
    description: 'Moisturizing herbal soaps & creams for dry, flaky skin',
  },
  {
    id: 'oily-skin',
    label: 'Oily Skin',
    labelGu: 'તૈલી ત્વચા',
    image: '/images/concerns/oily-skin.jpg',
    description: 'Balancing neem & haldi soaps to control excess oil',
  },
  {
    id: 'pigmentation',
    label: 'Pigmentation',
    labelGu: 'દાગ-ધબ્બા',
    image: '/images/concerns/pigmentation.webp',
    description: 'Kesuda & rice water range to lighten dark spots',
  },
  {
    id: 'tanning',
    label: 'Tanning',
    labelGu: 'ટેનિંગ',
    image: '/images/concerns/tanning.png',
    description: 'De-tan face wash & ubtans for sun-damaged skin',
  },
  {
    id: 'acne',
    label: 'Acne',
    labelGu: 'મુહાસે',
    image: '/images/concerns/acne.jpg',
    description: 'Anti-acne aloevera & haldi-chandan soaps',
  },
  {
    id: 'hair',
    label: 'Hair Care',
    labelGu: 'વાળ સંભાળ',
    image: '/images/concerns/hair.jpg',
    description: 'Herbal hair oils & powders for healthy scalp',
  },
  {
    id: 'lips',
    label: 'Lips',
    labelGu: 'હોઠ',
    image: '/images/concerns/lips.jpg',
    description: 'Natural lip balms & butters for soft pink lips',
  },
  {
    id: 'sensitive-skin',
    label: 'Sensitive Skin',
    labelGu: 'સંવેદનશીલ ત્વચા',
    image: '/images/concerns/sensitive-skin.png',
    description: 'Gentle Ayurvedic formulations for reactive skin',
  },
];

export default function ShopByConcern() {
  const [activeConcern, setActiveConcern] = useState<Concern | null>(null);

  const handleWhatsApp = (concern: Concern) => {
    const message = `Hi Nitya Herbal! I'm looking for products for ${concern.label} (${concern.labelGu}). Please suggest the best herbal options.`;
    const phone = '916355789050';
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section id="shop-by-concern" className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] text-[#f12840] uppercase mb-3">
            Ayurvedic Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Shop by Concern
          </h2>
          <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
            Express your style with our standout collection — pure Ayurveda meets modern skincare.
          </p>
        </div>

        {/* Concern Cards - Horizontal Scroll on Mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 sm:gap-8">
          {concerns.map((concern) => (
            <button
              key={concern.id}
              onClick={() => setActiveConcern(concern)}
              className="group flex flex-col items-center text-center cursor-pointer"
            >
              {/* Circular Image with Border */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mb-3 sm:mb-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f12840] to-[#ff6b35] p-[3px] transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#f12840]/30">
                  <div className="w-full h-full rounded-full overflow-hidden bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={concern.image}
                      alt={concern.label}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
              {/* Label */}
              <span className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-[#f12840] transition-colors duration-300">
                {concern.label}
              </span>
              <span className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                {concern.labelGu}
              </span>
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
            Can&apos;t find your concern? We craft custom Ayurvedic solutions too.
          </p>
          <a
            href="https://wa.me/916355789050?text=Hi%20Nitya%20Herbal!%20I%20need%20a%20custom%20Ayurvedic%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#f12840] hover:bg-[#d61f33] text-white font-semibold rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Get Free Consultation
          </a>
        </div>
      </div>

      {/* Modal Popup */}
      {activeConcern && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setActiveConcern(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-[fadeIn_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Header */}
            <div className="relative h-48 sm:h-56 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeConcern.image}
                alt={activeConcern.label}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <button
                onClick={() => setActiveConcern(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-700"
                aria-label="Close"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
              <div className="absolute bottom-4 left-5 text-white">
                <h3 className="text-2xl font-bold">{activeConcern.label}</h3>
                <p className="text-sm text-white/80">{activeConcern.labelGu}</p>
              </div>
            </div>
            {/* Content */}
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                {activeConcern.description}. Our Ayurvedic experts will help you choose the right
                herbal products tailored to your skin type.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleWhatsApp(activeConcern)}
                  className="flex-1 px-4 py-3 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.142 1.595 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.582 0 11.94-5.359 11.944-11.893a11.821 11.821 0 00-3.495-8.453"/>
                  </svg>
                  WhatsApp Us
                </button>
                <button
                  onClick={() => setActiveConcern(null)}
                  className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
