'use client';

import { motion } from 'framer-motion';
import { Leaf, HandHeart, CircleCheck } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="w-10 h-10 text-[#d4af37]" />,
    title: '100% ઓર્ગેનિક',
    desc: 'કોઈ કેમિકલ કે પેરાબેન નહીં. અમારા દરેક ઉત્પાદન પૂરેપૂરું કુદરતી અને ઓર્ગેનિક છે.',
  },
  {
    icon: <HandHeart className="w-10 h-10 text-[#d4af37]" />,
    title: 'હેન્ડમેડ',
    desc: 'પ્રેમ અને કાળજીથી બનાવેલ. દરેક ઉત્પાદન હાથથી બનાવેલ છે જેથી શુદ્ધતા જળવાય.',
  },
  {
    icon: <CircleCheck className="w-10 h-10 text-[#d4af37]" />,
    title: 'શુદ્ધ આયુર્વેદ',
    desc: 'પ્રાચીન પદ્ધતિથી તૈયાર કરેલ. આયુર્વેદની પ્રાચીન વિદ્યાથી બનેલ શુદ્ધ ઉત્પાદનો.',
  },
];

export default function Process() {
  return (
    <section className="py-16 px-4 sm:px-6 text-center bg-white">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-[#f12840] mb-10">
          અમારી વિશેષતા
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="flex flex-col items-center p-6"
            >
              <div className="mb-4">{item.icon}</div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {item.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
