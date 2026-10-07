'use client';

import { motion } from 'framer-motion';

export default function Ambassador() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-64 h-64 sm:w-72 sm:h-72"
        >
          <img
            src="/images/ambassador.png"
            alt="Our Inspiration"
            className="w-full h-full object-cover rounded-full border-8 border-white shadow-xl"
          />
          <span className="absolute bottom-3 right-0 bg-[#d4af37] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow">
            Nitya&apos;s Princess
          </span>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left max-w-md"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Our Inspiration
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            &quot;આગામી પેઢી માટે અમે લાવ્યા છીએ કેમિકલ મુક્ત અને સુરક્ષિત
            આયુર્વેદિક ઉત્પાદનો. અમારા બાળકોની ત્વચા માટે સૌથી સુરક્ષિત
            અને શુદ્ધ ઉત્પાદનો.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
