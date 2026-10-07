'use client';

import { useEffect, useState } from 'react';
import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

interface SiteSettings {
  instagram: string;
  facebook: string;
  address: string;
  phone: string;
  email: string;
}

const defaultSettings: SiteSettings = {
  instagram: 'https://www.instagram.com/nityaharbalsoapgmail.com3?igsh=MWE1YXozZjd2b2oyOA==',
  facebook: 'https://facebook.com/your_profile',
  address: 'Liliya Mota, Dist. Amreli.',
  phone: '+91 6355789050',
  email: 'nityaherbalsoap@gmail.com',
};

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setSettings({
            instagram: data.instagram || defaultSettings.instagram,
            facebook: data.facebook || defaultSettings.facebook,
            address: data.address || defaultSettings.address,
            phone: data.phone || defaultSettings.phone,
            email: data.email || defaultSettings.email,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <footer id="contact" className="bg-[#1a1a1a] text-white pt-14 pb-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <img
            src="/images/logo.png"
            alt="Nitya Herbal Care Logo"
            className="h-20 w-auto rounded-xl bg-white object-contain p-2 mb-4"
          />
          <p className="text-gray-400 max-w-xs mb-4 text-sm leading-relaxed">
            શુદ્ધ આયુર્વેદિક અને ઓર્ગેનિક હર્બલ ઉત્પાદનો. કુદરતી તત્વોથી
            બનેલ, કેમિકલ મુક્ત.
          </p>
          <div className="flex items-center gap-4">
            <a
              href={settings.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#E1306C] transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href={settings.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-[#1877F2] transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="text-white hover:text-[#f12840] transition-colors duration-300"
              aria-label="Email"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>

        {/* Shop On */}
        <div>
          <h3 className="text-xl font-semibold text-[#f12840] mb-4">
            Shop On
          </h3>
          <div className="space-y-3">
            <a
              href="https://amazon.in/s?k=nitya+herbal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-[#FF9900] transition-colors duration-300 group"
            >
              <span className="w-8 h-8 rounded-lg bg-[#FF9900]/20 flex items-center justify-center group-hover:bg-[#FF9900]/30 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#FF9900]">
                  <path d="M.045 18.02c.07-.116.17-.193.3-.234 1.52-.542 3.13-.873 4.77-1.003.36-.028.72-.042 1.07-.042 2.14 0 4.18.4 6.12 1.2.32.13.63.28.94.44.12.06.24.12.35.18.09.05.18.1.26.15.06.03.12.06.18.09.24.13.46.24.68.36l.04.02c.37.19.72.36 1.08.52 1.06.47 2.13.77 3.22.91.37.05.73.07 1.08.07.89 0 1.73-.15 2.53-.44l.24-.11.2-.1c.14-.06.25-.09.34-.09.2 0 .33.13.33.33 0 .1-.03.2-.1.3-.05.07-.11.14-.18.2l-.1.09c-1.17.98-2.56 1.54-4.15 1.7-.25.02-.51.04-.76.04-1.23 0-2.4-.28-3.51-.83-.48-.24-.94-.51-1.39-.82l-.18-.12c-.3-.2-.59-.41-.89-.61-1.31-.88-2.72-1.48-4.25-1.81-.53-.11-1.07-.19-1.61-.23-.3-.02-.6-.03-.9-.03-1.37 0-2.69.22-3.97.66-.12.04-.23.06-.33.06-.2 0-.33-.13-.33-.33 0-.09.03-.19.09-.3z" />
                </svg>
              </span>
              <span className="font-semibold">Amazon India</span>
            </a>
            <a
              href="https://flipkart.com/search?q=nitya+herbal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-[#2874F0] transition-colors duration-300 group"
            >
              <span className="w-8 h-8 rounded-lg bg-[#2874F0]/20 flex items-center justify-center group-hover:bg-[#2874F0]/30 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#2874F0]">
                  <path d="M3 4h7l2 2.5h9c.55 0 1 .45 1 1V18c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1V5c0-.55.45-1 1-1zm4.5 8.5l2.5 2.5 5-5L17 12V8h-4l2 2-5.5 5.5-2-2z" />
                </svg>
              </span>
              <span className="font-semibold">Flipkart</span>
            </a>
            <a
              href="https://meesho.com/search?q=nitya+herbal"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-[#E91E8C] transition-colors duration-300 group"
            >
              <span className="w-8 h-8 rounded-lg bg-[#570A57]/20 flex items-center justify-center group-hover:bg-[#570A57]/30 transition-colors">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#E91E8C]">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </span>
              <span className="font-semibold">Meesho</span>
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold text-[#f12840] mb-4">
            Contact
          </h3>
          <div className="space-y-3 text-gray-300">
            <p className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5 shrink-0" />
              <span className="font-semibold">{settings.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone size={18} className="shrink-0" />
              <span className="font-semibold">{settings.phone}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail size={18} className="shrink-0" />
              <span className="font-semibold">{settings.email}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-gray-700 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Nitya Herbal. All rights reserved.
      </div>
    </footer>
  );
}
