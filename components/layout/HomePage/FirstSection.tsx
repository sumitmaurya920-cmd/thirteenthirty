"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const textFade: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const imageFade: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function ScandiSection() {
  return (
    <section className="bg-[#e9e1d7] text-[#3a3027] py-16 md:py-20 second-sec">
      <motion.div
        className="max-w-6xl mx-auto px-4 md:px-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.12, when: "beforeChildren" },
          },
        }}
      >
        {/* Top bar + step indicator */}
        <div className="flex items-center justify-between mb-10 md:mb-12">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase">
            <span>02</span>
            <div className="w-16 h-px bg-[#3a3027]" />
            <span className="text-[#3a3027]/50">05</span>
          </div>
        </div>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.1fr)_minmax(0,1.2fr)] items-start">
          {/* LEFT CARD */}
          <motion.div variants={imageFade} className="space-y-4">
            <ImageRevealBox>
              <div className="relative h-full w-full">
                <Image
                  src="/Arc-Chair.png"      // <- your image path
                  alt="Chair"
                  fill
                  className="object-cover"
                />
              </div>
            </ImageRevealBox>

            <div className="h-px bg-[#3a3027]/40" />

            <motion.p variants={textFade} className="text-[13px] leading-relaxed">
              Part chair, part work of craft art. Dummy description text to
              mirror the style of the original layout and explain the design
              story in a calm, editorial tone.
            </motion.p>
          </motion.div>

          {/* MIDDLE CARD */}
          <motion.div variants={imageFade} className="space-y-4 relative">
            <ImageRevealBox>
              <div className="relative h-full w-full">
                <Image
                  src="/Linea.png"      // <- your image path
                  alt="Chair"
                  fill
                  className="object-cover"
                />
              </div>
            </ImageRevealBox>

            <div className="h-px bg-[#3a3027]/40" />

            <motion.p variants={textFade} className="text-[13px] leading-relaxed">
              A glass pendant light that resembles stretched fabric in shape,
              with a warm wooden table – dummy copy that nods to Japanese
              joinery and Scandinavian calm.
            </motion.p>

            {/* Drag circle (dummy) */}
            {/* <motion.div
              variants={textFade}
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6"
            >
              <button className="text-xs text-[#3a3027]/60">&lt;</button>
              <div className="w-16 h-16 rounded-full border border-[#3a3027]/40 flex items-center justify-center text-[11px] tracking-[0.15em] uppercase text-[#3a3027]/70 bg-[#e9e1d7]">
                Drag
              </div>
              <button className="text-xs text-[#3a3027]/60">&gt;</button>
            </motion.div> */}
          </motion.div>

          {/* RIGHT TEXT + BIG IMAGE */}
          <motion.div
            variants={textFade}
            className="relative flex flex-col gap-6 lg:pl-6 mt-4 lg:mt-0"
          >
            <div className="space-y-1">
              <p className="text-[14px] italic text-[#3a3027]/70">
                1970&apos;s inspired
              </p>
              <h2 className="text-[32px] sm:text-[40px] lg:text-[46px] leading-[1.05] tracking-[0.08em] font-semibold uppercase">
                Scandinavian
                <span className="block">Minimalism</span>
              </h2>
            </div>

            <div className="relative mt-2">
              <ImageRevealBox>
                <div className="relative h-full w-full">
                <Image
                  src="/orbit.png"      // <- your image path
                  alt="Chair"
                  fill
                  className="object-cover"
                />
              </div>
              </ImageRevealBox>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/**
 * Reusable "image reveal" container:
 * - has rounded card
 * - uses an overlay that slides away to reveal content
 */
function ImageRevealBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-[4/5] w-full rounded-[28px] overflow-hidden bg-[#d5c4ae]">
      {/* Actual "image" content */}
      <div className="h-full w-full">{children}</div>

      {/* Reveal overlay */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: "100%" }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="absolute inset-0 bg-[#e9e1d7]"
      />
    </div>
  );
}
