"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";


export default function Experience() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const stats = [
    { number: "50+", label: "Years Experience" },
    { number: "10K+", label: "Satisfied Clients" },
    { number: "100%", label: "Handcrafted" },
    { number: "∞", label: "Lifetime Warranty" },
  ];

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative overflow-hidden bg-[#384F37] py-32"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: y1, rotate }}
          className="absolute left-10 top-1/4 h-64 w-64 rounded-full border-2 border-[#FF7A00]/20"
        />

        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-1/4 right-10 h-96 w-96 rounded-full border-2 border-white/10"
        />

        {/* Animated horizontal lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scaleX: [0, 1, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.6,
            }}
            className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#FF7A00] to-transparent"
            style={{ top: `${20 + i * 15}%` }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-12">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-center"
        >
          <motion.span
            className="mb-4 inline-block text-sm tracking-[0.3em] text-white/60"
            animate={{
              textShadow: [
                "0 0 10px rgba(255,122,0,0.3)",
                "0 0 20px rgba(255,122,0,0.5)",
                "0 0 10px rgba(255,122,0,0.3)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            THE ÉLÉGANTE DIFFERENCE
          </motion.span>

          <h2 className="mb-6 text-5xl tracking-tight text-white md:text-7xl">
            Legacy of{" "}
            <motion.span
              className="text-[#FF7A00]"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,122,0,0.5)",
                  "0 0 40px rgba(255,122,0,0.7)",
                  "0 0 20px rgba(255,122,0,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Excellence
            </motion.span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="mb-24 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="group relative overflow-hidden border-2 border-[#FF7A00]/20 bg-white/5 p-8 text-center backdrop-blur-sm"
            >
              <motion.div
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-gradient-to-br from-[#FF7A00]/20 to-white/10"
              />

              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.1 + 0.3,
                    duration: 0.8,
                    type: "spring",
                    bounce: 0.5,
                  }}
                  className="mb-4 text-5xl text-[#FF7A00] lg:text-6xl"
                >
                  {stat.number}
                </motion.div>

                <p className="text-sm tracking-wider text-white/80">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Feature text */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h3 className="text-3xl text-white lg:text-4xl">
              Artisanal{" "}
              <span className="text-[#FF7A00]">Mastery</span>
            </h3>
            <p className="text-lg leading-relaxed text-white/70">
              Every chair is a testament to our unwavering commitment to
              excellence. Crafted using traditional techniques refined over
              generations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6"
          >
            <h3 className="text-3xl text-white lg:text-4xl">
              Sustainable{" "}
              <span className="text-[#FF7A00]">Luxury</span>
            </h3>
            <p className="text-lg leading-relaxed text-white/70">
              True luxury is responsible. Every material is ethically sourced,
              and every piece is designed to last generations.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
