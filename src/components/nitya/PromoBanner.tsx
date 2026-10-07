'use client';

import { motion } from 'framer-motion';

interface PromoBannerProps {
  title: string;
  titleColor?: string;
  imageUrl: string;
  alt: string;
  bgColor?: string;
}

export default function PromoBanner({
  title,
  titleColor = '#f12840',
  imageUrl,
  alt,
  bgColor = '#fff',
}: PromoBannerProps) {
  return (
    <section className="py-14 px-4 sm:px-6" style={{ background: bgColor }}>
      <div className="max-w-4xl mx-auto text-center">
        <h2
          className="text-3xl font-bold mb-8"
          style={{ color: titleColor }}
        >
          {title}
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl overflow-hidden shadow-2xl hover:scale-[1.02] transition-transform duration-500"
        >
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-auto block"
          />
        </motion.div>
      </div>
    </section>
  );
}
