'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[60vh] flex flex-col justify-center items-center text-center text-white px-6 py-16"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero-bg.png')" }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 max-w-3xl"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Pure Ayurveda, 100% Natural
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-light drop-shadow-md">
          કુદરતી તત્વોથી બનેલું શુદ્ધ આયુર્વેદિક કેર.
        </p>
        <a
          href="#products"
          className="inline-block mt-8 bg-[#f12840] hover:bg-[#d92035] text-white font-semibold px-8 py-3 rounded-full transition-colors duration-300 shadow-lg"
        >
          Explore Products
        </a>
      </motion.div>
    </section>
  );
}
