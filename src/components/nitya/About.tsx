'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-[#fdfbf7] to-white relative overflow-hidden">
      {/* Decorative leaf background */}
      <div className="absolute top-0 right-0 w-96 h-96 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 200 200" fill="currentColor" className="w-full h-full text-[#2E7D32]">
          <path d="M100 20c-30 0-60 20-60 60 0 50 60 100 60 100s60-50 60-100c0-40-30-60-60-60zm0 30c15 0 30 12 30 35 0 25-30 55-30 55s-30-30-30-55c0-23 15-35 30-35z"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 lg:gap-16 relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 min-w-0 order-2 md:order-1"
        >
          {/* Small eyebrow heading */}
          <span className="inline-block text-xs font-semibold tracking-[0.25em] text-[#f12840] uppercase mb-3">
            નિત્યા હર્બલ વિશે
          </span>

          {/* Main heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-snug">
            નમસ્તે, અમે છીએ <span className="text-[#f12840]">નિત્યા હર્બલ</span>
            <br />
            <span className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700">
              આયુર્વેદિક પરંપરા સાથે શુદ્ધ કુદરતી કેર
            </span>
          </h2>

          {/* Italic quote */}
          <blockquote className="border-l-4 border-[#f12840] pl-4 mb-6 italic text-gray-700 text-base sm:text-lg leading-relaxed">
            &ldquo;નિત્યા હર્બલમાં અમે માનીએ છીએ કે સ્કિનકેર શુદ્ધ, કોમળ અને ઊંડું પોષણ આપતી હોવી જોઈએ.&rdquo;
          </blockquote>

          {/* Body paragraphs */}
          <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
            <strong className="text-gray-800">કાર્તિક ગૃહઉદ્યોગ</strong> હેઠળ સ્થપાયેલ, અમારી સફરની શરૂઆત એક સાદી પરંતુ શક્તિશાળી વિઝનથી થઈ — કુદરતથી પ્રેરિત સામગ્રીઓનો ઉપયોગ કરીને એક કુદરતી અને વૈભવી સ્નાન અને સ્કિનકેર અનુભવ બનાવવો. અમારા દરેક ઉત્પાદનમાં પ્રકૃતિની શક્તિ અને પ્રાચીન આયુર્વેદિક જ્ઞાન સમાયેલ છે.
          </p>

          <p className="text-gray-600 leading-relaxed mb-6 text-sm sm:text-base">
            આયુર્વેદિક પરંપરા અને વારસાને આધુનિક નવીનતા સાથે જોડીને, અમે એવા હાથથી બનાવેલ ઉત્પાદનો તૈયાર કરીએ છીએ જે તમારી ત્વચાની સાચી કાળજી લે છે. અમારા સોપ, ક્રીમ, ફેસ વોશ અને હેર કેર પ્રોડક્ટ્સ — બધા જ 100% ઓર્ગેનિક, કેમિકલ-મુક્ત અને પ્રેમથી બનાવેલ છે.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-gray-200">
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-[#f12840] mb-1">100%</div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">ઓર્ગેનિક સામગ્રી</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-[#f12840] mb-1">0%</div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">કેમિકલ મિક્સચર</div>
            </div>
            <div className="text-center sm:text-left">
              <div className="text-2xl sm:text-3xl font-bold text-[#f12840] mb-1">હાથથી</div>
              <div className="text-xs sm:text-sm text-gray-500 font-medium">બનાવેલ ઉત્પાદનો</div>
            </div>
          </div>
        </motion.div>

        {/* Image with decorative frame */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 min-w-0 order-1 md:order-2 relative"
        >
          {/* Decorative background circle */}
          <div className="absolute -inset-4 bg-gradient-to-br from-[#f12840]/10 to-[#2E7D32]/10 rounded-3xl rotate-3"></div>

          {/* Main image */}
          <div className="relative">
            <img
              src="/images/about.png"
              alt="નિત્યા હર્બલ - કુદરતી આયુર્વેદિક ઉત્પાદનો"
              className="w-full rounded-2xl shadow-2xl object-cover aspect-[3/4] sm:aspect-[4/5]"
            />
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 border border-gray-100">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#4caf50] flex items-center justify-center text-white text-xl sm:text-2xl">
                🌿
              </div>
              <div>
                <div className="font-bold text-gray-900 text-sm sm:text-base">શુદ્ધ આયુર્વેદિક</div>
                <div className="text-xs text-gray-500">100% કુદરતી કેર</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
