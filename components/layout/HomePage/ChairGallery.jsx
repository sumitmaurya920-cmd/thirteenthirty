"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const chairImages = [
  { id: "1", url: "/chairs/01.png", label: "Classic View" },
  { id: "2", url: "/chairs/02.png", label: "Angle View" },
  { id: "3", url: "/chairs/03.png", label: "Side View" },
  { id: "4", url: "/chairs/04.png", label: "Front View" },
  { id: "5", url: "/chairs/05.png", label: "Detail View" },
];

export default function ChairGallery() {
  const [activeImage, setActiveImage] = useState(chairImages[0]);

  return (
    <section className="relative min-h-screen flex items-center px-6 py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div>
              <motion.p
                className="text-[#FF7A00] text-[11px] tracking-[0.35em] uppercase mb-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Explore Design
              </motion.p>

              <motion.h2
                className="text-[#384F37] text-[42px] leading-[1.1] tracking-[-0.02em] font-semibold mb-6"
                >
                Timeless Elegance
                <span className="block text-[#384F37]/80 font-normal">
                    in Every Angle
                </span>
                </motion.h2>


              <motion.p
                className="text-[#384F37]/75 text-[15px] leading-[1.8] max-w-[480px] mb-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Discover our signature chair from multiple perspectives. Each
                view reveals meticulous craftsmanship and perfect balance
                between form and function.
              </motion.p>

              <motion.div
                className="w-16 h-1 bg-[#FF7A00]"
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </div>

            {/* FEATURES */}
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              {[
                { title: "Premium Oak Wood", desc: "Sustainably sourced" },
                { title: "Hand-Finished", desc: "48-hour crafting process" },
                { title: "Ergonomic Design", desc: "Comfort meets style" },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="w-2 h-2 mt-2 rounded-full bg-[#FF7A00]" />
                  <div>
                    <h4 className="text-[#384F37] text-[15px] font-medium tracking-wide">{feature.title}</h4>
                    <p className="text-[#384F37]/60 text-[13px] tracking-wide">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT GALLERY */}
          <motion.div
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* MAIN IMAGE */}
            <div className="relative w-full max-w-md">
              <div className="relative aspect-[5/6] rounded-3xl overflow-hidden bg-gradient-to-br from-[#384F37]/5 to-[#FF7A00]/5 shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage.id}
                    src={activeImage.url}
                    alt={activeImage.label}
                    className="w-full h-full object-contain p-6"
                    initial={{ opacity: 0, scale: 1.05, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                  />
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`label-${activeImage.id}`}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-2 bg-white/95 rounded-full shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <p className="text-[#384F37]">{activeImage.label}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* THUMBNAILS */}
            <div className="flex items-center gap-3">
              {chairImages.map((image, index) => (
                <motion.button
                    key={image.id}
                    onClick={() => setActiveImage(image)}
                    className="relative flex-shrink-0 cursor-pointer group"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.08 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Grey circular background */}
                    <div className="absolute inset-0 bg-[#D9D9D9] opacity-20 rounded-full" />

                    {/* Thumbnail container */}
                    <div className="relative w-[80px] h-[80px] rounded-full overflow-hidden p-2 bg-white/50">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <img
                        src={image.url}
                        alt={image.label}
                        className="max-w-full max-h-full object-contain"
                        />
                    </div>

                    {/* ✅ ACTIVE ORANGE BORDER + GLOW */}
                    {activeImage.id === image.id && (
                        <motion.div
                        className="absolute inset-0 rounded-full"
                        layoutId="activeThumbnailRing"
                        style={{
                            boxShadow:
                            "0 0 0 3px #FF7A00, 0 0 20px rgba(255, 122, 0, 0.5)",
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                        }}
                        />
                    )}

                    {/* ✅ HOVER GREEN GLOW (when NOT active) */}
                    {activeImage.id !== image.id && (
                        <motion.div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                            boxShadow:
                            "0 0 0 2px #384F37, 0 0 15px rgba(56, 79, 55, 0.3)",
                        }}
                        />
                    )}
                    </div>

                    {/* ✅ ACTIVE ORANGE DOT + PING */}
                    {activeImage.id === image.id && (
                    <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-[#FF7A00] rounded-full shadow-lg z-10"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                        }}
                    >
                        <div className="absolute inset-0 bg-[#FF7A00] rounded-full animate-ping opacity-75" />
                    </motion.div>
                    )}
                </motion.button>
                ))}

            </div>
          </motion.div>
        </div>
      </div>

      {/* DECOR */}
      <div className="absolute top-20 left-0 w-40 h-40 bg-[#384F37]/5 blur-3xl" />
      <div className="absolute bottom-20 right-0 w-60 h-60 bg-[#FF7A00]/5 blur-3xl" />
    </section>
  );
}
