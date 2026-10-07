'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Instagram, Facebook, Settings } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Products', href: '#products' },
  { label: 'Price List', href: '#pricelist' },
  { label: 'Contact', href: '#contact' },
];

interface HeaderProps {
  onAdminClick?: () => void;
}

export default function Header({ onAdminClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settings, setSettings] = useState({
    instagram: 'https://www.instagram.com/nityaharbalsoapgmail.com3?igsh=MWE1YXozZjd2b2oyOA==',
    facebook: 'https://facebook.com/your_profile',
  });

  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setSettings({
            instagram: data.instagram || settings.instagram,
            facebook: data.facebook || settings.facebook,
          });
        }
      })
      .catch(() => {});
  }, []);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="Nitya Herbal Care Logo"
            className="h-12 w-auto"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-gray-700 hover:text-[#f12840] font-semibold text-sm transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Social + Admin + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href={settings.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#E1306C] transition-colors duration-300"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href={settings.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#1877F2] transition-colors duration-300"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          {/* Admin Button - clearly visible gear icon */}
          {onAdminClick && (
            <button
              onClick={onAdminClick}
              className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-100 hover:bg-[#f12840] text-gray-600 hover:text-white transition-all duration-300 border border-gray-200 hover:border-[#f12840]"
              aria-label="Admin Panel"
              title="Admin Panel"
            >
              <Settings size={18} />
            </button>
          )}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t px-6 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block text-gray-700 hover:text-[#f12840] font-semibold text-base transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
