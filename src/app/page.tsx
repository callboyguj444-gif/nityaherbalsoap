'use client';

import { useState } from 'react';
import Header from '@/components/nitya/Header';
import Hero from '@/components/nitya/Hero';
import Process from '@/components/nitya/Process';
import About from '@/components/nitya/About';
import Ambassador from '@/components/nitya/Ambassador';
import PromoBanner from '@/components/nitya/PromoBanner';
import ShopByConcern from '@/components/nitya/ShopByConcern';
import ProductSlider from '@/components/nitya/ProductSlider';
import PriceList from '@/components/nitya/PriceList';
import AvailableOn from '@/components/nitya/AvailableOn';
import Footer from '@/components/nitya/Footer';
import FloatingWhatsApp from '@/components/nitya/FloatingWhatsApp';
import AdminPanel from '@/components/nitya/AdminPanel';

export default function Home() {
  const [showAdmin, setShowAdmin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins', 'Noto Sans Gujarati', sans-serif" }}>
      <Header onAdminClick={() => setShowAdmin(true)} />

      <main className="flex-1">
        <Hero />
        <ShopByConcern />
        <Process />
        <About />
        <Ambassador />

        {/* Product Range Banner */}
        <PromoBanner
          title="અમારી પ્રોડક્ટ રેન્જ"
          imageUrl="/images/product-range.png"
          alt="Nitya Herbal Product Range"
        />

        {/* Products Slider */}
        <ProductSlider />

        {/* Price List */}
        <PriceList />

        {/* Special Launch Banner */}
        <PromoBanner
          title="Special Launch: Rice Water"
          titleColor="#2E7D32"
          imageUrl="/images/product-g.png"
          alt="Rice Water Special Offer"
          bgColor="#f9f9f9"
        />

        {/* Available On Marketplace Section */}
        <AvailableOn />
      </main>

      <Footer />
      <FloatingWhatsApp />

      {/* Admin Panel */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
    </div>
  );
}
